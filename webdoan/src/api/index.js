import axios from 'axios';

const Api = (token, username, role) => {
    let api

    switch (role) {
        case 'user':
            api = axios.create({
                baseURL: 'http://localhost:8080/api/v1',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token || ''}`,
                    'x-client-username': username,
                },
                timeout: 20000,
            });
            break;

        case 'admin':
            api = axios.create({
                baseURL: 'http://localhost:8080/api/v1',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token || ''}`,
                    'x-admin-username': username,
                },
                timeout: 20000,
            });
            break;

        default:
            api = axios.create({
                baseURL: 'http://localhost:8080/api/v1',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token || ''}`,
                },
                timeout: 20000,
            });
    }

    // api get token login
    const getTokenLogin =(username, password) => {
        return api.post('/account/login', {
            "username": username,
            "password": password
        });
    }

    return {
        getTokenLogin,
    };
};

export default Api;
