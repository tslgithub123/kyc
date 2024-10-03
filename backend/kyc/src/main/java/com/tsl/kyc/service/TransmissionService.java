package com.tsl.kyc.service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class TransmissionService {
	
//	private final Path fileStorageLocation = Paths.get("uploads").toAbsolutePath().normalize();
//
//    public TransmissionService() {
//        try {
//            Files.createDirectories(this.fileStorageLocation);
//        } catch (Exception ex) {
//            throw new RuntimeException("Could not create the directory where the uploaded files will be stored.", ex);
//        }
//    }
//
//    public String storeFile(MultipartFile file) {
//        String fileName = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();
//
//        try {
//            Path targetLocation = this.fileStorageLocation.resolve(fileName);
//            Files.copy(file.getInputStream(), targetLocation);
//
//            return fileName;
//        } catch (IOException ex) {
//            throw new RuntimeException("Could not store file " + fileName + ". Please try again!", ex);
//        }
//    }
// 
//
////	  private final String uploadDir = "kyc_document/";
////    public void uploadFile(MultipartFile file) throws IOException {
////        if (!file.isEmpty()) {
////            Path path = Paths.get(uploadDir + file.getOriginalFilename());
////            Files.createDirectories(path.getParent());
////            Files.write(path, file.getBytes());
////        }
////    }
//
////    public File downloadFile(String filename) {
////        return new File(uploadDir + filename);
////    }

}
