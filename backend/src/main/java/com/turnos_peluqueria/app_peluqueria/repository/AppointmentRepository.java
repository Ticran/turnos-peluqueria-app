package com.turnos_peluqueria.app_peluqueria.repository;

import com.turnos_peluqueria.app_peluqueria.entity.Appointment;
import com.turnos_peluqueria.app_peluqueria.entity.AppointmentStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Long> {

    Optional<Appointment> findByBusinessIdAndId(Long businessId, Long id);

    List<Appointment> findByBusinessId(Long businessId);

    // Corregido: Mapea directo a la propiedad 'employee' de la entidad
    List<Appointment> findByBusinessIdAndEmployeeId(Long businessId, Long employeeId);

    // Nuevo: Para filtrar la agenda de un empleado en un día específico
    List<Appointment> findByBusinessIdAndEmployeeIdAndDate(Long businessId, Long employeeId, LocalDate date);

    // Nuevo: Para la agenda global del negocio de un día entero
    List<Appointment> findByBusinessIdAndDate(Long businessId, LocalDate date);

    // Nuevo: Para buscar turnos activos y validar solapamientos
    List<Appointment> findByBusinessIdAndEmployeeIdAndDateAndStatusNot(Long businessId, Long employeeId, LocalDate date,
            AppointmentStatus status);
}