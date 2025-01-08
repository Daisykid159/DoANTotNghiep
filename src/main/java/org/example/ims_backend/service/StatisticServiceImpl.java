package org.example.ims_backend.service;

import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.example.ims_backend.common.State;
import org.example.ims_backend.dto.response.*;
import org.example.ims_backend.dto.user.task.response.TaskStatisticResponse;
import org.example.ims_backend.entity.*;
import org.example.ims_backend.mapper.StatisticMapper;
import org.example.ims_backend.repository.*;
import org.example.ims_backend.repository.specification.ProjectSpecification;
import org.example.ims_backend.repository.specification.StatisticSpecification;
import org.example.ims_backend.repository.specification.TaskSpecification;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.*;


@Slf4j
@RequiredArgsConstructor
@FieldDefaults(makeFinal = true, level = lombok.AccessLevel.PRIVATE)
@Service
public class StatisticServiceImpl implements StatisticService {
    ProjectRepository projectRepository;
    DepartmentRepository departmentRepository;
    UserRepository userRepository;
    TaskRepository taskRepository;
    StatisticMapper statisticMapper;
    TaskUserRepository taskUserRepository;
    ReportRepository reportRepository;
    @Override
    public DashBoard getStatistic(LocalDateTime from, LocalDateTime to, Long department_assign_id, Long user_assign_id, Long user_handle_id, Long department_handle_id, Integer status, Integer priority , Long user_id) {

          try{
            List<Task> tasks = searchByTask(from, to, department_assign_id, user_assign_id, user_handle_id, department_handle_id, status, priority, user_id);
            return  DashBoard.builder()
                    .Project(StatisticProject(tasks))
                    .Department(StatisticDepartment(tasks))
                    .User(StatisticUser(tasks))
                    .Priority(StatisticPriority(tasks))
                    .build();
        }catch (Exception e){
            throw new RuntimeException(e.getMessage());
        }
    }
    private  List<Task> searchByTask(LocalDateTime from, LocalDateTime to, Long department_assign_id, Long user_assign_id, Long user_handle_id, Long department_handle_id, Integer status, Integer priority , Long user_id) {
        Department department_assign = null;
        if (department_assign_id != null) department_assign = departmentRepository.findById(department_assign_id)
                .orElse(null);
        Department department_handle = null;
        if (department_handle_id != null) department_handle = departmentRepository.findById(department_handle_id)
                .orElse(null);
        User user_assign = null;
        if (user_assign_id != null) user_assign = userRepository.findById(user_assign_id)
                .orElse(null);
        User user_handle = null;
        if (user_handle_id != null) user_handle = userRepository.findById(user_handle_id)
                .orElse(null);
        User user = null;
        if (user_id != null) user = userRepository.findById(user_id)
                .orElse(null);
        try {

            Specification<Task> specification = Specification.where(
                            StatisticSpecification.hasParticipant(user))
                    .and(StatisticSpecification.getTaskByDate(from, to))
                    .and(StatisticSpecification.getTaskByPriority(priority))
                    .and(StatisticSpecification.getTaskByStatus(status))
                    .and(StatisticSpecification.getTaskByAssign(department_assign, user_assign))
                    .and(StatisticSpecification.getTaskByHandle(department_handle, user_handle)

                    );
            return taskRepository.findAll(specification);
        } catch (Exception e) {
            log.error(e.getMessage());
            throw new RuntimeException(e.getMessage());
        }
    }
    @Override
    public void exportReport(LocalDateTime from, LocalDateTime to, Long department_assign_id, Long user_assign_id, Long user_handle_id, Long department_handle_id, Integer status, Integer priority, Long user_id, int type ,String filePath) throws IOException {
        Workbook workbook = new XSSFWorkbook();
        String link ="";

        if(type == 1){
            link = "src/main/resources/Report/template_statistics_projects.xlsx";
        }else if(type == 2){
            link = "src/main/resources/Report/template_statistics_departments.xlsx";
        }
        FileInputStream fis = new FileInputStream(link);
        Workbook workbooks = new XSSFWorkbook(fis);
        Sheet sourceSheet = workbooks.getSheetAt(0);
        List<Task> tasks = searchByTask(from, to, department_assign_id, user_assign_id, user_handle_id, department_handle_id, status, priority, user_id);
        List<ReportProject> reportProjects = type == 1 ? reportProject(tasks) : reportDepartment(tasks);

        for (ReportProject reportProject : reportProjects) {
            String sheetName = reportProject.getProjectName();
            Sheet sheet = workbook.createSheet(sheetName);
            copySheet(sourceSheet, sheet);
            int startingRow = 6;
            int number = 1;

            for (ReportDTO reportDTO : reportProject.getTasks()) {
                Row row = sheet.createRow(startingRow + number);

                // Tạo CellStyle và Font cho hàng
                CellStyle rowStyle = workbook.createCellStyle();
                rowStyle.setAlignment(HorizontalAlignment.CENTER); // Canh giữa theo chiều ngang
                rowStyle.setVerticalAlignment(VerticalAlignment.CENTER); // Canh giữa theo chiều dọc
                Font rowFont = workbook.createFont();
                rowFont.setFontHeightInPoints((short) 12); // Chỉnh font size
                rowFont.setFontName("Arial"); // Chọn font
                rowStyle.setFont(rowFont);
                rowStyle.setWrapText(true); // Bật xuống dòng nếu nội dung quá dài

                // Điền dữ liệu vào các ô
                row.createCell(0).setCellValue(number);
                row.createCell(1).setCellValue(reportDTO.getTitle());
                row.createCell(2).setCellValue(reportDTO.getName());
                row.createCell(3).setCellValue(new SimpleDateFormat("dd/MM/yyyy").format(reportDTO.getCreatedDate()));
                row.createCell(4).setCellValue(new SimpleDateFormat("dd/MM/yyyy").format(reportDTO.getExpiredDate()));
                row.createCell(5).setCellValue(reportDTO.getTargetUser());
                row.createCell(6).setCellValue(reportDTO.getPriority());
                row.createCell(7).setCellValue(reportDTO.getCompletedDate() == null ? "" : new SimpleDateFormat("dd/MM/yyyy").format(reportDTO.getCompletedDate()));
                row.createCell(8).setCellValue(reportDTO.getProgress() + "%");

                // Điền danh sách vào ô cuối cùng
                StringBuilder stringBuilder = new StringBuilder();
                for (String s : reportDTO.getReport()) {
                    stringBuilder.append(s).append("\n");
                }
                Cell cell = row.createCell(9);
                cell.setCellValue(stringBuilder.toString());

                // Áp dụng style cho toàn bộ các ô trong hàng
                for (int i = 0; i <= 9; i++) {
                    row.getCell(i).setCellStyle(rowStyle);
                }

                // Điều chỉnh chiều cao của hàng
                if (reportDTO.getReport().size() > 1) {
                    row.setHeightInPoints(reportDTO.getReport().size() * 35);
                } else {
                    row.setHeightInPoints(70);
                }

                number++;
            }

            // Điều chỉnh độ rộng các cột sau khi dữ liệu đã được ghi
                sheet.autoSizeColumn(1); // Tự động điều chỉnh độ rộng cột
        }


        // Ghi file Excel ra ổ đĩa
        FileOutputStream fos = new FileOutputStream(filePath);
        workbook.write(fos);
        workbooks.close();
        fis.close();
        // Đóng tài nguyên
        workbook.close();
        fos.close();

        System.out.println("Tạo file Excel thành công tại: " + filePath);
    }

