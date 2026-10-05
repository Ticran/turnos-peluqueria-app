package com.turnos_peluqueria.app_peluqueria.repository;

import com.turnos_peluqueria.app_peluqueria.entity.TimeBlock;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface TimeBlockRepository extends JpaRepository<TimeBlock, Long> {

    Optional<TimeBlock> findByBusinessIdAndId(Long businessId, Long id);

    // Bloqueos que tocan el rango [from, to): los del empleado y los de todo el local (userId null)
    @Query("""
            select b from TimeBlock b
            where b.businessId = :businessId
              and (b.userId is null or b.userId = :userId)
              and b.startAt < :to and b.endAt > :from
            order by b.startAt""")
    List<TimeBlock> findOverlapping(@Param("businessId") Long businessId, @Param("userId") Long userId,
            @Param("from") LocalDateTime from, @Param("to") LocalDateTime to);

    // Bloqueos de todo el local (feriados/cierres) que terminan después de "from"
    List<TimeBlock> findByBusinessIdAndUserIdIsNullAndEndAtAfterOrderByStartAt(Long businessId, LocalDateTime from);
}
