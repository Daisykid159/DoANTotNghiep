package org.example.ims_backend.controller;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.example.ims_backend.dto.response.DashBoard;
import org.example.ims_backend.service.StatisticService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.time.LocalDateTime;

@RestController
@RequestMapping("/api/statistic")
@RequiredArgsConstructor
@FieldDefaults(makeFinal = true , level = AccessLevel.PRIVATE)
public class StatisticController {
    @Autowired
    StatisticService statisticService;

    @GetMapping("/get")
    public DashBoard getStatistic(
            @RequestParam(required = false) LocalDateTime from,
            @RequestParam(required = false)LocalDateTime to,
            @RequestParam(required = false)Long department_assign_id,
            @RequestParam(required = false)Long user_assign_id,
            @RequestParam(required = false)Long user_handle_id,
            @RequestParam(required = false)Long department_handle_id,
            @RequestParam(required = false)Integer status,
            @RequestParam(required = false)Integer priority,
            @RequestParam(required = false)Long user_id
            ){
        return statisticService.getStatistic(from, to, department_assign_id, user_assign_id, user_handle_id, department_handle_id, status, priority,user_id);
    }
    @GetMapping("/generate")
    public ResponseEntity<InputStreamResource> generateExcelFile(
            @RequestParam(required = false) LocalDateTime from,
            @RequestParam(required = false)LocalDateTime to,
            @RequestParam(required = false)Long department_assign_id,
            @RequestParam(required = false)Long user_assign_id,
            @RequestParam(required = false)Long user_handle_id,
            @RequestParam(required = false)Long department_handle_id,
            @RequestParam(required = false)Integer status,
            @RequestParam(required = false)Integer priority,
            @RequestParam(required = false)Long user_id,
            @RequestParam int type

    ) throws IOException {
        String filePath = "multiple_sheets.xlsx";
        statisticService.exportReport(from, to, department_assign_id, user_assign_id, user_handle_id, department_handle_id, status, priority, user_id, type, filePath);

        File file = new File(filePath);
        InputStreamResource resource = new InputStreamResource(new FileInputStream(file));

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + file.getName())
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .body(resource);
    }
}
