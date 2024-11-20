package org.example.ims_backend.dto.request;

import lombok.*;
import lombok.experimental.FieldDefaults;
import org.example.ims_backend.common.Active;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class DepartmentRequest {
    Long id;
    Active DepartmentMain;

}
