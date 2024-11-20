package org.example.ims_backend.controller.Admin;

import jakarta.validation.Valid;
import org.example.ims_backend.common.Active;
import org.example.ims_backend.common.Role;
import org.example.ims_backend.dto.request.UserCreationRequest;
import org.example.ims_backend.dto.request.UserUpdateRequest;
import org.example.ims_backend.dto.response.ApiReponse;
import org.example.ims_backend.dto.response.GeneralResponse;
import org.example.ims_backend.dto.response.UpdateUserResponse;
import org.example.ims_backend.dto.response.UserResponse;
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

@RequestMapping("/api/admin")
@RestController
public class UserController {
    private static final Logger log = LoggerFactory.getLogger(UserController.class);
    @Autowired
    private UserService userService;
    @PostMapping("/createUser")
    ApiReponse<UserResponse> createUser(@RequestBody @Valid UserCreationRequest request) {
        ApiReponse<UserResponse> response = new ApiReponse<>();
        response.setResult(userService.createUser(request));
        return response;
    }
    @GetMapping("/users")
    ResponseEntity<Page<UserResponse>> getUsers(
            @RequestParam(defaultValue = "0", required = false) int page,
            @RequestParam(defaultValue = "15", required = false) int size,
            @RequestParam(required = false) String username,
            @RequestParam(required = false) String fullname,
            @RequestParam(required = false) Active active,
            @RequestParam(required = false) Role role,
            @RequestParam(required = false) Long position
    ) {
        var authentication = SecurityContextHolder.getContext().getAuthentication();
        log.info("User: {}", authentication.getName());
        log.warn("Role: {}", authentication.getAuthorities());
        PageRequest pageable = PageRequest.of(page,size, Sort.by(Sort.Direction.DESC, "createdDate"));
        Page<UserResponse> users = userService.getUsers(pageable, username, fullname, active, role, position);
        return ResponseEntity.ok(users);
    }
    @GetMapping("/users/{id}")
    UpdateUserResponse getUser(@PathVariable Long id) {
        return userService.getUser(id);
    }
    @PutMapping("/users")
    UserResponse updateUser(@RequestBody UserUpdateRequest user) {
        return userService.updateUser(user);
    }
    @PutMapping("/upPassword")
    String updatePassword(@RequestParam String password, @RequestParam Long idUser) {
        userService.updatePassword(idUser, password);
        return "Password updated";
    }
    @DeleteMapping("/deletedUser/{id}")
    String deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return "User deleted";
    }
    @GetMapping("/general")
    GeneralResponse getGeneral() {
        return userService.getGeneralInfo();
    }
    @GetMapping("/my-info")
    UserResponse getMyInfo() {
        return userService.getMyInfo();
    }
}
