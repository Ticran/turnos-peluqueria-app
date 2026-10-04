package com.turnos_peluqueria.app_peluqueria;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling // recordatorios por email (AppointmentService.sendReminders)
public class AppPeluqueriaApplication {

	public static void main(String[] args) {
		SpringApplication.run(AppPeluqueriaApplication.class, args);
	}

}
