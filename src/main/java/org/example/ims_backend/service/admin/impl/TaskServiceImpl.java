package org.example.ims_backend.service.admin.impl;

import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.example.ims_backend.dto.admin.taskDTO.request.TaskRequest;
import org.example.ims_backend.dto.admin.taskDTO.response.TaskResponse;
import org.example.ims_backend.entity.Department;
import org.example.ims_backend.entity.Task;
import org.example.ims_backend.entity.User;
import org.example.ims_backend.repository.DepartmentRepository;
import org.example.ims_backend.repository.TaskRepository;
import org.example.ims_backend.repository.UserRepository;
import org.example.ims_backend.service.admin.TaskService;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@FieldDefaults(makeFinal = true, level = lombok.AccessLevel.PRIVATE)
@Service
@Slf4j
public class TaskServiceImpl implements TaskService {
    TaskRepository taskRepository;
    DepartmentRepository departmentRepository;
    UserRepository userRepository;
    @Override
    public TaskResponse getTaskDetail(Long id) {
        Task task = taskRepository.findById(id).orElse(null);
        assert task != null;
        return TaskResponse.builder()
                .task_id(task.getId())
                .task_title(task.getTitle())
                .created_date(task.getCreatedDate())
                .expired_date(task.getExpiredDate())
                .status(task.getStatus())
                .department_id(task.getTargetDepartment().getId())
                .assign_user_id(task.getAssignUser().getId())
                .targer_user_id(task.getTargetUser().getId())
                .department_name(task.getTargetDepartment().getDepartmentName())
                .assign_user_name(task.getAssignUser().getFullName())
                .target_user_name(task.getTargetUser().getFullName())
                .build();
    }

    @Override
    public boolean updateTask(TaskRequest request) {
        try {
            Task task = taskRepository.findById(request.getTask_id()).orElse(null);
            if (task == null) {
                return false;
            }
            Department department = departmentRepository.findById(request.getDepartment_id()).orElse(null);
            User assignUser = userRepository.findById(request.getAssign_user_id()).orElse(null);
            User targetUser = userRepository.findById(request.getTarger_user_id()).orElse(null);
            task.setTitle(request.getTask_title());
            task.setCreatedDate(request.getCreated_date());
            task.setExpiredDate(request.getExpired_date());
            task.setStatus(request.getStatus());
            task.setTargetDepartment(department);
            task.setAssignUser(assignUser);
            task.setTargetUser(targetUser);
            taskRepository.save(task);
            return true;
        }catch (Exception e){
            log.error("Error: ", e);
            return false;
        }
    }

}
