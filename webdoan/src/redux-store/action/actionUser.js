import Api from "../../api";
import {toast} from "react-toastify";
import {actionGetOverViewUser, actionLogout} from "./actionAuth";

export function updateData(data) {
    return {
        type: 'UPDATE_DATA',
        data
    }
}

export function actionGetListMenu (token) {
    return async (dispatch, getState) => {
        try {
            const response = await Api(token).getListMenu();
            if (response && response.data){
                dispatch(updateData({
                    listMenu: response.data,
                }))
            } else {
                dispatch(updateData({
                    listMenu: [],
                }))
                toast.error('Lấy dữ liệu thất bại!');
                console.log("Lỗi api actionGetListMenu");
            }
        } catch (error) {
            console.log("Lỗi api actionGetListMenu", error);
        }
    };
}

export function actionGetMyInfo (token) {
    return async (dispatch, getState) => {
        try {
            const response = await Api(token).myInfo();
            if (response && response.data){
                dispatch(updateData({
                    myInfo: response.data,
                }))
            } else {
                dispatch(updateData({
                    myInfo: {},
                }))
                toast.error('Lấy dữ liệu thất bại!');
                console.log("Lỗi api actionGetMyInfo");
            }
        } catch (error) {
            console.log("Lỗi api actionGetMyInfo", error);
        }
    };
}

export function actionUpdateMyInfo (token, newInfo) {
    return async (dispatch, getState) => {
        try {
            const response = await Api(token).updateMyInfo(newInfo);
            if (response && response.data){
                dispatch(actionGetMyInfo(token));
                toast.success('Cập nhật dữ liệu thành công!');
            } else {
                toast.error('Cập nhật dữ liệu thất bại!');
                console.log("Lỗi api actionUpdateMyInfo");
            }
        } catch (error) {
            console.log("Lỗi api actionUpdateMyInfo", error);
        }
    };
}

export function actionChangePassword (token, password, passwordNew) {
    return async (dispatch, getState) => {
        try {
            const response = await Api(token).changePassword(password, passwordNew);
            if (response && response.data){
                dispatch(actionLogout());
                toast.success('Đổi mật khẩu thành công!');
            } else {
                toast.error('Đổi mật khẩu thất bại!');
                console.log("Lỗi api actionChangePassword");
            }
        } catch (error) {
            console.log("Lỗi api actionChangePassword", error);
        }
    };
}

export function actionGetListTaskByMenu (token, menuId) {
    return async (dispatch, getState) => {
        try {
            const response = await Api(token).getListTaskByMenu(menuId);
            if (response && response.data){
                dispatch(updateData({
                    listTasks: response.data,
                }))
            } else {
                dispatch(updateData({
                    listTasks: [],
                }))
                toast.error('Lấy dữ liệu thất bại!');
                console.log("Lỗi api actionGetListTaskByMenu");
            }
        } catch (error) {
            console.log("Lỗi api actionGetListTaskByMenu", error);
        }
    };
}

export function actionGetDetailTask (token, taskUserId) {
    return async (dispatch, getState) => {
        try {
            const response = await Api(token).getDetailTask(taskUserId);
            if (response && response.data){
                dispatch(updateData({
                    detailTask: response.data,
                }))
            } else {
                dispatch(updateData({
                    detailTask: {},
                }))
                toast.error('Lấy dữ liệu thất bại!');
                console.log("Lỗi api actionGetListTaskByMenu");
            }
        } catch (error) {
            console.log("Lỗi api actionGetListTaskByMenu", error);
        }
    };
}

export function actionCreateTask (token, task, setShowModuleCreateTask) {
    return async (dispatch, getState) => {
        try {
            const response = await Api(token).createTask(task);
            if (response && response.data){
                dispatch(actionGetListMenu(token));
                setShowModuleCreateTask(false);
                toast.success('Tạo nhiệm vụ thành công!');
            } else {
                toast.error('Tạo nhiệm vụ thất bại!');
                console.log("Lỗi api actionCreateTask");
            }
        } catch (error) {
            console.log("Lỗi api actionCreateTask", error);
        }
    };
}

