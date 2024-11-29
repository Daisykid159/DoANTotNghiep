package org.example.ims_backend.service.admin;

import org.example.ims_backend.dto.admin.positionDTO.request.PositionRequest;
import org.example.ims_backend.dto.admin.positionDTO.response.PositionResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface PositionService {
    Page<PositionResponse> getPositions(Pageable pageable);
    boolean createPosition(PositionRequest positionRequest);
    boolean updatePosition(PositionRequest positionRequest);
}
