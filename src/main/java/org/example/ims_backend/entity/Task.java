package org.example.ims_backend.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.example.ims_backend.common.State;
import org.example.ims_backend.common.StatusTask;
import org.hibernate.annotations.CreationTimestamp;
import java.time.LocalDate;
@Entity
@Table(name = "task")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "TaskId")
    private Long id;
    @Column(name = "Status")
    private Integer status;
    @Column(name = "State")
    private Integer state;
    @Column(name = "Priority")
    private Integer priority;
    @Column(name = "Title")
    private String title;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "AssignDepartment")
    private Department assignDepartment;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "AssignUser")
    private User assignUser;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "TargetDepartment")
    private Department TargetDepartment;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "TargetUser")
    private User TargetUser;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "ProjectId")
    private Project project;
    @Column(name = "Content")
    private String content;
    @CreationTimestamp
    @Column(name = "CreatedDate")
    private LocalDate createdDate;
    @Column(name = "DeletedDate")
    private LocalDate deletedDate;
    @Column(name = "ExpiredDate")
    private LocalDate expiredDate;
    @Column(name = "CompletedDate")
    private LocalDate completedDate;


}
