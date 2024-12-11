package org.example.ims_backend.dto.user.taskUser.request;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class TaskUserRequest {
    Long combination_id;
    String combination_name;
    Long department_id;
}
