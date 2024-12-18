package org.example.ims_backend.service.user.impl;

import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.example.ims_backend.dto.user.file.response.FileResponse;
import org.example.ims_backend.entity.Task;
import org.example.ims_backend.mapper.FileMapper;
import org.example.ims_backend.repository.FileRepository;
import org.example.ims_backend.service.user.FileService;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

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
    public boolean deleteFile(Task task) {
        try {
            fileRepository.deleteAllByTask(task);
            return true;
        } catch (Exception e){
            log.error("Error in deleteFile", e);
            return false;
        }
    }

    @Override
    public void storeFile(MultipartFile file , Path path) {
        try {
            Path targetLocation = path.resolve(
                    Paths.get(Objects.requireNonNull(file.getOriginalFilename()))
                            .normalize()
                            .toAbsolutePath()
            );
            try (InputStream inputStream = file.getInputStream()) {
                Files.copy(inputStream, targetLocation,
                        StandardCopyOption.REPLACE_EXISTING);

            }
        } catch (Exception e){
            log.error("Error in storeFile", e);
        }

    }
}