    private static void copySheet(Sheet sourceSheet, Sheet targetSheet) {
        // Sao chép chiều rộng các cột
        for (int colIndex = 0; colIndex < sourceSheet.getRow(0).getLastCellNum(); colIndex++) {
            targetSheet.setColumnWidth(colIndex, sourceSheet.getColumnWidth(colIndex));
        }

        // Sao chép từng hàng
        for (int i = 0; i <= sourceSheet.getLastRowNum(); i++) {
            Row sourceRow = sourceSheet.getRow(i);
            Row targetRow = targetSheet.createRow(i);

            if (sourceRow != null) {
                // Sao chép chiều cao của hàng
                targetRow.setHeight(sourceRow.getHeight());

                for (int j = 0; j < sourceRow.getLastCellNum(); j++) {
                    Cell sourceCell = sourceRow.getCell(j);
                    Cell targetCell = targetRow.createCell(j);

                    if (sourceCell != null) {
                        if (i == 3) {  // Dòng 4 (chỉ số 3)
                            modifyCell(sourceCell,targetCell); // Sửa nội dung dòng 4
                        } else {
                            copyCell(sourceCell, targetCell);  // Sao chép các dòng khác
                        }
                    }
                }
            }
        }

        // Sao chép các merged regions (ô hợp nhất)
        for (int i = 0; i < sourceSheet.getNumMergedRegions(); i++) {
            targetSheet.addMergedRegion(sourceSheet.getMergedRegion(i));
        }
    }
    private static void modifyCell(Cell sourceCell, Cell targetCell){
        Workbook targetWorkbook = targetCell.getSheet().getWorkbook();
        CellStyle newCellStyle = targetWorkbook.createCellStyle();
        newCellStyle.cloneStyleFrom(sourceCell.getCellStyle());
        targetCell.setCellStyle(newCellStyle);
        if (sourceCell.getCellType() != CellType.BLANK) {
            targetCell.setCellValue("BÁO CÁO THỐNG KÊ CÔNG VIỆC");
        }
    }
    private static void copyCell(Cell sourceCell, Cell targetCell) {
        // Tạo CellStyle mới từ workbook đích
        Workbook targetWorkbook = targetCell.getSheet().getWorkbook();
        CellStyle newCellStyle = targetWorkbook.createCellStyle();
        newCellStyle.cloneStyleFrom(sourceCell.getCellStyle());
        targetCell.setCellStyle(newCellStyle);

        // Sao chép giá trị của cell
        switch (sourceCell.getCellType()) {
            case STRING:
                targetCell.setCellValue(sourceCell.getStringCellValue());
                break;
            case NUMERIC:
                targetCell.setCellValue(sourceCell.getNumericCellValue());
                break;
            case BOOLEAN:
                targetCell.setCellValue(sourceCell.getBooleanCellValue());
                break;
            case FORMULA:
                targetCell.setCellFormula(sourceCell.getCellFormula());
                break;
            case BLANK:
                targetCell.setBlank();
                break;
            default:
                break;
        }
    }

