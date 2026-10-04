package com.turnos_peluqueria.app_peluqueria.controller;

import com.turnos_peluqueria.app_peluqueria.config.AuthUser;
import com.turnos_peluqueria.app_peluqueria.dto.AppointmentDTO;
import com.turnos_peluqueria.app_peluqueria.service.AppointmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/appointments")
@RequiredArgsConstructor
public class AppointmentController {

    private final AppointmentService appointmentService;

    // Público: el cliente reserva desde la web y queda PENDING hasta que el local lo confirme.
    // Si lo carga alguien del propio local (con sesión), nace CONFIRMED
    @PostMapping
    public AppointmentDTO create(@RequestBody AppointmentDTO dto) {
        AuthUser user = AuthUser.currentOrNull();
        boolean byStaff = user != null && dto.getBusinessId() != null && dto.getBusinessId().equals(user.businessId());
        return appointmentService.createAppointment(dto, byStaff);
    }

    // Público: el cliente ve su turno con el link que recibió (sin cuenta)
    @GetMapping("/public/{token}")
    public AppointmentDTO getByToken(@PathVariable UUID token) {
        return appointmentService.getByToken(token);
    }

    @PostMapping("/public/{token}/cancel")
    public AppointmentDTO cancelByToken(@PathVariable UUID token) {
        return appointmentService.cancelByToken(token);
    }

    // Público: horarios libres para la página de reservas
    @GetMapping("/availability")
    public List<String> availability(
            @RequestParam Long businessId,
            @RequestParam Long employeeId,
            @RequestParam Long serviceId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        return appointmentService.getAvailability(businessId, employeeId, serviceId, date);
    }

    // Panel: turnos entre dos fechas. El ADMIN ve todo (o filtra por profesional); el EMPLOYEE solo los suyos
    @GetMapping("/business/{businessId}")
    public List<AppointmentDTO> list(
            @PathVariable Long businessId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate from,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate to,
            @RequestParam(required = false) Long employeeId) {
        AuthUser user = AuthUser.requireBusiness(businessId);
        return appointmentService.getAppointments(businessId, from, to, user.isAdmin() ? employeeId : user.id());
    }

    // Panel: cambiar estado (confirmar, cancelar, completar, no asistió) y observaciones
    @PatchMapping("/{id}/business/{businessId}")
    public AppointmentDTO update(@PathVariable Long id, @PathVariable Long businessId, @RequestBody AppointmentDTO dto) {
        AuthUser user = AuthUser.requireBusiness(businessId);
        return appointmentService.updateAppointment(businessId, id, dto.getStatus(), dto.getObservations(),
                user.isAdmin() ? null : user.id());
    }
}
