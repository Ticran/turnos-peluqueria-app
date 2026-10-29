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
            @Value("${app.public-url:}") String publicUrl) {
        this.cloudinary = cloudinaryUrl.isBlank() ? null : new Cloudinary(cloudinaryUrl);
        this.uploadDir = Path.of(uploadDir).toAbsolutePath();
        this.publicUrl = publicUrl.endsWith("/") ? publicUrl.substring(0, publicUrl.length() - 1) : publicUrl;
    }

    public String uploadImage(MultipartFile file) throws IOException {
        String extension = EXTENSIONS.get(file.getContentType());
        // El Content-Type lo manda el navegador (falsificable): se confirma mirando los primeros bytes del archivo
        if (extension == null || !extension.equals(sniff(file.getBytes()))) {
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

    // Firma de cada formato: JPG FF D8 FF · PNG 89 50 4E 47 · WEBP "RIFF" ???? "WEBP"
    static String sniff(byte[] b) {
        if (b.length >= 3 && (b[0] & 0xFF) == 0xFF && (b[1] & 0xFF) == 0xD8 && (b[2] & 0xFF) == 0xFF) return "jpg";
        if (b.length >= 4 && (b[0] & 0xFF) == 0x89 && b[1] == 'P' && b[2] == 'N' && b[3] == 'G') return "png";
        if (b.length >= 12 && b[0] == 'R' && b[1] == 'I' && b[2] == 'F' && b[3] == 'F'
                && b[8] == 'W' && b[9] == 'E' && b[10] == 'B' && b[11] == 'P') return "webp";
        return null;
    }

    public Path getUploadDir() {
        return uploadDir;
    }
}
