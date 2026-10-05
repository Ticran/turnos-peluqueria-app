package com.turnos_peluqueria.app_peluqueria.repository;

import com.turnos_peluqueria.app_peluqueria.entity.EmployeeSchedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EmployeeScheduleRepository extends JpaRepository<EmployeeSchedule, Long> {

    List<EmployeeSchedule> findByBusinessIdAndUserIdOrderByDayOfWeekAscStartTimeAsc(Long businessId, Long userId);

    void deleteByBusinessIdAndUserId(Long businessId, Long userId);
}
