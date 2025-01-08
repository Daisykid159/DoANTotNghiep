package org.example.ims_backend.controller.User;

import org.example.ims_backend.dto.user.notification.response.NotificationResponse;
import org.example.ims_backend.service.user.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user")
public class NotificationController {
    @Autowired
    private NotificationService notificationService;
    @GetMapping("/getNotificationList")
    public List<NotificationResponse> getNotificationList() {
        return notificationService.getNotificationList();
    }
    @PutMapping("/readNotification")
    public boolean readNotification(
            @RequestParam(required = false) Long notification_id
    ) {
        return notificationService.readNotification(notification_id);
    }
}
