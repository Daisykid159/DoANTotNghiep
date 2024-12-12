package org.example.ims_backend.dto.admin.taskDTO.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class TaskResponse {
    Long task_id;
    String task_title;
    LocalDate created_date;
    LocalDate expired_date;
    int status;
    Long assign_department_id;
    Long target_department_id;
    String assign_department_name;
    String target_department_name;
    Long assign_user_id;
    Long targer_user_id;
    Integer progress;
    String assign_user_name;
    String target_user_name;
}
