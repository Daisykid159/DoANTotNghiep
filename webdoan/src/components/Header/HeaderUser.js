import React, {useEffect, useState} from "react";
import {BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './HeaderStyle.module.scss';
import TaskListScreen from "../../screen/user/TaskList/TaskListScreen";
import NoPage from "../../screen/noPage/NoPagge";
import IconSearch from "../../icon/iconSearch";
import IconBell from "../../icon/iconBell";
import IconArrowDown from "../../icon/iconArrowDown";
import {useDispatch, useSelector} from "react-redux";
import {actionLogout} from "../../redux-store/action/actionAuth";

const cx = classNames.bind(styles);

function HeaderUser () {

    const dispatch = useDispatch();
    const decoded = useSelector(state => state.reducerAuth.decoded);

    const [textSearch, setTextSearch] = useState('');
    const [showNotification, setShowNotification] = useState(false);
    const [showCNUser, setShowCNUser] = useState(false);

    return (
        <Router>
            <div className={cx('flex', 'HeaderTop')}>
                <div className={cx('text_name_he_thong')}>HỆ THỐNG QUẢN LÝ DỰ ÁN</div>

                <div className={cx('flex', 'margin_right_20')}>
                    <div className={cx('search_header', 'flex')}>
                        <IconSearch />
                        <input
                            className={cx('input')}
                            placeholder={'Tìm kiếm'}
                            value={textSearch}
                            onChange={(e) => setTextSearch(e.target.value)}
                        />
                    </div>

                    <div className={cx('notification')}>
                        <IconBell />
                    </div>

                    <div
                        className={cx('flex', 'user', 'margin_left_10')}
                        onClick={() => setShowCNUser(!showCNUser)}
                    >
                        <div className={cx('text_name_user', 'margin_right_10')}>{decoded.sub}</div>
                        <div><IconArrowDown /></div>

                        {showCNUser && (
                            <div className={cx('module_header')}>
                                <div className={cx('row_module_header')}>Thống kê</div>
                                <div className={cx('row_module_header')}>Báo cáo</div>
                                <div
                                    className={cx('row_module_header', 'row_module_header_border_top')}
                                    onClick={() => dispatch(actionLogout())}
                                >Đăng xuất</div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className={cx('screen')}>
                <Routes>
                    <Route path="/" element={<TaskListScreen />} />
                    <Route path="*" element={<NoPage />} />
                </Routes>
            </div>
        </Router>
    )
}

export default HeaderUser;
