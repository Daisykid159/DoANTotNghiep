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
    @Procedure(procedureName = "task_search") // Tên Stored Procedure trong MySQL
    List<Object[]> searchTasks(
            @Param("title_code_depart") String titleCodeDepart,
            @Param("user_id") Integer userId,
            @Param("status") Integer status,
            @Param("department") String department,
            @Param("project_id") Integer projectId,
            @Param("create_from") LocalDate createFrom,
            @Param("create_to") LocalDate createTo,
            @Param("end_from") LocalDate endFrom,
            @Param("end_to") LocalDate endTo,
            @Param("is_extend") Boolean isExtend,
            @Param("userCurrentId") Integer userCurrentId
    );
    List<Task> findByProject(Project project);
}
