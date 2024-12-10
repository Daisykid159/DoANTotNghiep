import React, {useEffect, useState} from "react";
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './HeaderStyle.module.scss';
import TaskListScreen from "../../screen/user/TaskList/TaskListScreen";
import NoPage from "../../screen/noPage/NoPagge";
import IconSearch from "../../icon/iconSearch";
import IconBell from "../../icon/iconBell";
import IconArrowDown from "../../icon/iconArrowDown";
import {useDispatch, useSelector} from "react-redux";
import {actionLogout} from "../../redux-store/action/actionAuth";
import SettingScreen from "../../screen/user/Setting/SettingScreen";
import StatisticalScreen from "../../screen/user/Statistical/StatisticalScreen";

const cx = classNames.bind(styles);

function HeaderUser () {

    const dispatch = useDispatch();
    const decoded = useSelector(state => state.reducerAuth.decoded);

    const dataNotifi = [
        {
            "notification_id": 2456,
            "from_user_id": 291,
            "task_user_id": 3667,
            "type": 18,
            "title": "Nguyễn Thị Kim Hà",
            "has_read": false,
            "to_user_id": 314,
            "content": "Nhiệm vụ: tesst tao nv nang cao 1 - tesst chinh sua",
            "comment": "adsdasdasd",
            "created_date": "2024-12-04T16:19:42",
            "date_time_display": "04:19 04/12/2024",
            "task_id": 815,
            "task_status": 3
        },
        {
            "notification_id": 2455,
            "from_user_id": 291,
            "task_user_id": 3704,
            "type": 7,
            "title": "Nguyễn Thị Kim Hà",
            "has_read": false,
            "to_user_id": 314,
            "content": "Nhiệm vụ: Test kịch bản eGov - QLNV test",
            "comment": null,
            "created_date": "2024-12-04T14:50:07",
            "date_time_display": "02:50 04/12/2024",
            "task_id": 726,
            "task_status": 0
        },
        {
            "notification_id": 2454,
            "from_user_id": 291,
            "task_user_id": 3582,
            "type": 10,
            "title": "Nguyễn Thị Kim Hà",
            "has_read": false,
            "to_user_id": 314,
            "content": "Nhiệm vụ: test 1",
            "comment": null,
            "created_date": "2024-12-04T13:58:08",
            "date_time_display": "01:58 04/12/2024",
            "task_id": 930,
            "task_status": 4
        }
    ]

    const [textSearch, setTextSearch] = useState('');
    const [showNotification, setShowNotification] = useState(false);
    const [showCNUser, setShowCNUser] = useState(false);

    return (
        <Router>
            <div className={cx('flex', 'HeaderTop')}>
                <Link
                    className={cx('text_name_he_thong')}
                    to={'/'}
                >
                    HỆ THỐNG QUẢN LÝ DỰ ÁN
                </Link>

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

                    <div
                        className={cx('notification')}
                        onClick={() => setShowNotification(!showNotification)}
                    >
                        <IconBell />
                    </div>

                    <div
                        className={cx('flex', 'user', 'margin_left_10')}
                        onClick={() => setShowCNUser(!showCNUser)}
                    >
                        <div className={cx('text_name_user', 'margin_right_10')}>{decoded.sub}</div>
                        <div><IconArrowDown /></div>
                    </div>
                </div>
            </div>

            <div className={cx('screen')}>
                <Routes>
                    <Route path="/" element={<TaskListScreen />} />
                    <Route path="/user/SettingScreen" element={<SettingScreen />} />
                    <Route path="/user/StatisticalScreen" element={<StatisticalScreen />} />
                    <Route path="*" element={<NoPage />} />
                </Routes>
            </div>

            {showCNUser && (
                <div className={cx('module_header')}>
                    <Link
                        onClick={() => setShowCNUser(!showCNUser)}
                        className={cx('row_module_header')}
                        to={'/user/StatisticalScreen'}
                    >
                        Thống kê
                    </Link>

                    <Link
                        onClick={() => setShowCNUser(!showCNUser)}
                        className={cx('row_module_header')}
                        to={'/user/SettingScreen'}
                    >
                        Thiết lập
                    </Link>

                    <div
                        className={cx('row_module_header', 'row_module_header_border_top')}
                        onClick={() => dispatch(actionLogout())}
                    >Đăng xuất</div>
                </div>
            )}

            {showNotification && (
                <div className={cx('module_header', 'module_header_notification')}>
                    {dataNotifi.length > 0 ? (
                        dataNotifi.map((item, index) => (
                            <div
                                key={index}
                                className={cx('item_notification')}
                            >
                                <div className={cx('d-flex', 'align-items-center')}>
                                    <i className={cx('bx bx-user-circle', 'icon_user_notify')}></i>

                                    <div>
                                        <div>
                                            {item.title}
                                        </div>

                                        <div>
                                            {item.content}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div>
                            Không có thông báo
                        </div>
                    )}
                </div>
            )}

        </Router>
    )
}

export default HeaderUser;
