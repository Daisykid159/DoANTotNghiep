package org.example.ims_backend.controller;

import jakarta.validation.Valid;
import org.example.ims_backend.dto.request.UserCreationRequest;
import org.example.ims_backend.dto.request.UserUpdateRequest;
import org.example.ims_backend.dto.response.ApiReponse;
import org.example.ims_backend.dto.response.UserResponse;
import org.example.ims_backend.entity.User;
import org.example.ims_backend.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class UserController {
    private static final Logger log = LoggerFactory.getLogger(UserController.class);
    @Autowired
    private UserService userService;
    @PostMapping("/users")
    ApiReponse<UserResponse> createUser(@RequestBody @Valid UserCreationRequest request) {
        ApiReponse<UserResponse> response = new ApiReponse<>();
        response.setResult(userService.createUser(request));
        return response;
    }
    @GetMapping("/users")
    ResponseEntity<Page<UserResponse>> getUsers(
            @RequestParam(defaultValue = "0", required = false) int page,
            @RequestParam(required = false) String keyword
    ) {
        var authentication = SecurityContextHolder.getContext().getAuthentication();
        log.info("User: {}", authentication.getName());
        log.warn("Role: {}", authentication.getAuthorities());
        PageRequest pageable = PageRequest.of(page, 10, Sort.by(Sort.Direction.DESC, "createdDate"));
        Page<UserResponse> users = userService.getUsers(pageable, keyword);
        return ResponseEntity.ok(users);
    }
    @GetMapping("/users/{id}")
    UserResponse getUser(@PathVariable Long id) {
        return userService.getUser(id);
    }
    @PutMapping("/users")
    UserResponse updateUser(@RequestBody UserUpdateRequest user) {
        return userService.updateUser(user);
    }
    @DeleteMapping("/users/{id}")
    String deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return "User deleted";
    }
    @GetMapping("/my-info")
    UserResponse getMyInfo() {
        return userService.getMyInfo();
    }
}
