import Api from "../../api";
import {toast} from "react-toastify";

export function updateData(data) {
    return {
        type: 'UPDATE_DATA',
        data
    }
}

export function actionGetListProject (token, page, size, keyword, fromCreatedDate, toCreatedDate, fromExpiredDate, toExpiredDate) {
    return async (dispatch, getState) => {
        try {
            const response = await Api(token).getListProject(page, size, keyword = '', fromCreatedDate, toCreatedDate, fromExpiredDate, toExpiredDate);
            if (response && response.data){
                dispatch(updateData({
                    listProjectManagementResponse: response.data,
                }))
            } else {
                dispatch(updateData({
                    listProjectManagementResponse: [],
                }))
                toast.error('Lấy dữ liệu thất bại!');
                console.log("Lỗi api actionGetListProject");
            }
        } catch (error) {
            console.log("Lỗi api actionGetListProject", error);
        }
    };
}

export function actionGetDetailProject (token, projectId) {
    return async (dispatch, getState) => {
        try {
            const response = await Api(token).getDetailProject(projectId);
            if (response && response.data){
                dispatch(updateData({
                    detailProject: response.data,
                }))
            } else {
                dispatch(updateData({
                    detailProject: {},
                }))
                toast.error('Lấy dữ liệu thất bại!');
                console.log("Lỗi api actionGetDetailProject");
            }
        } catch (error) {
            console.log("Lỗi api actionGetDetailProject", error);
        }
    };
}

export function actionUpdateProject (token, id, projectName, createDate, expiredDate, projectStatus, projectContent) {
    return async (dispatch, getState) => {
        try {
            const response = await Api(token).updateProject(id, projectName, createDate, expiredDate, projectStatus, projectContent);
            if (response && response.data){
                dispatch(actionGetDetailProject(id))
            } else {
                dispatch(actionGetDetailProject(id))
                toast.error("Cập nhập thông tin thất bại");
                console.log("Lỗi api actionUpdateProject");
            }
        } catch (error) {
            console.log("Lỗi api actionUpdateProject", error);
        }
    };
}

export default {
    actionGetListProject,
    actionGetDetailProject,
    actionUpdateProject,
};
