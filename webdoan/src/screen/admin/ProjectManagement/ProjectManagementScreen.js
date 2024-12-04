import React, {useState} from "react";
import classNames from "classnames/bind";
import styles from "./ProjectManagementStyle.module.scss";
import { useNavigate } from "react-router-dom";

const cx = classNames.bind(styles);

const ProjectManagementScreen = () => {

    const navigate = useNavigate();

    const [pageCurrent, setPageCurrent] = useState(1);
    const [sizePage, setSizePage] = useState(15);

    const dataListProject = {
        data: [
            {
                id: 1,
                name: 'Dự án A',
                createdAt: '2024-01-15',
                deadline: '2024-02-15',
                taskCount: 5,
            },
            {
                id: 2,
                name: 'Dự án B',
                createdAt: '2024-02-01',
                deadline: '2024-03-01',
                taskCount: 12,
            },
            {
                id: 3,
                name: 'Dự án C',
                createdAt: '2024-03-05',
                deadline: '2024-04-05',
                taskCount: 8,
            },
        ],
        totalPages: 5,
    };

    return (
        <div className={cx('ProjectManagementScreen', 'container')}>
            <div className={cx('d-flex', 'align-items-center', 'justify-content-between', 'mb-3')}>
                <div className={cx('d-flex', 'align-items-center')}>
                    <i className={cx('bx bx-task', 'icon_header', 'me-2')}></i>
                    <h4>Quản lý dự án</h4>
                </div>

                <button
                    className="btn btn-success d-flex align-items-center me-2"
                >
                    <i className="bx bx-plus me-1"></i>
                    TẠO MỚI
                </button>
            </div>

            <div className="col-md-12">
                <div className={cx("mb-3 d-flex align-items-center", 'col-md-12')}>
                    <label className="col-md-2">Tên dự án</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Tên dự án"
                    />
                </div>

                <div className={classNames("mb-3 d-flex align-items-center", "col-md-12")}>
                    <label className="col-md-2">Ngày tạo</label>
                    <input
                        type="date"
                        className={classNames("form-control")}
                        placeholder="Từ ngày"
                    />
                    <span style={{ margin: "0 20px" }}>đến</span>
                    <input
                        type="date"
                        className={classNames("form-control")}
                        placeholder="Đến ngày"
                    />
                </div>

                <div className={classNames("mb-3 d-flex align-items-center", "col-md-12")}>
                    <label className="col-md-2">Hạn xử lý</label>
                    <input
                        type="date"
                        className={classNames("form-control")}
                        placeholder="Từ ngày"
                    />
                    <span style={{ margin: "0 20px" }}>đến</span>
                    <input
                        type="date"
                        className={classNames("form-control")}
                        placeholder="Đến ngày"
                    />
                </div>

                <button
                    className="btn btn-warning w-100 mb-3"
                >Tìm kiếm</button>
            </div>

            <div className={cx("w-100")}>
                <table bordered hover className={cx("col-md-12", 'table_list_project')}>
                    <thead>
                    <tr className={cx('text-center', 'table_row')}>
                        <th>STT</th>
                        <th>Tên dự án</th>
                        <th>Ngày tạo</th>
                        <th>Hạn xử lý dự án</th>
                        <th>Tổng số công việc</th>
                    </tr>
                    </thead>
                    <tbody>
                    {dataListProject.data && dataListProject.data.length > 0 ? (
                        dataListProject.data.map((project, index) => (
                            <tr
                                key={index}
                                className={cx('text-center', 'table_row')}
                                onClick={() => {
                                    navigate('/admin/DetailProjectScreen')
                                }}
                            >
                                <td>{index + 1}</td>
                                <td>{project.name}</td>
                                <td>{project.createdAt}</td>
                                <td>{project.deadline}</td>
                                <td>{project.taskCount}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" className={cx("empty_row")}>
                                Không có dự án nào.
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>

                <div className="d-flex justify-content-between align-items-center mt-3">
                    <div className="d-flex justify-content-between align-items-center mt-3">
                        <div
                            className={cx("p-2", 'btn_page')}
                            onClick={() => {
                                if (pageCurrent > 1) setPageCurrent(pageCurrent - 1)
                            }}
                        >{"<<"}</div>
                        {dataListProject?.totalPages ?
                            (Array.from({ length: dataListProject.totalPages }, (_, index) => index + 1).map((page) => (
                                <div
                                    key={page}
                                    className={cx("btn_page_number", 'btn_page', {
                                        active: page === pageCurrent, // Thêm class "active" nếu là trang hiện tại
                                    })}
                                    onClick={() => setPageCurrent(page)}
                                >
                                    {page}
                                </div>
                            ))) : (<div className={cx("btn_page_number", 'btn_page', 'active')}>1</div>)
                        }
                        <div
                            className={cx("p-2", 'btn_page')}
                            onClick={() => {
                                if (pageCurrent < dataListProject?.totalPages) setPageCurrent(pageCurrent + 1)
                            }}
                        >{">>"}</div>
                    </div>
                    <div className="d-flex justify-content-between align-items-center mt-3">
                        Số kết quả/trang:
                        <select
                            className="form-select form-select-sm ms-2"
                            style={{width: "auto", display: "inline-block"}}
                            value={sizePage}
                            onChange={(event) => {
                                setSizePage(event.target.value);
                            }}
                        >
                            <option value={15}>15</option>
                            <option value={30}>30</option>
                            <option value={50}>50</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProjectManagementScreen;
