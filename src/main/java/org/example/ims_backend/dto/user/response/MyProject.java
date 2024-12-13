package org.example.ims_backend.dto.user.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Date;
import java.util.Objects;

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

    @Override
    public boolean equals(Object o) {
        if (this == o) return true; // Kiểm tra tham chiếu
        if (o == null || getClass() != o.getClass()) return false; // Kiểm tra kiểu dữ liệu
        MyProject that = (MyProject) o;
        return Objects.equals(project_id, that.project_id); // So sánh project_id
    }

    @Override
    public int hashCode() {
        return Objects.hash(project_id); // Tạo mã băm dựa trên project_id
    }
}
