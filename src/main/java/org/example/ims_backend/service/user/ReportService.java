package org.example.ims_backend.service.user;

import org.example.ims_backend.dto.user.report.request.ReportRequest;
import org.example.ims_backend.dto.user.report.request.ReviewReportRequest;

public interface ReportService {
    boolean createReport(ReportRequest reportRequest);
    boolean reviewReport(ReviewReportRequest reviewReportRequest);
    boolean recallReport(Long id);
}
