package com.turnos_peluqueria.app_peluqueria.repository;

import com.turnos_peluqueria.app_peluqueria.entity.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
    
    // Para el Admin: Busca todos los turnos de un negocio entero
    List<Appointment> findByBusinessId(Long businessId);

    // Para el Empleado: Busca los turnos de un empleado específico (Su Agenda Personal)
    List<Appointment> findByEmployeeId(Long employeeId);
}