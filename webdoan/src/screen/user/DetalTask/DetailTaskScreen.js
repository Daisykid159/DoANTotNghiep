import React, { useState } from 'react';
import styles from "./DetailTaskStyle.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const DetailTaskScreen = (props) => {

    console.log(props.task);

    return (
        <div className={cx('DetailTaskScreen')}>
            Chi tiet nhiem vu
        </div>
    );
}

export default DetailTaskScreen;
