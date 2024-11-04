package org.example.ims_backend.entity;

import jakarta.persistence.*;
import lombok.Data;
import org.example.ims_backend.common.StatusHistory;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDate;

@Table(name = "history")
@Entity
@Data
public class History {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "HistoryId")
    private Long id;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "TaskId")
    private Task task;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "CreatedUserId")
    private User CreatedUser;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "ReceiveUserId")
    private User receiveUser;
    @CreationTimestamp
    @Column(name = "CreatedDate")
    private LocalDate createdDate;
    @Column(name = "Status")
    private int status;

}
