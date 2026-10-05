package com.turnos_peluqueria.app_peluqueria.repository;

import com.turnos_peluqueria.app_peluqueria.entity.User;
import jakarta.persistence.LockModeType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    // Trae solo los usuarios activos de un local (ignora los dados de baja)
    List<User> findByBusinessIdAndIsActiveTrueOrderByNameAsc(Long businessId);

    // Busca un usuario asegurándose de que pertenezca a ese negocio
    Optional<User> findByBusinessIdAndId(Long businessId, Long id);

    // SELECT ... FOR UPDATE: dos reservas simultáneas para el mismo empleado se ejecutan de a una,
    // así la validación de solapamiento no deja pasar dos turnos en el mismo horario
    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Query("select u from User u where u.business.id = :businessId and u.id = :id")
    Optional<User> findForUpdate(@Param("businessId") Long businessId, @Param("id") Long id);

    Optional<User> findByEmail(String email);
}
