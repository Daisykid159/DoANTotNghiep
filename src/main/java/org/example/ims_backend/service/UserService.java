package org.example.ims_backend.service;

import org.example.ims_backend.dto.request.UserCreationRequest;
import org.example.ims_backend.dto.request.UserUpdateRequest;
import org.example.ims_backend.dto.response.UserResponse;
import org.example.ims_backend.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import java.util.List;

public interface UserService {
    UserResponse createUser(UserCreationRequest request);
    Page<UserResponse> getUsers(Pageable pageable, String keyword);
    UserResponse getUser(Long id);
    UserResponse updateUser(UserUpdateRequest user);
    void deleteUser(Long id);
    UserResponse getMyInfo();
}
