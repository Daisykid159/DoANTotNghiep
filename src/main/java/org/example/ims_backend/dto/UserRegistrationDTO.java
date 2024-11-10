package org.example.ims_backend.dto;

import jakarta.validation.constraints.NotEmpty;

public record UserRegistrationDTO(

        @NotEmpty(message = "User email must not be empty")
        String username,
        @NotEmpty(message = "User password must not be empty")
        String password,
        @NotEmpty(message = "User Role must not be empty")
        String role
){ }

