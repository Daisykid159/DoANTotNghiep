package org.example.ims_backend.service.admin;

import org.example.ims_backend.dto.admin.projectDTO.request.DepartmentOfProject;
import org.example.ims_backend.dto.admin.projectDTO.request.ProjectRequest;
import org.example.ims_backend.dto.admin.projectDTO.response.ProjectDetailResponse;
import org.example.ims_backend.dto.admin.projectDTO.response.ProjectResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface ProjectService {
    Page<ProjectResponse> getProjects(Pageable pageable);
    boolean createProject(ProjectRequest projectRequest);
    boolean updateProject(ProjectRequest projectRequest);
    ProjectDetailResponse getProjectDetail(Long id);
    boolean updateDepartmentOfProject(Long id, List<DepartmentOfProject> request);
}
