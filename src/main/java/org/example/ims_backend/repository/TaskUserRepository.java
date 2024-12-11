package org.example.ims_backend.repository;

import org.example.ims_backend.entity.Department;
import org.example.ims_backend.entity.Task;
import org.example.ims_backend.entity.TaskUser;
import org.example.ims_backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TaskUserRepository extends JpaRepository<TaskUser, Long>, JpaSpecificationExecutor<TaskUser> {
    TaskUser findByUserAndTask(User user, Task task);
    TaskUser findByUserAndTaskAndDepartment(User user, Task task, Department department);
    List<TaskUser> findByTaskAndRole(Task task, Integer role);
    boolean existsByTaskAndUserAndDepartment(Task task, User user, Department department);
}
