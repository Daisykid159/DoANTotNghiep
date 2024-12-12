package org.example.ims_backend.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.example.ims_backend.common.HasRead;

@Entity
@Table(name = "notification_user")
@Getter
@Setter
public class NotificationUser {
    @Id

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "NotificationUserId")
    private Long id;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "NotificationId")
    private Notification notification;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "ToUserId")
    private User receiverUser;
    @Column(name = "HasRead")
    private int hasRead;
}
