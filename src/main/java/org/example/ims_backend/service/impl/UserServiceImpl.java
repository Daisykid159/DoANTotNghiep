package org.example.ims_backend.service.impl;

import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.example.ims_backend.common.Active;
import org.example.ims_backend.common.ErrorCode;
import org.example.ims_backend.common.Role;
import org.example.ims_backend.dto.request.AppException;
import org.example.ims_backend.dto.request.DepartmentRequest;
import org.example.ims_backend.dto.request.UserCreationRequest;
import org.example.ims_backend.dto.request.UserUpdateRequest;
import org.example.ims_backend.dto.response.GeneralResponse;
import org.example.ims_backend.dto.response.UpdateUserResponse;
import org.example.ims_backend.dto.response.UserResponse;
import org.example.ims_backend.entity.DepartmentUser;
import org.example.ims_backend.repository.DepartmentRepository;
import org.example.ims_backend.repository.DepartmentUserRepository;
import org.example.ims_backend.repository.PositionRepository;
import org.example.ims_backend.repository.specification.UserSpecification;
import org.example.ims_backend.entity.*;
import org.example.ims_backend.mapper.UserMapper;
import org.example.ims_backend.repository.UserRepository;
import org.example.ims_backend.service.UserService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.access.prepost.PostAuthorize;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@FieldDefaults(makeFinal = true, level = lombok.AccessLevel.PRIVATE)
@Service
@Slf4j
public class UserServiceImpl implements UserService {
     UserRepository userRepository;
     UserMapper userMapper;
     PasswordEncoder passwordEncoder;
     DepartmentUserRepository departmentUserRepository;
     PositionRepository positionRepository;
     @Override
    @PreAuthorize("hasRole('ADMIN')")
    public UserResponse createUser(UserCreationRequest request) {


        if (userRepository.existsByUsername(request.getUsername())) {
            throw new AppException(ErrorCode.USER_EXISTED);
        }
        User user = userMapper.toUser(request);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userMapper.toUserResponse(userRepository.save(user));
    }

    @Override
    @PreAuthorize("hasRole('ADMIN')")
    public Page<UserResponse> getUsers(Pageable pageable, String username, String fullname, Active active, Role role, Long position) {
        log.info("In method get users");
        Specification<User> spec = Specification.where(UserSpecification
                .hasUsername(username))
                .and(UserSpecification.hasFullname(fullname))
                .and(UserSpecification.hasActive(active))
                .and(UserSpecification.hasRole(role))
                .and(UserSpecification.hasPosition(position));
        Page<User> users = userRepository.findAll(spec, pageable);
        List<UserResponse> userResponses = users.stream().map(o ->{
                    UserResponse  userResponse = userMapper.toUserResponse(o);
                    return userResponse;
                }).toList();
        return new PageImpl<>(userResponses, pageable, users.getTotalElements());
    }
    public UserResponse getMyInfo() {
        var context = SecurityContextHolder.getContext();
        String username = context.getAuthentication().getName();
        return userMapper.toUserResponse(userRepository.findByUsername(username)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED)));
    }

    @Override
    @PreAuthorize("hasRole('ADMIN')")
    public void updatePassword(Long id, String password) {
        User user = userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
        user.setPassword(passwordEncoder.encode(password));
        userRepository.save(user);
    }

    @Override
    @PreAuthorize("hasRole('ADMIN')")
    public GeneralResponse getGeneralInfo() {

        List<Position> positions = positionRepository.findAll();
        List<GeneralResponse.Position> positionResponses = positions.stream().map(o -> {
            GeneralResponse.Position position = new GeneralResponse.Position();
            position.setId(o.getId());
            position.setPositionName(o.getPositionName());
            return position;
        }).toList();
        List<GeneralResponse.Active> actives = List.of(
                new GeneralResponse.Active("ACTIVE"),
                new GeneralResponse.Active("INACTIVE")
        );
        List<GeneralResponse.Role> roles = List.of(
                new GeneralResponse.Role("ADMIN"),
                new GeneralResponse.Role("USER")
        );
        return GeneralResponse.builder()
                .position(positionResponses)
                .active(actives)
                .role(roles)
                .build();
    }

    @Override
    @PreAuthorize("hasRole('ADMIN')")
    public UpdateUserResponse getUser(Long id) {
         User user = userRepository.findById(id)
                 .orElseThrow(() -> new RuntimeException("User not found"));
        List<DepartmentUser> departmentUsers = departmentUserRepository.findByUser(user);

        Set<Department> departments = new HashSet<>();
        for (DepartmentUser departmentUser : departmentUsers) {
            departments.add(departmentUser.getDepartment());
        }
        return userMapper.toUpdateUserResponse(user, departments, departmentUsers);
    }

    @Override
    @PreAuthorize("hasRole('ADMIN')")
    public UserResponse updateUser(UserUpdateRequest request) {

        User user = userRepository.findById(request.getId()).orElseThrow(() -> new RuntimeException("User not found"));
        user = userMapper.updateUser(user,request);
        List<DepartmentUser> departmentUsers = departmentUserRepository.findByUser(user);
        for(DepartmentUser departmentUser: departmentUsers){
            boolean isExist = false;
            for (DepartmentRequest departmentRequest: request.getDepartments()){
                if(departmentUser.getDepartment().getId().equals(departmentRequest.getId())){
                    isExist = true;
                    departmentUser.setDepartmentMain(departmentRequest.getDepartmentMain().equals(Active.ACTIVE) ? 1 : 0);
                    departmentUserRepository.save(departmentUser);
                    break;
                }

            }
            if(!isExist){
                departmentUserRepository.delete(departmentUser);
            }
        }

        return userMapper.toUserResponse(userRepository.save(user));
    }

    @Override
    @PreAuthorize("hasRole('ADMIN')")
    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }
}
