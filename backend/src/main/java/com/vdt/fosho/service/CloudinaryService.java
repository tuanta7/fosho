package com.vdt.fosho.service;

import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.Map;



public interface CloudinaryService {

    Map upload(MultipartFile multipartFile) throws IOException;

    // Delete image from Cloudinary
    Map delete(String id) throws IOException;

    // Convert MultipartFile to File
    File convert(MultipartFile multipartFile) throws IOException;
}
