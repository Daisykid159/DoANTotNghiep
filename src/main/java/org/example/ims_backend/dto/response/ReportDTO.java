package org.example.ims_backend.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Date;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ReportDTO {
    String title;
    String name;
    Date createdDate;
    Date expiredDate;
    String targetUser;
    String priority;
    Date completedDate;
    Integer progress;
    List<String> report;
}
