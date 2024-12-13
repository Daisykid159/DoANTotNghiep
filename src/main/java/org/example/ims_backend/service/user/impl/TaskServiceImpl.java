package org.example.ims_backend.service.user.impl;

import jakarta.persistence.EntityManager;
import jakarta.persistence.Query;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.example.ims_backend.dto.user.task.request.CreateTaskRequest;
import org.example.ims_backend.dto.user.task.request.HandoverTaskRequest;
import org.example.ims_backend.dto.user.task.response.TaskDetailResponse;
import org.example.ims_backend.dto.user.task.response.TaskResponse;
import org.example.ims_backend.dto.user.taskUser.request.CreateTaskUserRequest;
import org.example.ims_backend.dto.user.taskUser.request.TaskUserRequest;
import org.example.ims_backend.entity.*;
import org.example.ims_backend.mapper.TaskMapper;
import org.example.ims_backend.mapper.TaskUserMapper;
import org.example.ims_backend.repository.*;
import org.example.ims_backend.service.user.*;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
    ProjectRepository projectRepository;
    HistoryService historyService;
    FileService fileService;
    TaskMapper taskMapper;
    TaskUserMapper taskUserMapper;
    CommentService commentService;
    ReportService reportService;
    NotificationService notificationService;
    @Override
    public List<TaskResponse> getListMuneById( Long menu_id) {
        List<TaskResponse> taskResponses = new ArrayList<>();
        Menu menu = menuRepository.findById(menu_id).orElse(null);
        String query = menu.getQuery();
        var context = SecurityContextHolder.getContext();
        User user = userRepository.findByUsername(context.getAuthentication().getName()).orElseThrow(() -> new RuntimeException("User not found"));
        Long user_id = user.getId();
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
                    .created_date((Date) resultArray[9])
                    .expired_date((Date) resultArray[8])
                    .completed_date((Date) resultArray[12])
                    .assign_department(assign_department.getDepartmentName())
                    .assign_user_name(assign_user.getFullName())
                    .assign_user_id(assign_user.getId())
                    .target_department(target_department.getDepartmentName())
                    .target_user_name(target_user.getFullName())
                    .target_user_id(target_user.getId())
                    .progress(taskRepository.findById((Long) resultArray[0]).orElseThrow(() -> new RuntimeException("Task not found")).getProgress())
                    .has_read(taskUserRepository.findByUserAndTask(userRepository.findById(user_id).orElse(null),taskRepository.findById((Long) resultArray[0]).orElse(null)).getHasRead())
                    .updated_date(taskUserRepository.findByUserAndTask(userRepository.findById(user_id).orElse(null),taskRepository.findById((Long) resultArray[0]).orElse(null)).getUpdatedDate())
                    .build();
            taskResponses.add(taskResponse);
        }
        return taskResponses;
    }

    @Override
    public List<Object[]> searchTask(String title, Long department_id, Long user_id, LocalDate createTo, LocalDate createFrom, LocalDate expireTo, LocalDate expireFrom, int task_status, Long project_id, Boolean is_extend) {
        return null;
    }

    @Override
    public TaskDetailResponse TaskDetail(Long task_user_id) {
        TaskUser taskUser = taskUserRepository.findById(task_user_id).orElseThrow(()-> new RuntimeException("false"));
        TaskDetailResponse taskDetail = taskMapper.toTaskDetailResponse(taskUser);
        taskDetail.setCombinations(taskUserRepository.findByTaskAndRole(taskUser.getTask(),2).stream().map(taskUserMapper::toTaskUserResponse).toList());
        taskDetail.setFiles(fileService.getFiles(taskUser.getTask()));
        taskDetail.setReports(reportService.getReportList(taskUser.getTask()));
        taskDetail.setComments(commentService.getComments(taskUser.getTask()));
        taskDetail.setHistory(historyService.getHistoryList(taskUser.getTask()));


        return taskDetail;
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
            var context = SecurityContextHolder.getContext();
            User user = userRepository.findByUsername(context.getAuthentication().getName()).orElseThrow(() -> new RuntimeException("User not found"));
            historyService.addHistory(user, userRepository.findById(createTaskRequest.getTarget_user()).orElseThrow(() -> new RuntimeException("User not found")), result, createTaskRequest.getContent(), 0);
            return true;
        }catch (Exception e){
            log.error("Error while creating task", e);
            return false;
        }


    }

    @Override
    @Transactional
    public boolean processingHandover(HandoverTaskRequest handoverTaskRequest) {
        try {
            Task task = taskRepository.findById(handoverTaskRequest.getTask_id()).orElseThrow(() -> new RuntimeException("Task not found"));
            User targetUser = userRepository.findById(handoverTaskRequest.getTarget_user_id()).orElseThrow(() -> new RuntimeException("User not found"));
            Department targetDepartment = departmentRepository.findById(handoverTaskRequest.getTarget_department_id()).orElseThrow(() -> new RuntimeException("Department not found"));
            var context = SecurityContextHolder.getContext();
            User user = userRepository.findByUsername(context.getAuthentication().getName()).orElseThrow(() -> new RuntimeException("User not found"));

            if(task.getTargetUser().getId() != handoverTaskRequest.getTarget_user_id()){
                if(!taskUserRepository.existsByTaskAndUserAndDepartment(
                        task,
                        targetUser,
                        targetDepartment
                        )){
                    taskUserRepository.save(
                            TaskUser.builder()
                                    .createdDate(new Date())
                                    .role(1)
                                    .task(task)
                                    .user(targetUser)
                                    .department(targetDepartment)
                                    .hasRead(0)
                                    .build());
                }else {
                    TaskUser taskUser = taskUserRepository.findByUserAndTaskAndDepartment(targetUser, task, targetDepartment);
                    taskUser.setRole(1);
                    taskUser.setUpdatedDate(new Date());
                    taskUserRepository.save(taskUser);

                }
                TaskUser taskUser = taskUserRepository.findByUserAndTaskAndDepartment(task.getTargetUser(), task,task.getTargetDepartment());
                taskUser.setRole(3);
                taskUser.setUpdatedDate(new Date());
                taskUserRepository.save(taskUser);
                historyService.addHistory(user, targetUser, task, handoverTaskRequest.getContent(), 1);
                task.setTargetUser(targetUser);
                task.setTargetDepartment(targetDepartment);
                taskRepository.save(task);
            }


            for(TaskUserRequest taskUserRequest : handoverTaskRequest.getCombinations()){
                    TaskUser taskUser = TaskUser.builder()
                            .createdDate(new Date())
                            .role(2)
                            .task(task)
                            .user(userRepository.findById(taskUserRequest.getCombination_id()).orElseThrow(() -> new RuntimeException("User not found"))
                            )
                            .department(departmentRepository.findById(taskUserRequest.getDepartment_id()).orElseThrow(() -> new RuntimeException("Department not found")))
                            .hasRead(0)
                            .build();
                    taskUserRepository.save(taskUser);
                    historyService.addHistory(user, userRepository.findById(taskUserRequest.getCombination_id()).orElseThrow(() -> new RuntimeException("User not found")), task, handoverTaskRequest.getContent(), 2);
            }
            return true;
        }catch (Exception e){
            log.error("Error while processing handover", e);
            return false;
        }
    }

    @Override
    public boolean updateProcessing(Long task_user_id,Integer progress) {
        try{
            Task task = taskUserRepository.findById(task_user_id).orElseThrow(() -> new RuntimeException("Task not found")).getTask();
            task.setProgress(progress);
            taskRepository.save(task);
            return true;
        }catch (Exception e){
            log.error("Error while updating processing", e);
            return false;
        }
    }

    @Override
    @Transactional
    public boolean deleteTask(Long task_id) {
        try {
            if(!taskRepository.existsByIdAndStatus(task_id, 4)){
                log.error("Task not delete");
                return false;
            }
            Task task = taskRepository.findById(task_id).orElseThrow(() -> new RuntimeException("Task not found"));
            taskUserRepository.deleteAllByTask(task);
            notificationService.deleteNotification(task);
            commentService.deleteComment(task);
            reportService.deleteReport(task);
            fileService.deleteFile(task);
            historyService.deleteHistory(task);
            taskRepository.delete(task);
         return true;
        }catch (Exception e){
            log.error("Error while deleting task", e);
            return false;
        }
    }
}
