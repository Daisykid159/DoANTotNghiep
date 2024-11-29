package org.example.ims_backend.dto.admin.departmentDTO.response;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;
import org.example.ims_backend.common.Active;

import java.util.ArrayList;
import java.util.List;
@Getter
@Setter
public class DepartmentDTO {
    private Long departmentId;
    private String departmentName;
    private String departmentCode;
    private boolean isactive;
    @JsonIgnore
    private DepartmentDTO parentDepartment;
    private List<DepartmentDTO> subDepartments = new ArrayList<>();

    // Constructor
    public DepartmentDTO(Long departmentId, String departmentName, boolean isactive, DepartmentDTO parentDepartment,String departmentCode) {
        this.departmentId = departmentId;
        this.departmentName = departmentName;
        this.isactive = isactive;
        this.parentDepartment = parentDepartment;
        this.departmentCode = departmentCode;
    }


    // Method to add sub-department to the parent department
    public void addSubDepartment(DepartmentDTO subDepartment) {
        if (this.subDepartments == null) {
            this.subDepartments = new ArrayList<>();
        }
        // Avoid adding duplicates
        if (!this.subDepartments.contains(subDepartment)) {
            this.subDepartments.add(subDepartment);
        }
    }
}

