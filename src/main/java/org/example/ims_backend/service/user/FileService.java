package org.example.ims_backend.service.user;

import org.example.ims_backend.dto.user.file.response.FileResponse;
import org.example.ims_backend.entity.Task;

import java.util.List;

public interface FileService {
    List<FileResponse> getFiles(Task task);
    boolean deleteFile(Task task);
}
