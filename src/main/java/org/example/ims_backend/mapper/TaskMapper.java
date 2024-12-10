package org.example.ims_backend.mapper;

import org.example.ims_backend.dto.user.task.request.CreateTaskRequest;
import org.example.ims_backend.dto.user.task.response.TaskDetailResponse;
import org.example.ims_backend.entity.Task;
import org.example.ims_backend.entity.TaskUser;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface TaskMapper {
    default
    TaskDetailResponse toTaskDetailResponse(TaskUser taskUser){
        TaskDetailResponse taskDetailResponse = new TaskDetailResponse();
        taskDetailResponse.setTask_id(taskUser.getTask().getId());
        taskDetailResponse.setTask_user_id(taskUser.getId());
        taskDetailResponse.setStatus(taskUser.getTask().getStatus());
        taskDetailResponse.setState(taskUser.getTask().getState());
        taskDetailResponse.setRole(taskUser.getRole());
        taskDetailResponse.setTitle(taskUser.getTask().getTitle());
        taskDetailResponse.setContent(taskUser.getTask().getContent());
        taskDetailResponse.setAssign_department_id(taskUser.getTask().getAssignDepartment().getId());
        taskDetailResponse.setAssign_department_name(taskUser.getTask().getAssignDepartment().getDepartmentName());
        taskDetailResponse.setAssign_user_id(taskUser.getTask().getAssignUser().getId());
        taskDetailResponse.setAssign_user_name(taskUser.getTask().getAssignUser().getFullName());
        taskDetailResponse.setTarget_department_id(taskUser.getTask().getTargetDepartment().getId());
        taskDetailResponse.setTarget_department_name(taskUser.getTask().getTargetDepartment().getDepartmentName());
        taskDetailResponse.setTarget_user_id(taskUser.getTask().getTargetUser().getId());
        taskDetailResponse.setTarget_user_name(taskUser.getTask().getTargetUser().getFullName());
        taskDetailResponse.setCreate_user_id(taskUser.getUser().getId());
        taskDetailResponse.setCreate_user_name(taskUser.getUser().getFullName());
        taskDetailResponse.setPriority(taskUser.getTask().getPriority());
        taskDetailResponse.setExpired_date(taskUser.getTask().getExpiredDate());
        taskDetailResponse.setCreated_date(taskUser.getTask().getCreatedDate());
        taskDetailResponse.setCompleted_date(taskUser.getTask().getCompletedDate());
        taskDetailResponse.setDeleted_date(taskUser.getTask().getDeletedDate());

        return taskDetailResponse;
    }
}
