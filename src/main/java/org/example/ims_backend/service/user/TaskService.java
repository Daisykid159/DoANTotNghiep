package org.example.ims_backend.service.user;

import org.example.ims_backend.dto.user.task.request.CreateTaskRequest;
import org.example.ims_backend.dto.user.task.request.HandoverTaskRequest;
import org.example.ims_backend.dto.user.task.response.TaskDetailResponse;
import org.example.ims_backend.dto.user.task.response.TaskResponse;

import java.time.LocalDate;
import java.util.List;

public interface TaskService {
    List<TaskResponse> getListMuneById(Long menu_id);
    List<Object[]> searchTask(String title, Long department_id, Long user_id, LocalDate createTo, LocalDate createFrom, LocalDate expireTo, LocalDate expireFrom, int task_status, Long project_id, Boolean is_extend);
    TaskDetailResponse TaskDetail(Long task_id);
    boolean evictTask(Long task_user_id);
    boolean createTask(CreateTaskRequest createTaskRequest);
    boolean processingHandover(HandoverTaskRequest handoverTaskRequest);
    boolean updateProcessing(Long task_user_id,Integer processing);
    boolean deleteTask(Long task);
}
