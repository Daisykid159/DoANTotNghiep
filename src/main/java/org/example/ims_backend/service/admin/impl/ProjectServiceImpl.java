package org.example.ims_backend.service.admin.impl;

import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.example.ims_backend.dto.admin.projectDTO.request.DepartmentOfProject;
import org.example.ims_backend.dto.admin.projectDTO.request.ProjectRequest;
import org.example.ims_backend.dto.admin.projectDTO.response.ProjectDetailResponse;
import org.example.ims_backend.dto.admin.projectDTO.response.ProjectResponse;
import org.example.ims_backend.entity.DepartmentProject;
import org.example.ims_backend.entity.Project;
import org.example.ims_backend.entity.Task;
import org.example.ims_backend.mapper.ProjectMapper;
import org.example.ims_backend.repository.DepartmentProjectRepository;
import org.example.ims_backend.repository.DepartmentRepository;
import org.example.ims_backend.repository.ProjectRepository;
import org.example.ims_backend.repository.TaskRepository;
import org.example.ims_backend.service.admin.ProjectService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@FieldDefaults(makeFinal = true, level = lombok.AccessLevel.PRIVATE)
@Service
@Slf4j
public class ProjectServiceImpl implements ProjectService {
    ProjectRepository projectRepository;
    ProjectMapper projectMapper;
    TaskRepository taskRepository;
    DepartmentProjectRepository departmentProjectRepository;
    DepartmentRepository departmentRepository;
    @Override
    public Page<ProjectResponse> getProjects(Pageable pageable) {
        Page<Project> projects =  projectRepository.findAll(pageable);
        List<ProjectResponse> projectResponseList = projects.stream().map(projectMapper::toProjectResponse).toList();
        return new PageImpl<>(projectResponseList, pageable, projects.getTotalElements());
    }

    @Override
    public boolean createProject(ProjectRequest projectRequest) {
        try{
            Project project = new Project();
            project.setName(projectRequest.getProject_name());
            project.setContent(projectRequest.getContent());
            projectRepository.save(project);
            return true;
        }catch (Exception e){
            log.error("Error: ", e);
            return false;
        }


    }

    @Override
    public boolean updateProject(ProjectRequest projectRequest) {
        try {
            Project project = projectRepository.findById(projectRequest.getProject_id()).orElse(null);
            if (project == null) {
                return false;
            }
            project = projectMapper.toProject(project,projectRequest);
            projectRepository.save(project);
            return true;
        }catch (Exception e){
            log.error("Error: ", e);
            return false;
        }
    }

    @Override
    public ProjectDetailResponse getProjectDetail(Long id) {
            Project project = projectRepository.findById(id).orElse(null);
            List<Task> tasks = taskRepository.findByProject(project);
        assert project != null;
        return projectMapper.toProjectDetailResponse(project,tasks);


    }

    @Override
    public boolean updateDepartmentOfProject(Long id, List<DepartmentOfProject> request) {
        try {
            Project project = projectRepository.findById(id).orElse(null);
            List<DepartmentProject> departmentProjects = departmentProjectRepository.findByProject(project);
            for (DepartmentOfProject departmentOfProject : request){
                if (!departmentProjectRepository.existsByProjectAndDepartment(project,departmentRepository.findById(departmentOfProject.getDepartment_id()).orElse(null))){
                    DepartmentProject newDepartmentProject = new DepartmentProject();
                    newDepartmentProject.setProject(project);
                    newDepartmentProject.setDepartment(departmentRepository.findById(departmentOfProject.getDepartment_id()).orElse(null));
                    departmentProjectRepository.save(newDepartmentProject);
                }
            }
            for(DepartmentProject departmentProject : departmentProjects){
                boolean isExist = false;
                for(DepartmentOfProject departmentOfProject : request){
                    if(departmentProject.getDepartment().getId().equals(departmentOfProject.getDepartment_id())){

                        departmentProjectRepository.save(departmentProject);
                        isExist = true;
                        break;
                    }
                }
                if(!isExist){
                    departmentProjectRepository.delete(departmentProject);
                }
            }
            return true;
        }catch (Exception e){
            log.error("Error: ", e);
            return false;
        }
    }

}
