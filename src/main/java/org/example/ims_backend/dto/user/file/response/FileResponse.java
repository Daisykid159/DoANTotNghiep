package org.example.ims_backend.dto.user.file.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class FileResponse {
    Long file_id;
    Long task_id;
    Long user_id;
    String user_name;
    String file_name;
    String file_local_name;
    String file_path;
    String extension;
    Long size;
    boolean can_delete;
    LocalDate created_date;
    LocalDate updated_date;
    LocalDate deleted_date;
}
