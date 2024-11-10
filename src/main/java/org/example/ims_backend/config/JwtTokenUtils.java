package org.example.ims_backend.config;
import java.time.Instant;
import java.util.Objects;
import java.util.Optional;

import org.example.ims_backend.entity.SecurityUser;
import org.example.ims_backend.entity.User;
import org.example.ims_backend.repository.UserRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Component;


import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class JwtTokenUtils {

    private final UserRepository repository;

    public String getUserName(Jwt jwtToken){
        return jwtToken.getSubject();
    }

    public boolean isTokenValid(Jwt jwtToken, UserDetails userDetails){
        final String userName = getUserName(jwtToken);
        boolean isTokenExpired = getIfTokenIsExpired(jwtToken);
        boolean isTokenUserSameAsDatabase = userName.equals(userDetails.getUsername());
        return !isTokenExpired  && isTokenUserSameAsDatabase;
    }

    private boolean getIfTokenIsExpired(Jwt jwtToken) {
        return Objects.requireNonNull(jwtToken.getExpiresAt()).isBefore(Instant.now());
    }

    public UserDetails userDetails(String username){
        Optional<User> user = repository.findByUsername(username);
        if(user.isEmpty()){
            throw new UsernameNotFoundException("User not found with username: " + username);
        }
        return new SecurityUser(user.get());
    }
}
