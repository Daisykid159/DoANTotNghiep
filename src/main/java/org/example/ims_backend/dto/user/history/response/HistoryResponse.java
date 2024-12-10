package org.example.ims_backend.dto.user.history.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class HistoryResponse {
    Long history_id;
    Long department_id;
    Long task_id;
    Long create_user_id;
    Long role;
    String content;
    String label_name;
    LocalDate created_date;
}
