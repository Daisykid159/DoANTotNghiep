package org.example.ims_backend.controller.User;

import org.example.ims_backend.dto.user.task.request.CreateTaskRequest;
import org.example.ims_backend.dto.user.task.request.HandoverTaskRequest;
import org.example.ims_backend.dto.user.task.response.TaskDetailResponse;
import org.example.ims_backend.dto.user.task.response.TaskResponse;
import org.example.ims_backend.service.user.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import  java.util.*;
@RestController
@RequestMapping("/api/user")
public class TaskController {
    @Autowired
    private TaskService taskService;
    @GetMapping("/getListMenuById")
    public List<TaskResponse> getListMuneById(@RequestParam Long menu_id) {
        return taskService.getListMuneById(menu_id);
    }
    @GetMapping("/TaskDetail")
    public TaskDetailResponse TaskDetail(@RequestParam Long task_id) {
        return taskService.TaskDetail(task_id);
    }
    @GetMapping("/searchTask")
    public List<Object[]> searchTask(
            @RequestParam (required = false) String title,
            @RequestParam (required = false) Long department_id,
            @RequestParam (required = false) Long user_id,
            @RequestParam (required = false) LocalDate createTo,
            @RequestParam (required = false) LocalDate createFrom,
            @RequestParam (required = false) LocalDate expireTo,
            @RequestParam (required = false) LocalDate expireFrom,
            @RequestParam (required = false) int task_status,
            @RequestParam (required = false) Long project_id,
            @RequestParam (required = false) Boolean is_extend
            ) {
        return taskService.searchTask(title, department_id, user_id, createTo, createFrom, expireTo, expireFrom, task_status, project_id, is_extend);
    }
    @PutMapping("/evictTask")
    public boolean evictTask(@RequestParam Long task_id) {
        return taskService.evictTask(task_id);
    }
    @PostMapping("/createTask")
    public boolean createTask(@RequestBody CreateTaskRequest createTaskRequest) {
        return taskService.createTask(createTaskRequest);
    }
    @PutMapping("/processingHandover")
    public boolean processingHandover(@RequestBody HandoverTaskRequest handoverTaskRequest) {
        return taskService.processingHandover(handoverTaskRequest);
    }
    @PutMapping("/updateProcessing")
    public boolean updateProcessing(@RequestParam Long task_user_id,
                                    @RequestParam Integer processing) {
        return taskService.updateProcessing(task_user_id, processing);
    }
    @DeleteMapping("/deleteTask")
    public boolean deleteTask(@RequestParam Long task) {
        return taskService.deleteTask(task);
    }
}
