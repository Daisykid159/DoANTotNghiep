package org.example.ims_backend.dto.user.taskUser.request;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CreateTaskUserRequest {
    Long combination_department;
    Long combination_user;
    LocalDate created_date;
}
