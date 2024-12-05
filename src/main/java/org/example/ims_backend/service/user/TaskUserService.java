package org.example.ims_backend.service.user;

import org.example.ims_backend.dto.user.task.response.TaskResponse;

import java.util.List;

public interface TaskUserService {
    List<TaskResponse> getListMuneById(Long user_id, Long menu_id);
}
