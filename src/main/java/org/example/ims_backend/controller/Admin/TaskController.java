package org.example.ims_backend.controller.Admin;

import org.example.ims_backend.dto.admin.taskDTO.request.TaskRequest;
import org.example.ims_backend.dto.admin.taskDTO.response.TaskResponse;
import org.example.ims_backend.service.admin.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin")
public class TaskController {
    @Autowired
    private TaskService taskService;

    @GetMapping("/task/{id}")
    public TaskResponse getTaskDetail(@PathVariable Long id) {
        return taskService.getTaskDetail(id);
    }
    @PutMapping("/updateTask/{id}")
    public boolean updateTask(@RequestBody TaskRequest request,
                                  @PathVariable Long id) {
        request.setTask_id(id);
        return taskService.updateTask(request);
    }


}
