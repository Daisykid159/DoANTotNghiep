package org.example.ims_backend.service.user;

import org.example.ims_backend.dto.user.file.response.FileResponse;
import org.example.ims_backend.entity.Task;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Path;
import java.util.List;

public interface FileService {
    List<FileResponse> getFiles(Task task);
    boolean deleteFile(Task task);
    void storeFile(MultipartFile file , Path path);
}
