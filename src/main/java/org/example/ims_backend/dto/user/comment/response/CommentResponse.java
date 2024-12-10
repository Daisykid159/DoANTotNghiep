package org.example.ims_backend.dto.user.comment.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CommentResponse {
    Long comment_id;
    Long task_id;
    Long create_user_id;
    String create_user_name;
    Long parent_comment_id;
    String content;
    Long department_id;
    String department_name;
    LocalDate created_date;

}
