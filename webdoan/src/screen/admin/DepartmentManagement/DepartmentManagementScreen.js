import React, {useEffect, useState} from "react";
import classNames from "classnames/bind";
import 'react-treeview/react-treeview.css';
import styles from "./DepartmentManagementStyle.module.scss";
import TreeComponent from "../../../components/Tree/TreeComponent";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {
    actionCreateDepartmentManagement,
    actionGetListDepartmentManagement
} from "../../../redux-store/action/actionDepartmentManagement";
import Select from "react-select";

const cx = classNames.bind(styles);

const DepartmentManagementScreen = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const token = useSelector(state => state.reducerAuth.token);
    const listDepartment = useSelector(state => state.reducerDepartmentManagement.listDepartment);
    const listUsers = [
        { id: 1, username: "admin", fullname: "Administrator Administrator", active: "Có" },
        { id: 2, username: "admin_anhtp", fullname: "Admin AnhTp", active: "Có" },
        { id: 3, username: "admin_cuongnt", fullname: "Admin CuongNT", active: "Có" },
        // Thêm các dòng dữ liệu khác
    ];
    const [activeModuleDepartment, setActiveModuleDepartment] = useState(false);

    const [nodeSelect, setNodeSelect] = useState(listDepartment[0]);
    const [selectedDepartment, setSelectedDepartment] = useState("");

    const [departmentNewName, setDepartmentNewName] = useState("");
    const [departmentNewIsActive, setDepartmentNewIsActive] = useState(true);
    const [selectedDepartmentCreate, setSelectedDepartmentCreate] = useState(null);

    const handleNodeClick = (node) => {
        setNodeSelect(node);
        console.log(node);
    }

    const flattenTreeForSelect = (tree, level = 0, parentLabel = "") => {
        let flatList = [];
        tree.forEach((node) => {
            flatList.push({
                value: node.departmentId,
                label: `${parentLabel}${node.departmentName}`,
            });
            if (node.child_departments && node.child_departments.length > 0) {
                flatList = flatList.concat(
                    flattenTreeForSelect(node.child_departments, level + 1, `${parentLabel}--- `)
                );
            }
        });
        return flatList;
    };

    const flatList = flattenTreeForSelect(listDepartment);

    const handleChangeEdit = (item) => {
        setSelectedDepartment(item);
    };

    const handleChangeCreate = (item) => {
        setSelectedDepartmentCreate(item);
    };

    const resetCreate = () => {
        setDepartmentNewName("")
        setDepartmentNewIsActive(true);
        setSelectedDepartmentCreate(null);
        setActiveModuleDepartment(false);
    }

    const handleCreateDepartment = () => {
        dispatch(actionCreateDepartmentManagement(token, selectedDepartmentCreate.value, departmentNewName, departmentNewIsActive, resetCreate));
    }

    useEffect(() => {
        setNodeSelect(listDepartment[0]);
    }, [listDepartment])

    useEffect(() => {
        dispatch(actionGetListDepartmentManagement(token))
    }, []);

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
                            className="btn btn-danger d-flex align-items-center me-2"
                            onClick={() => navigate('/admin/PositionManagementScreen')}
                        >
                            QL CHỨC VỤ
                        </button>

                        <button
                            className="btn btn-success d-flex align-items-center me-2"
                            onClick={() => setActiveModuleDepartment(true)}
                        >
                            <i className="bx bx-plus me-1"></i>
                            TẠO MỚI PHÒNG BAN
                        </button>
                    </div>
                </div>
            </div>

            <div className={cx('row', 'DepartmentManagementScreen_body')}>
                <div className={cx("col-md-4")}>
                    <TreeComponent data={listDepartment} handleNodeClick={handleNodeClick}/>
                </div>

                <div className={cx("col-md-8", 'border_left')}>
                <div className="d-flex justify-content-between align-items-center mb-4">
                        <h4>Thông tin phòng ban</h4>

                        <button
                            className="btn btn-info d-flex align-items-center"
                        >
                            CẬP NHẬT
                        </button>
                    </div>

                    <div>
                        <div className="mb-3 d-flex align-items-center">
                            <label className="col-md-3">Tên Phòng ban <span className="text-danger">*</span>:</label>
                            <input
                                type="text"
                                className="form-control"
                                value={nodeSelect?.departmentName}
                            />
                        </div>

                        <div className="mb-3 d-flex align-items-center">
                            <label className="col-md-3">Thuộc phòng ban:</label>
                            <Select
                                options={flatList}
                                value={selectedDepartment || null}
                                onChange={handleChangeEdit}
                                placeholder="Tìm phòng ban..."
                                className="mb-3 w-100"
                            />
                        </div>
                        <div className={cx('col-md-3', 'mb-3')}>
                            <input type="checkbox" className="form-check-input me-2" id="active" checked={true}/>
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
                            onClick={() => handleCreateDepartment()}
                        >
                            Thêm phòng ban
                        </button>
                    </div>

                    <div>
                        <div className="mb-3 d-flex align-items-center">
                            <label className="col-md-3">Tên Phòng ban <span className="text-danger">*</span>:</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nhập phòng ban"
                                value={departmentNewName}
                                onChange={e => setDepartmentNewName(e.target.value)}
                            />
                        </div>

                        <div className="mb-3 d-flex align-items-center">
                            <label className="col-md-3">Thuộc phòng ban:</label>
                            <Select
                                options={flatList}
                                value={selectedDepartmentCreate || null}
                                onChange={handleChangeCreate}
                                placeholder="Tìm phòng ban..."
                                className="mb-3 w-100"
                            />
                        </div>
                        <div className={cx('col-md-3', 'mb-3')}>
                            <input
                                type="checkbox"
                                className="form-check-input me-2"
                                checked={departmentNewIsActive}
                                value={departmentNewIsActive}
                                onChange={e => setDepartmentNewIsActive(e.target.checked)}
                            />
                            <label className="form-check-label" htmlFor="active">Hoạt động</label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DepartmentManagementScreen;
