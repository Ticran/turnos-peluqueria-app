package com.turnos_peluqueria.app_peluqueria.controller;

import com.turnos_peluqueria.app_peluqueria.dto.UserDTO;
import com.turnos_peluqueria.app_peluqueria.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/business/{businessId}")
    public List<UserDTO> getByBusiness(@PathVariable Long businessId) {
        return userService.getActiveEmployees(businessId);
    }

    @PostMapping
    public UserDTO create(@RequestBody UserDTO userDTO) {
        return userService.createUser(userDTO);
    }

    @PutMapping("/{id}/business/{businessId}")
    public UserDTO update(@PathVariable Long id, @PathVariable Long businessId, @RequestBody UserDTO dto) {
        return userService.updateUser(businessId, id, dto);
    }

    @DeleteMapping("/{id}/business/{businessId}")
    public void delete(@PathVariable Long id, @PathVariable Long businessId) {
        userService.softDeleteUser(businessId, id);
    }
}