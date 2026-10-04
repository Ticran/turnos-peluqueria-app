package com.turnos_peluqueria.app_peluqueria.repository;

import com.turnos_peluqueria.app_peluqueria.entity.Appointment;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import com.turnos_peluqueria.app_peluqueria.entity.AppointmentStatus;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Long> {

    Optional<Appointment> findByBusinessIdAndId(Long businessId, Long id);

    // Agenda de un empleado en un día: base para solapamientos y disponibilidad
    @EntityGraph(attributePaths = "service")
    List<Appointment> findByBusinessIdAndEmployeeIdAndDate(Long businessId, Long employeeId, LocalDate date);

    // Rango de fechas para el panel (EntityGraph evita una consulta extra por cada turno)
    @EntityGraph(attributePaths = {"employee", "service", "branch"})
    List<Appointment> findByBusinessIdAndDateBetweenOrderByDateAscTimeAsc(Long businessId, LocalDate from, LocalDate to);

    @EntityGraph(attributePaths = {"employee", "service", "branch"})
    List<Appointment> findByBusinessIdAndEmployeeIdAndDateBetweenOrderByDateAscTimeAsc(
            Long businessId, Long employeeId, LocalDate from, LocalDate to);

    @EntityGraph(attributePaths = {"employee", "service", "branch", "business"})
    Optional<Appointment> findByCancelToken(UUID cancelToken);

    // Candidatos a recordatorio: confirmados, con email y todavía sin avisar
    @EntityGraph(attributePaths = {"employee", "service", "branch", "business"})
    List<Appointment> findByStatusAndReminderSentAtIsNullAndClientEmailIsNotNullAndDateBetween(
            AppointmentStatus status, LocalDate from, LocalDate to);
}
