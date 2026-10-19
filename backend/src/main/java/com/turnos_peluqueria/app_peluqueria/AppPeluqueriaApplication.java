package com.turnos_peluqueria.app_peluqueria;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

import java.util.TimeZone;

@SpringBootApplication
@EnableScheduling // recordatorios por email (AppointmentService.sendReminders)
public class AppPeluqueriaApplication {

	public static void main(String[] args) {
		// Turnos, "ya pasó" y recordatorios usan LocalDate/LocalTime: sin esto, en un hosting en UTC se corren 3 hs
		TimeZone.setDefault(TimeZone.getTimeZone(System.getenv().getOrDefault("APP_TIMEZONE", "America/Argentina/Buenos_Aires")));
		SpringApplication.run(AppPeluqueriaApplication.class, args);
	}

}
