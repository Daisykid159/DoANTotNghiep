package org.example.ims_backend.service.user.impl;

import jakarta.persistence.EntityManager;
import jakarta.persistence.Query;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.example.ims_backend.dto.user.task.request.CreateTaskRequest;
import org.example.ims_backend.dto.user.task.response.TaskResponse;
import org.example.ims_backend.dto.user.taskUser.request.CreateTaskUserRequest;
import org.example.ims_backend.entity.*;
import org.example.ims_backend.mapper.TaskMapper;
import org.example.ims_backend.repository.*;
import org.example.ims_backend.service.user.TaskService;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@RequiredArgsConstructor
@Slf4j
@Service
@FieldDefaults(makeFinal = true, level = lombok.AccessLevel.PRIVATE)
public class TaskServiceImpl implements TaskService {
    TaskRepository taskRepository;
    MenuRepository menuRepository;
    EntityManager entityManager;
    TaskUserRepository taskUserRepository;
    UserRepository userRepository;
    DepartmentRepository departmentRepository;
    TaskMapper taskMapper;
    ProjectRepository projectRepository;
    @Override
    public List<TaskResponse> getListMuneById(Long user_id, Long menu_id) {
        List<TaskResponse> taskResponses = new ArrayList<>();
        Menu menu = menuRepository.findById(menu_id).orElse(null);
        String query = menu.getQuery();
        Query qery = entityManager.createQuery(query);
        qery.setParameter("userId", user_id);
        List results = qery.getResultList();
        for(Object result : results){
            Object[] resultArray = (Object[]) result;
            Department assign_department = (Department) resultArray[13];
            User assign_user = (User) resultArray[14];
            Department target_department = (Department) resultArray[15];
            User target_user = (User) resultArray[16];
            TaskResponse taskResponse = TaskResponse.builder()
                    .task_id((Long) resultArray[0])
                    .tu_id((Long) resultArray[1])
                    .role((int) resultArray[2])
                    .status((int) resultArray[4])
                    .state((int) resultArray[5])
                    .title((String) resultArray[6])
                    .priority((int) resultArray[7])
                    .created_date((LocalDate) resultArray[9])
                    .expired_date((LocalDate) resultArray[8])
                    .completed_date((LocalDate) resultArray[12])
                    .assign_department(assign_department.getDepartmentName())
                    .assign_user_name(assign_user.getFullName())
                    .assign_user_id(assign_user.getId())
                    .target_department(target_department.getDepartmentName())
                    .target_user_name(target_user.getFullName())
                    .target_user_id(target_user.getId())
                    .has_read(taskUserRepository.findByUserAndTask(userRepository.findById(user_id).orElse(null),taskRepository.findById((Long) resultArray[0]).orElse(null)).getHasRead())
                    .updated_date(taskUserRepository.findByUserAndTask(userRepository.findById(user_id).orElse(null),taskRepository.findById((Long) resultArray[0]).orElse(null)).getUpdatedDate())
                    .build();
            taskResponses.add(taskResponse);
        }
        return taskResponses;
    }

    @Override
    public List<Object[]> searchTask(String titleCodeDepart, Integer userId, Integer status, String department, Integer projectId, LocalDate createFrom, LocalDate createTo, LocalDate endFrom, LocalDate endTo, Boolean isExtend, Integer userCurrentId) {
        return taskRepository.searchTasks(titleCodeDepart, userId, status, department, projectId, createFrom, createTo, endFrom, endTo, isExtend, userCurrentId);
    }

    @Override
    public TaskResponse TaskDetail(Long task_user_id) {
        TaskUser taskUser = taskUserRepository.findById(task_user_id).orElse(null);
        TaskResponse taskResponse = new TaskResponse();
        return taskResponse;
    }

    @Override
    public boolean evictTask(Long task_user_id) {
            try {
                TaskUser taskUser = taskUserRepository.findById(task_user_id).orElse(null);
                assert taskUser != null;
                if(taskUser.getHasRead() == 1){
                    log.error("Task not evict");
                    return false;
                }
                Task task = taskUser.getTask();
                task.setStatus(4);
                return true;
            } catch (Exception e){
                log.error("Error while evicting task with id: {}", task_user_id, e);
                return false;
            }
    }

    @Override
    public boolean createTask(CreateTaskRequest createTaskRequest) {
        try {
            Task task = Task.builder()
                    .title(createTaskRequest.getTitle())
                    .content(createTaskRequest.getContent())
                    .priority(createTaskRequest.getPriority())
                    .createdDate(createTaskRequest.getCreated_date())
                    .expiredDate(createTaskRequest.getExpired_date())
                    .state(0)
                    .status(0)
                    .assignDepartment(departmentRepository.findById(createTaskRequest.getAssign_department()).orElse(null))
                    .assignUser(userRepository.findById(createTaskRequest.getAssign_user()).orElse(null))
                    .TargetDepartment(departmentRepository.findById(createTaskRequest.getTarget_department()).orElse(null))
                    .TargetUser(userRepository.findById(createTaskRequest.getTarget_user()).orElse(null))
                    .project(projectRepository.findById(createTaskRequest.getProject_id()).orElse(null))
                    .build();
            Task result = taskRepository.save(task);
            for(CreateTaskUserRequest createTaskUserRequest : createTaskRequest.getCombinations()){
                TaskUser taskUser = TaskUser.builder()
                        .createdDate(createTaskUserRequest.getCreated_date())
                        .role(2)
                        .task(result)
                        .user(userRepository.findById(createTaskUserRequest.getCombination_user()).orElse(null))
                        .department(departmentRepository.findById(createTaskUserRequest.getCombination_department()).orElse(null))
                        .hasRead(0)
                        .build();
                taskUserRepository.save(taskUser);
            }
            taskUserRepository.save(TaskUser.builder()
                            .createdDate(createTaskRequest.getCreated_date())
                            .hasRead(0)
                            .role(0)
                            .department(departmentRepository.findById(createTaskRequest.getAssign_department()).orElse(null))
                            .user(userRepository.findById(createTaskRequest.getAssign_user()).orElse(null))
                            .task(result)
                    .build());
            taskUserRepository.save(TaskUser.builder()
                    .createdDate(createTaskRequest.getCreated_date())
                    .hasRead(0)
                    .role(1)
                    .department(departmentRepository.findById(createTaskRequest.getTarget_department()).orElse(null))
                    .user(userRepository.findById(createTaskRequest.getTarget_user()).orElse(null))
                    .task(result)
                    .build());
            return true;
        }catch (Exception e){
            log.error("Error while creating task", e);
            return false;
        }


    }
}
