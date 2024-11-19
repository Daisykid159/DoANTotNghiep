import React from "react";
import classNames from 'classnames/bind';
import styles from './TaskListStyle.module.scss';

const cx = classNames.bind(styles);

const TaskListScreen = () => {

    return (
        <div className={cx('TaskListScreen')}>
            <div>Danh sách nhiệm vụ</div>
        </div>
    )
}

export default TaskListScreen
