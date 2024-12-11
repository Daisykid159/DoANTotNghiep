import Api from "../../api";

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
                alert("Lấy dữ liệu thất bại!");
                console.log("Lỗi api actionGetListProject");
            }
        } catch (error) {
            console.log("Lỗi api actionGetListProject", error);
            alert("Lỗi mạng Xin vui lòng kiểm tra lại kết nối internet");
        }
    };
}

export function actionGetDetailProject (token, projectId) {
    return async (dispatch, getState) => {
        try {
            const response = await Api(token).getDetailProject(projectId);
            if (response && response.data){
                dispatch(updateData({
                    listProjectManagementResponse: response.data,
                }))
            } else {
                dispatch(updateData({
                    listProjectManagementResponse: [],
                }))
                alert("Lấy dữ liệu thất bại!");
                console.log("Lỗi api actionGetDetailProject");
            }
        } catch (error) {
            console.log("Lỗi api actionGetDetailProject", error);
            alert("Lỗi mạng Xin vui lòng kiểm tra lại kết nối internet");
        }
    };
}

export default {
    actionGetListProject,
    actionGetDetailProject,
};
