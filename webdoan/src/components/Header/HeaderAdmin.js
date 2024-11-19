import React, {useEffect, useState} from "react";
import {BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './HeaderStyle.module.scss';
import NoPage from "../../screen/noPage/NoPagge";
import PersonnelManagementScreen from "../../screen/admin/PersonnelManagement/PersonnelManagementScreen";
import IconUsers from "../../icon/iconUsers";
import DepartmentManagementScreen from "../../screen/admin/DepartmentManagement/DepartmentManagementScreen";
import DetailUserScreen from "../../screen/admin/DetailUser/DetailUserScreen";

const cx = classNames.bind(styles);

function HeaderAdmin () {

    return (
        <Router>
            <div className={cx('HeaderAdmin', 'flex')}>
                <div className={cx('flex', 'list_management')}>
                    <Link to="/admin/PersonnelManagementScreen" className={cx('text-center', 'text_name_he_thong')}>HỆ THỐNG QUẢN LÝ DỰ ÁN</Link>

                    <div className={cx('flex', 'margin_left_50')}>
                        <Link to="/admin/PersonnelManagementScreen" className={cx('row_list_management')}>
                            <i className={cx('bx bxs-user-account', 'icon_header_admin')}></i>
                            <div>Quản lý nhân viên</div>
                        </Link>

                        <Link to="/admin/DepartmentManagementScreen" className={cx('row_list_management', 'margin_left_20')}>
                            <i className={cx('bx bxs-home', 'icon_header_admin')}></i>
                            <div>Quản lý phòng ban</div>
                        </Link>

                        <Link to="/" className={cx('row_list_management', 'margin_left_20')}>
                            <i className={cx('bx bx-task', 'icon_header_admin')}></i>
                            <div>Quản lý dự án</div>
                        </Link>

                        <Link to="/" className={cx('row_list_management', 'margin_left_20')}>
                            <i className={cx('bx bx-line-chart', 'icon_header_admin')}></i>
                            <div>Thống kê</div>
                        </Link>
                    </div>
                </div>

                <div className={cx('flex', 'align-items-center')}>
                    <div className={cx('text_name_user')}>text_name_user</div>
                    <div className={cx('btn_logout')}>Đăng xuất</div>
                </div>
            </div>

            <div className={cx('screen')}>
                <Routes>
                    <Route path="/admin/PersonnelManagementScreen" element={<PersonnelManagementScreen />} />
                    <Route path="/admin/DepartmentManagementScreen" element={<DepartmentManagementScreen />} />
                    <Route path="/admin/DetailUserScreen" element={<DetailUserScreen />} />
                    <Route path="*" element={<NoPage />} />
                </Routes>
            </div>
        </Router>
    )
}

export default HeaderAdmin;
