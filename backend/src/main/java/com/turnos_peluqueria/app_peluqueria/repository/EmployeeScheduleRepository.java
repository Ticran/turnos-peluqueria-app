package com.turnos_peluqueria.app_peluqueria.repository;

import com.turnos_peluqueria.app_peluqueria.entity.EmployeeSchedule;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EmployeeScheduleRepository extends JpaRepository<EmployeeSchedule, Long> {

    List<EmployeeSchedule> findByBusinessIdAndUserIdOrderByDayOfWeekAscStartTimeAsc(Long businessId, Long userId);

    void deleteByBusinessIdAndUserId(Long businessId, Long userId);
}
