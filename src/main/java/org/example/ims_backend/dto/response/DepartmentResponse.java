package org.example.ims_backend.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.example.ims_backend.common.Active;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = lombok.AccessLevel.PRIVATE )
public class DepartmentResponse {
    Long id;
    String departmentName;
    List<DepartmentUserResponse> departmentUsers;

}



