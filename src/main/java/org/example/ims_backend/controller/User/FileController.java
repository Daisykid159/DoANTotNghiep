package org.example.ims_backend.controller.User;

import org.example.ims_backend.service.user.FileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RequestMapping("/api/user")
@RestController
public class FileController {
    @Autowired
    private FileService fileService;
    @PostMapping("/saveFiles")
    public void saveFiles(@RequestParam("file") MultipartFile file) {
        fileService.storeFile(file);
    }
}
