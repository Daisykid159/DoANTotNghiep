package org.example.ims_backend.service.user.impl;

import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.example.ims_backend.dto.user.report.request.ReportRequest;
import org.example.ims_backend.dto.user.report.request.ReviewReportRequest;
import org.example.ims_backend.dto.user.report.response.ReportResponse;
import org.example.ims_backend.entity.Report;
import org.example.ims_backend.entity.Task;
import org.example.ims_backend.mapper.ReportMapper;
import org.example.ims_backend.repository.ReportRepository;
import org.example.ims_backend.repository.TaskRepository;
import org.example.ims_backend.repository.UserRepository;
import org.example.ims_backend.service.user.ReportService;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Slf4j
@Service
@FieldDefaults(makeFinal = true, level = lombok.AccessLevel.PRIVATE)
public class ReportServiceImpl implements ReportService {
    ReportRepository reportRepository;
    TaskRepository taskRepository;
    UserRepository userRepository;
    ReportMapper reportMapper;
    @Override
    public boolean createReport(ReportRequest reportRequest) {
        try {
            reportRepository.save(
                    Report.builder()
                            .newExpiredDate(reportRequest.getNew_expired_date())
                            .content(reportRequest.getContent())
                            .status(0)
                            .type(reportRequest.getType())
                            .task(taskRepository.findById(reportRequest.getTask_id()).orElseThrow(() ->new Exception("Task not found")))
                            .createUser(userRepository.findById(reportRequest.getUser_create_id()).orElseThrow(() ->new Exception("User not found")))
                            .build()
            );
            return true;
        }catch (Exception e){
            log.error("Error in createReport", e);
            return false;
        }
    }

    @Override
    public boolean reviewReport(ReviewReportRequest reviewReportRequest) {
        try{
            Report report = reportRepository.findById(reviewReportRequest.getReport_id()).orElseThrow(() -> new Exception("Report not found"));
            report.setReviewUser(userRepository.findById(reviewReportRequest.getUser_review_id()).orElseThrow(() -> new Exception("User not found")));
            if(reviewReportRequest.isIsApprove()){
                report.setStatus(1);
            }
            else{
                report.setStatus(2);
            }
            reportRepository.save(report);
            return true;
        }catch (Exception e){
            log.error("Error in reviewReport", e);
            return false;
        }
    }

    @Override
    public boolean recallReport(Long id) {
        try {
            Report report = reportRepository.findById(id).orElseThrow(() -> new Exception("Report not found"));
            if(report.getStatus() == 0){
                reportRepository.delete(report);
                return true;
            }else {
                return false;
            }
        }catch (Exception e){
            log.error("Error in recallReport", e);
            return false;
        }
    }

    @Override
    public List<ReportResponse> getReportList(Task task) {
        return reportRepository.findAllByTask(task).stream().map(reportMapper::toReportResponse).toList();
    }
}
