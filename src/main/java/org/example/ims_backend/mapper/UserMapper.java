
package org.example.ims_backend.mapper;

import org.example. ims_backend.common.Active;
import org.example.ims_backend.common.Gender;
import org.example.ims_backend.common.Role;
import org.example.ims_backend.dto.request.UserCreationRequest;
import org.example.ims_backend.dto.request.UserUpdateRequest;
import org.example.ims_backend.dto.response.DepartmentResponse;
import org.example.ims_backend.dto.response.DepartmentUserResponse;
import org.example.ims_backend.dto.response.UpdateUserResponse;
import org.example.ims_backend.dto.response.UserResponse;
import org.example.ims_backend.entity.Department;
import org.example.ims_backend.entity.DepartmentUser;
import org.example.ims_backend.entity.User;
import org.example.ims_backend.repository.DepartmentUserRepository;
import org.mapstruct.Mapper;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.*;

@Mapper(componentModel = "spring")
public interface UserMapper {

    default
    User toUser(UserCreationRequest userCreationRequest){
        User user = new User();
        user.setUsername(userCreationRequest.getUsername());
        user.setPassword(userCreationRequest.getPassword());
        user.setEmail(userCreationRequest.getEmail());
        user.setIsAdmin(userCreationRequest.getRole().name().equals("ADMIN") ? 1 : 0);
        user.setIsActive(0);
        user.setPhone(userCreationRequest.getPhone());
        user.setGender(userCreationRequest.getGender().name().equals("MALE") ? 1 : 0);
        user.setDateOfBirth( userCreationRequest.getDateofbirth());
        user.setHomeTown(userCreationRequest.getHometown());
        user.setLastName(userCreationRequest.getLastname());
        user.setFirstName(userCreationRequest.getFirstname());
        user.setFullName(userCreationRequest.getFullname());

        return user;
    }
    default User updateUser(User user, UserUpdateRequest userUpdateRequest){
        user.setUsername(userUpdateRequest.getUsername());
        user.setIsAdmin(userUpdateRequest.getRole().name().equals("ADMIN") ? 1 : 0);
        user.setIsActive(userUpdateRequest.getActive().name().equals("ACTIVE") ? 1 : 0);
        user.setPhone(userUpdateRequest.getPhone());
        user.setGender(userUpdateRequest.getGender().name().equals("MALE") ? 1 : 0);
        user.setDateOfBirth( userUpdateRequest.getDateofbirth());
        user.setHomeTown(userUpdateRequest.getHometown());
        user.setLastName(userUpdateRequest.getLastname());
        user.setFullName(userUpdateRequest.getFullname());

        return user;
    }
    default UserResponse toUserResponse(User user){
        return UserResponse.builder()
                .id(user.getId())
                .username(user.getUsername())
                .fullName(user.getFullName())
                .Active(user.getIsActive() == 1 ? Active.ACTIVE : Active.INACTIVE)
                .build();
    }
    default UpdateUserResponse toUpdateUserResponse(User user, Set<Department> departments, List<DepartmentUser> departmentUsers){
        List<DepartmentResponse> departmentResponses = new ArrayList<>();
        for (Department department : departments){
            List<DepartmentUserResponse>  departmentUserResponses = new ArrayList<>();
            for(DepartmentUser departmentUser: departmentUsers){
                DepartmentUserResponse departmentUserResponse = new DepartmentUserResponse();
                if(department.getId().equals(departmentUser.getDepartment().getId())){
                    departmentUserResponse.setPosition(departmentUser.getPosition().getPositionName());
                    departmentUserResponse.setPositionId(departmentUser.getPosition().getId());
                    departmentUserResponse.setDepartmentMain(departmentUser.getDepartmentMain() == 1 ? Active.ACTIVE : Active.INACTIVE);
                    departmentUserResponses.add(departmentUserResponse);
                }

            }

            departmentResponses.add(DepartmentResponse.builder()
                    .id(department.getId())
                    .departmentName(department.getDepartmentName())
                    .departmentUsers(departmentUserResponses)
                    .build());
        }
        return UpdateUserResponse.builder()
                .id(user.getId())
                .lastName(user.getLastName())
                .username(user.getUsername())
                .fullName(user.getFullName())
                .phone(user.getPhone())
                .address(user.getHomeTown())
                .active(user.getIsActive() == 1 ? Active.ACTIVE : Active.INACTIVE)
                .role(user.getIsAdmin() == 1 ? Role.ADMIN : Role.USER)
                .department(departmentResponses)
                .build();
    }
}
