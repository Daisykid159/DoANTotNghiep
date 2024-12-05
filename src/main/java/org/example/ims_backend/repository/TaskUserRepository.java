package org.example.ims_backend.repository;

import org.example.ims_backend.entity.Task;
import org.example.ims_backend.entity.TaskUser;
import org.example.ims_backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface TaskUserRepository extends JpaRepository<TaskUser, Long>, JpaSpecificationExecutor<TaskUser> {
    TaskUser findByUserAndTask(User user, Task task);
}
