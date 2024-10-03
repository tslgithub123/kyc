package com.tsl.kyc.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.tsl.kyc.service.TransmissionService;


@RestController
@RequestMapping("/api")
public class TransmissionController {
	
//	 private final TransmissionService fileStorageService;
//
//	    
//	    public TransmissionController(TransmissionService fileStorageService) {
//	        this.fileStorageService = fileStorageService;
//	    }
//
//		@PostMapping("/upload")
//		public ResponseEntity<String> uploadFile(@RequestParam("file") MultipartFile file) {
//		    System.out.println("File name: " + file.getOriginalFilename()); // Log the original file name
//		    String fileName = fileStorageService.storeFile(file);
//		    return ResponseEntity.ok("File uploaded successfully: " + fileName);
//		}
//	
//	
////	@Autowired
////    private TransmissionService transmissionService;
////
////    @PostMapping("/upload")
////    public ResponseEntity<String> uploadFile(@RequestParam("file") MultipartFile file) {
////        try {
////            transmissionService.uploadFile(file);
////            return ResponseEntity.ok("File uploaded successfully: " + file.getOriginalFilename());
////        } catch (IOException e) {
////            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
////                    .body("Failed to upload file: " + e.getMessage());
////        }
////    }
//
//	
//	
//	
//	
////    @GetMapping("/download/{filename}")
////    public ResponseEntity<Resource> downloadFile(@PathVariable String filename) {
////        File file = transmissionService.downloadFile(filename);
////        if (!file.exists()) {
////            return ResponseEntity.notFound().build();
////        }
////
////        Resource resource = (Resource) new FileSystemResource(file);
////        return ResponseEntity.ok()
////                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + file.getName() + "\"")
////                .body(resource);
////    }
//	
}
