package org.example.ims_backend.entity;

import jakarta.persistence.*;
import lombok.Data;
import org.example.ims_backend.common.TypeNotifi;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDate;

@Entity
@Table(name = "notification")
@Data
public class Notification {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "NotificationId")
    private Long id;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "TaskId")
    private Task task;
    @Column(name = "Content")
    private String content;
    @CreationTimestamp
    @Column(name = "CreatedDate")
    private LocalDate createdDate;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "CreatedUserId")
    private User createdUser;
    @Column(name = "Type")
    private int type;

}
