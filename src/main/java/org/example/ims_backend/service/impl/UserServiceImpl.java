package org.example.ims_backend.service.impl;

import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.example.ims_backend.common.ErrorCode;
import org.example.ims_backend.dto.request.AppException;
import org.example.ims_backend.dto.request.UserCreationRequest;
import org.example.ims_backend.dto.request.UserUpdateRequest;
import org.example.ims_backend.dto.response.UserResponse;
import org.example.ims_backend.repository.specification.UserSpecification;
import org.example.ims_backend.entity.User;
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

import java.util.List;
@RequiredArgsConstructor
@FieldDefaults(makeFinal = true, level = lombok.AccessLevel.PRIVATE)
@Service
@Slf4j
public class UserServiceImpl implements UserService {
     UserRepository userRepository;
     UserMapper userMapper;
     PasswordEncoder passwordEncoder;
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
    public Page<UserResponse> getUsers(Pageable pageable, String keyword) {
        log.info("In method get users");
        Specification<User> spec = Specification.where(UserSpecification.hasKeyword(keyword));
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
    @PostAuthorize("returnObject.username == authentication.name")
    public UserResponse getUser(Long id) {
        return userMapper.toUserResponse(userRepository.findById(id).
                orElseThrow(() -> new RuntimeException("User not found")));
    }

    @Override
    public UserResponse updateUser(UserUpdateRequest request) {

        User user = userRepository.findById(request.getId()).orElseThrow(() -> new RuntimeException("User not found"));
        user = userMapper.updateUser(user,request);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userMapper.toUserResponse(userRepository.save(user));
    }

    @Override
    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }
}
