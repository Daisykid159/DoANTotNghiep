package org.example.ims_backend.service;

import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.example.ims_backend.common.State;
import org.example.ims_backend.dto.user.task.response.TaskStatisticResponse;
import org.example.ims_backend.entity.*;
import org.example.ims_backend.mapper.StatisticMapper;
import org.example.ims_backend.repository.DepartmentRepository;
import org.example.ims_backend.repository.ProjectRepository;
import org.example.ims_backend.repository.TaskRepository;
import org.example.ims_backend.repository.UserRepository;
import org.example.ims_backend.repository.specification.ProjectSpecification;
import org.example.ims_backend.repository.specification.StatisticSpecification;
import org.example.ims_backend.repository.specification.TaskSpecification;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;

@Slf4j
@RequiredArgsConstructor
@FieldDefaults(makeFinal = true, level = lombok.AccessLevel.PRIVATE)
@Service
public class StatisticServiceImpl implements StatisticService {
    ProjectRepository projectRepository;
    DepartmentRepository departmentRepository;
    UserRepository userRepository;
    TaskRepository taskRepository;
    StatisticMapper statisticMapper;
    @Override
    public List<Statistic> getStatistic(Integer type, LocalDateTime from, LocalDateTime to, Long department_assign_id, Long user_assign_id, Long user_handle_id, Long department_handle_id, Long project_id, Integer status, Integer priority , Long user_id) {

            Project project = null;
            if(project_id != null)  project = projectRepository.findById(project_id)
                                            .orElse(null);
            Department department_assign = null;
            if(department_assign_id != null) department_assign = departmentRepository.findById(department_assign_id)
                    .orElse(null);
            Department  department_handle = null;
            if(department_handle_id != null) department_handle = departmentRepository.findById(department_handle_id)
                    .orElse(null);
            User user_assign = null;
            if(user_assign_id != null) user_assign = userRepository.findById(user_assign_id)
                    .orElse(null);
            User user_handle = null;
            if(user_handle_id != null) user_handle = userRepository.findById(user_handle_id)
                    .orElse(null);
            User user = null;
            if(user_id != null)  user = userRepository.findById(user_id)
                    .orElse(null);
        try {

            Specification<Task> specification = Specification.where(
                    StatisticSpecification.hasParticipant(user))
                    .and(StatisticSpecification.getTaskByDate(from,to))
                    .and(StatisticSpecification.getTaskByPriority(priority))
                    .and(StatisticSpecification.getTaskByStatus(status))
                    .and(StatisticSpecification.getTaskByAssign(department_assign,user_assign))
                    .and(StatisticSpecification.getTaskByHandle(department_handle,user_handle))
                    .and(StatisticSpecification.getTaskByProject(project)

            );
            List<Task> tasks = taskRepository.findAll(specification);
            return switch (type) {
                case 1 -> StatisticAssign(tasks);
                case 2 -> StatisticHandle(tasks);
                case 3 -> StatisticPriority(tasks);
                case 4 -> StatisticProject(tasks);
                default -> null;
            };
        }catch (Exception e){
            log.error(e.getMessage());
            throw new RuntimeException(e.getMessage());
        }
    }
    private List<Statistic> StatisticProject (List<Task> tasks){
        Map<Long,Statistic> map = new HashMap<>();
        for(Task task : tasks){
            if(map.containsKey(task.getProject().getId())){
                Statistic statistic = map.get(task.getProject().getId());
                statistic.setTotal_task(statistic.getTotal_task()+1);
                List<TaskStatisticResponse> taskStatisticResponses = statistic.getTasks();
                taskStatisticResponses.add(statisticMapper.toTaskStatisticResponse(task));
                statistic.setTasks(taskStatisticResponses);
                if(task.getStatus() == 5){
                    if(task.getCompletedDate().compareTo(task.getExpiredDate()) > 0){
                        State completed = statistic.getCompleted();
                        completed.setOver_due(completed.getOver_due()+1);
                        statistic.setPending(completed);
                    }else {
                        State completed = statistic.getCompleted();
                        completed.setOn_time(completed.getOn_time()+1);
                        statistic.setPending(completed);
                    }
                }else {
                    if(task.getExpiredDate().compareTo(new Date()) >= 0){
                        State pending = statistic.getPending();
                        pending.setOn_time(pending.getOn_time()+1);
                        statistic.setPending(pending);
                    }else {
                        State pending = statistic.getPending();
                        pending.setOver_due(pending.getOver_due()+1);
                        statistic.setPending(pending);
                    }
                }
            }else {
                State pending  = new State(0,0);
                State completed = new State(0,0);
                if(task.getStatus() == 5){
                    if(task.getCompletedDate().compareTo(task.getExpiredDate()) > 0){
                        completed.setOver_due(completed.getOver_due()+1);
                    }else {
                        completed.setOn_time(completed.getOn_time()+1);
                    }
                }else {
                    if(task.getExpiredDate().compareTo(new Date()) >= 0){
                        pending.setOn_time(pending.getOn_time()+1);
                    }else {
                        pending.setOver_due(pending.getOver_due()+1);
                    }
                }
                TaskStatisticResponse taskStatisticResponse = statisticMapper.toTaskStatisticResponse(task);
                List<TaskStatisticResponse> taskStatisticResponses = new ArrayList<>();
                taskStatisticResponses.add(taskStatisticResponse);
                Statistic statistic = Statistic.builder()
                        .content_id(task.getProject().getId())
                        .content(task.getProject().getName())
                        .total_task(1)
                        .pending(pending)
                        .completed(completed)
                        .tasks(taskStatisticResponses)
                        .build();
                map.put(task.getProject().getId(),statistic);
            }
        }
        return new ArrayList<>(map.values());
    }
    private List<Statistic> StatisticPriority (List<Task> tasks){
        Map<Integer,Statistic> map = new HashMap<>();
        for(Task task : tasks){
            if(map.containsKey(task.getPriority())){
                Statistic statistic = map.get(task.getPriority());
                statistic.setTotal_task(statistic.getTotal_task()+1);
                List<TaskStatisticResponse> taskStatisticResponses = statistic.getTasks();
                taskStatisticResponses.add(statisticMapper.toTaskStatisticResponse(task));
                statistic.setTasks(taskStatisticResponses);
                if(task.getStatus() == 5){
                    if(task.getCompletedDate().compareTo(task.getExpiredDate()) > 0){
                        State completed = statistic.getCompleted();
                        completed.setOver_due(completed.getOver_due()+1);
                        statistic.setPending(completed);
                    }else {
                        State completed = statistic.getCompleted();
                        completed.setOn_time(completed.getOn_time()+1);
                        statistic.setPending(completed);
                    }
                }else {
                    if(task.getExpiredDate().compareTo(new Date()) >= 0){
                        State pending = statistic.getPending();
                        pending.setOn_time(pending.getOn_time()+1);
                        statistic.setPending(pending);
                    }else {
                        State pending = statistic.getPending();
                        pending.setOver_due(pending.getOver_due()+1);
                        statistic.setPending(pending);
                    }
                }
            }else {
                State pending  = new State(0,0);
                State completed = new State(0,0);
                if(task.getStatus() == 5){
                    if(task.getCompletedDate().compareTo(task.getExpiredDate()) > 0){
                        completed.setOver_due(completed.getOver_due()+1);
                    }else {
                        completed.setOn_time(completed.getOn_time()+1);
                    }
                }else {
                    if(task.getExpiredDate().compareTo(new Date()) >= 0){
                        pending.setOn_time(pending.getOn_time()+1);
                    }else {
                        pending.setOver_due(pending.getOver_due()+1);
                    }
                }
                TaskStatisticResponse taskStatisticResponse = statisticMapper.toTaskStatisticResponse(task);
                List<TaskStatisticResponse> taskStatisticResponses = new ArrayList<>();
                taskStatisticResponses.add(taskStatisticResponse);
                String content = "";
                if(task.getPriority() == 1) content = "Quan trong";
                else if (task.getPriority() == 2) content = "Rat quan trong";
                else content = "Binh thuong";
                Statistic statistic = Statistic.builder()
                        .content_id((long) task.getPriority())
                        .content(content)
                        .total_task(1)
                        .pending(pending)
                        .completed(completed)
                        .tasks(taskStatisticResponses)
                        .build();
                map.put(task.getPriority(),statistic);
            }
        }
        return new ArrayList<>(map.values());
    }
    private List<Statistic> StatisticAssign (List<Task> tasks) {
        Map<Long, Statistic> map = new HashMap<>();
        for (Task task : tasks) {
            if(map.containsKey(task.getAssignDepartment().getId())){
                Statistic statistic = map.get(task.getAssignDepartment().getId());
                statistic.setTotal_task(statistic.getTotal_task()+1);
                List<TaskStatisticResponse> taskStatisticResponses = statistic.getTasks();
                taskStatisticResponses.add(statisticMapper.toTaskStatisticResponse(task));
                statistic.setTasks(taskStatisticResponses);
                if(task.getStatus() == 5){
                    if(task.getCompletedDate().compareTo(task.getExpiredDate()) > 0){
                        State completed = statistic.getCompleted();
                        completed.setOver_due(completed.getOver_due()+1);
                        statistic.setPending(completed);
                    }else {
                        State completed = statistic.getCompleted();
                        completed.setOn_time(completed.getOn_time()+1);
                        statistic.setPending(completed);
                    }
                }else {
                    if(task.getExpiredDate().compareTo(new Date()) >= 0){
                        State pending = statistic.getPending();
                        pending.setOn_time(pending.getOn_time()+1);
                        statistic.setPending(pending);
                    }else {
                        State pending = statistic.getPending();
                        pending.setOver_due(pending.getOver_due()+1);
                        statistic.setPending(pending);
                    }
                }
            }else{
                State pending  = new State(0,0);
                State completed = new State(0,0);
                if(task.getStatus() == 5){
                    if(task.getCompletedDate().compareTo(task.getExpiredDate()) > 0){
                        completed.setOver_due(completed.getOver_due()+1);
                    }else {
                        completed.setOn_time(completed.getOn_time()+1);
                    }
                }else {
                    if(task.getExpiredDate().compareTo(new Date()) >= 0){
                        pending.setOn_time(pending.getOn_time()+1);
                    }else {
                        pending.setOver_due(pending.getOver_due()+1);
                    }
                }
                TaskStatisticResponse taskStatisticResponse = statisticMapper.toTaskStatisticResponse(task);
                List<TaskStatisticResponse> taskStatisticResponses = new ArrayList<>();
                taskStatisticResponses.add(taskStatisticResponse);
                Statistic statistic = Statistic.builder()
                        .content_id(task.getAssignDepartment().getId())
                        .content(task.getAssignDepartment().getDepartmentName())
                        .total_task(1)
                        .pending(pending)
                        .completed(completed)
                        .tasks(taskStatisticResponses)
                        .build();
                map.put(task.getAssignDepartment().getId(),statistic);
            }
        }
        return new ArrayList<>(map.values());
    }
    private List<Statistic> StatisticHandle (List<Task> tasks){
        Map<Long,Statistic> map = new HashMap<>();
        for(Task task : tasks){
            if(map.containsKey(task.getTargetDepartment().getId())){
                Statistic statistic = map.get(task.getTargetDepartment().getId());
                statistic.setTotal_task(statistic.getTotal_task()+1);
                List<TaskStatisticResponse> taskStatisticResponses = statistic.getTasks();
                taskStatisticResponses.add(statisticMapper.toTaskStatisticResponse(task));
                statistic.setTasks(taskStatisticResponses);
                if(task.getStatus() == 5){
                    if(task.getCompletedDate().compareTo(task.getExpiredDate()) > 0){
                        State completed = statistic.getCompleted();
                        completed.setOver_due(completed.getOver_due()+1);
                        statistic.setPending(completed);
                    }else {
                        State completed = statistic.getCompleted();
                        completed.setOn_time(completed.getOn_time()+1);
                        statistic.setPending(completed);
                    }
                }else {
                    if(task.getExpiredDate().compareTo(new Date()) >= 0){
                        State pending = statistic.getPending();
                        pending.setOn_time(pending.getOn_time()+1);
                        statistic.setPending(pending);
                    }else {
                        State pending = statistic.getPending();
                        pending.setOver_due(pending.getOver_due()+1);
                        statistic.setPending(pending);
                    }
                }
            }else {
                State pending  = new State(0,0);
                State completed = new State(0,0);
                if(task.getStatus() == 5){
                    if(task.getCompletedDate().compareTo(task.getExpiredDate()) > 0){
                        completed.setOver_due(completed.getOver_due()+1);
                    }else {
                        completed.setOn_time(completed.getOn_time()+1);
                    }
                }else {
                    if(task.getExpiredDate().compareTo(new Date()) >= 0){
                        pending.setOn_time(pending.getOn_time()+1);
                    }else {
                        pending.setOver_due(pending.getOver_due()+1);
                    }
                }
                TaskStatisticResponse taskStatisticResponse = statisticMapper.toTaskStatisticResponse(task);
                List<TaskStatisticResponse> taskStatisticResponses = new ArrayList<>();
                taskStatisticResponses.add(taskStatisticResponse);
                Statistic statistic = Statistic.builder()
                        .content_id(task.getTargetDepartment().getId())
                        .content(task.getTargetDepartment().getDepartmentName())
                        .total_task(1)
                        .pending(pending)
                        .completed(completed)
                        .tasks(taskStatisticResponses)
                        .build();
                map.put(task.getTargetDepartment().getId(),statistic);
            }
        }
        return new ArrayList<>(map.values());
    }
}
