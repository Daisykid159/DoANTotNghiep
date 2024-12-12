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

import java.util.List;

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
}
