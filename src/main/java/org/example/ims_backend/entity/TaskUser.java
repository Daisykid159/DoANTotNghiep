package org.example.ims_backend.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.example.ims_backend.common.HasRead;
import org.example.ims_backend.common.Role;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDate;

@Table(name = "task_user")
@Entity
@Getter
@Setter
public class TaskUser {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Id")
    private Long id;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "TaskId")
    private Task task;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "UserId")
    private User user;
    @Column(name = "Role")
    private int role;
    @Column(name = "HasRead")
    private int hasRead;
    @Column(name = "IsPin")
    private int isPin;
    @CreationTimestamp
    @Column(name = "CreatedDate")
    private LocalDate createdDate;
    @Column(name = "UpdatedDate")
    private LocalDate updatedDate;

}
