package org.example.ims_backend.repository;

import org.example.ims_backend.entity.Project;
import org.example.ims_backend.entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface TaskRepository extends JpaRepository<Task, Long> , JpaSpecificationExecutor<Task> {

    List<Task> findByProject(Project project);
    Integer countByProject(Project project);
}
