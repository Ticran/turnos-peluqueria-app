package com.turnos_peluqueria.app_peluqueria.controller;

import com.turnos_peluqueria.app_peluqueria.dto.AppointmentDTO;
import com.turnos_peluqueria.app_peluqueria.entity.AppointmentStatus;
import com.turnos_peluqueria.app_peluqueria.service.AppointmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/appointments")
@CrossOrigin(origins = "*") // Clave para evitar problemas de CORS con React
public class AppointmentController {

    @Autowired
    private AppointmentService appointmentService;

    // POST: http://localhost:8080/api/appointments
    // Para reservar un nuevo turno
    @PostMapping
    public AppointmentDTO create(@RequestBody AppointmentDTO dto) {
        return appointmentService.createAppointment(dto);
    }

    // GET: http://localhost:8080/api/appointments/employee/2
    // Trae los turnos del profesional con ID 2 (Su agenda privada)
    @GetMapping("/employee/{employeeId}")
    public List<AppointmentDTO> getByEmployee(@PathVariable Long employeeId) {
        return appointmentService.getAppointmentsByEmployee(employeeId);
    }

    // PATCH: http://localhost:8080/api/appointments/5/status?status=CONFIRMED&observations=Trae pelo limpio
    // Permite actualizar de manera parcial el estado o las notas de un turno sin mandar todo el objeto entero
    @PatchMapping("/{id}/status")
    public AppointmentDTO updateStatus(
            @PathVariable Long id,
            @RequestParam(required = false) AppointmentStatus status,
            @RequestParam(required = false) String observations) {
        return appointmentService.updateStatusAndObservations(id, status, observations);
    }
}