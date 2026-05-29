package com.turnos_peluqueria.app_peluqueria.controller;

import com.turnos_peluqueria.app_peluqueria.dto.UserDTO;
import com.turnos_peluqueria.app_peluqueria.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*") // Para conectar con tu localhost de React sin problemas de CORS
public class UserController {

    @Autowired
    private UserService userService;

    // GET: http://localhost:8080/api/users/business/1
    // Devuelve los empleados que trabajan en el negocio 1
    @GetMapping("/business/{businessId}")
    public List<UserDTO> getByBusiness(@PathVariable Long businessId) {
        return userService.getUsersByBusiness(businessId);
    }

    // POST: http://localhost:8080/api/users
    // Crea un nuevo empleado
    @PostMapping
    public UserDTO create(@RequestBody UserDTO userDTO) {
        return userService.createUser(userDTO);
    }
}