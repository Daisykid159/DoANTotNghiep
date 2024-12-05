package org.example.ims_backend.service.user.impl;

import jakarta.persistence.EntityManager;
import jakarta.persistence.Query;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.example.ims_backend.dto.user.task.response.TaskResponse;
import org.example.ims_backend.entity.Department;
import org.example.ims_backend.entity.Menu;
import org.example.ims_backend.entity.User;
import org.example.ims_backend.repository.MenuRepository;
import org.example.ims_backend.repository.TaskRepository;
import org.example.ims_backend.repository.TaskUserRepository;
import org.example.ims_backend.repository.UserRepository;
import org.example.ims_backend.service.user.TaskService;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@RequiredArgsConstructor
@Slf4j
@Service
@FieldDefaults(makeFinal = true, level = lombok.AccessLevel.PRIVATE)
public class TaskServiceImpl implements TaskService {
    TaskRepository taskRepository;
    MenuRepository menuRepository;
    EntityManager entityManager;
    TaskUserRepository taskUserRepository;
    UserRepository userRepository;
    @Override
    public List<TaskResponse> getListMuneById(Long user_id, Long menu_id) {
        List<TaskResponse> taskResponses = new ArrayList<>();
        Menu menu = menuRepository.findById(menu_id).orElse(null);
        String query = menu.getQuery();
        Query qery = entityManager.createQuery(query);
        qery.setParameter("userId", user_id);
        List results = qery.getResultList();
        for(Object result : results){
            Object[] resultArray = (Object[]) result;
            Department assign_department = (Department) resultArray[13];
            User assign_user = (User) resultArray[14];
            Department target_department = (Department) resultArray[15];
            User target_user = (User) resultArray[16];
            TaskResponse taskResponse = TaskResponse.builder()
                    .task_id((Long) resultArray[0])
                    .tu_id((Long) resultArray[1])
                    .role((int) resultArray[2])
                    .status((int) resultArray[4])
                    .state((int) resultArray[5])
                    .title((String) resultArray[6])
                    .priority((int) resultArray[7])
                    .created_date((LocalDate) resultArray[9])
                    .expired_date((LocalDate) resultArray[8])
                    .completed_date((LocalDate) resultArray[12])
                    .assign_department(assign_department.getDepartmentName())
                    .assign_user_name(assign_user.getFullName())
                    .assign_user_id(assign_user.getId())
                    .target_department(target_department.getDepartmentName())
                    .target_user_name(target_user.getFullName())
                    .target_user_id(target_user.getId())
                    .has_read(taskUserRepository.findByUserAndTask(userRepository.findById(user_id).orElse(null),taskRepository.findById((Long) resultArray[0]).orElse(null)).getHasRead())
                    .updated_date(taskUserRepository.findByUserAndTask(userRepository.findById(user_id).orElse(null),taskRepository.findById((Long) resultArray[0]).orElse(null)).getUpdatedDate())
                    .build();
            taskResponses.add(taskResponse);
        }
        return taskResponses;
    }
}
