import React from 'react';
import {formatDate} from "../../utils";
import styles from "./TaskListStyle.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const TaskList = ({ tasks, handleDetailTask }) => {
    return (
        <table bordered hover className={cx("col-md-12", "table-fixed")}>
            <thead>
            <tr>
                <th className={cx('w-40')}>
                    <div className={cx('d-flex', 'align-items-center')}>
                        <i className={cx('bx bx-envelope', 'icon_mail', 'me-3')}></i>
                        Tiêu đề
                    </div>
                </th>
                <th>Người chủ trì</th>
                <th>Người giao</th>
                <th>Trạng thái</th>
                <th>Ngày tạo</th>
                <th>Hạn xử lý</th>
                <th>Tiến độ</th>
            </tr>
            </thead>
            <tbody>
            {tasks.map((task) => (
                <tr
                    key={task.id} className={cx('text-center', 'w-90')}
                    onClick={() => handleDetailTask(task)}
                >
                    <td className={cx('w-40', 'text_left')}>
                        <div className={cx('d-flex', 'align-items-center')}>
                            <i className={cx('bx bx-envelope', 'icon_mail', 'me-3')}></i>
                            {task.title}
                        </div>
                    </td>
                    <td>{task.label_name}</td>
                    <td>{task.target_user_name}</td>
                    <td>{task.status}</td>
                    <td>{formatDate(task.created_date)}</td>
                    <td>{formatDate(task.expire_date)}</td>
                    <td>
                        <progress value={task.progress} max="100" className={cx('w-100')}></progress>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    );
};

export default TaskList;
