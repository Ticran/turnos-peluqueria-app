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

    // El método de validación debe residir AQUÍ
    List<Appointment> findByBusinessIdAndBranchIdAndEmployeeIdAndDateAndStatusNot(
            Long businessId, Long branchId, Long employeeId, LocalDate date, AppointmentStatus status);

    List<Appointment> findByBusinessIdAndBranchIdAndDate(Long businessId, Long branchId, LocalDate date);

    List<Appointment> findByBusinessIdAndEmployeeIdAndDate(Long businessId, Long employeeId, LocalDate date);

    List<Appointment> findByBusinessIdAndEmployeeId(Long businessId, Long employeeId);

    List<Appointment> findByBusinessIdAndDate(Long businessId, LocalDate date);
}