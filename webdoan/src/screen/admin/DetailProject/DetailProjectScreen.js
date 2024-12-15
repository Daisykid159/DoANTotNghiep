import React, {useEffect, useState} from "react";
import classNames from "classnames/bind";
import styles from "./DetailProjectStyle.module.scss";
import TaskList from "../../../components/TaskList/TaskList";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import {actionGetDetailProject, actionUpdateProject} from "../../../redux-store/action/actionProjectManagement";
import moment from "moment/moment";

const cx = classNames.bind(styles);

const DetailProjectScreen = () => {

    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const token = useSelector(state => state.reducerAuth.token);
    const detailProject = useSelector(state => state.reducerProjectManagement.detailProject);
    const [createDate, setCreateDate] = useState(moment(detailProject?.created_date).utc().format("YYYY-MM-DDTHH:mm"));
    const [expiredDate, setExpiredDate] = useState(moment(detailProject?.expired_date).utc().format("YYYY-MM-DDTHH:mm"));
    const [projectName, setProjectName] = useState(detailProject?.project_name);
    const [projectStatus, setProjectStatus] = useState(detailProject?.status);
    const [projectContent, setProjectContent] = useState(detailProject?.content);

    const handleDetailTaskAdmin = (itemSelect) => {
        navigate(`/admin/DetailTaskAdminScreen/${itemSelect.task_id}`);
    }

    const handleUpdateProject = () => {
        dispatch(actionUpdateProject(token, detailProject.project_id, projectName, createDate, expiredDate, projectStatus, projectContent));
    }

    useEffect(() => {
        setCreateDate(moment(detailProject?.created_date).utc().format("YYYY-MM-DDTHH:mm"));
        setExpiredDate(moment(detailProject?.expired_date).utc().format("YYYY-MM-DDTHH:mm"));
        setProjectName(detailProject?.project_name);
        setProjectStatus(detailProject?.status);
        setProjectContent(detailProject?.content);
    }, [detailProject]);

    useEffect(() => {
        dispatch(actionGetDetailProject(token, id));
    }, [])

    return (
        <div className={cx('DetailProjectScreen', 'container')}>
            <div className={cx('d-flex', 'align-items-center', 'justify-content-between', 'mb-3')}>
                <div className={cx('d-flex', 'align-items-center')}>
                    <i className={cx('bx bx-task', 'icon_header', 'me-2')}></i>
                    <h4>Chi tiết dự án</h4>
                </div>

                <button
                    type="button"
                    onClick={() => handleUpdateProject()}
                    className="btn btn-success col-md-2 margin_left_20"
                >CẬP NHẬT</button>
            </div>

            <div className="row col-md-12 mb-5">
                <div className={cx("mb-3 d-flex align-items-center", 'col-md-12')}>
                    <label className="col-md-2">Tên dự án</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Tên dự án"
                        value={projectName}
                        onChange={(e) => setProjectName(e.target.value)}
                    />
                </div>

                <div className={classNames("mb-3 d-flex align-items-center", "col-md-6")}>
                    <label className="col-md-4">Ngày tạo</label>
                    <input
                        type="datetime-local"
                        className={cx("form-control")}
                        value={createDate}
                        readOnly={true}
                    />
                </div>

                <div className={classNames("mb-3 d-flex align-items-center", "col-md-6")}>
                    <label className="col-md-2">Hạn xử lý</label>
                    <input
                        type="datetime-local"
                        className={cx("form-control")}
                        value={expiredDate}
                        onChange={(e) => setExpiredDate(e.target.value)}
                    />
                </div>

                <div className="form-group row align-items-center col-md-12 mb-3">
                    <label className="col-md-2 col-form-label">Trạng thái</label>
                    <div className="col-md-10 d-flex gap-3">
                        <div className="form-check col-md-2">
                            <input
                                type="radio"
                                className="form-check-input"
                                id="processing"
                                name="projectStatus"
                                checked={projectStatus === 1}
                                onChange={() => setProjectStatus(1)}
                            />
                            <label className="form-check-label" htmlFor="processing">
                                Đang xử lý
                            </label>
                        </div>
                        <div className="form-check col-md-2">
                            <input
                                type="radio"
                                className="form-check-input"
                                id="expired"
                                name="projectStatus"
                                checked={projectStatus === 2}
                                onChange={() => setProjectStatus(2)}
                            />
                            <label className="form-check-label" htmlFor="expired">
                                Hết hạn
                            </label>
                        </div>
                        <div className="form-check col-md-2">
                            <input
                                type="radio"
                                className="form-check-input"
                                id="done"
                                name="projectStatus"
                                checked={projectStatus === 3}
                                onChange={() => setProjectStatus(3)}
                            />
                            <label className="form-check-label" htmlFor="done">
                                Hoàn thành
                            </label>
                        </div>
                    </div>
                </div>


                <div className={cx("mb-3 d-flex", 'col-md-12')}>
                    <label className="col-md-2 mt-1">Mô tả dự án</label>
                    <textarea
                        className="form-control"
                        placeholder="Mô tả dự án"
                        rows="5"
                        value={projectContent}
                        onChange={(e) => setProjectContent(e.target.value)}
                        style={{width: "100%", resize: "none"}}
                    />
                </div>
            </div>

            <div className="col-md-12 mb-5">
                <div className={cx('d-flex', 'align-items-center', 'justify-content-between', 'mb-3')}>
                    <div className={cx('d-flex', 'align-items-center')}>
                        <i className={cx('bx bx-home', 'icon_list', 'me-2')}></i>
                        <h5>Danh sách phòng ban tham gia</h5>
                    </div>

                    <button
                        type="button"
                        className="btn btn-success col-md-2 margin_left_20"
                    >Thêm phòng ban
                    </button>
                </div>

                <div className="col-md-12">
                    <table className={cx('w-100', 'table')}>
                        <thead>
                        <tr className={cx('text-center', 'table_row')}>
                            <th>STT</th>
                            <th className={cx('w-80')}>Tên phòng</th>
                            <th>Xoá</th>
                        </tr>
                        </thead>
                        <tbody>
                        {detailProject?.departments?.length > 0 && detailProject?.departments?.map((item, index) => (
                            <tr className={cx('text-center', 'table_row')}>
                                <td>{index+1}</td>
                                <td className='text_left'>{item.department_name}</td>
                                <td className={cx('text_red')}>Xoá</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="col-md-12 mb-3">
                <div className={cx('d-flex', 'align-items-center', 'mb-3')}>
                    <i className={cx('bx bx-menu', 'icon_list', 'me-2')}></i>
                    <h5>Danh sách nhiệm vụ trong dự án</h5>
                </div>

                <div>
                    <TaskList tasks={detailProject?.tasks || []} handleDetailTask={handleDetailTaskAdmin} showFullTaskList={true}/>
                </div>
            </div>
        </div>
    )
}

export default DetailProjectScreen
