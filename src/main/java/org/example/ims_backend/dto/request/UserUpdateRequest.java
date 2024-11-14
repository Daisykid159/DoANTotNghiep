package org.example.ims_backend.dto.request;

import jakarta.validation.constraints.Size;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.example.ims_backend.common.Active;
import org.example.ims_backend.common.Gender;
import org.example.ims_backend.common.Role;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UserUpdateRequest {
     Long id;
     @Size(min = 4,message = "USERNAME_INVALID")
     String username;
     @Size(min = 4,message = "PASSWORD_INVALID")
     String password;

     String firstname;
     String lastname;
     String fullname;
     Gender gender;
     String phone;
     String hometown;
     Date dateofbirth;
     Active active;
     String email;
     Role role;


}