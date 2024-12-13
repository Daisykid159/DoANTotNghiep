import Api from "../../api";
import {toast} from "react-toastify";

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

export default {
    actionGetListMenu,
    actionGetListTaskByMenu,
    actionGetDetailTask,
    actionCreateTask,
};
