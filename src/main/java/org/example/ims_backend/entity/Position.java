package org.example.ims_backend.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.example.ims_backend.common.Active;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDate;

@Entity
@Table(name = "position")
@Getter
@Setter
public class Position {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "PositionId")
    private Long id;
    @Column(name = "PositionName")
    private String positionName;
    @Column(name = "IsActive")
    private int isActive;
    @CreationTimestamp
    @Column(name = "CreatedDate")
    private LocalDate createdDate;
    @Column(name = "DeletedDate")
    private LocalDate deletedDate;
}
