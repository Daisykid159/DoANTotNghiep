import React from "react";
import styles from './QuicklyHandleTasksStyle.module.scss';
import classNames from "classnames/bind";
import TaskList from "../../../components/TaskList/TaskList";
import {useSelector} from "react-redux";

const cx = classNames.bind(styles);

const QuicklyHandleTasksScreen = (props) => {

    const dataList = useSelector(state => state.reducerUser.listTasks);

    return (
        <div className={cx('QuicklyHandleTasksScreen')}>
            <div className={cx('body_module_xu_ly_nhanh')}>
                <div className={cx('text_header_module_xu_ly_nhanh', 'header_fixed')}>
                    <div>Danh sách nhiệm vụ cần lùi hạn xử lý</div>

                    <button
                        onClick={() => props.setShowModule(false)}
                        className={cx("btn", 'QuicklyHandleTasksScreen_body_close')}
                    >
                        <i className='bx bx-x'></i>
                    </button>
                </div>

                <div className={cx('p-3', 'container')}>
                    <div className={cx('col-md-12')}>
                        <div className={cx('text_header_module_xu_ly_nhanh', 'mb-2')}>Danh sách nhiệm vụ có mức độ ưu tiên cao</div>
                        <TaskList tasks={dataList} showFullTaskList={true} />
                    </div>

                    <div className={cx('col-md-12')}>
                        <div className={cx('text_header_module_xu_ly_nhanh', 'mb-2')}>Danh sách nhiệm vụ có thể lùi hạn xử lý</div>
                        <TaskList tasks={dataList} showFullTaskList={true} showExpireNew={true} />
                    </div>
                </div>

                <div className={cx('col-md-12', 'container', 'd-flex', 'justify-content-end', 'mb-5')}>
                    <button
                        className={cx("btn btn-primary", 'btn_footer')}
                    >
                        Lùi hạn xử lý
                    </button>
                </div>
            </div>
        </div>
    )
}

export default QuicklyHandleTasksScreen;
