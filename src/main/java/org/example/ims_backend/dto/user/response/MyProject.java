package org.example.ims_backend.dto.user.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class MyProject {
    Long project_id;
    String project_name;
    String content;
    Integer status;
    Date expired_date;
}
