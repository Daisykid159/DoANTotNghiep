package org.example.ims_backend.dto.admin.request;

import jakarta.validation.constraints.Size;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.example.ims_backend.common.Active;
import org.example.ims_backend.common.Gender;
import org.example.ims_backend.common.Role;

import java.util.Date;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UserUpdateRequest {
     Long user_id;
     @Size(min = 4,message = "USERNAME_INVALID")
     String username;
     String firstname;
     String lastname;
     String fullname;
     boolean gender;
     String email;
     String phone;
     String hometown;
     Date dateofbirth;
     boolean isactive;
     boolean isadmin;
     List<DepartmentRequest> departments;

}