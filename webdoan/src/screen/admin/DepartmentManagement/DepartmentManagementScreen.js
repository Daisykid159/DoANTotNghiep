import React, {useState} from "react";
import classNames from "classnames/bind";
import 'react-treeview/react-treeview.css';
import styles from "./DepartmentManagementStyle.module.scss";
import TreeComponent from "../../../components/Tree/TreeComponent";

const cx = classNames.bind(styles);

const DepartmentManagementScreen = () => {

    const treeData = [
        {
            label: 'eGov - Beta',
            children: [
                { label: 'Văn phòng' },
                {
                    label: 'Phòng Công nghệ thông tin, ...',
                    children: [
                        { label: 'Phòng Thông tin - Báo chí' },
                        { label: 'Trung tâm Giám sát, điều hành' },
                        {
                            label: 'Phòng Dịch vụ và Phát triển',
                            children: [
                                { label: 'Phòng Giám sát, điều hành đô thị thông minh' },
                                {
                                    label: 'Phòng Hạ tầng và An toàn thông tin mạng',
                                    children: [
                                        { label: 'Phòng Thông tin - Báo chí' },
                                        { label: 'Trung tâm Giám sát, điều hành' },
                                        {
                                            label: 'Phòng Dịch vụ và Phát triển',
                                            children: [
                                                { label: 'Phòng Giám sát, điều hành đô thị thông minh' },
                                                {
                                                    label: 'Phòng Hạ tầng và An toàn thông tin mạng',
                                                    children: [
                                                        { label: 'Phòng Thông tin - Báo chí' },
                                                        { label: 'Trung tâm Giám sát, điều hành' },
                                                        {
                                                            label: 'Phòng Dịch vụ và Phát triển',
                                                            children: [
                                                                { label: 'Phòng Giám sát, điều hành đô thị thông minh' },
                                                                { label: 'Phòng Hạ tầng và An toàn thông tin mạng' },
                                                            ],
                                                        },
                                                    ],
                                                },
                                            ],
                                        },
                                    ],
                                },
                            ],
                        },
                    ],
                },
                { label: 'Phòng KSNB' },
                { label: 'Thanh tra Sở' },
                {
                    label: 'Phòng Công nghệ thông tin, ...',
                    children: [
                        { label: 'Phòng Thông tin - Báo chí' },
                        { label: 'Trung tâm Giám sát, điều hành' },
                        {
                            label: 'Phòng Dịch vụ và Phát triển',
                            children: [
                                { label: 'Phòng Giám sát, điều hành đô thị thông minh' },
                                {
                                    label: 'Phòng Hạ tầng và An toàn thông tin mạng',
                                    children: [
                                        { label: 'Phòng Thông tin - Báo chí' },
                                        { label: 'Trung tâm Giám sát, điều hành' },
                                        {
                                            label: 'Phòng Dịch vụ và Phát triển',
                                            children: [
                                                { label: 'Phòng Giám sát, điều hành đô thị thông minh' },
                                                {
                                                    label: 'Phòng Hạ tầng và An toàn thông tin mạng',
                                                    children: [
                                                        { label: 'Phòng Thông tin - Báo chí' },
                                                        { label: 'Trung tâm Giám sát, điều hành' },
                                                        {
                                                            label: 'Phòng Dịch vụ và Phát triển',
                                                            children: [
                                                                { label: 'Phòng Giám sát, điều hành đô thị thông minh' },
                                                                { label: 'Phòng Hạ tầng và An toàn thông tin mạng' },
                                                            ],
                                                        },
                                                    ],
                                                },
                                            ],
                                        },
                                    ],
                                },
                            ],
                        },
                    ],
                },
            ],
        },
    ];

    const listUsers = [
        { id: 1, username: "admin", fullname: "Administrator Administrator", active: "Có" },
        { id: 2, username: "admin_anhtp", fullname: "Admin AnhTp", active: "Có" },
        { id: 3, username: "admin_cuongnt", fullname: "Admin CuongNT", active: "Có" },
        // Thêm các dòng dữ liệu khác
    ];

    const [activeModuleDepartment, setActiveModuleDepartment] = useState(false);

    return (
        <div className={cx('DepartmentManagementScreen', 'container')}>
            <div className="col-md-12">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <div className={cx('d-flex', 'align-items-center')}>
                        <i className={cx('bx bxs-home', 'icon_header', 'me-2')}></i>
                        <h4>Quản lý phòng ban</h4>
                    </div>

                    <div className="d-flex justify-content-between">
                        <button
                            className="btn btn-success d-flex align-items-center me-2"
                            onClick={() => setActiveModuleDepartment(true)}
                        >
                            <i className="bx bx-plus me-1"></i>
                            TẠO MỚI
                        </button>
                    </div>
                </div>
            </div>

            <div className={cx('row')}>
                <div className={cx("col-md-4")}>
                    <TreeComponent data={treeData} />
                </div>

                <div className={cx("col-md-8", 'border_left')}>
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h4>Thông tin phòng ban</h4>

                        <button
                            className="btn btn-info d-flex align-items-center"
                        >
                            Cập nhật
                        </button>
                    </div>

                    <div>
                        <div className="mb-3 d-flex align-items-center">
                            <label className="col-md-3">Tên Phòng ban <span className="text-danger">*</span>:</label>
                            <input type="text" className="form-control" placeholder="Nhập phòng ban" />
                        </div>

                        <div className="mb-3 d-flex align-items-center">
                            <label className="col-md-3">Thuộc phòng ban:</label>
                            <input type="text" className="form-control" placeholder="Nhập phòng ban" value={'eGov - Beta'} />
                        </div>
                        <div className={cx('col-md-3', 'mb-3')}>
                            <input type="checkbox" className="form-check-input me-2" id="active" checked={true} />
                            <label className="form-check-label" htmlFor="active">Hoạt động</label>
                        </div>
                        <div className="mb-3 d-flex align-items-center">
                            <label className="col-md-3">Thêm người dùng vào phòng ban:</label>
                            <input type="text" className="form-control" placeholder="Nhập phòng ban" value={'eGov - Beta'} />
                        </div>
                    </div>
                    <div>
                        <div>Danh sách cán bộ thuộc phòng ban</div>
                        <table className={cx('w-100', 'table')}>
                            <thead>
                            <tr className={cx('text-center', 'table_row')}>
                                <th>STT</th>
                                <th>Tên nhân viên</th>
                                <th>Chức vụ</th>
                                <th>Phòng ban chính</th>
                                <th>Xoá</th>
                            </tr>
                            </thead>
                            <tbody>
                            {listUsers.map((item, index) => (
                                <tr className={cx('text-center', 'table_row')} key={index}>
                                    <td>{index + 1}</td>
                                    <td className='text_left'>{item.fullname}</td>
                                    <td>Chuyên viên</td>
                                    <td>
                                        <input type="checkbox" className="form-check-input" id="active"/>
                                    </td>
                                    <td className={cx('text_red')}>Xoá</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <div className={cx('moduleCreateDepartment', (activeModuleDepartment ? 'active' : 'inactive'))}>
                <div className={cx("col-md-7", 'bodyModuleCreateDepartment')}>
                    <div>
                        <button
                            className={cx("btn btn-close", 'closeModuleDepartment')}
                            onClick={() => setActiveModuleDepartment(false)}
                        ></button>
                    </div>
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h4>Thông tin phòng ban</h4>

                        <button
                            className="btn btn-info d-flex align-items-center"
                        >
                            Thêm phòng ban
                        </button>
                    </div>

                    <div>
                        <div className="mb-3 d-flex align-items-center">
                            <label className="col-md-3">Tên Phòng ban <span className="text-danger">*</span>:</label>
                            <input type="text" className="form-control" placeholder="Nhập phòng ban"/>
                        </div>

                        <div className="mb-3 d-flex align-items-center">
                            <label className="col-md-3">Thuộc phòng ban:</label>
                            <input type="text" className="form-control" placeholder="Nhập phòng ban"
                                   value={'eGov - Beta'}/>
                        </div>
                        <div className={cx('col-md-3', 'mb-3')}>
                            <input type="checkbox" className="form-check-input me-2" id="active" checked={true}/>
                            <label className="form-check-label" htmlFor="active">Hoạt động</label>
                        </div>
                        <div className="mb-3 d-flex align-items-center">
                            <label className="col-md-3">Thêm người dùng vào phòng ban:</label>
                            <input type="text" className="form-control" placeholder="Nhập phòng ban"
                                   value={'eGov - Beta'}/>
                        </div>
                    </div>
                    <div>
                        <div>Danh sách cán bộ thuộc phòng ban</div>
                        <table className={cx('w-100', 'table')}>
                            <thead>
                            <tr className={cx('text-center', 'table_row')}>
                                <th>STT</th>
                                <th>Tên nhân viên</th>
                                <th>Chức danh</th>
                                <th>Chức vụ</th>
                                <th>Phòng ban chính</th>
                                <th>Xoá</th>
                            </tr>
                            </thead>
                            <tbody>
                            {listUsers.map((item, index) => (
                                <tr className={cx('text-center', 'table_row')} key={index}>
                                    <td>{index + 1}</td>
                                    <td className='text_left'>{item.fullname}</td>
                                    <td>Chuyên viên</td>
                                    <td>Ban lãnh đạo</td>
                                    <td>
                                        <input type="checkbox" className="form-check-input" id="active"/>
                                    </td>
                                    <td className={cx('text_red')}>Xoá</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DepartmentManagementScreen;
