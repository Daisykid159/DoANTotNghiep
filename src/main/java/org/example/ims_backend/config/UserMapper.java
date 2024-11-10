package org.example.ims_backend.config;

import org.example.ims_backend.common.RoleLogin;
import org.example.ims_backend.dto.UserRegistrationDTO;
import org.example.ims_backend.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class UserMapper {

    private final PasswordEncoder passwordEncoder;
    public User convertToEntity(UserRegistrationDTO userRegistrationDto) {
        User userInfoEntity = new User();
        userInfoEntity.setUsername(userRegistrationDto.username());
        userInfoEntity.setRole(RoleLogin.valueOf("ROLE_"+userRegistrationDto.role()));
        userInfoEntity.setPassword(passwordEncoder.encode(userRegistrationDto.password()));
        return userInfoEntity;
    }
}

