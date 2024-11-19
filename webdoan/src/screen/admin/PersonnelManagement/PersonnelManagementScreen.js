import React from "react";
import classNames from "classnames/bind";
import {useNavigate} from "react-router-dom";
import styles from "./PersonnelManagementStyle.module.scss";

const cx = classNames.bind(styles);

const PersonnelManagementScreen = () => {

    const navigate = useNavigate();

    const handleToDetailUserScreen = (item, isCreate) => {
        navigate('/admin/DetailUserScreen', {
            state: {
                userSelect: item,
                isCreate: isCreate,
            }
        })
    }

    const listUsers = [
        { id: 1, username: "admin", fullname: "Administrator Administrator", active: "Có" },
        { id: 2, username: "admin_anhtp", fullname: "Admin AnhTp", active: "Có" },
        { id: 3, username: "admin_cuongnt", fullname: "Admin CuongNT", active: "Có" },
        // Thêm các dòng dữ liệu khác
    ];

    return (
        <div className={cx('PersonnelManagementScreen', 'container')}>
            <div className="col-md-12">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <div className={cx('d-flex', 'align-items-center')}>
                        <i className={cx('bx bxs-user-account', 'icon_header', 'me-2')}></i>
                        <h4>Quản lý nhân viên</h4>
                    </div>

                    <div className="d-flex justify-content-between">
                        <button
                            className="btn btn-warning d-flex align-items-center me-2"
                            onClick={() => handleToDetailUserScreen(null, true)}
                        >
                            <i className="bx bx-plus me-1"></i>
                            TẠO MỚI
                        </button>
                        <button className="btn btn-success me-2">XUẤT FILE EXCEL</button>
                        <button className="btn btn-primary">XUẤT FILE WORD</button>
                    </div>
                </div>
            </div>

            <div className="col-md-12">
                <div className="mb-3 d-flex align-items-center">
                    <label className="col-md-2">Chức vụ</label>
                    <select className="form-control">
                        <option>Tất cả</option>
                        {/* Các tùy chọn khác */}
                    </select>
                </div>
                <div className="mb-3 d-flex align-items-center">
                    <label className="col-md-2">Nhóm quyền</label>
                    <select className="form-control">
                        <option>Tất cả</option>
                        {/* Các tùy chọn khác */}
                    </select>
                </div>
                <div className="mb-3 d-flex align-items-center">
                    <label className="col-md-2">Trạng thái</label>
                    <select className="form-control">
                        <option>Hoạt động</option>
                        {/* Các tùy chọn khác */}
                    </select>
                </div>
                <div className="mb-3 d-flex align-items-center">
                    <label className="col-md-2">Tên đăng nhập</label>
                    <input type="text" className="form-control" placeholder="Tên đăng nhập" />
                </div>
                <div className="mb-3 d-flex align-items-center">
                    <label className="col-md-2">Họ và tên</label>
                    <input type="text" className="form-control" placeholder="Họ và tên" />
                </div>
                <button className="btn btn-warning w-100 mb-3">Tìm kiếm</button>
            </div>

            <div className="col-md-12">
                <table bordered hover className={cx("col-md-12")}>
                    <thead>
                    <tr className={cx("table_row")}>
                        <th>STT</th>
                        <th>Tên đăng nhập</th>
                        <th>Họ và tên</th>
                        <th>Hoạt động</th>
                        <th>Sửa</th>
                        <th>Xóa</th>
                    </tr>
                    </thead>
                    <tbody>
                    {listUsers.map((item, index) => (
                        <tr key={index} className={cx("table_row")}>
                            <td onClick={() => handleToDetailUserScreen(item, false)}>{index + 1}</td>
                            <td onClick={() => handleToDetailUserScreen(item, false)}>{item.username}</td>
                            <td onClick={() => handleToDetailUserScreen(item, false)}>{item.fullname}</td>
                            <td onClick={() => handleToDetailUserScreen(item, false)}>{item.active}</td>
                            <td onClick={() => handleToDetailUserScreen(item, false)}>Sửa</td>
                            <td>
                                <div className="text-danger">Xóa</div>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>

                {/* Pagination */}
                <div className="d-flex justify-content-between align-items-center mt-3">
                    <div className="d-flex justify-content-between align-items-center mt-3">
                        <div className={cx("p-2", 'btn_page')}>{"<<"}</div>
                        <div className={cx("btn_page_number", 'btn_page')}>1</div>
                        <div className={cx("p-2", 'btn_page')}>{">>"}</div>
                    </div>
                    <div className="d-flex justify-content-between align-items-center mt-3">
                        Số kết quả/trang:
                        <select className="form-select form-select-sm ms-2" style={{ width: "auto", display: "inline-block" }}>
                            <option>15</option>
                            <option>30</option>
                            <option>50</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PersonnelManagementScreen;
