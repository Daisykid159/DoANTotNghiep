package org.example.ims_backend.dto.admin.projectDTO.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;
import java.util.Date;
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ProjectResponse {
    Long project_id;
    String project_name;
    String content;
    Integer number_task;
    Integer status;
    LocalDate created_date;
    LocalDate expired_date;
    LocalDate completed_date;
}
