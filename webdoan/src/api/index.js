import axios from 'axios';
import reducerPersonnelManagement from "../redux-store/reducer/reducerPersonnelManagement";

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

    const getListPersonnelManagement =(page, size, username = '', fullname = '', active = '', role = '', position = '') => {
        return api.get(`/api/admin/users?page=${page}&size=${size}&username=${username}&fullname=${fullname}&active=${active}&role=${role}&position=${position}`);
    }

    const getGeneralAdmin = () => {
        return api.get(`/api/admin/general`);
    }

    const createPersonnelManagement = (data) => {
        return api.post(`/api/admin/createUser`, data);
    }

    const getDetailPersonnel = (usedID) => {
        return api.get(`/api/admin/users/${usedID}`);
    }

    const putPasswordNew = (userId, newPassword) => {
        return api.put(`/api/admin/upPassword?password=${newPassword}&idUser=${userId}`);
    }

    return {
        getTokenLogin,
        refreshToken,
        getListPersonnelManagement,
        getGeneralAdmin,
        createPersonnelManagement,
        getDetailPersonnel,
        putPasswordNew,
    };
};

export default Api;
