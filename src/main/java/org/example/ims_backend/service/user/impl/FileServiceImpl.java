package org.example.ims_backend.service.user.impl;

import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.example.ims_backend.dto.user.file.response.FileResponse;
import org.example.ims_backend.entity.Task;
import org.example.ims_backend.mapper.FileMapper;
import org.example.ims_backend.repository.FileRepository;
import org.example.ims_backend.service.user.FileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.Objects;

@RequiredArgsConstructor
@Slf4j
@Service
@FieldDefaults(makeFinal = true, level = lombok.AccessLevel.PRIVATE)
public class FileServiceImpl implements FileService {
    FileRepository fileRepository;
     FileMapper fileMapper;



    @Override
    public List<FileResponse> getFiles(Task task) {
        return fileRepository.findAllByTask(task).stream().map(fileMapper::toFileResponse).toList();
    }

    @Override
    public void deleteFile(Task task) {
        try {
            fileRepository.deleteAllByTask(task);
        } catch (Exception e){
            log.error("Error in deleteFile", e);
        }
    }

    @Override
    public void storeFile(MultipartFile file) {
        String originalFilename = file.getOriginalFilename();
        if (originalFilename == null || originalFilename.isBlank()) {
            throw new RuntimeException("File name is invalid!");
        }
        Path path = Paths.get("src/main/resources/File");

        Path targetLocation = path.resolve(originalFilename);
        System.out.println("Directory path: " + targetLocation.toAbsolutePath());
        try {
            if (Files.exists(targetLocation)) {
                throw new RuntimeException("File already exists: " + targetLocation);
            }
            try (InputStream inputStream = file.getInputStream()) {
                Files.copy(inputStream, targetLocation, StandardCopyOption.REPLACE_EXISTING);
                log.info("File stored at: {}", targetLocation.toAbsolutePath());
            }
        } catch (Exception e) {
            log.error("Error in storeFile", e);
            throw new RuntimeException("Error storing file: " + originalFilename, e);
        }
    }

}
