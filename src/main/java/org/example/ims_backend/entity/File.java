package org.example.ims_backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.Date;

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
    Date createdDate;
    @Column(name = "DeletedDate")
    Date deletedDate;
    @Column(name = "UpdatedDate")
    Date updatedDate;
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
