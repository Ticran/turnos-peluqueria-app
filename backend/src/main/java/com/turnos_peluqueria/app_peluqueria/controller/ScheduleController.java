package com.turnos_peluqueria.app_peluqueria.controller;

import com.turnos_peluqueria.app_peluqueria.config.AuthUser;
import com.turnos_peluqueria.app_peluqueria.dto.BlockDTO;
import com.turnos_peluqueria.app_peluqueria.dto.ScheduleDTO;
import com.turnos_peluqueria.app_peluqueria.service.ScheduleService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

// ADMIN gestiona horarios y bloqueos de cualquiera; EMPLOYEE solo los suyos
@RestController
@RequestMapping("/api/schedules/business/{businessId}")
@RequiredArgsConstructor
public class ScheduleController {

    private final ScheduleService scheduleService;

    @GetMapping("/employee/{employeeId}")
    public List<ScheduleDTO> getSchedule(@PathVariable Long businessId, @PathVariable Long employeeId) {
        requireSelfOrAdmin(businessId, employeeId);
        return scheduleService.getSchedule(businessId, employeeId);
    }

    @PutMapping("/employee/{employeeId}")
    public List<ScheduleDTO> replaceSchedule(@PathVariable Long businessId, @PathVariable Long employeeId,
            @RequestBody List<ScheduleDTO> ranges) {
        requireSelfOrAdmin(businessId, employeeId);
        return scheduleService.replaceSchedule(businessId, employeeId, ranges);
    }

    // Sin employeeId: feriados/cierres del local. Con employeeId: bloqueos de ese empleado + los del local
    @GetMapping("/blocks")
    public List<BlockDTO> getBlocks(@PathVariable Long businessId, @RequestParam(required = false) Long employeeId) {
        if (employeeId != null) {
            requireSelfOrAdmin(businessId, employeeId);
        } else {
            AuthUser.requireBusiness(businessId);
        }
        return scheduleService.getUpcomingBlocks(businessId, employeeId);
    }

    @PostMapping("/blocks")
    public BlockDTO createBlock(@PathVariable Long businessId, @RequestBody BlockDTO dto) {
        if (dto.employeeId() == null) {
            requireAdmin(businessId); // cerrar todo el local es decisión del ADMIN
        } else {
            requireSelfOrAdmin(businessId, dto.employeeId());
        }
        return scheduleService.createBlock(businessId, dto);
    }

    @DeleteMapping("/blocks/{blockId}")
    public void deleteBlock(@PathVariable Long businessId, @PathVariable Long blockId) {
        AuthUser user = AuthUser.requireBusiness(businessId);
        scheduleService.deleteBlock(businessId, blockId, user.isAdmin() ? null : user.id());
    }

    private void requireSelfOrAdmin(Long businessId, Long employeeId) {
        AuthUser user = AuthUser.requireBusiness(businessId);
        if (!user.isAdmin() && !user.id().equals(employeeId)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Solo podés gestionar tu propia disponibilidad.");
        }
    }

    private void requireAdmin(Long businessId) {
        if (!AuthUser.requireBusiness(businessId).isAdmin()) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Solo el administrador puede cerrar el local.");
        }
    }
}
