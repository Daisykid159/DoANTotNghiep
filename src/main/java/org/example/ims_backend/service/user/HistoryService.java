package org.example.ims_backend.service.user;

import org.example.ims_backend.entity.Task;
import org.example.ims_backend.entity.User;

public interface HistoryService {
    void addHistory(User createUser, User receiveUser, Task task, String content,int status);
}
