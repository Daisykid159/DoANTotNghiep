import React, {useEffect, useState} from "react";
import styles from './CreateTaskStyle.module.scss'
import classNames from "classnames/bind";
import Select from 'react-select';
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {actionCreateTask} from "../../../redux-store/action/actionUser";
import moment from "moment";

const cx = classNames.bind(styles);

const CreateTaskScreen = (props) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const token = useSelector(state => state.reducerAuth.token);

    const overViewUser = useSelector(state => state.reducerUser.overViewUser);

    const [titleTask, setTitleTask] = useState(props?.dataEdit?.title || '');
    const [assignTask, setAssignTask] = useState('');
    const [targetTask, setTargetTask] = useState('');
    const [combinationTask, setCombinationTask] = useState([]);
    const [sourceTask, setSourceTask] = useState(null);
    const [priorityTask, setPriorityTask] = useState(0);
    const [createDate, setCreateDate] = useState(moment(new Date()).format("YYYY-MM-DDTHH:mm"));
    const [expiredDate, setExpiredDate] = useState(moment(new Date()).format("YYYY-MM-DDTHH:mm"));
    const [contentTask, setContentTask] = useState('');
    const [uploadedFiles, setUploadedFiles] = useState([]);

    const mapDepartmentsToOptions = (deps, level = 0) => {
        return deps.map((dep) => ({
            label: `${'----'.repeat(level)} ${dep.department_name}`,
            options: [
                ...dep.users.map((user) => ({
                    value: `${user.user_id}`,
                    label: `${'----'.repeat(level + 1)} 👤 ${user.user_name}`,
                    user: user,
                })),
                ...mapDepartmentsToOptions(dep.children || [], level + 1),
            ],
        }));
    };

    const optionsUser = mapDepartmentsToOptions(overViewUser.departments);

    const optionsProject = overViewUser.projectJoins?.map((project) => ({
        value: project.project_id,
        label: project.project_name,
        description: project.content, // Mô tả bổ sung
    }));

    const handleFileUpload = (event) => {
        const files = Array.from(event.target.files); // Lấy danh sách các tệp được chọn
        setUploadedFiles((prevFiles) => [...prevFiles, ...files]); // Cập nhật danh sách tệp
    };

    const handleFileRemove = (index) => {
        setUploadedFiles((prevFiles) =>
            prevFiles.filter((_, i) => i !== index) // Loại bỏ tệp tại chỉ mục tương ứng
        );
    };

    const handleCreateTask = () => {
        const taskNew ={
            "title": titleTask,
            "assign_department": 1,
            "assign_user": overViewUser.userCurrent.user_id,
            "target_department": 1,
            "target_user": 50,
            "content": contentTask,
            "priority": priorityTask,
            "project_id": 2,
            "expired_date": moment(expiredDate).format("YYYY-MM-DDTHH:mm:ss"),
            "created_date": moment(createDate).format("YYYY-MM-DDTHH:mm:ss"),
            "combinations": [
                {
                    "combination_department": 2,
                    "combination_user": 1,
                    "created_date": "2024-12-04T15:33:25"
                },
                {
                    "combination_department": 3,
                    "combination_user": 2,
                    "created_date": "2024-12-04T15:33:25"
                },
                {
                    "combination_department": 4,
                    "combination_user": 3,
                    "created_date": "2024-12-04T15:33:25"
                }
            ]
        }
        // dispatch(actionCreateTask(token, taskNew, props.setShowModuleCreateTask));
    }

    useEffect(() => {
        setAssignTask({
            value: `${overViewUser.userCurrent.user_id}`,
            label: `👤 ${overViewUser.userCurrent.user_name}`,
        });
    }, [overViewUser]);

    return (
        <div className={cx('CreateTaskScreen')}>
            <div className={cx('CreateTaskScreen_body')}>
                <div className={cx('d-flex', 'align-items-center', 'CreateTaskScreen_body_header')}>
                    <i className={cx('bx bx-stats', 'me-2', 'icon_stats')}></i>
                    <div>{props.dataEdit ? 'Chỉnh sửa nhiệm vụ' : 'Giao nhiệm vụ'}</div>

                    <button
                        onClick={() => props.setShowModuleCreateTask(false)}
                        className={cx("btn", 'CreateTaskScreen_body_close')}
                    >
                        <i className='bx bx-x'></i>
                    </button>
                </div>

                <div className={cx('p-3', 'row')}>
                    <div className={cx('col-md-12', 'mb-3')}>
                        <div className={cx('d-flex', 'align-items-center')}>
                            <label className={cx("col-md-125")}>Tiêu đề nhiệm vụ <span
                                className={cx('text_red')}>*</span></label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Tiêu đề nhiệm vụ"
                                value={titleTask}
                                onChange={(e) => setTitleTask(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className={cx('col-md-6', 'mb-3')}>
                        <div className={cx('d-flex', 'align-items-center')}>
                            <label className="col-md-3">Đơn vị người giao <span
                                className={cx('text_red')}>*</span></label>
                            <Select
                                options={optionsUser}
                                isSearchable
                                className="w-100"
                                placeholder="Tìm kiếm phòng ban hoặc người dùng..."
                                value={assignTask}
                            />
                        </div>
                    </div>

                    <div className={cx('col-md-6', 'mb-3')}>
                        <div className={cx('d-flex', 'align-items-center')}>
                            <label className="col-md-3">Người giao <span
                                className={cx('text_red')}>*</span></label>
                            <Select
                                options={optionsUser}
                                isSearchable
                                isDisabled
                                className="w-100"
                                placeholder="Tìm kiếm phòng ban hoặc người dùng..."
                                value={assignTask}
                            />
                        </div>
                    </div>

                    <div className={cx('col-md-6', 'mb-3')}>
                        <div className={cx('d-flex', 'align-items-center')}>
                            <label className="col-md-3">Đơn vị người chủ trì <span
                                className={cx('text_red')}>*</span></label>
                            <Select
                                options={optionsUser}
                                isSearchable
                                className="w-100"
                                placeholder="Tìm kiếm phòng ban hoặc người dùng..."
                                value={targetTask}
                                onChange={(selected) => setTargetTask(selected)}
                            />
                        </div>
                    </div>

                    <div className={cx('col-md-6', 'mb-3')}>
                        <div className={cx('d-flex', 'align-items-center')}>
                            <label className="col-md-3">Đơn vị người phối hợp <span
                                className={cx('text_red')}>*</span></label>
                            <Select
                                options={optionsUser}
                                isSearchable
                                isMulti
                                className="w-100"
                                placeholder="Tìm kiếm phòng ban hoặc người dùng..."
                                value={combinationTask}
                                onChange={(selected) => setCombinationTask(selected)}
                            />
                        </div>
                    </div>

                    <div className={cx('col-md-6', 'mb-3')}>
                        <div className={cx('d-flex', 'align-items-center')}>
                            <label className="col-md-3">Nguồn nhiệm vụ <span className={cx('text_red')}>*</span></label>
                            <Select
                                options={optionsProject}
                                isSearchable
                                className="w-100"
                                placeholder="Tìm kiếm dự án..."
                                value={sourceTask}
                                onChange={(selected) => setSourceTask(selected)}
                            />
                        </div>
                    </div>

                    <div className={cx('col-md-6', 'mb-3')}>
                        <div className={cx('d-flex', 'align-items-center')}>
                            <label className="col-md-3">Mức độ quan trọng <span
                                className={cx('text_red')}>*</span></label>
                            <input
                                type="number"
                                className="form-control"
                                placeholder="Mức độ quan trọng"
                                value={priorityTask}
                                onChange={(e) => setPriorityTask(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className={cx('col-md-6', 'mb-3')}>
                        <div className={cx('d-flex', 'align-items-center')}>
                            <label className="col-md-3">Ngày tạo <span className={cx('text_red')}>*</span></label>
                            <input
                                type="datetime-local"
                                className="form-control"
                                value={createDate}
                                onChange={(e) => setCreateDate(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className={cx('col-md-6', 'mb-3')}>
                        <div className={cx('d-flex', 'align-items-center')}>
                            <label className="col-md-3">Hạn xử lý <span className={cx('text_red')}>*</span></label>
                            <input
                                type="datetime-local"
                                className="form-control"
                                value={expiredDate}
                                min={moment(createDate).format("YYYY-MM-DDTHH:mm")}
                                onChange={(e) => setExpiredDate(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className={cx('col-md-12', 'mb-3')}>
                        <div className={cx('d-flex')}>
                            <label className={cx("col-md-125", "mt-1")}>Nội dung:</label>
                            <textarea
                                className={cx("form-control", 'input_comment')}
                                placeholder="Nội dung nhiệm vụ"
                                rows="4"
                                value={contentTask}
                                onChange={(e) => setContentTask(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className={cx('col-md-12', 'mb-3')}>
                        <div className={cx('d-flex', 'col-md-12', 'align-items-center', 'mb-3')}>
                            <label className={cx('col-md-125')}>Đính kèm file:</label>

                            <div className="file-upload__input">
                                <label htmlFor="file-input" className="btn btn-primary">
                                    Chọn tệp
                                </label>
                                <input
                                    id="file-input"
                                    type="file"
                                    multiple
                                    onChange={handleFileUpload}
                                    style={{display: "none"}} // Ẩn input thật, chỉ hiển thị nút
                                />
                            </div>
                        </div>

                        <ul>
                            {uploadedFiles.map((file, index) => (
                                <li key={index} className={cx("file-item")}>
                                    <span>{file.name}</span>
                                    <button
                                        className={cx("btn btn-danger btn-sm", 'btn_delete')}
                                        onClick={() => handleFileRemove(index)}
                                    >
                                        Xóa
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className={cx('col-md-12', 'mb-3', 'd-flex', 'justify-content-end')}>
                        <div className="d-flex justify-content-between">
                            {props.dataEdit ? (
                                <button
                                    className="btn btn-success d-flex align-items-center me-2"
                                >
                                    Chỉnh sửa
                                </button>
                            ) : (
                                <button
                                    onClick={() => handleCreateTask()}
                                    className="btn btn-success d-flex align-items-center me-2"
                                >
                                    TẠO MỚI
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateTaskScreen;
