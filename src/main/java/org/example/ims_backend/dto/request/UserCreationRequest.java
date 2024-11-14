package org.example.ims_backend.dto.request;

import jakarta.validation.constraints.Size;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.example.ims_backend.common.Gender;
import org.example.ims_backend.common.Role;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UserCreationRequest {
    @Size(min = 4,message = "USERNAME_INVALID")
    String username;
    @Size(min = 4,message = "PASSWORD_INVALID")
    String password;
    Gender gender;
    String phone;
    String hometown;
    String firstname;
    String lastname;
    String fullname;
    Date dateofbirth;
    String email;
    Role role;

}
