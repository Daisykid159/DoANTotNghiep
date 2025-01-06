package org.example.ims_backend.entity;

import lombok.*;
import lombok.experimental.FieldDefaults;
import org.example.ims_backend.common.State;
import org.example.ims_backend.dto.user.task.response.TaskStatisticResponse;

import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Statistic {
    Long content_id;
    String content;
    Integer total_task;
    State pending;
    State completed;
    List<TaskStatisticResponse> tasks = new ArrayList<>();
}
