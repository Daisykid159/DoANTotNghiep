import React, { useState } from 'react';
import styles from "./SearchStyle.module.scss";
import classNames from "classnames/bind";
import {useDispatch, useSelector} from "react-redux";
import Select from "react-select";
import {actionSearchTask} from "../../redux-store/action/actionUser";
import TaskList from "../TaskList/TaskList";
import moment from "moment/moment";

const cx = classNames.bind(styles);

const Search = (props) => {

    const dispatch = useDispatch();

    const token = useSelector(state => state.reducerAuth.token);
    const overViewUser = useSelector(state => state.reducerUser.overViewUser);
    const listTasksSearch = useSelector(state => state.reducerUser.listTasksSearch);

    const [searchText, setSearchText] = useState('');
    const [phongBan, setPhongBan] = useState('');
    const [nguoiThamGia, setNguoiThamGia] = useState('');
    const [trangThai, setTrangThai] = useState('');
    const [nhomNhiemVu, setNhomNhiemVu] = useState('');
    const [thoiGianTaoStart, setThoiGianTaoStart] = useState('');
    const [thoiGianTaoEnd, setThoiGianTaoEnd] = useState('');
    const [hanXuLyStart, setHanXuLyStart] = useState('');
    const [hanXuLyEnd, setHanXuLyEnd] = useState('');

    const listPriorityTask = [
        { value: 0, label: 'Bình thường' },
        { value: 1, label: 'Quan trọng' },
        { value: 2, label: 'Rất quan trọng' },
    ]

    const mapDepartmentsToOptions = (deps, level = 0) => {
        return deps?.map((dep) => ({
            label: `${'----'.repeat(level)} ${dep.department_name}`,
            options: [
                ...dep.users.map((user) => ({
                    value: `${user.user_id}`,
                    label: `${'----'.repeat(level + 1)} 👤 ${user.user_name}`,
                    department_id: dep.department_id,
                })),
                ...mapDepartmentsToOptions(dep.children || [], level + 1),
            ],
        }));
    };

    const optionsUser = mapDepartmentsToOptions(overViewUser?.departments);

    const optionsDepartment = overViewUser?.departments?.map((department) => ({
        value: department.department_id,
        label: department.department_name,
        description: department, // Mô tả bổ sung
    }));

    const handleSubmit = () => {
        dispatch(actionSearchTask(token, searchText, phongBan?.value || "", nguoiThamGia?.value || "", thoiGianTaoStart, thoiGianTaoEnd, hanXuLyStart, hanXuLyEnd, trangThai, nhomNhiemVu));
    };

    return (
        <div className={cx('search_screen')}>
            <div className={cx('search_container', 'row')}>
                <div className={cx('col-md-12', 'mb-2')}>
                    <input
                        className={cx('col-md-12', 'input_search')}
                        type="text"
                        placeholder="Nhập từ khóa để tìm kiếm..."
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                    />
                </div>
                <div className={cx('col-md-6', 'mb-2', 'd-flex', 'align-items-center')}>
                    <label className={cx('col-md-3')}>Phòng ban:</label>
                    <Select
                        options={optionsDepartment}
                        isSearchable
                        className="w-100"
                        placeholder="Tìm kiếm phòng ban..."
                        value={phongBan}
                        onChange={(selected) => setPhongBan(selected)}
                    />
                </div>
                <div className={cx('col-md-6', 'mb-2', 'd-flex', 'align-items-center')}>
                    <label className={cx('col-md-3')}>Người tham gia:</label>
                    <Select
                        options={optionsUser}
                        className={cx('col-md-9')}
                        isSearchable
                        placeholder="Tìm kiếm người dùng..."
                        value={nguoiThamGia}
                        onChange={(selected) => setNguoiThamGia(selected)}
                    />
                </div>
                <div className={cx('col-md-6', 'mb-2')}>
                    <label className={cx('col-md-3')}>Trạng thái:</label>
                    <select
                        className={cx('col-md-9', 'input_search')}
                        id="phongBan" value={trangThai}
                        onChange={(e) => setTrangThai(e.target.value)}
                    >
                        <option value="">Tất cả</option>
                        <option value={0}>Mới tạo</option>
                        <option value={1}>Chờ duyệt</option>
                        <option value={2}>Xin gia hạn</option>
                        <option value={3}>Hoàn thành</option>
                        <option value={4}>Kết thúc</option>
                        <option value={5}>Thu hồi</option>
                    </select>
                </div>
                <div className={cx('col-md-6', 'mb-2')}>
                    <label className={cx('col-md-3')}>Nhóm nhiệm vụ:</label>
                    <select
                        className={cx('col-md-9', 'input_search')}
                        id="phongBan" value={nhomNhiemVu}
                        onChange={(e) => setNhomNhiemVu(e.target.value)}>
                        <option value="">Tất cả</option>
                        {listPriorityTask.map((priority, index) => (
                            <option value={priority.value}>{priority.label}</option>
                        ))}
                    </select>
                </div>
                <div className={cx('col-md-6', 'd-flex', 'align-items-center', 'mb-3')}>
                    <label className={cx('col-md-3')}>Thời gian tạo:</label>
                    <div className={cx('col-md-9', 'd-flex', 'justify-content-between')}>
                        <input
                            className={cx('col-md-5', 'input_search')}
                            type={'date'}
                            value={thoiGianTaoStart} onChange={e => setThoiGianTaoStart(e.target.value)}
                        />
                        <input
                            className={cx('col-md-5', 'input_search')}
                            type={'date'}
                            value={thoiGianTaoEnd} onChange={e => setThoiGianTaoEnd(e.target.value)}
                        />
                    </div>
                </div>
                <div className={cx('col-md-6', 'd-flex', 'align-items-center', 'mb-3')}>
                    <label className={cx('col-md-3')}>Hạn xử lý:</label>
                    <div className={cx('col-md-9', 'd-flex', 'justify-content-between')}>
                        <input
                            className={cx('col-md-5', 'input_search')}
                            type={'date'}
                            value={hanXuLyStart} onChange={e => setHanXuLyStart(e.target.value)}
                        />
                        <input
                            className={cx('col-md-5', 'input_search')}
                            type={'date'}
                            value={hanXuLyEnd} onChange={e => setHanXuLyEnd(e.target.value)}
                        />
                    </div>
                </div>
                <div className={cx('col-md-12', 'd-flex', 'align-items-center', 'row_btn')}>
                    <button
                        className={cx('btn btn-light', 'col-md-1', 'me-5', 'input_search')}
                        onClick={() => {
                            setSearchText("")
                            setPhongBan("")
                            setNguoiThamGia("")
                            setTrangThai("")
                            setNhomNhiemVu("")
                            setThoiGianTaoStart("")
                            setThoiGianTaoEnd("")
                            setHanXuLyStart("")
                            setHanXuLyEnd("")
                        }}
                    >
                        Đặt lại
                    </button>

                    <button
                        className={cx('btn btn-primary', 'col-md-1')}
                        onClick={() => handleSubmit()}
                    >
                        Tìm kiếm
                    </button>
                </div>
            </div>

            {listTasksSearch?.length > 0 && (<TaskList tasks={listTasksSearch} showFullTaskList={true} handleDetailTask={props.handleDetailTask} />)}
        </div>
    );
}

export default Search;