export function actionSendReport (token, task, type, user_create_id, content, new_expired_date) {
    return async (dispatch, getState) => {
        try {
            const response = await Api(token).sendReport(task.task_id, type, user_create_id, content, new_expired_date);
            if (response && response.data){
                dispatch(actionGetDetailTask(token, task.task_user_id));
                toast.success('Gửi yêu cầu thành công!');
            } else {
                dispatch(actionGetDetailTask(token, task.task_user_id));
                toast.error('Gửi yêu cầu thất bại!');
                console.log("Lỗi api actionSendReport");
            }
        } catch (error) {
            console.log("Lỗi api actionSendReport", error);
        }
    };
}

export function actionProcessingHandover (token, dataProcess) {
    return async (dispatch, getState) => {
        try {
            const response = await Api(token).processingHandover(dataProcess);
            if (response && response.data){
                dispatch(actionGetListMenu(token));
                dispatch(actionGetOverViewUser(token));
                toast.success('Chuyển xử lý thành công!');
            } else {
                toast.error('Chuyển xử lý thất bại!');
                console.log("Lỗi api actionSendReport");
            }
        } catch (error) {
            console.log("Lỗi api actionSendReport", error);
        }
    };
}

export function actionEvictTask (token, taskId) {
    return async (dispatch, getState) => {
        try {
            const response = await Api(token).evictTask(taskId);
            if (response && response.data){
                dispatch(actionGetListMenu(token));
                dispatch(actionGetOverViewUser(token));
                toast.success('Thu hồi nhiệm vụ thành công!');
            } else {
                toast.error('Thu hồi nhiệm vụ thất bại!');
                console.log("Lỗi api actionSendReport");
            }
        } catch (error) {
            console.log("Lỗi api actionSendReport", error);
        }
    };
}

export function actionUpdateProcessing (token, task_user_id, updateProcessing) {
    return async (dispatch, getState) => {
        try {
            const response = await Api(token).updateProcessing(task_user_id, updateProcessing);
            if (response && response.data){
                dispatch(actionGetListMenu(token));
                dispatch(actionGetOverViewUser(token));
                toast.success('Chỉnh sửa tiến độ nhiệm vụ thành công!');
            } else {
                toast.error('Chỉnh sửa tiến độ nhiệm vụ thất bại!');
                console.log("Lỗi api actionUpdateProcessing");
            }
        } catch (error) {
            console.log("Lỗi api actionUpdateProcessing", error);
        }
    };
}

export function actionReviewReport (token, report_id, user_review_id, isApprove, task_user_id) {
    return async (dispatch, getState) => {
        try {
            const response = await Api(token).reviewReport(report_id, user_review_id, isApprove);
            if (response && response.data){
                dispatch(actionGetDetailTask(token, task_user_id));
                if(isApprove) {
                    toast.success('Duyệt yêu cầu thành công!');
                } else {
                    toast.success('Từ chối yêu cầu thành công!');
                }
            } else {
                if(isApprove) {
                    toast.error('Duyệt yêu cầu thất bại!');
                } else {
                    toast.error('Từ chối yêu cầu thất bại!');
                }
                console.log("Lỗi api actionReviewReport");
            }
        } catch (error) {
            console.log("Lỗi api actionReviewReport", error);
        }
    };
}

export function actionRecallReport (token, id, task_user_id) {
    return async (dispatch, getState) => {
        try {
            const response = await Api(token).recallReport(id);
            if (response && response.data){
                dispatch(actionGetDetailTask(token, task_user_id));
                toast.success('Thu hồi yêu câu thành công!');
            } else {
                toast.error('Thu hồi yêu cầu thất bại!');
                console.log("Lỗi api actionSendReport");
            }
        } catch (error) {
            console.log("Lỗi api actionSendReport", error);
        }
    };
}

export default {
    actionGetListMenu,
    actionGetMyInfo,
    actionUpdateMyInfo,
    actionChangePassword,
    actionGetListTaskByMenu,
    actionGetDetailTask,
    actionCreateTask,
    actionSendReport,
    actionProcessingHandover,
    actionEvictTask,
    actionUpdateProcessing,
    actionReviewReport,
    actionRecallReport,
};
