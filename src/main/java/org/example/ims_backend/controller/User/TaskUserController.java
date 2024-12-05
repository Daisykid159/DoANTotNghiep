package org.example.ims_backend.controller.User;

import org.example.ims_backend.dto.user.task.response.TaskResponse;
import org.example.ims_backend.service.user.TaskUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import  java.util.*;
@RestController
@RequestMapping("/api/user")
public class TaskUserController {
    @Autowired
    private TaskUserService taskService;
    @GetMapping("/getListMenuById")
    public List<TaskResponse> getListMuneById(@RequestParam Long user_id,
                                              @RequestParam Long menu_id) {
        return taskService.getListMuneById(user_id, menu_id);
    }
}
