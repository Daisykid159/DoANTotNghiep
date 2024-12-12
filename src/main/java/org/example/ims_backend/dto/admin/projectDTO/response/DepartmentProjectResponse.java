package org.example.ims_backend.dto.admin.projectDTO.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class DepartmentProjectResponse {
    Long department_id;
    String department_name;
    Integer number_task;
    LocalDate created_date;
}
