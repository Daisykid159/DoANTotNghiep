import React, {useEffect, useState} from "react";
import classNames from "classnames/bind";
import 'react-treeview/react-treeview.css';
import styles from "./DepartmentManagementStyle.module.scss";
import TreeComponent from "../../../components/Tree/TreeComponent";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {
    actionCreateDepartmentManagement,
    actionGetListDepartmentManagement, actionGetListUserOfDepartment, actionUpdateDepartmentManagement
} from "../../../redux-store/action/actionDepartmentManagement";
import Select from "react-select";

const cx = classNames.bind(styles);

const DepartmentManagementScreen = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const token = useSelector(state => state.reducerAuth.token);
    const listDepartment = useSelector(state => state.reducerDepartmentManagement.listDepartment);
    const listUserOfDepartment = useSelector(state => state.reducerDepartmentManagement.listUserOfDepartment);
    const [activeModuleDepartment, setActiveModuleDepartment] = useState(false);
    const [nodeSelect, setNodeSelect] = useState(listDepartment[0]);
    const [selectedDepartment, setSelectedDepartment] = useState(null);
    const [departmentName, setDepartmentName] = useState("");
    const [departmentActive, setDepartmentActive] = useState(false);
    const [departmentNewName, setDepartmentNewName] = useState("");
    const [departmentNewIsActive, setDepartmentNewIsActive] = useState(true);
    const [selectedDepartmentCreate, setSelectedDepartmentCreate] = useState(null);

    const handleNodeClick = (node) => {
        setNodeSelect(node);
        setDepartmentName(node.departmentName);
        setDepartmentActive(node.isActive)
        dispatch(actionGetListUserOfDepartment(token, node.departmentId));
        let haveParentDepartment = false;
        flatList.map((department) => {
            if(department.value === node.department_parent_id) {
                setSelectedDepartment(department);
                haveParentDepartment = true
            }
        })
        if(!haveParentDepartment) {
            setSelectedDepartment(null);
        }
    }

    const flattenTreeForSelect = (tree, level = 0, parentLabel = "") => {
        let flatList = [];
        tree.forEach((node) => {
            flatList.push({
                value: node.departmentId,
                label: `${parentLabel}${node.departmentName}`,
                department_parent_id: node.department_parent_id,
                isActive: node.isActive,
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

    const handleUpdateDepartment = () => {
        dispatch(actionUpdateDepartmentManagement(token, nodeSelect.departmentId, departmentName, selectedDepartment.value, departmentActive));
    }

    useEffect(() => {
        if(listDepartment.length > 0){
            dispatch(actionGetListUserOfDepartment(token, listDepartment[0]?.departmentId));
            setNodeSelect(listDepartment[0]);
            setSelectedDepartment(null);
            setDepartmentName(listDepartment[0].departmentName);
            setDepartmentActive(listDepartment[0].isActive);
        }
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
                            onClick={() => handleUpdateDepartment()}
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
                                value={departmentName}
                                onChange={(e) => setDepartmentName(e.target.value)}
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
                            <input
                                type="checkbox"
                                className="form-check-input me-2"
                                id="active"
                                checked={departmentActive}
                                onChange={(e) => setDepartmentActive(e.target.checked)}
                            />
                            <label className="form-check-label" htmlFor="active">Hoạt động</label>
                        </div>
                        <div className="mb-3 d-flex align-items-center">
                        <label className="col-md-3">Thêm người dùng vào phòng ban:</label>
                            <input type="text" className="form-control" placeholder="Nhập phòng ban" value={'eGov - Beta'} />
                        </div>
                    </div>
                    <div>
                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <h5>Danh sách người dùng trong phòng ban</h5>

                            <button
                                className="btn btn-info d-flex align-items-center"
                            >
                                CẬP NHẬT
                            </button>
                        </div>
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
                            {listUserOfDepartment.map((item, index) => (
                                <tr className={cx('text-center', 'table_row')} key={index}>
                                    <td>{index + 1}</td>
                                    <td className='text_left'>{item.user_name}</td>
                                    <td>{item.position_name}</td>
                                    <td>
                                        <input
                                            type="checkbox"
                                            className="form-check-input"
                                            id="active"
                                            checked={item.isMain}
                                        />
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
