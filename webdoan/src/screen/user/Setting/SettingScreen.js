import React from 'react';
import styles from './SettingStyle.module.scss';
import classNames from "classnames/bind";
import Select from "react-select";

const cx = classNames.bind(styles);

const SettingScreen = () => {
    return (
        <div className={cx('SettingScreen', 'container', 'col-md-12')}>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div className={cx('d-flex', 'align-items-center')}>
                    <i className={cx('bx bx-cog', 'icon_header', 'me-2')}></i>
                    <h4>Thiết lập tài khoản</h4>
                </div>

                <div className="d-flex justify-content-between">
                    <button
                        className="btn btn-success d-flex align-items-center me-2"
                    >
                        CẬP NHẬT
                    </button>
                </div>
            </div>

            <div className="col-md-12">
                <div className="mb-3 d-flex align-items-center">
                    <label className="col-md-2">Tên đăng nhập:</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder={"Nhập tên đăng nhập"}
                        readOnly={true}
                    />
                </div>

                <div className="mb-3 d-flex align-items-center">
                    <label className="col-md-2">Tên <span className="text-danger">*</span>:</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Nhập tên"
                    />
                </div>

                <div className="mb-3 d-flex align-items-center">
                    <label className="col-md-2">Họ và tên đệm <span className="text-danger">*</span>:</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Nhập họ và tên đệm"
                    />
                </div>

                <div className="mb-3 d-flex align-items-center">
                    <label className="col-md-2">Họ và tên <span className="text-danger">*</span>:</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Nhập họ và tên"
                    />
                </div>

                <div className="mb-3 d-flex align-items-center">
                    <label className="col-md-2">Ngày sinh <span className="text-danger">*</span>:</label>
                    <input
                        type="date"
                        className="form-control"
                        placeholder="Nhập họ và tên"
                    />
                </div>

                <div className="mb-3 d-flex align-items-center">
                    <div className="mb-3 d-flex align-items-center col-md-6">
                        <label className="col-md-4">Giới tính:</label>
                        <div className="form-check form-check-inline">
                            <input
                                className="form-check-input"
                                type="radio" name="gender"
                                id="male" value="male"
                            />
                            <label className="form-check-label" htmlFor="male">Nam</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="gender"
                                id="female"
                                value="female"
                            />
                            <label className="form-check-label" htmlFor="female">Nữ</label>
                        </div>
                    </div>

                    <div className={cx('col-md-6')}>
                        <input
                            type="checkbox"
                            className="form-check-input me-4"
                            id="active"
                            checked={true}
                            readOnly={true}
                        />
                        <label className="form-check-label" htmlFor="active">Hoạt động</label>
                    </div>
                </div>

                <div className="mb-3 d-flex align-items-center">
                    <label className="col-md-2">Số điện thoại:</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder={"Nhập tên số địa thoại"}
                    />
                </div>

                <div className="mb-3 d-flex align-items-center">
                    <label className="col-md-2">Địa chỉ:</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Nhập địa chỉ"
                    />
                </div>

                <div className="mb-3 d-flex">
                    <label className="col-md-2 mt-2">Đổi mật khẩu:</label>
                    <div className="col-md-10">
                        <div className="mb-3 d-flex align-items-center col-md-12">
                            <label className="col-md-4">Nhập mật khẩu hiện tại:</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nhập mật khẩu hiện tại"
                            />
                        </div>
                        <div className="mb-3 d-flex align-items-center col-md-12">
                            <label className="col-md-4">Nhập mật khẩu mới:</label>
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Nhập mật khẩu mới"
                            />
                        </div>
                        <div className="mb-3 d-flex align-items-center col-md-12">
                            <label className="col-md-4">Nhập lại mật khẩu mới:</label>
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Nhập lại mật khẩu mới"
                            />
                        </div>
                        <div className="d-flex justify-content-end">
                            <button
                                className="btn btn-success d-flex align-items-center me-2"
                            >
                                Đổi mật khẩu
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SettingScreen;
