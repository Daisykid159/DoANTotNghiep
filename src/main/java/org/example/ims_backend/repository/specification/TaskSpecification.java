package org.example.ims_backend.repository.specification;

import org.example.ims_backend.entity.Department;
import org.example.ims_backend.entity.Project;
import org.example.ims_backend.entity.Task;
import org.springframework.data.jpa.domain.Specification;

import java.util.Date;

public class TaskSpecification {
    public static Specification<Task> getTaskByProject(Project project) {
        return (root, query, builder) -> {
            if (project == null) {
                return builder.conjunction();
            }
            return builder.equal(root.get("project"), project);
        };
    }
    public static Specification<Task> getTaskByDepartment(Department department) {
        return (root, query, builder) -> {
            if (department == null) {
                return builder.conjunction();
            }
            return builder.equal(root.get("department"), department);
        };
    }
    public static Specification<Task> getTaskByStatus(int status) {
        return (root, query, builder) -> {
            if (status == 0) {
                return builder.conjunction();
            }
            return builder.equal(root.get("status"), status);
        };
    }
}
