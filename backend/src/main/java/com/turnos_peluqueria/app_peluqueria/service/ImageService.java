package com.turnos_peluqueria.app_peluqueria.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.util.Map;

@Service
public class ImageService {
    private final Cloudinary cloudinary = new Cloudinary(ObjectUtils.asMap(
            "cloud_name", "TU_CLOUD_NAME",
            "api_key", "TU_API_KEY",
            "api_secret", "TU_API_SECRET"));

    public String uploadImage(MultipartFile file) throws Exception {
        Map uploadResult = cloudinary.uploader().upload(file.getBytes(), ObjectUtils.emptyMap());
        return uploadResult.get("url").toString(); // Esta es la URL que guardarás en tu DB
    }
}