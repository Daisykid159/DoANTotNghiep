package org.example.ims_backend.controller;

import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.example.ims_backend.dto.UserRegistrationDTO;
import org.example.ims_backend.service.AuthService;
import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/auth")
@Slf4j
public class AuthenticationController {

    private final AuthService authService;

    @PostMapping("/sign-in")
    public ResponseEntity<?> authenticateUser(Authentication authentication, HttpServletResponse response) {
        log.info("[AuthController:authenticateUser] Attempting to authenticate user: {}", authentication.getName());
        return ResponseEntity.ok(authService.getJwtTokensAfterAuthentication(authentication, response));
    }

    @PostMapping("/refresh-token")
    public ResponseEntity<?> getAccessToken(@RequestHeader(HttpHeaders.AUTHORIZATION) String authorizationHeader) {
        log.info("[AuthController:getAccessToken] Attempting to refresh token.");
        return ResponseEntity.ok(authService.getAccessTokenUsingRefreshToken(authorizationHeader));
    }

    @PostMapping("/sign-up")
    public ResponseEntity<?> registerUser(@Valid @RequestBody UserRegistrationDTO userRegistrationDto,
                                          BindingResult bindingResult, HttpServletResponse httpServletResponse) {
        log.info("[AuthController:registerUser] Signup process started for user: {}", userRegistrationDto.username());

        // Kiểm tra lỗi từ BindingResult
        if (bindingResult.hasErrors()) {
            List<String> errorMessages = bindingResult.getAllErrors().stream()
                    .map(DefaultMessageSourceResolvable::getDefaultMessage)
                    .toList();
            log.error("[AuthController:registerUser] Errors in user registration: {}", errorMessages);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorMessages);
        }

        // Tiến hành đăng ký người dùng
        try {
            var responseEntity = authService.registerUser(userRegistrationDto, httpServletResponse);
            log.info("[AuthController:registerUser] User registered successfully: {}", userRegistrationDto.username());
            return ResponseEntity.ok(responseEntity);
        } catch (Exception e) {
            log.error("[AuthController:registerUser] Error registering user: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Internal Server Error");
        }
    }
}
