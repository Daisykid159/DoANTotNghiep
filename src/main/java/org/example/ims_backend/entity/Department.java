package org.example.ims_backend.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.example.ims_backend.common.Active;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDate;

@Entity
@Table(name = "department")
@Getter
@Setter
public class Department {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "DepartmentId")
    private Long id;
    @Column(name = "DepartmentName")
    private String departmentName;
    @Column(name = "DepartmentCode")
    private String departmentCode;
    @Column(name = "IsActive")
    private int isActive;
    @CreationTimestamp
    @Column(name = "CreatedDate")
    private LocalDate createdDate;
    @Column(name = "DeletedDate")
    private LocalDate deletedDate;


}
