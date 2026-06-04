package com.turnos_peluqueria.app_peluqueria.controller;

import com.turnos_peluqueria.app_peluqueria.dto.AppointmentDTO;
import com.turnos_peluqueria.app_peluqueria.entity.AppointmentStatus;
import com.turnos_peluqueria.app_peluqueria.service.AppointmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/appointments")
@CrossOrigin(origins = "*")
public class AppointmentController {

    @Autowired
    private AppointmentService appointmentService;

    // Reservar un turno
    @PostMapping
    public AppointmentDTO create(@RequestBody AppointmentDTO dto) {
        return appointmentService.createAppointment(dto);
    }

    // Agenda diaria de un empleado específico
    @GetMapping("/business/{businessId}/employee/{employeeId}")
    public List<AppointmentDTO> getByEmployee(
            @PathVariable Long businessId,
            @PathVariable Long employeeId,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        return appointmentService.getAppointmentsByEmployeeAndDate(businessId, employeeId, date);
    }

    // Agenda global del negocio para un día (Vista de Recepción/Admin)
    @GetMapping("/business/{businessId}/daily")
    public List<AppointmentDTO> getDailyAgenda(
            @PathVariable Long businessId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        return appointmentService.getDailyAgenda(businessId, date);
    }

    // --- ACCIONES DE ESTADO ---

    @PatchMapping("/{id}/business/{businessId}/cancel")
    public void cancel(@PathVariable Long id, @PathVariable Long businessId) {
        appointmentService.cancelAppointment(businessId, id);
    }

    @PatchMapping("/{id}/business/{businessId}/complete")
    public void complete(@PathVariable Long id, @PathVariable Long businessId) {
        appointmentService.completeAppointment(businessId, id);
    }

    @PatchMapping("/{id}/business/{businessId}/noshow")
    public void noShow(@PathVariable Long id, @PathVariable Long businessId) {
        appointmentService.registerNoShow(businessId, id);
    }
}