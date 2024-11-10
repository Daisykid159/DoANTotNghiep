package org.example.ims_backend.service;

import org.example.ims_backend.entity.User;

import java.util.List;

public interface UserService {
    List<User> getAllUsers();
    User findById(Long id);
    User findByUsername(String username);
}
