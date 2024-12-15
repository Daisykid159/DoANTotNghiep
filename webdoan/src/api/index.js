import axios from 'axios';
import reducerPersonnelManagement from "../redux-store/reducer/reducerPersonnelManagement";
import {getListDepartmentManagement} from "../redux-store/action/actionDepartmentManagement";

const Api = (token) => {
    let api

    if (token) {
        api = axios.create({
            baseURL: 'http://localhost:8080',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token || ''}`,
            },
            timeout: 20000,
        });
    } else {
        api = axios.create({
            baseURL: 'http://localhost:8080',
            headers: {
                'Content-Type': 'application/json',
            },
            timeout: 20000,
        });
    }

    // api get token login
    const getTokenLogin =(username, password) => {
        return api.post('/auth/login', {
            "username": username,
            "password": password
        });
    }

    const refreshToken = (token) => {
        return api.post('/auth/refresh', {
            token: token,
        })
    }

    const getListPersonnelManagement =(page, size, username = '', fullname = '', active = '', isAdmin = '', position = '') => {
        return api.get(`/api/admin/users?page=${page}&size=${size}&username=${username}&fullname=${fullname}&active=${active}&isAdmin=${isAdmin}&position=${position}`);
    }

    const getGeneralAdmin = () => {
        return api.get(`/api/admin/general`);
    }

    const createPersonnelManagement = (data) => {
        return api.post(`/api/admin/createUser`, data);
    }

    const updatePersonnelManagement = (data) => {
        return api.put(`/api/admin/users`, data);
    }

    const getDetailPersonnel = (usedID) => {
        return api.get(`/api/admin/users/${usedID}`);
    }

    const putPasswordNew = (userId, newPassword) => {
        return api.put(`/api/admin/upPassword?password=${newPassword}&idUser=${userId}`);
    }

    const getListDepartmentManagement = () => {
        return api.get(`/api/admin/department`);
    }

    const getListUsersOfDepartment = (id) => {
        return api.get(`api/admin/UsersOfDepartment/${id}`);
    }

    const createDepartment = (parentDepartmentId, departmentNewName, departmentNewIsActive) => {
        return api.post(`/api/admin/createDepartment`, {
            parent_department_id: parentDepartmentId,
            department_name: departmentNewName,
            isactive: departmentNewIsActive,
        });
    }

    const updateDepartment = (department_id, departmentName, department_parent_id, isActive) => {
        return api.put(`/api/admin/updateDepartment/${department_id}`, {
            department_id, department_name: departmentName, parent_department_id: department_parent_id, isActive
        });
    }

    const getListPositions = () => {
        return api.get(`/api/admin/positions`);
    }

    const updatePosition = (pos) => {
        return api.put(`/api/admin/updatePosition/${pos.position_id}`, {
            position_name: pos.position_name,
            isActive: pos.isActive,
        });
    }

    const createPosition = (positionNameNew, isActiveNew) => {
        return api.post(`/api/admin/createPosition`, {
            position_name: positionNameNew,
            isActive: isActiveNew
        });
    }

    const getListProject = (page, size, keyword = '', fromCreatedDate = '', toCreatedDate = '', fromExpiredDate = '', toExpiredDate = '') => {
        return api.get(`api/admin/projects?page=${page}&size=${size}&keyword=${keyword}&fromCreatedDate=${fromCreatedDate}&toCreatedDate=${toCreatedDate}&fromExpiredDate=${fromExpiredDate}&toExpiredDate=${toExpiredDate}`);
    }

    const getDetailProject = id => {
        return api.get(`api/admin/project/${id}`);
    }

    const updateProject = (id, projectName, createDate, expiredDate, projectStatus, projectContent) => {
        return api.put(`api/admin/updateProject/${id}`, {
            project_name: projectName,
            created_date: createDate,
            expired_date: expiredDate,
            status: projectStatus,
            content: projectContent,
        });
    }


    /* API cho User */
    const getOverView = () => {
        return api.get(`/api/user/overview`);
    }

    const createTask = (task) => {
        return api.post(`/api/user/createTask`, task);
    }

    const getListMenu = () => {
        return api.get(`api/user/menus`);
    }

    const getListTaskByMenu = (id) => {
        return api.get(`api/user/getListMenuById?menu_id=${id}`);
    }

    const getDetailTask = (id) => {
        return api.get(`api/user/TaskDetail?task_user_id=${id}`);
    }

    const sendReport = (task_id, type, user_create_id, content, new_expired_date) => {
        return api.post(`/api/user/sendReport`, {
            task_id: task_id,
            user_create_id: user_create_id,
            content: content,
            type: type,
            new_expired_date: new_expired_date,
        })
    }

    const processingHandover = (data) => {
        return api.put(`api/user/processingHandover`, data);
    }

    const evictTask = (task_id) => {
        return api.put(`api/user/evictTask?task_id=${task_id}`);
    }

    const updateProcessing = (task_user_id, progress) => {
        return api.put(`/api/user/updateProcessing?task_user_id=${task_user_id}&processing=${progress}`);
    }

    return {
        getTokenLogin,
        refreshToken,
        getListPersonnelManagement,
        getGeneralAdmin,
        createPersonnelManagement,
        updatePersonnelManagement,
        getDetailPersonnel,
        putPasswordNew,
        getListDepartmentManagement,
        getListUsersOfDepartment,
        updateDepartment,
        createDepartment,
        getListPositions,
        updatePosition,
        createPosition,
        getListProject,
        getDetailProject,
        updateProject,

        getDetailTask,

        getOverView,
        createTask,
        getListMenu,
        getListTaskByMenu,
        sendReport,
        processingHandover,
        evictTask,
        updateProcessing,
    };
};

export default Api;
