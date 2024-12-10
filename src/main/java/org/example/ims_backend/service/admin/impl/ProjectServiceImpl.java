package org.example.ims_backend.service.admin.impl;

import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.example.ims_backend.dto.admin.projectDTO.request.DepartmentOfProject;
import org.example.ims_backend.dto.admin.projectDTO.request.ProjectRequest;
import org.example.ims_backend.dto.admin.projectDTO.response.ProjectDetailResponse;
import org.example.ims_backend.dto.admin.projectDTO.response.ProjectResponse;
import org.example.ims_backend.dto.admin.taskDTO.request.TaskRequest;
import org.example.ims_backend.dto.admin.taskDTO.response.TaskResponse;
import org.example.ims_backend.entity.*;
import org.example.ims_backend.mapper.ProjectMapper;
import org.example.ims_backend.repository.*;
import org.example.ims_backend.repository.specification.ProjectSpecification;
import org.example.ims_backend.service.admin.ProjectService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Date;
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
    UserRepository userRepository;
    @Override
    public Page<ProjectResponse> getProjects(Pageable pageable, String keyword, LocalDate fromCreatedDate, LocalDate toCreatedDate, LocalDate fromExpiredDate, LocalDate toExpiredDate) {
        Specification<Project> spec = Specification.where(ProjectSpecification
                        .hasKeyword(keyword))
                        .and(ProjectSpecification.createdDateBetween(fromCreatedDate,toCreatedDate))
                        .and(ProjectSpecification.expiredDateBetween(fromExpiredDate,toExpiredDate));

        Page<Project> projects =  projectRepository.findAll(spec,pageable);

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

    @Override
    public TaskResponse getTaskDetail(Long id) {
        Task task = taskRepository.findById(id).orElse(null);
        assert task != null;
        return TaskResponse.builder()
                .task_id(task.getId())
                .task_title(task.getTitle())
                .created_date(task.getCreatedDate())
                .expired_date(task.getExpiredDate())
                .status(task.getStatus())
                .department_id(task.getTargetDepartment().getId())
                .assign_user_id(task.getAssignUser().getId())
                .targer_user_id(task.getTargetUser().getId())
                .department_name(task.getTargetDepartment().getDepartmentName())
                .assign_user_name(task.getAssignUser().getFullName())
                .target_user_name(task.getTargetUser().getFullName())
                .build();
    }

    @Override
    public boolean updateTask(TaskRequest request) {
        try {
            Task task = taskRepository.findById(request.getTask_id()).orElse(null);
            if (task == null) {
                return false;
            }
            Department department = departmentRepository.findById(request.getDepartment_id()).orElse(null);
            User assignUser = userRepository.findById(request.getAssign_user_id()).orElse(null);
            User targetUser = userRepository.findById(request.getTarger_user_id()).orElse(null);
            task.setTitle(request.getTask_title());
            task.setCreatedDate(request.getCreated_date());
            task.setExpiredDate(request.getExpired_date());
            task.setStatus(request.getStatus());
            task.setTargetDepartment(department);
            task.setAssignUser(assignUser);
            task.setTargetUser(targetUser);
            taskRepository.save(task);
            return true;
        }catch (Exception e){
            log.error("Error: ", e);
            return false;
        }
    }

}
