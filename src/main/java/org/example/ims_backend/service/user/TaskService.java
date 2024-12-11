package org.example.ims_backend.service.user;

import org.example.ims_backend.dto.user.task.request.CreateTaskRequest;
import org.example.ims_backend.dto.user.task.request.HandoverTaskRequest;
import org.example.ims_backend.dto.user.task.response.TaskResponse;

import java.time.LocalDate;
import java.util.List;

public interface TaskService {
    List<TaskResponse> getListMuneById(Long user_id, Long menu_id);
    List<Object[]> searchTask(String titleCodeDepart, Integer userId, Integer status, String department,
                            Integer projectId, LocalDate createFrom, LocalDate createTo, LocalDate endFrom, LocalDate endTo,
                            Boolean isExtend, Integer userCurrentId);
    TaskResponse TaskDetail(Long task_user_id);
    boolean evictTask(Long task_user_id);
    boolean createTask(CreateTaskRequest createTaskRequest);
    boolean processingHandover(HandoverTaskRequest handoverTaskRequest);
}
