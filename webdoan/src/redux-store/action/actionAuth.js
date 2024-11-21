import Api from "../../api";
import {jwtDecode} from "jwt-decode";

export function updateData(data) {
    return {
        type: 'UPDATE_DATA',
        data
    }
}

export function actionLogin (username, password, nextToScreen) {
    return async (dispatch, getState) => {
        try {
            const response = await Api().getTokenLogin(username, password);
            if (response && response.data){
                const decoded = jwtDecode(response.data.result.token);

                dispatch(updateData({
                    isLogin: true,
                    decoded: decoded,
                    isAdmin: decoded.scope === 'ADMIN',
                    token: response.data.result.token,
                }))

                if(decoded.scope === 'ADMIN') {
                    dispatch(actionGetGeneralAdmin(response.data.result.token));
                }

                localStorage.setItem('token', response.data.result.token);
                localStorage.setItem('username', username);
                localStorage.setItem('password', password);
            } else {
                dispatch(updateData({
                    isLogin: false,
                    token: '',
                }))
                alert("Đăng nhập thất bại!");
            }
        } catch (error) {
            alert("Đăng nhập thất bại!");
            dispatch(updateData({
                isLogin: false,
                token: '',
            }))
        }
    };
}

export function actionLogout () {
    return (dispatch, getState) => {
        try {
            localStorage.removeItem('token');
            dispatch(updateData({
                isLogin: false,
                isAdmin: false,
                userName: '',
                token: '',
            }))
        } catch (error) {
            alert("Lỗi mạng Xin vui lòng kiểm tra lại kết nối internet");
            dispatch(updateData({
                token: '',
            }))
        }
    };
}

export function actionGetGeneralAdmin (token) {
    return async (dispatch, getState) => {
        try {
            const response = await Api(token).getGeneralAdmin();
            if (response && response.data){
                dispatch(updateData({
                    overViewAdmin: response.data,
                }))
            } else {
                console.log("Loi api actionGetGeneralAdmin");
            }
        } catch (error) {
            console.log("Loi api actionGetGeneralAdmin", error)
        }
    };
}

export default {
    actionLogin,
    actionLogout,
    actionGetGeneralAdmin,
};
