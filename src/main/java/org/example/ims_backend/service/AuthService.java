package org.example.ims_backend.service;

import jakarta.servlet.http.HttpServletResponse;
import org.example.ims_backend.dto.AuthResponseDTO;
import org.example.ims_backend.dto.UserRegistrationDTO;
import org.springframework.security.core.Authentication;

public interface AuthService {
    AuthResponseDTO getJwtTokensAfterAuthentication(Authentication authentication, HttpServletResponse response);
    Object getAccessTokenUsingRefreshToken(String authorizationHeader);
    AuthResponseDTO registerUser(UserRegistrationDTO userRegistrationDto, HttpServletResponse httpServletResponse);
}