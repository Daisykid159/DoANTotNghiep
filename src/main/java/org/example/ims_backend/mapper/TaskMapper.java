package org.example.ims_backend.mapper;

import org.example.ims_backend.dto.user.task.request.CreateTaskRequest;
import org.example.ims_backend.dto.user.task.response.TaskDetailResponse;
import org.example.ims_backend.dto.user.taskUser.response.TaskUserResponse;
import org.example.ims_backend.entity.Task;
import org.example.ims_backend.entity.TaskUser;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface TaskMapper {
    default
    TaskDetailResponse toTaskDetailResponse(TaskUser taskUser){
        return TaskDetailResponse.builder()
                .task_id(taskUser.getTask().getId())
                .task_user_id(taskUser.getId())
                .status(taskUser.getTask().getStatus())
                .state(taskUser.getTask().getState())
                .can_edit(taskUser.getTask().getStatus() != 3)
                .role(taskUser.getRole())
                .title(taskUser.getTask().getTitle())
                .assign_department_id(taskUser.getTask().getAssignDepartment().getId())
                .assign_department_name(taskUser.getTask().getAssignDepartment().getDepartmentName())
                .assign_user_id(taskUser.getTask().getAssignUser().getId())
                .assign_user_name(taskUser.getTask().getAssignUser().getFullName())
                .target_department_id(taskUser.getTask().getTargetDepartment().getId())
                .target_department_name(taskUser.getTask().getTargetDepartment().getDepartmentName())
                .target_user_id(taskUser.getTask().getTargetUser().getId())
                .target_user_name(taskUser.getTask().getTargetUser().getFullName())
                .content(taskUser.getTask().getContent())
                .progress(taskUser.getTask().getProgress())
                .priority(taskUser.getTask().getPriority())
                .expired_date(taskUser.getTask().getExpiredDate())
                .completed_date(taskUser.getTask().getCompletedDate())
                .deleted_date(taskUser.getTask().getDeletedDate())
                .created_date(taskUser.getTask().getCreatedDate())
                .can_finished(taskUser.getTask().getStatus() == 3)
                .project_id(taskUser.getTask().getProject().getId())
                .project_name(taskUser.getTask().getProject().getName())
                .build();
    }
}
