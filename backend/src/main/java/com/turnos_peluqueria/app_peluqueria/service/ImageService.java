package com.turnos_peluqueria.app_peluqueria.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Map;
import java.util.UUID;

// Sube imágenes a Cloudinary si está configurado (CLOUDINARY_URL); si no, las guarda en la carpeta local "uploads"
@Service
public class ImageService {

    // Solo formatos de foto: SVG queda afuera porque puede llevar JavaScript
    private static final Map<String, String> EXTENSIONS = Map.of(
            "image/jpeg", "jpg", "image/png", "png", "image/webp", "webp");

    private final Cloudinary cloudinary;
    private final Path uploadDir;
    private final String publicUrl;

    public ImageService(@Value("${cloudinary.url:}") String cloudinaryUrl,
            @Value("${app.upload-dir:uploads}") String uploadDir,
            @Value("${app.public-url:http://localhost:8080}") String publicUrl) {
        this.cloudinary = cloudinaryUrl.isBlank() ? null : new Cloudinary(cloudinaryUrl);
        this.uploadDir = Path.of(uploadDir).toAbsolutePath();
        this.publicUrl = publicUrl;
    }

    public String uploadImage(MultipartFile file) throws IOException {
        String extension = EXTENSIONS.get(file.getContentType());
        if (extension == null) {
            throw new IllegalArgumentException("Formato no permitido. Subí una imagen JPG, PNG o WEBP.");
        }
        if (cloudinary != null) {
            Map<?, ?> result = cloudinary.uploader().upload(file.getBytes(), ObjectUtils.asMap("resource_type", "image"));
            return result.get("secure_url").toString();
        }
        // ponytail: disco local; si el hosting no tiene disco persistente se pierden, ahí usar Cloudinary
        Files.createDirectories(uploadDir);
        String name = UUID.randomUUID() + "." + extension;
        file.transferTo(uploadDir.resolve(name));
        return publicUrl + "/uploads/" + name;
    }

    public Path getUploadDir() {
        return uploadDir;
    }
}
