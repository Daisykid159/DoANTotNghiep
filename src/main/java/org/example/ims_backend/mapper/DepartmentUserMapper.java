package org.example.ims_backend.mapper;

import org.example.ims_backend.common.Active;
import org.example.ims_backend.dto.admin.departmentDTO.response.DepartmentUserDTO;
import org.example.ims_backend.entity.DepartmentUser;
import org.mapstruct.Mapper;

import java.util.ArrayList;
import java.util.List;

@Mapper(componentModel = "spring")
public interface DepartmentUserMapper {
    default List<DepartmentUserDTO> toDTO(List<DepartmentUser> departmentUsers) {
        List<DepartmentUserDTO> departmentUserDTOS = new ArrayList<>();
        for(DepartmentUser departmentUser : departmentUsers) {

            departmentUserDTOS.add(DepartmentUserDTO.builder()
                            .user_id(departmentUser.getUser().getId())
                            .user_name(departmentUser.getUser().getFullName())
                            .IsActive(departmentUser.getUser().getIsActive() == 1)
                            .IsMain(departmentUser.getDepartmentMain() == 1)
                            .position_id(departmentUser.getPosition().getId())
                            .position_name(departmentUser.getPosition().getPositionName())
                        .build());
        }
        return departmentUserDTOS;
    }
}
