package org.example.ims_backend.controller.Admin;

import org.example.ims_backend.dto.admin.positionDTO.request.PositionRequest;
import org.example.ims_backend.dto.admin.positionDTO.response.PositionResponse;
import org.example.ims_backend.service.admin.PositionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/api/admin")
@RestController
public class PositionController {
    @Autowired
    private PositionService positionService;

    @GetMapping("/positions")
    ResponseEntity<Page<PositionResponse>> getPositions(
                                        @RequestParam(defaultValue = "0", required = false) int page,
                                        @RequestParam(defaultValue = "15", required = false) int size
                                        )
    {
        PageRequest pageable = PageRequest.of(page,size, Sort.by(Sort.Direction.ASC, "id"));
        Page<PositionResponse> positions = positionService.getPositions(pageable);
        return ResponseEntity.ok(positions);
    }
    @PostMapping("/createPosition")
    boolean createPosition(@RequestBody PositionRequest request) {
        return positionService.createPosition(request);
    }
    @PutMapping("/updatePosition/{id}")
    boolean updatePosition(@RequestBody PositionRequest request,
                           @PathVariable Long id) {
        request.setPosition_id(id);
        return positionService.updatePosition(request);
    }
}
