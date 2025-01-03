package org.example.ims_backend.service.user;

import org.example.ims_backend.dto.user.task.request.CreateTaskRequest;
import org.example.ims_backend.dto.user.task.request.HandoverTaskRequest;
import org.example.ims_backend.dto.user.task.response.TaskDetailResponse;
import org.example.ims_backend.dto.user.task.response.TaskResponse;
import org.example.ims_backend.dto.user.task.response.TaskSearchResponse;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

public interface TaskService {
    List<TaskResponse> getListMuneById(Long menu_id);
    List<TaskSearchResponse> searchTask(String title, Long department_id, Long user_id, Date createTo, Date createFrom, Date expireTo, Date expireFrom, Integer task_status, Integer priority);
    TaskDetailResponse TaskDetail(Long task_id);
    boolean evictTask(Long task_user_id);
    boolean createTask(CreateTaskRequest createTaskRequest);
    boolean processingHandover(HandoverTaskRequest handoverTaskRequest);
    boolean updateProcessing(Long task_user_id,Integer processing);
    boolean deleteTask(Long task);
    boolean returnTask(Long task_id , String content);
}
