package org.example.ims_backend.controller.User;

import org.example.ims_backend.dto.user.task.request.CreateTaskRequest;
import org.example.ims_backend.dto.user.task.request.HandoverTaskRequest;
import org.example.ims_backend.dto.user.task.response.TaskResponse;
import org.example.ims_backend.service.user.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import  java.util.*;
@RestController
@RequestMapping("/api/user")
public class TaskController {
    @Autowired
    private TaskService taskService;
    @GetMapping("/getListMenuById")
    public List<TaskResponse> getListMuneById(@RequestParam Long user_id,
                                              @RequestParam Long menu_id) {
        return taskService.getListMuneById(user_id, menu_id);
    }
    @GetMapping("/TaskDetail")
    public TaskResponse TaskDetail(@RequestParam Long task_user_id) {
        return taskService.TaskDetail(task_user_id);
    }
    @GetMapping("/searchTask")
    public List<Object[]> searchTask(@RequestParam String titleCodeDepart,
                                     @RequestParam Integer userId,
                                     @RequestParam Integer status,
                                     @RequestParam String department,
                                     @RequestParam Integer projectId,
                                     @RequestParam LocalDate createFrom,
                                     @RequestParam LocalDate createTo,
                                     @RequestParam LocalDate endFrom,
                                     @RequestParam LocalDate endTo,
                                     @RequestParam Boolean isExtend,
                                     @RequestParam Integer userCurrentId) {
        return taskService.searchTask(titleCodeDepart, userId, status, department, projectId, createFrom, createTo, endFrom, endTo, isExtend, userCurrentId);
    }
    @PutMapping("/evictTask")
    public boolean evictTask(@RequestParam Long task_user_id) {
        return taskService.evictTask(task_user_id);
    }
    @PostMapping("/createTask")
    public boolean createTask(@RequestBody CreateTaskRequest createTaskRequest) {
        return taskService.createTask(createTaskRequest);
    }
    @PutMapping("/processingHandover")
    public boolean processingHandover(@RequestBody HandoverTaskRequest handoverTaskRequest) {
        return taskService.processingHandover(handoverTaskRequest);
    }
}
