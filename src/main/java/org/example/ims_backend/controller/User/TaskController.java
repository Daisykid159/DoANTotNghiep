package org.example.ims_backend.controller.User;

import org.example.ims_backend.dto.user.task.request.CreateTaskRequest;
import org.example.ims_backend.dto.user.task.request.HandoverTaskRequest;
import org.example.ims_backend.dto.user.task.request.ProcessingTimeRequest;
import org.example.ims_backend.dto.user.task.response.*;
import org.example.ims_backend.service.user.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

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
    public List<TaskSearchResponse> searchTask(
            @RequestParam (required = false) String title,
            @RequestParam (required = false) Long department_id,
            @RequestParam (required = false) Long user_id,
            @RequestParam (required = false)  @DateTimeFormat(pattern = "yyyy-MM-dd") Date createTo,
            @RequestParam (required = false)  @DateTimeFormat(pattern = "yyyy-MM-dd") Date createFrom,
            @RequestParam (required = false)  @DateTimeFormat(pattern = "yyyy-MM-dd") Date expireTo,
            @RequestParam (required = false)  @DateTimeFormat(pattern = "yyyy-MM-dd") Date expireFrom,
            @RequestParam (required = false) Integer task_status,
            @RequestParam (required = false) Integer priority
            ) {
        return taskService.searchTask(title, department_id, user_id, createTo, createFrom, expireTo, expireFrom, task_status, priority);
    }
    @PutMapping("/evictTask")
    public boolean evictTask(@RequestParam Long task_id) {
        return taskService.evictTask(task_id);
    }
    @PostMapping("/createTask")
    public TaskDetailResponse createTask(@RequestBody CreateTaskRequest createTaskRequest) {
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
    @PutMapping("/returnTask")
    public boolean returnTask(@RequestParam Long task_id,
                              @RequestParam String content) {
        return taskService.returnTask(task_id , content);
    }
    @GetMapping("/taskOfTheDay")
    public TaskOfDay taskOfTheDay() {
        return taskService.taskOfTheDay();
    }
    @PutMapping("/leaveProcessingTime/{id}")
    public boolean leaveProcessingTime(@RequestBody List<ProcessingTimeRequest> processingTimeRequests,
                                        @PathVariable Long id) {
        return taskService.leaveProcessingTime(processingTimeRequests,id);
    }
    @GetMapping("/leaveProcessingTime")
    public List<TaskLeaveProcessingTimeResponse> leaveProcessingTimeDetail() {
        return taskService.leaveProcessingTimeDetail();
    }

}
