package org.example.ims_backend.dto.user.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class MenuGeneral {
    Long menu_id;
    String menu_name;
    Long parent_menu_id;
    int total_task;
    boolean IsActive;
}
