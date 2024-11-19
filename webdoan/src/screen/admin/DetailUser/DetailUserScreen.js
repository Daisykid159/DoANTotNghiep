import React, {useState} from "react";
import classNames from "classnames/bind";
import {useLocation} from "react-router-dom";
import Select from 'react-select';
import styles from "./DetailUserStyle.module.scss";

const cx = classNames.bind(styles);

const DetailUserScreen = () => {

    const location = useLocation();
    const userSelect = location?.state.userSelect;
    const isCreate = location?.state.isCreate;

    const [selectedDepartment, setSelectedDepartment] = useState(null);
    const [listSelectedDepartment, setListSelectedDepartment] = useState([])

    const handleDepartmentChange = (item) => {
        setSelectedDepartment(item);

        setListSelectedDepartment((prevList) => {
            const exists = prevList.some((department) => department.value === item.value);
            if (!exists) {
                return [...prevList, item];
            }
            return prevList;
        });
    };

    const handleDeleteItemDepartment = (item) => {
        setListSelectedDepartment((prevList) => {
            return prevList.filter((department) => department.value !== item.value);
        });
    }

    const departments = [
        { value: '1', label: 'Sở Thông Tin Và Truyền Thông Tỉnh Tây Ninh\\eGov\\Phòng Dịch vụ và Phát triển phần mềm' },
        { value: '2', label: 'Sở Thông Tin Và Truyền Thông Tỉnh Tây Ninh\\eGov\\Phòng Giám sát, điều hành đô thị thông minh' },
        { value: '3', label: 'Sở Thông Tin Và Truyền Thông Tỉnh Tây Ninh\\eGov\\Phòng Hạ tầng và An toàn thông tin mạng' },
        { value: '4', label: 'Sở Thông Tin Và Truyền Thông Tỉnh Tây Ninh\\eGov\\Phòng Hành chính' },
        { value: '5', label: 'Sở Thông Tin Và Truyền Thông Tỉnh Tây Ninh\\eGov\\Phòng KSNB' },
        { value: '6', label: 'Sở Thông Tin Và Truyền Thông Tỉnh Tây Ninh\\eGov\\Thị xã Hòa Thành Test\\Phòng Giáo dục - Thị xã Hòa Thành' },
        { value: '7', label: 'Sở Thông Tin Và Truyền Thông Tỉnh Tây Ninh\\eGov\\UBND xã Hiệp Thành test' },
        { value: '8', label: 'Sở Thông Tin Và Truyền Thông Tỉnh Tây Ninh\\eGov\\Văn phòng Tỉnh ủy' },
    ];

    console.log("userSelect", userSelect);

    return (
        <div className={cx('DetailUserScreen', 'container')}>
            <div className="col-md-12">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <div className={cx('d-flex', 'align-items-center')}>
                        <i className={cx('bx bxs-user', 'icon_header', 'me-2')}></i>
                        <h4>Thông tin nhân viên</h4>
                    </div>

                    {isCreate ?
                        (<button type="button" className="btn btn-success col-md-2 margin_left_20">Thêm mới</button>) :
                        (<button type="button" className="btn btn-success col-md-2 margin_left_20">Cập nhật</button>)
                    }
                </div>
            </div>

            <div className="col-md-12">
                <div className="mb-3 d-flex align-items-center">
                    <label className="col-md-2">Tên đăng nhập:</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder={"Nhập tên đăng nhập"}
                        readOnly={!isCreate}
                    />
                </div>

                <div className="mb-3 d-flex align-items-center">
                    <label className="col-md-2">Tên <span className="text-danger">*</span>:</label>
                    <input type="text" className="form-control" placeholder="Nhập tên" />
                </div>

                <div className="mb-3 d-flex align-items-center">
                    <label className="col-md-2">Họ và tên <span className="text-danger">*</span>:</label>
                    <input type="text" className="form-control" placeholder="Nhập họ và tên" />
                </div>

                <div className="mb-3 d-flex align-items-center">
                    <label className="col-md-2">Giới tính:</label>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="gender" id="male" value="male" />
                        <label className="form-check-label" htmlFor="male">Nam</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="gender" id="female" value="female" checked />
                        <label className="form-check-label" htmlFor="female">Nữ</label>
                    </div>
                </div>

                <div className="mb-3 d-flex align-items-center">
                    <label className="col-md-2">Số điện thoại:</label>
                    <input type="text" className="form-control" placeholder={"Nhập tên số địa thoại"} />
                </div>

                <div className="mb-3 d-flex align-items-center">
                    <label className="col-md-2">Địa chỉ:</label>
                    <input type="text" className="form-control" placeholder="Nhập địa chỉ" />
                </div>

                <div className="mb-3 d-flex align-items-center">
                    <label className="col-md-2">Phòng ban:</label>
                    <Select
                        options={departments}
                        value={selectedDepartment || null}
                        onChange={handleDepartmentChange}
                        placeholder="Tìm phòng ban..."
                        className="mb-3 w-100"
                    />
                </div>
                <div>
                    {listSelectedDepartment.length !== 0 && (
                        <table className={cx('w-100', 'table')}>
                            <thead>
                            <tr className={cx('text-center', 'table_row')}>
                                <th>STT</th>
                                <th className={cx('w-50')}>Tên phòng</th>
                                <th>Chức danh</th>
                                <th>Chức vụ</th>
                                <th>Phòng ban chính</th>
                                <th>Xoá</th>
                            </tr>
                            </thead>
                            <tbody>
                            {listSelectedDepartment.map((item, index) => (
                                <tr className={cx('text-center', 'table_row')} key={index}>
                                    <td>{index + 1}</td>
                                    <td className='text_left'>{item.label}</td>
                                    <td>Chuyên viên</td>
                                    <td>Ban lãnh đạo</td>
                                    <td>
                                        <input type="checkbox" className="form-check-input" id="active"/>
                                    </td>
                                    <td onClick={() => handleDeleteItemDepartment(item)} className={cx('text_red')}>Xoá</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    )}
                </div>

                <div className="mb-3 d-flex align-items-center">
                    <div className={cx('col-md-3')}>
                        <input type="checkbox" className="form-check-input me-2" id="active" checked={true} />
                        <label className="form-check-label" htmlFor="active">Hoạt động</label>
                    </div>

                    <div className={cx('col-md-3')}>
                        <input type="checkbox" className="form-check-input me-2" id="active" />
                        <label className="form-check-label" htmlFor="active">Quản trị viên hệ thống</label>
                    </div>
                </div>

                {!isCreate && (<div className="mb-3 d-flex align-items-center">
                    <label className="col-md-2">Mật khẩu reset mặc định:</label>
                    <input type="text" className="form-control" placeholder="Bỏ trống để tạo mật khẩu ngẫu nhiên"/>
                    <button type="button" className="btn btn-info col-md-2 margin_left_20">Reset mật khẩu</button>
                </div>)}
            </div>
        </div>
    )
}

export default DetailUserScreen;
