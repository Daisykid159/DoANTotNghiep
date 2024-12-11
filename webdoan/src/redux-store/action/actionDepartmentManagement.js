import Api from "../../api";

export function updateData(data) {
    return {
        type: 'UPDATE_DATA',
        data
    }
}

export function actionGetListDepartmentManagement (token) {
    return async (dispatch, getState) => {
        try {
            const response = await Api(token).getListDepartmentManagement();
            if (response && response.data){
                dispatch(updateData({
                    listDepartment: response.data,
                }))
            } else {
                dispatch(updateData({
                    listPersonnelManagementResponse: {},
                }))
                alert("Lấy dữ liệu thất bại!");
                console.log("Lỗi api actionGetListPersonnelManagement");
            }
        } catch (error) {
            console.log("Lỗi api actionGetListPersonnelManagement", error);
            alert("Lỗi mạng Xin vui lòng kiểm tra lại kết nối internet");
        }
    };
}

export function actionGetListUserOfDepartment (token, id) {
    return async (dispatch, getState) => {
        try {
            const response = await Api(token).getListUsersOfDepartment(id);
            if (response && response.data){
                dispatch(updateData({
                    listUserOfDepartment: response.data,
                }))
            } else {
                dispatch(updateData({
                    listUserOfDepartment: [],
                }))
                alert("Lấy dữ liệu thất bại!");
                console.log("Lỗi api actionGetListPersonnelManagement");
            }
        } catch (error) {
            console.log("Lỗi api actionGetListPersonnelManagement", error);
            alert("Lỗi mạng Xin vui lòng kiểm tra lại kết nối internet");
        }
    };
}

export function actionCreateDepartmentManagement (token, parentDepartmentId, departmentNewName, departmentNewIsActive, resetCreate) {
    return async (dispatch, getState) => {
        try {
            const response = await Api(token).createDepartment(parentDepartmentId, departmentNewName, departmentNewIsActive);
            if (response && response.data){
                dispatch(actionGetListDepartmentManagement(token));
                resetCreate();
                alert('Thêm phòng ban thành công!')
            } else {
                alert("Thêm phòng ban thất bại!");
                dispatch(actionGetListDepartmentManagement(token));
                console.log("Lỗi api actionCreateDepartmentManagement");
            }
        } catch (error) {
            console.log("Lỗi api actionCreateDepartmentManagement", error);
            alert("Lỗi mạng Xin vui lòng kiểm tra lại kết nối internet");
        }
    };
}

export function actionUpdateDepartmentManagement (token, department_id, departmentName, department_parent_id, isActive) {
    return async (dispatch, getState) => {
        try {
            const response = await Api(token).updateDepartment(department_id, departmentName, department_parent_id, isActive);
            if (response && response.data){
                dispatch(actionGetListDepartmentManagement(token));
                alert('Cập nhật phòng ban thành công!')
            } else {
                alert("Cập nhật phòng ban thất bại!");
                dispatch(actionGetListDepartmentManagement(token));
                console.log("Lỗi api actionCreateDepartmentManagement");
            }
        } catch (error) {
            console.log("Lỗi api actionCreateDepartmentManagement", error);
            alert("Lỗi mạng Xin vui lòng kiểm tra lại kết nối internet");
        }
    };
}

export function actionGetListPositions (token) {
    return async (dispatch, getState) => {
        try {
            const response = await Api(token).getListPositions();
            if (response && response.data){
                dispatch(updateData({
                    listPositions: response.data.content,
                }))
            } else {
                dispatch(updateData({
                    listPositions: [],
                }))
                alert("Lấy dữ liệu thất bại!");
                console.log("Lỗi api actionGetListPositions");
            }
        } catch (error) {
            console.log("Lỗi api actionGetListPositions", error);
            alert("Lỗi mạng Xin vui lòng kiểm tra lại kết nối internet");
        }
    };
}

export function actionUpdatePosition (token, posNew) {
    return async (dispatch, getState) => {
        try {
            const response = await Api(token).updatePosition(posNew);
            if (response && response.data){
                dispatch(actionGetListPositions(token));
                alert("Cập nhập chức vụ thành công");
            } else {
                dispatch(actionGetListPositions(token));
                alert("Cập nhập chức vụ thất bại");
                console.log("Lỗi api actionUpdatePosition");
            }
        } catch (error) {
            console.log("Lỗi api actionUpdatePosition", error);
            alert("Lỗi mạng Xin vui lòng kiểm tra lại kết nối internet");
        }
    };
}

export function actionCreatePosition (token, positionNameNew, isActiveNew) {
    return async (dispatch, getState) => {
        try {
            const response = await Api(token).createPosition(positionNameNew, isActiveNew);
            if (response && response.data){
                dispatch(actionGetListPositions(token));
                alert("Thêm chức vụ thành công");
            } else {
                dispatch(actionGetListPositions(token));
                alert("Thêm chức vụ thất bại");
                console.log("Lỗi api actionUpdatePosition");
            }
        } catch (error) {
            console.log("Lỗi api actionUpdatePosition", error);
            alert("Lỗi mạng Xin vui lòng kiểm tra lại kết nối internet");
        }
    };
}

export default {
    actionGetListDepartmentManagement,
    actionGetListUserOfDepartment,
    actionGetListPositions,
    actionUpdatePosition,
    actionCreatePosition,
    actionCreateDepartmentManagement,
    actionUpdateDepartmentManagement,
};
