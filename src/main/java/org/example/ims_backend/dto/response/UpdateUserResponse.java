package org.example.ims_backend.dto.response;

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
     Long id;
     String username;
     String lastName;
     String fullName;
     String phone;
     String address;
     Role role;
     Active active;
     List<DepartmentResponse> department;

}
