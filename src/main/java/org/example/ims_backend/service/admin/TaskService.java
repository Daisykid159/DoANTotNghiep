package org.example.ims_backend.service.admin;

import org.example.ims_backend.dto.admin.taskDTO.request.TaskRequest;
import org.example.ims_backend.dto.admin.taskDTO.response.TaskResponse;

public interface TaskService {
    TaskResponse getTaskDetail(Long id);
    boolean updateTask(TaskRequest request);
}