    private List<Statistic> StatisticProject (List<Task> tasks){
        Map<Long,Statistic> map = new HashMap<>();
        for(Task task : tasks){
            if(map.containsKey(task.getProject().getId())){
                Statistic statistic = map.get(task.getProject().getId());
                statistic.setTotal_task(statistic.getTotal_task()+1);
                if(task.getStatus() == 5){
                    if(task.getCompletedDate().compareTo(task.getExpiredDate()) > 0){
                        statistic.setCompleted_overdue(statistic.getCompleted_overdue()+1);
                    }else {
                        statistic.setCompleted_on_time(statistic.getCompleted_on_time()+1);
                    }
                }else {
                    if(task.getExpiredDate().compareTo(new Date()) >= 0){
                        statistic.setPending_on_time(statistic.getPending_on_time()+1);
                    }else {
                        statistic.setPending_overdue(statistic.getPending_overdue()+1);
                    }
                }
            }else {
                int pending_on_time = 0;
                int pending_overdue = 0;
                int completed_on_time = 0;
                int completed_overdue = 0;
                if(task.getStatus() == 5){
                    if(task.getCompletedDate().compareTo(task.getExpiredDate()) > 0){
                        completed_overdue = 1;
                    }else {
                        completed_on_time = 1;
                    }
                }else {
                    if(task.getExpiredDate().compareTo(new Date()) >= 0){
                        pending_on_time = 1;
                    }else {
                        pending_overdue = 1;
                    }
                }
                Statistic statistic = Statistic.builder()
                        .id(task.getProject().getId())
                        .name(task.getProject().getName())
                        .pending_on_time(pending_on_time)
                        .pending_overdue(pending_overdue)
                        .completed_on_time(completed_on_time)
                        .completed_overdue(completed_overdue)
                        .total_task(1)
                        .build();
                map.put(task.getProject().getId(),statistic);
            }
        }
        return new ArrayList<>(map.values());
    }
    private List<ReportProject> reportProject(List<Task> tasks){
        Map<Long,ReportProject> map = new HashMap<>();
        for(Task task : tasks){
            List<Report> reports = reportRepository.findAllByTask(task);
            List<String> list = new ArrayList<>();
            for (Report report : reports){
                list.add("[ "+new SimpleDateFormat("dd/MM/yyyy").format(report.getCreatedDate()) + " - "+report.getCreateUser().getFullName() +" - " +mapReport(report.getType()) +" ]: "+report.getContent());
            }
            ReportDTO reportDTO = ReportDTO.builder()
                    .title(task.getTitle())
                    .name(task.getTargetDepartment().getDepartmentName())
                    .createdDate(task.getCreatedDate())
                    .expiredDate(task.getExpiredDate())
                    .completedDate(task.getCompletedDate())
                    .progress(task.getProgress())
                    .targetUser(task.getTargetUser().getFullName())
                    .report(list)
                    .priority(task.getPriority() == 0 ? "Binh thuong" : task.getPriority() == 1 ? "Trong tam" : "Rat trong tam")
                    .build();
            if(map.containsKey(task.getProject().getId())){
                ReportProject reportProject = map.get(task.getProject().getId());
                List<ReportDTO> reportDTOS = reportProject.getTasks();

                reportDTOS.add(reportDTO);
                reportProject.setTasks(reportDTOS);
            }else {
                List<ReportDTO> reportDTOS = new ArrayList<>();
                reportDTOS.add(reportDTO);
                ReportProject reportProject = ReportProject.builder()
                        .ProjectName(task.getProject().getName())
                        .tasks(reportDTOS)
                        .build();

                map.put(task.getProject().getId(),reportProject);
            }
        }
        return new ArrayList<>(map.values());

    }
    private List<ReportProject> reportDepartment(List<Task> tasks){
        Map<Long,ReportProject> map = new HashMap<>();
        for(Task task : tasks){
            List<Report> reports = reportRepository.findAllByTask(task);
            List<String> list = new ArrayList<>();
            for (Report report : reports){
                list.add("[ "+new SimpleDateFormat("dd/MM/yyyy").format(report.getCreatedDate()) + " - "+report.getCreateUser().getFullName() +" - " +mapReport(report.getType()) +" ]: "+report.getContent());
            }
            ReportDTO reportDTO = ReportDTO.builder()
                    .title(task.getTitle())
                    .name(task.getProject().getName())
                    .createdDate(task.getCreatedDate())
                    .expiredDate(task.getExpiredDate())
                    .completedDate(task.getCompletedDate())
                    .progress(task.getProgress())
                    .targetUser(task.getTargetUser().getFullName())
                    .report(list)
                    .priority(task.getPriority() == 0 ? "Binh thuong" : task.getPriority() == 1 ? "Trong tam" : "Rat trong tam")
                    .build();
            if(map.containsKey(task.getProject().getId())){
                ReportProject reportProject = map.get(task.getProject().getId());
                List<ReportDTO> reportDTOS = reportProject.getTasks();

                reportDTOS.add(reportDTO);
                reportProject.setTasks(reportDTOS);
            }else {
                List<ReportDTO> reportDTOS = new ArrayList<>();
                reportDTOS.add(reportDTO);
                ReportProject reportProject = ReportProject.builder()
                        .ProjectName(task.getTargetDepartment().getDepartmentName())
                        .tasks(reportDTOS)
                        .build();

                map.put(task.getProject().getId(),reportProject);
            }
        }
        return new ArrayList<>(map.values());

    }
    private List<Statistic> StatisticDepartment (List<Task> tasks) {
        Map<Long,Statistic> map = new HashMap<>();
        for(Task task : tasks){
            List<Department> departments = taskUserRepository.findDistinctDepartmentByTaskId(task.getId());
            for(Department department : departments){
                if(map.containsKey(department.getId())){
                    Statistic statistic = map.get(department.getId());
                    statistic.setTotal_task(statistic.getTotal_task()+1);
                    if(task.getStatus() == 5){
                        if(task.getCompletedDate().compareTo(task.getExpiredDate()) > 0){
                            statistic.setCompleted_overdue(statistic.getCompleted_overdue()+1);
                        }else {
                            statistic.setCompleted_on_time(statistic.getCompleted_on_time()+1);
                        }
                    }else {
                        if(task.getExpiredDate().compareTo(new Date()) >= 0){
                            statistic.setPending_on_time(statistic.getPending_on_time()+1);
                        }else {
                            statistic.setPending_overdue(statistic.getPending_overdue()+1);
                        }
                    }
                }else {
                    int pending_on_time = 0;
                    int pending_overdue = 0;
                    int completed_on_time = 0;
                    int completed_overdue = 0;
                    if(task.getStatus() == 5){
                        if(task.getCompletedDate().compareTo(task.getExpiredDate()) > 0){
                            completed_overdue = 1;
                        }else {
                            completed_on_time = 1;
                        }
                    }else {
                        if(task.getExpiredDate().compareTo(new Date()) >= 0){
                            pending_on_time = 1;
                        }else {
                            pending_overdue = 1;
                        }
                    }
                    Statistic statistic = Statistic.builder()
                            .id(department.getId())
                            .name(department.getDepartmentName())
                            .pending_on_time(pending_on_time)
                            .pending_overdue(pending_overdue)
                            .completed_on_time(completed_on_time)
                            .completed_overdue(completed_overdue)
                            .total_task(1)
                            .build();
                    map.put(department.getId(),statistic);
                }
            }

        }
        return new ArrayList<>(map.values());
    }
    private DashBoardUser StatisticUser (List<Task> tasks){
        DashBoardUser dashBoardUser = DashBoardUser.builder()
                .total_task(0)
                .pending_on_time(0)
                .pending_overdue(0)
                .completed_on_time(0)
                .completed_overdue(0)
                .statistics(null)
                .build();
        Map<Long,Statistic> map = new HashMap<>();
        for(Task task : tasks){
            List<User> users = taskUserRepository.findDistinctUserByTaskId(task.getId());
            for(User user : users){
                dashBoardUser.setTotal_task(dashBoardUser.getTotal_task()+1);
                if(map.containsKey(user.getId())){
                    Statistic statistic = map.get(user.getId());
                    statistic.setTotal_task(statistic.getTotal_task()+1);

                    if(task.getStatus() == 5){
                        if(task.getCompletedDate().compareTo(task.getExpiredDate()) > 0){
                            statistic.setCompleted_overdue(statistic.getCompleted_overdue()+1);
                            dashBoardUser.setCompleted_overdue(dashBoardUser.getCompleted_overdue()+1);
                        }else {
                            statistic.setCompleted_on_time(statistic.getCompleted_on_time()+1);
                            dashBoardUser.setCompleted_on_time(dashBoardUser.getCompleted_on_time()+1);
                        }
                    }else {
                        if(task.getExpiredDate().compareTo(new Date()) >= 0){
                            statistic.setPending_on_time(statistic.getPending_on_time()+1);
                            dashBoardUser.setPending_on_time(dashBoardUser.getPending_on_time()+1);
                        }else {
                            statistic.setPending_overdue(statistic.getPending_overdue()+1);
                            dashBoardUser.setPending_overdue(dashBoardUser.getPending_overdue()+1);
                        }
                    }
                }else {
                    int pending_on_time = 0;
                    int pending_overdue = 0;
                    int completed_on_time = 0;
                    int completed_overdue = 0;
                    if(task.getStatus() == 5){
                        if(task.getCompletedDate().compareTo(task.getExpiredDate()) > 0){
                            dashBoardUser.setPending_overdue(dashBoardUser.getPending_overdue()+1);
                            completed_overdue = 1;
                        }else {
                            dashBoardUser.setCompleted_on_time(dashBoardUser.getCompleted_on_time()+1);
                            completed_on_time = 1;
                        }
                    }else {
                        if(task.getExpiredDate().compareTo(new Date()) >= 0){
                            dashBoardUser.setPending_on_time(dashBoardUser.getPending_on_time()+1);
                            pending_on_time = 1;
                        }else {
                            dashBoardUser.setPending_overdue(dashBoardUser.getPending_overdue()+1);
                            pending_overdue = 1;
                        }
                    }
                    Statistic statistic = Statistic.builder()
                            .id(user.getId())
                            .name(user.getFullName())
                            .pending_on_time(pending_on_time)
                            .pending_overdue(pending_overdue)
                            .completed_on_time(completed_on_time)
                            .completed_overdue(completed_overdue)
                            .total_task(1)
                            .build();
                    map.put(user.getId(),statistic);
                }
            }
        }
        dashBoardUser.setStatistics(new ArrayList<>(map.values()));
        return dashBoardUser;
    }
    private List<DashBoardPriority> StatisticPriority (List<Task> tasks){
        Map<Integer,List<Task>> map = new HashMap<>();
        Set<Integer> set = new HashSet<>();
        for (Task task : tasks){
         if(task.getCompletedDate() == null) {
             if(map.containsKey(LocalDate.now().getYear())){
                 List<Task> list = map.get(LocalDate.now().getYear());
                 list.add(task);
                 map.put(LocalDate.now().getYear(),list);

             }else {
                    List<Task> list = new ArrayList<>();
                    list.add(task);
                    map.put(LocalDate.now().getYear(),list);
             }
             set.add(LocalDate.now().getYear());
         }else {
                if(map.containsKey(task.getCompletedDate().toInstant().atZone(ZoneId.systemDefault()).toLocalDate().getYear())){
                    List<Task> list = map.get(task.getCompletedDate().toInstant().atZone(ZoneId.systemDefault()).toLocalDate().getYear());
                    list.add(task);
                    map.put(task.getCompletedDate().toInstant().atZone(ZoneId.systemDefault()).toLocalDate().getYear(),list);
                }else {
                    List<Task> list = new ArrayList<>();
                    list.add(task);
                    map.put(task.getCompletedDate().toInstant().atZone(ZoneId.systemDefault()).toLocalDate().getYear(),list);
                }
                set.add(task.getCompletedDate().toInstant().atZone(ZoneId.systemDefault()).toLocalDate().getYear());
         }
        }
        List<DashBoardPriority> dashBoardPriorities = new ArrayList<>();
        for (Integer year : set){
            List<Task> list = map.get(year);
            Map<Long,Statistic> mapS = new HashMap<>();
            mapS.put(0L,Statistic.builder()
                            .id(0L)
                            .name("Binh thuong")
                            .total_task(0)
                            .pending_on_time(0)
                            .pending_overdue(0)
                            .completed_on_time(0)
                            .completed_overdue(0)
                    .build());
            mapS.put(1L,Statistic.builder()
                    .id(1L)
                    .name("Trong tam")
                    .total_task(0)
                    .pending_on_time(0)
                    .pending_overdue(0)
                    .completed_on_time(0)
                    .completed_overdue(0)
                    .build());
            mapS.put(2L,Statistic.builder()
                    .id(2L)
                    .name("Rat trong tam")
                    .total_task(0)
                    .pending_on_time(0)
                    .pending_overdue(0)
                    .completed_on_time(0)
                    .completed_overdue(0)
                    .build());
            for(Task task : list){
                Statistic statistic = mapS.get((long) task.getPriority());
                statistic.setTotal_task(statistic.getTotal_task()+1);
                if(task.getStatus() == 5){
                    if(task.getCompletedDate().compareTo(task.getExpiredDate()) > 0){
                        statistic.setCompleted_overdue(statistic.getCompleted_overdue()+1);
                    }else {
                        statistic.setCompleted_on_time(statistic.getCompleted_on_time()+1);
                    }
                }else {
                    if(task.getExpiredDate().compareTo(new Date()) >= 0){
                        statistic.setPending_on_time(statistic.getPending_on_time()+1);
                    }else {
                        statistic.setPending_overdue(statistic.getPending_overdue()+1);
                    }
                }
            }
            dashBoardPriorities.add(
                    DashBoardPriority.builder()
                    .year(Long.valueOf(year))
                    .statistics(new ArrayList<>(mapS.values()))
                    .build());
        }
        return dashBoardPriorities;
    }
    private String mapReport(int type){
        return switch (type) {
            case 0 -> "Yêu cầu báo cáo tiến độ";
            case 1 -> "Báo cáo tiến độ";
            case 2 -> "Báo cáo hoàn thành";
            case 3 -> "Xin gia hạn";
            default -> "Trạng thái không xác định";
        };
    }
}
