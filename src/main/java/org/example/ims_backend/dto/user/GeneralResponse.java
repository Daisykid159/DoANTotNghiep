package org.example.ims_backend.dto.user;

import lombok.*;
import lombok.experimental.FieldDefaults;
import org.example.ims_backend.dto.user.response.DepartmentGeneral;
import org.example.ims_backend.dto.user.response.MenuGeneral;

import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class GeneralResponse {
    int number_notification;
    List<DepartmentGeneral> departments = new ArrayList<>();
    List<MenuGeneral> menus = new ArrayList<>();
}
