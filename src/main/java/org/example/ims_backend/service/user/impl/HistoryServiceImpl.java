package org.example.ims_backend.service.user.impl;

import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.example.ims_backend.entity.History;
import org.example.ims_backend.entity.Task;
import org.example.ims_backend.entity.User;
import org.example.ims_backend.repository.HistoryRepository;
import org.example.ims_backend.service.user.HistoryService;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Slf4j
@Service
@FieldDefaults(makeFinal = true, level = lombok.AccessLevel.PRIVATE)
public class HistoryServiceImpl implements HistoryService {
    HistoryRepository historyRepository;

    @Override
    public void addHistory(User createUser, User receiveUser, Task task, String content, int status) {
            historyRepository.save(
                    History.builder()
                            .CreatedUser(createUser)
                            .receiveUser(receiveUser)
                            .task(task)
                            .status(status)
                            .content(content)
                            .build());
    }
}
