package org.example.ims_backend.service.user.impl;

import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.example.ims_backend.dto.user.file.response.FileResponse;
import org.example.ims_backend.entity.File;
import org.example.ims_backend.entity.Task;
import org.example.ims_backend.entity.User;
import org.example.ims_backend.mapper.FileMapper;
import org.example.ims_backend.repository.FileRepository;
import org.example.ims_backend.repository.TaskRepository;
import org.example.ims_backend.repository.UserRepository;
import org.example.ims_backend.service.user.FileService;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import java.io.InputStream;
import java.net.MalformedURLException;
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
    TaskRepository taskRepository;
    UserRepository userRepository;
    private final Path path = Paths.get("src/main/resources/File");
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
    @Transactional
    public boolean storeFile(MultipartFile file , Long taskId) {
        String originalFilename = file.getOriginalFilename();
        if (originalFilename == null || originalFilename.isBlank()) {
            throw new RuntimeException("File name is invalid!");
        }
        System.out.println("File name: " + originalFilename);
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
            var context = SecurityContextHolder.getContext();
            String username = context.getAuthentication().getName();
            User user = userRepository.findByUsername(username).orElseThrow(() -> new RuntimeException("User not found"));
            fileRepository.save(File.builder()
                            .fileName(originalFilename)
                            .filePath(path.toString())
                            .size(file.getSize())
                            .extension(Objects.requireNonNull(file.getContentType()).split("/")[1])
                            .task(taskRepository.findById(taskId).orElseThrow(() -> new RuntimeException("Task not found")))
                            .user(user)
                    .build());
            return true;
        } catch (Exception e) {
            log.error("Error in storeFile", e);
            return false ;
        }
    }

    @Override
    public Resource downloadFile(Long id) {
        try {
            File file = fileRepository.findById(id).orElseThrow(() -> new RuntimeException("File not found"));
            Path path = Paths.get(file.getFilePath());
            Path targetLocation = path.resolve(file.getFileName());
            Resource resource = new UrlResource(targetLocation.toUri());
            if (resource.exists() || resource.isReadable()) {
                return resource;
            } else {
                throw new RuntimeException("File not found: " + file.getFileName());
            }
        }catch (MalformedURLException e){
            log.error("Error in downloadFile", e);
            throw new RuntimeException("Error in downloadFile", e);
        }

    }

}
