package org.example.ims_backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Table(name = "file")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class File {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "FileId")
    Long id;
    @Column(name = "FileName")
    String fileName;
    @Column(name = "FilePath")
    String filePath;
    @Column(name = "Size")
    Long size;
    @Column(name = "IsSync")
    int isSync;
    @Column(name = "CreatedDate")
    LocalDate createdDate;
    @Column(name = "DeletedDate")
    LocalDate deletedDate;
    @Column(name = "UpdatedDate")
    LocalDate updatedDate;
    @Column(name = "Extension")
    String extension;
    @Column(name = "FileLocalName")
    String fileLocalName;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "TaskId")
    Task task;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "UserId")
    User user;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "ReportId")
    Report report;


}
