
package org.example.ims_backend.mapper;

import org.example. ims_backend.common.Active;
import org.example.ims_backend.common.Gender;
import org.example.ims_backend.common.Role;
import org.example.ims_backend.dto.request.UserCreationRequest;
import org.example.ims_backend.dto.request.UserUpdateRequest;
import org.example.ims_backend.dto.response.UserResponse;
import org.example.ims_backend.entity.User;
import org.mapstruct.Mapper;

import java.util.ArrayList;
import java.util.List;
import java.util.Date;

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
        user.setPassword(userUpdateRequest.getPassword());
        user.setEmail(userUpdateRequest.getEmail());
        user.setIsAdmin(userUpdateRequest.getRole().name().equals("ADMIN") ? 1 : 0);
        user.setIsActive(userUpdateRequest.getActive().name().equals("ACTIVE") ? 1 : 0);
        user.setPhone(userUpdateRequest.getPhone());
        user.setGender(userUpdateRequest.getGender().name().equals("MALE") ? 1 : 0);
        user.setDateOfBirth( userUpdateRequest.getDateofbirth());
        user.setHomeTown(userUpdateRequest.getHometown());
        user.setLastName(userUpdateRequest.getLastname());
        user.setFirstName(userUpdateRequest.getFirstname());
        user.setFullName(userUpdateRequest.getFullname());

        return user;
    }
    default UserResponse toUserResponse(User user){
        return UserResponse.builder()
                .id(user.getId())
                .username(user.getUsername())
                .email(user.getEmail())
                .phone(user.getPhone())
                .fullName(user.getFullName())
                .dateOfBirth(user.getDateOfBirth())
                .homeTown(user.getHomeTown())
                .gender(user.getGender() == 1 ? Gender.MALE : Gender.FEMALE)
                .role(user.getIsAdmin() == 1 ? Role.ADMIN : Role.USER)
                .Active(user.getIsActive() == 1 ? Active.ACTIVE : Active.INACTIVE)
                .build();
    }
    default
    List<UserResponse> toUserResponseList(List<User> users){
        List<UserResponse> userResponses = new ArrayList<>();
        for(User user : users){
            userResponses.add(toUserResponse(user));
        }
        return userResponses;
    };
}
