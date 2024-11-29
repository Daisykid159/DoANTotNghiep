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
    Long department_id;
    Long assign_user_id;
    Long targer_user_id;
    String department_name;
    String assign_user_name;
    String target_user_name;
}
