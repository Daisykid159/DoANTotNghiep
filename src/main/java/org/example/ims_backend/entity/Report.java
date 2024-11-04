package org.example.ims_backend.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDate;

@Entity
@Table(name = "report")
@Getter
@Setter
public class Report {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ReportId")
    private Long id;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "TaskId")
    private Task task;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "CreateUser")
    private User createUser;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "ReviewUser")
    private User reviewUser;
    @Column(name = "Content")
    private String content;
    @CreationTimestamp
    @Column(name = "CreatedDate")
    private LocalDate createdDate;
    @Column(name = "NewExpiredDate")
    private LocalDate newExpiredDate;
    @Column(name = "CompletedDate")
    private LocalDate CompletedDate;
    @Column(name = "Status")
    private int status;
    @Column(name = "Type")
    private int type;

}
