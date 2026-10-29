package com.turnos_peluqueria.app_peluqueria.repository;

import com.turnos_peluqueria.app_peluqueria.entity.Role;
import com.turnos_peluqueria.app_peluqueria.entity.User;
import jakarta.persistence.LockModeType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

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

    boolean existsByRole(Role role);

    // Rol actual si el usuario sigue activo y su local no está suspendido; vacío si no puede operar.
    // Se consulta en cada request: dar de baja, suspender o cambiar el rol corta al instante, sin esperar a que venza el token
    @Query("select u.role from User u left join u.business b where u.id = :id and u.isActive = true and (b is null or b.status = 'ACTIVE')")
    Optional<Role> findActiveRole(@Param("id") Long id);
}
