import Api from "../../api";

export function updateData(data) {
    return {
        type: 'UPDATE_DATA',
        data
    }
}

export function actionGetListPersonnelManagement (token, page, size, username, fullname, active, isAdmin, position) {
    return async (dispatch, getState) => {
        try {
            const response = await Api(token).getListPersonnelManagement(page, size, username, fullname, active, isAdmin, position);
            if (response && response.data){
                dispatch(updateData({
                    listPersonnelManagementResponse: response.data,
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

export function actionCreatePersonnel (token, user, navigate) {
    return async (dispatch, getState) => {
        try {
            const response = await Api(token).createPersonnelManagement(user);
            if (response && response.data){
                if(response.data.result){
                    alert("Nhân viên đã được thêm thành công");
                    navigate('/');
                }
            } else {
                alert("Thêm nhân viên thất bại!");
                console.log("Lỗi api actionCreatePersonnel");
            }
        } catch (error) {
            console.log("Lỗi api actionGetListPersonnelManagement", error);
            alert("Lỗi mạng Xin vui lòng kiểm tra lại kết nối internet");
        }
    }
}

export function actionGetPersonnel (token, userID) {
    return async (dispatch, getState) => {
        try {
            if(userID) {
                const response = await Api(token).getDetailPersonnel(userID);
                if (response && response.data){
                    dispatch(updateData({
                        userSelected: response.data,
                    }))
                } else {
                    dispatch(updateData({
                        userSelected: {},
                    }))
                    alert("Lấy thông tin nhân viên thất bại!");
                    console.log("Lỗi api actionCreatePersonnel");
                }
            } else {
                dispatch(updateData({
                    userSelected: {},
                }))
            }
        } catch (error) {
            console.log("Lỗi api actionGetListPersonnelManagement", error);
            alert("Lỗi mạng Xin vui lòng kiểm tra lại kết nối internet");
            dispatch(updateData({
                userSelected: {},
            }))
        }
    }
}

export function actionResetPasswordPersonnel (token, userID, newPassword) {
    return async (dispatch, getState) => {
        try {
            const response = await Api(token).putPasswordNew(userID, newPassword);
            if (response && response.data){
                alert("Đổi mật khẩu thành công!");
            } else {
                alert("Đổi mật khẩu thất bại!");
                console.log("Lỗi api actionResetPasswordPersonnel");
            }
        } catch (error) {
            console.log("Lỗi api actionResetPasswordPersonnel", error);
            alert("Lỗi mạng Xin vui lòng kiểm tra lại kết nối internet");
        }
    }
}

export default {
    actionGetListPersonnelManagement,
    actionCreatePersonnel,
    actionGetPersonnel,
};
