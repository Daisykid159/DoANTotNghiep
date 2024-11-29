package org.example.ims_backend.dto.admin.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.example.ims_backend.common.Active;
import org.example.ims_backend.common.Role;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = lombok.AccessLevel.PRIVATE )
public class UpdateUserResponse {
     Long user_id;
     String username;
     String lastName;
     String fullName;
     boolean gender;
     String phone;
     String hometown;
     boolean Isadmin;
     boolean active;
     List<DepartmentResponse> department;

}
