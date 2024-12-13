import React from 'react';
import {formatDate} from "../../utils";
import styles from "./TaskListStyle.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const TaskList = ({ tasks, handleDetailTask, showFullTaskList = false }) => {
    return (
        <table bordered hover className={cx("col-md-12", 'table_task_list', showFullTaskList ? '' : "table-fixed")}>
            <thead>
            <tr>
                <th className={cx('w-40')}>
                    <div className={cx('d-flex align-items-center')}>
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
                    key={task.id} className={cx('text-center', 'w-90', task.has_read === 1 ? '' : 'fw-bold')}
                    onClick={() => handleDetailTask(task)}
                >
                    <td className={cx('w-40', 'text_left')}>
                        <div className={cx('d-flex', 'align-items-center')}>
                            <i className={cx('bx bx-envelope', 'icon_mail', 'me-3')}></i>
                            {task.task_title || task.title}
                        </div>
                    </td>
                    <td className={cx('text_left')}>{task.assign_user_name}</td>
                    <td className={cx('text_left')}>{task.target_user_name}</td>
                    <td>{task.status}</td>
                    <td>{formatDate(task.created_date)}</td>
                    <td>{formatDate(task.expire_date)}</td>
                    <td>
                        <progress value={task.progress || 0} max="100" className={cx('w-100')}></progress>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    );
};

export default TaskList;
