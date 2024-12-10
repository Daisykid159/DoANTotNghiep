package org.example.ims_backend.dto.admin.request;

import jakarta.validation.constraints.Size;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.example.ims_backend.common.Gender;
import org.example.ims_backend.common.Role;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

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
    int gender;
    String phone;
    String hometown;
    String firstname;
    String lastname;
    String fullname;
    Date dateofbirth;
    String email;
    boolean IsAdmin;
    List<DepartmentRequest> departments = new ArrayList<>() ;
    boolean IsActive;

}
