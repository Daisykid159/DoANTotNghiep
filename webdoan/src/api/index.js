import axios from 'axios';

const Api = (token, username, role) => {
    const api = axios.create({
        baseURL: 'http://localhost:8080',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token || ''}`,
        },
        timeout: 20000,
    });

    // api get token login
    const getTokenLogin =(username, password) => {
        return api.post('/auth/login', {
            "username": username,
            "password": password
        });
    }

    return {
        getTokenLogin,
    };
};

export default Api;
