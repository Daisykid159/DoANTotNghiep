package org.example.ims_backend.service.user;

import org.example.ims_backend.entity.Task;
import org.example.ims_backend.entity.User;

public interface NotificationService {
    void deleteNotification(Task task);
    boolean addNotification(Task task, User CreateUser,User toUser, String content,Integer type);
}
