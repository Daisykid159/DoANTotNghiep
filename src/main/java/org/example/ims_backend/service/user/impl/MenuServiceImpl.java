package org.example.ims_backend.service.user.impl;

import jakarta.persistence.*;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.example.ims_backend.common.MenuManager;
import org.example.ims_backend.dto.user.GeneralResponse;
import org.example.ims_backend.dto.user.menu.response.MenuResponse;
import org.example.ims_backend.dto.user.response.*;
import org.example.ims_backend.entity.*;
import org.example.ims_backend.mapper.DepartmentUserMapper;
import org.example.ims_backend.mapper.ProjectMapper;
import org.example.ims_backend.mapper.UserMapper;
import org.example.ims_backend.repository.*;
import org.example.ims_backend.service.user.MenuService;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@RequiredArgsConstructor
@Slf4j
@Service
@FieldDefaults(makeFinal = true, level = lombok.AccessLevel.PRIVATE)
public class MenuServiceImpl implements MenuService {
    MenuRepository menuRepository;
    EntityManager entityManager;
    UserRepository userRepository;
    UserMapper userMapper;
    NotificationUserRepository notificationUserRepository;
    DepartmentRepository departmentRepository;
    DepartmentUserRepository departmentUserRepository;
    DepartmentUserMapper departmentUserMapper;
    DepartmentProjectRepository departmentProjectRepository;
    ProjectMapper projectMapper;
    @Override
    public List<MenuResponse> getMenu() {
        var context = SecurityContextHolder.getContext();
        String username = context.getAuthentication().getName();
        User user = userRepository.findByUsername(username).orElseThrow(() -> new RuntimeException("false"));
        List<Menu> menus = menuRepository.findAll();
        MenuManager manager = new MenuManager();
        for (Menu menu : menus){
            Long parentMenuId = null;
            String[] codeSegments = menu.getMenuCode().split("\\.");
            String query = menu.getQuery();
            Query qery = entityManager.createQuery(query);
            qery.setParameter("userId", user.getId());
            List results = qery.getResultList();
            int totalTask =  results.size();
            if (codeSegments.length >= 2){
                try {
                    parentMenuId = Long.parseLong(codeSegments[codeSegments.length - 2]);
                } catch (NumberFormatException e){
                    log.error("Invalid parentMenuId in menu code: {}", menu.getMenuCode(), e);
                }
            }
            manager.addMenu(
                    menu.getId(),
                    menu.getMenuName(),
                    menu.getMenuCode(),
                    totalTask,
                    parentMenuId,
                    menu.getIsActive()
            );
        }
        return manager.getAllMenus();
    }

    @Override
    public GeneralResponse getOverview() {
        var context = SecurityContextHolder.getContext();
        String username = context.getAuthentication().getName();
        User user = userRepository.findByUsername(username).orElseThrow(() -> new RuntimeException("false"));
        List<MenuResponse> menus = getMenu();
        int num_notification = notificationUserRepository.countByReceiverUserAndHasRead(user,0);
        List<Department> departments = departmentRepository.findAll();
        List<DepartmentGeneral> departmentGenerals = new ArrayList<>();

        for (Department department : departments){
            String []code = department.getDepartmentCode().split("\\."); ;
            Long parentDepartmentId = null;
            if (code.length >= 2){
                try {
                    parentDepartmentId = Long.parseLong(code[code.length - 2]);
                } catch (NumberFormatException e){
                    log.error("Invalid parentDepartmentId in department code: {}", department.getDepartmentCode(), e);
                }
            }
            List<DepartmentUser> departmentUsers = departmentUserRepository.findByDepartment(department);
            List<UserDepartmentGenal> userDepartmentGenals = new ArrayList<>();
            for (DepartmentUser departmentUser : departmentUsers){
                userDepartmentGenals.add(UserDepartmentGenal.builder()
                        .user_id(departmentUser.getUser().getId())
                        .user_name(departmentUser.getUser().getUsername())
                                .full_name(departmentUser.getUser().getFullName())
                                .IsDepartmentMain(departmentUser.getDepartmentMain() ==1)
                                .position_id(departmentUser.getPosition().getId())
                                .position_name(departmentUser.getPosition().getPositionName())
                        .build());
            }
            departmentGenerals.add(DepartmentGeneral.builder()
                            .department_id(department.getId())
                            .department_code(department.getDepartmentCode())
                            .department_name(department.getDepartmentName())
                            .parent_department_id(parentDepartmentId)
                            .users(userDepartmentGenals)
                    .build());
        }
        MyInfo myInfo = getMyInfo(user);
        Set<MyProject> projects = new HashSet<>();
        for(MyDepartment myDepartment : myInfo.getDepartments()){
            List<DepartmentProject> departmentProjects = departmentProjectRepository.findDepartmentProjectByDepartment(departmentRepository.findById(myDepartment.getDepartment_id()).orElseThrow(() -> new RuntimeException("false")));
            for (DepartmentProject departmentProject : departmentProjects){
                if(departmentProject.getProject().getStatus() != 3)
                    projects.add(projectMapper.toMyProject(departmentProject));
            }
        }
        return GeneralResponse.builder()
                .menus(menus)
                .departments(departmentGenerals)
                .number_notification(num_notification)
                .userCurrent(getMyInfo(user))
                .projectJoins(projects)
                .build();
    }
    private MyInfo getMyInfo(User user){
        MyInfo myInfo = userMapper.toMyInfo(user);
        List<DepartmentUser> departmentUsers = departmentUserRepository.findByUser(user);
        List<MyDepartment> myDepartments = departmentUserMapper.toMyDepartment(departmentUsers);
        myInfo.setDepartments(myDepartments);
        return myInfo;
    }
}
