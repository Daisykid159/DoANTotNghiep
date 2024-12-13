package org.example.ims_backend.service.user.impl;

import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.example.ims_backend.entity.Notification;
import org.example.ims_backend.entity.Task;
import org.example.ims_backend.repository.NotificationReqository;
import org.example.ims_backend.repository.NotificationUserRepository;
import org.example.ims_backend.service.user.NotificationService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@RequiredArgsConstructor
@Slf4j
@Service
@FieldDefaults(makeFinal = true, level = lombok.AccessLevel.PRIVATE)
public class NotificationServiceImpl implements NotificationService {
    NotificationReqository notificationReqository;
    NotificationUserRepository notificationUserRepository;
    @Override
    @Transactional
    public boolean deleteNotification(Task task) {
        try {
            List<Notification> notifications = notificationReqository.findAllByTask(task);
            for(Notification notification : notifications){
                notificationUserRepository.deleteAllByNotification(notification);
            }
            notificationReqository.deleteAllByTask(task);
            return true;
        } catch (Exception e){
            log.error("Error in deleteNotification", e);
            return false;
        }
    }
}
