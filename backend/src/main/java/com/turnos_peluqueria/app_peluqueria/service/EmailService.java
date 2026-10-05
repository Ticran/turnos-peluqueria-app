package com.turnos_peluqueria.app_peluqueria.service;

import com.turnos_peluqueria.app_peluqueria.entity.Appointment;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.ObjectProvider;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.task.TaskExecutor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.transaction.support.TransactionSynchronization;
import org.springframework.transaction.support.TransactionSynchronizationManager;

import java.time.format.DateTimeFormatter;
import java.util.Locale;

// Emails al cliente y al local. Sin SMTP configurado (spring.mail.host) no envía nada y solo lo deja en el log
@Slf4j
@Service
public class EmailService {

    private static final DateTimeFormatter DATE = DateTimeFormatter.ofPattern("EEEE d 'de' MMMM", Locale.of("es", "AR"));

    private final ObjectProvider<JavaMailSender> mailSender;
    private final TaskExecutor taskExecutor;
    private final String from;
    private final String frontendUrl;

    public EmailService(ObjectProvider<JavaMailSender> mailSender,
            @Qualifier("applicationTaskExecutor") TaskExecutor taskExecutor,
            @Value("${app.mail.from:}") String from,
            @Value("${app.frontend-url:http://localhost:5173}") String frontendUrl) {
        this.mailSender = mailSender;
        this.taskExecutor = taskExecutor;
        this.from = from;
        this.frontendUrl = frontendUrl;
    }

    public boolean isEnabled() {
        return mailSender.getIfAvailable() != null;
    }

    public void bookingReceived(Appointment a) {
        toClient(a, "Recibimos tu solicitud de turno",
                "Recibimos tu pedido de turno. El local te lo va a confirmar a la brevedad.");
    }

    public void bookingConfirmed(Appointment a) {
        toClient(a, "Tu turno está confirmado", "¡Tu turno está confirmado! Te esperamos.");
    }

    public void bookingCancelledByBusiness(Appointment a) {
        toClient(a, "Tu turno fue cancelado",
                "El local canceló tu turno. Podés reservar otro horario desde la web o comunicarte por teléfono.");
    }

    public void reminder(Appointment a) {
        toClient(a, "Recordatorio de tu turno", "Te recordamos tu próximo turno.");
    }

    // Aviso al local cuando el cliente cancela desde su link
    public void cancelledByClient(Appointment a) {
        String body = a.getClientName() + " (" + a.getClientPhone() + ") canceló su turno.\n\n" + details(a);
        send(a.getBusiness().getEmail(), "Un cliente canceló su turno", body);
    }

    private void toClient(Appointment a, String subject, String intro) {
        if (a.getClientEmail() == null) {
            return;
        }
        String body = "Hola " + a.getClientName() + ",\n\n" + intro + "\n\n" + details(a)
                + "\n\nSi no podés asistir, cancelalo desde acá: " + frontendUrl + "/turno/" + a.getCancelToken()
                + "\n\n" + a.getBusiness().getName();
        send(a.getClientEmail(), subject + " · " + a.getBusiness().getName(), body);
    }

    private String details(Appointment a) {
        String address = a.getBranch() != null && a.getBranch().getAddress() != null
                ? a.getBranch().getAddress() : a.getBusiness().getAddress();
        return "Servicio: " + a.getService().getName()
                + "\nProfesional: " + a.getEmployee().getName()
                + "\nFecha: " + a.getDate().format(DATE) + " a las " + a.getTime().toString().substring(0, 5) + " hs"
                + (address != null ? "\nDirección: " + address : "");
    }

    // El texto se arma ahora (con la entidad cargada); el envío va en otro hilo y recién cuando
    // la transacción confirma, para no avisar de un turno que terminó en rollback
    private void send(String to, String subject, String body) {
        JavaMailSender sender = mailSender.getIfAvailable();
        if (sender == null) {
            log.info("Email no enviado (SMTP sin configurar) -> {}: {}", to, subject);
            return;
        }
        Runnable task = () -> {
            try {
                SimpleMailMessage message = new SimpleMailMessage();
                if (!from.isBlank()) {
                    message.setFrom(from);
                }
                message.setTo(to);
                message.setSubject(subject);
                message.setText(body);
                sender.send(message);
            } catch (Exception e) {
                log.warn("No se pudo enviar el email a {}: {}", to, e.getMessage());
            }
        };
        if (TransactionSynchronizationManager.isSynchronizationActive()) {
            TransactionSynchronizationManager.registerSynchronization(new TransactionSynchronization() {
                @Override
                public void afterCommit() {
                    taskExecutor.execute(task);
                }
            });
        } else {
            taskExecutor.execute(task);
        }
    }
}
