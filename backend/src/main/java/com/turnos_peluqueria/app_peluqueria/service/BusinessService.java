package com.turnos_peluqueria.app_peluqueria.service;

import com.turnos_peluqueria.app_peluqueria.dto.BranchDTO;
import com.turnos_peluqueria.app_peluqueria.dto.BusinessDTO;
import com.turnos_peluqueria.app_peluqueria.dto.NewBusinessRequest;
import com.turnos_peluqueria.app_peluqueria.dto.UserDTO;
import com.turnos_peluqueria.app_peluqueria.entity.Branch;
import com.turnos_peluqueria.app_peluqueria.entity.Business;
import com.turnos_peluqueria.app_peluqueria.entity.Role;
import com.turnos_peluqueria.app_peluqueria.repository.BranchRepository;
import com.turnos_peluqueria.app_peluqueria.repository.BusinessRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalTime;
import java.time.OffsetDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BusinessService {

    private final BusinessRepository businessRepository;
    private final BranchRepository branchRepository;
    private final UserService userService;

    // Plataforma: alta del local + primera sucursal + su administrador, todo o nada
    @Transactional
    public BusinessDTO createBusinessWithOwner(NewBusinessRequest request) {
        BusinessDTO dto = request.business();
        if (dto == null) {
            throw new IllegalArgumentException("Faltan los datos del local.");
        }
        businessRepository.findByEmail(dto.getEmail()).ifPresent(b -> {
            throw new IllegalStateException("Ya existe un local registrado con este email.");
        });

        Business business = new Business();
        if (dto.getOpeningTime() == null) dto.setOpeningTime("09:00");
        if (dto.getClosingTime() == null) dto.setClosingTime("20:00");
        apply(business, dto);
        business.setSlug(uniqueSlug(dto.getSlug() != null && !dto.getSlug().isBlank() ? dto.getSlug() : Slugs.toSlug(dto.getName())));
        business = businessRepository.save(business);

        Branch branch = new Branch();
        branch.setBusiness(business);
        branch.setName(request.branchName() == null || request.branchName().isBlank() ? "Sucursal Central" : request.branchName().trim());
        branch.setAddress(dto.getAddress());
        branch.setPhone(dto.getPhone());
        branch = branchRepository.save(branch);
        business.getBranches().add(branch);

        UserDTO admin = new UserDTO();
        admin.setName(request.adminName());
        admin.setEmail(request.adminEmail());
        admin.setPassword(request.adminPassword());
        admin.setRole(Role.ADMIN);
        admin.setBranchId(branch.getId());
        userService.createUser(business.getId(), admin);

        return mapToDTO(business);
    }

    @Transactional(readOnly = true)
    public List<BusinessDTO> getAllBusinesses() {
        return businessRepository.findAll().stream().map(this::mapToDTO).toList();
    }

    @Transactional
    public BusinessDTO setStatus(Long id, String status) {
        if (!"ACTIVE".equals(status) && !"SUSPENDED".equals(status)) {
            throw new IllegalArgumentException("Estado inválido: usar ACTIVE o SUSPENDED.");
        }
        Business b = businessRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("El local no existe."));
        b.setStatus(status);
        b.setUpdatedAt(OffsetDateTime.now());
        return mapToDTO(b);
    }

    // Público: directorio de locales activos
    @Transactional(readOnly = true)
    public List<BusinessDTO> getActiveBusinesses() {
        return businessRepository.findByStatusOrderByNameAsc("ACTIVE").stream().map(this::mapToDTO).toList();
    }

    // Público: página de reservas /{slug}. Un local suspendido no se muestra
    @Transactional(readOnly = true)
    public BusinessDTO getActiveBySlug(String slug) {
        return businessRepository.findBySlug(slug)
                .filter(Business::isActive)
                .map(this::mapToDTO)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "No encontramos ese local."));
    }

    @Transactional(readOnly = true)
    public BusinessDTO getBusinessById(Long id) {
        Business b = businessRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("El local solicitado no existe."));
        return mapToDTO(b);
    }

    @Transactional
    public BusinessDTO updateBusiness(Long id, BusinessDTO dto) {
        Business b = businessRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("El local no existe."));
        apply(b, dto);
        if (dto.getSlug() != null && !dto.getSlug().equals(b.getSlug())) {
            Slugs.validate(dto.getSlug());
            if (businessRepository.existsBySlug(dto.getSlug())) {
                throw new IllegalStateException("Esa dirección web ya la usa otro local.");
            }
            b.setSlug(dto.getSlug());
        }
        b.setUpdatedAt(OffsetDateTime.now());
        return mapToDTO(b);
    }

    @Transactional
    public BusinessDTO updateImageUrl(Long id, String imageUrl) {
        Business business = businessRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Negocio no encontrado"));
        business.setImageUrl(imageUrl);
        return mapToDTO(business);
    }

    @Transactional
    public BranchDTO createBranch(Long businessId, BranchDTO dto) {
        Business business = businessRepository.findById(businessId)
                .orElseThrow(() -> new IllegalArgumentException("Negocio no encontrado"));
        Branch branch = new Branch();
        branch.setBusiness(business);
        applyBranch(branch, dto);
        return mapBranch(branchRepository.save(branch));
    }

    @Transactional
    public BranchDTO updateBranch(Long businessId, Long branchId, BranchDTO dto) {
        Branch branch = branchRepository.findByBusinessIdAndId(businessId, branchId)
                .orElseThrow(() -> new IllegalArgumentException("Sucursal no encontrada"));
        applyBranch(branch, dto);
        branch.setUpdatedAt(OffsetDateTime.now());
        return mapBranch(branch);
    }

    // Slug libre: si "mi-pelu" existe prueba "mi-pelu-2", "mi-pelu-3"...
    private String uniqueSlug(String base) {
        String slug = Slugs.toSlug(base);
        if (slug.isEmpty() || Slugs.RESERVED.contains(slug)) {
            slug = "local" + (slug.isEmpty() ? "" : "-" + slug);
        }
        String candidate = slug;
        for (int i = 2; businessRepository.existsBySlug(candidate); i++) {
            candidate = slug + "-" + i;
        }
        return candidate;
    }

    private void apply(Business b, BusinessDTO dto) {
        if (dto.getName() == null || dto.getName().isBlank() || dto.getEmail() == null || dto.getEmail().isBlank()) {
            throw new IllegalArgumentException("Nombre y email del local son obligatorios.");
        }
        b.setName(dto.getName().trim());
        b.setDescription(dto.getDescription());
        b.setEmail(dto.getEmail().trim());
        b.setPhone(dto.getPhone());
        b.setAddress(dto.getAddress());
        if (dto.getImageUrl() != null) {
            b.setImageUrl(dto.getImageUrl());
        }
        if (dto.getOpeningTime() != null)
            b.setOpeningTime(LocalTime.parse(dto.getOpeningTime()));
        if (dto.getClosingTime() != null)
            b.setClosingTime(LocalTime.parse(dto.getClosingTime()));
        if (b.getOpeningTime() == null || b.getClosingTime() == null || !b.getOpeningTime().isBefore(b.getClosingTime())) {
            throw new IllegalArgumentException("El horario de apertura debe ser anterior al de cierre.");
        }
        if (dto.getClosedWeekdays() != null) {
            if (dto.getClosedWeekdays().stream().anyMatch(d -> d == null || d < 1 || d > 7)) {
                throw new IllegalArgumentException("Días cerrados inválidos.");
            }
            b.setClosedWeekdays(dto.getClosedWeekdays().stream().distinct().sorted()
                    .map(String::valueOf).collect(Collectors.joining(",")));
        }
    }

    private void applyBranch(Branch branch, BranchDTO dto) {
        if (dto.getName() == null || dto.getName().isBlank()) {
            throw new IllegalArgumentException("El nombre de la sucursal es obligatorio.");
        }
        branch.setName(dto.getName().trim());
        branch.setAddress(dto.getAddress());
        branch.setPhone(dto.getPhone());
    }

    private BusinessDTO mapToDTO(Business b) {
        BusinessDTO dto = new BusinessDTO();
        dto.setId(b.getId());
        dto.setName(b.getName());
        dto.setSlug(b.getSlug());
        dto.setDescription(b.getDescription());
        dto.setEmail(b.getEmail());
        dto.setPhone(b.getPhone());
        dto.setAddress(b.getAddress());
        dto.setImageUrl(b.getImageUrl());
        dto.setStatus(b.getStatus());

        if (b.getOpeningTime() != null)
            dto.setOpeningTime(b.getOpeningTime().toString());
        if (b.getClosingTime() != null)
            dto.setClosingTime(b.getClosingTime().toString());
        dto.setClosedWeekdays(b.getClosedWeekdays().isBlank() ? List.of()
                : Arrays.stream(b.getClosedWeekdays().split(",")).map(Integer::valueOf).toList());

        dto.setBranches(b.getBranches().stream().map(this::mapBranch).toList());
        return dto;
    }

    private BranchDTO mapBranch(Branch branch) {
        BranchDTO dto = new BranchDTO();
        dto.setId(branch.getId());
        dto.setName(branch.getName());
        dto.setAddress(branch.getAddress());
        dto.setPhone(branch.getPhone());
        dto.setBusinessId(branch.getBusiness().getId());
        return dto;
    }
}
