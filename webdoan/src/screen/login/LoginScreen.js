import React, {useState} from 'react';
import classNames from 'classnames/bind';
import styles from './LoginStyle.module.scss';
import {useDispatch} from "react-redux";
import {actionLogin} from "../../redux-store/action/actionAuth";

const cx = classNames.bind(styles);

const LoginScreen = () => {
    const dispatch = useDispatch();

    const [valueUsername, setValueUsername] = useState('');
    const [valuePassword, setValuePassword] = useState('');

    const handleLoin = () => {
        dispatch(actionLogin(valueUsername, valuePassword));
    }

    return (
        <div>
            <h1 className={cx('text-center')}>HỆ THỐNG QUẢN LÝ DỰ ÁN</h1>
            <div className={cx('flex')}>
                <div>
                    Tên đăng nhập
                </div>
                <input
                    onChange={(e) => setValueUsername(e.target.value)}
                />
            </div>
            <div className={cx('flex')}>
                <div>
                    Mật khẩu
                </div>
                <input
                    type={'password'}
                    onChange={(e) => setValuePassword(e.target.value)}
                />
            </div>
            <div
                onClick={handleLoin}
            >
                Đăng nhập
            </div>
        </div>
    )
}

export default LoginScreen;
