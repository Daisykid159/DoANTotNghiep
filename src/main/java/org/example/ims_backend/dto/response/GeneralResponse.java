package org.example.ims_backend.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

import java.util.List;
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = lombok.AccessLevel.PRIVATE )
public class GeneralResponse {
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    @FieldDefaults(level = lombok.AccessLevel.PRIVATE )
    public static class Active {
        String active;
    }
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    @FieldDefaults(level = lombok.AccessLevel.PRIVATE )
    public static class Role {
        String role;
    }
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    @FieldDefaults(level = lombok.AccessLevel.PRIVATE )
    public static class Position {
        Long id;
        String positionName;
    }
    List<Position> position;
    List<Active> active;
    List<Role> role;
}
