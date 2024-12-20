import React from "react";
import styles from './QuicklyHandleTasksStyle.module.scss';
import classNames from "classnames/bind";
import TaskList from "../../../components/TaskList/TaskList";
import {useSelector} from "react-redux";

const cx = classNames.bind(styles);

const QuicklyHandleTasksScreen = (props) => {

    const dataList = useSelector(state => state.reducerUser.listTasks);

    const priorityAboveZero = dataList.filter(item => item.priority > 0);

    const priorityOthers = dataList.filter(item => item.priority <= 0);

    return (
        <div className={cx('QuicklyHandleTasksScreen')}>
            <div className={cx('body_module_xu_ly_nhanh')}>
                <div className={cx('text_header_module_xu_ly_nhanh', 'header_fixed')}>
                    <div>Danh sách các nhiệm vụ</div>
                    <button
                        onClick={() => props.setShowModule(false)}
                        className={cx("btn", 'QuicklyHandleTasksScreen_body_close')}
                    >
                        <i className='bx bx-x'></i>
                    </button>
                </div>

                <div className={cx('p-3', 'container')}>
                    <div className={cx('d-flex', 'position-relative')}>
                        <div className={cx('text_header_module_xu_ly_nhanh', 'col-md-12')}>
                            Danh sách nhiệm vụ cần lùi hạn xử lý
                        </div>
                        <button
                            onClick={() => props.setShowModule(false)}
                            className={cx("btn", 'show_list')}
                        >
                            <i className='bx bx-chevron-down'></i>
                        </button>
                    </div>

                    <div className={cx('p-3', 'container')}>
                        <div className={cx('col-md-12')}>
                            <div className={cx('text_header_module_xu_ly_nhanh', 'mb-2')}>
                                Danh sách nhiệm vụ có mức độ ưu tiên cao
                            </div>
                            <TaskList tasks={priorityAboveZero} showFullTaskList={true}/>
                        </div>

                        <div className={cx('col-md-12')}>
                            <div className={cx('text_header_module_xu_ly_nhanh', 'mb-2')}>Danh sách nhiệm vụ có thể lùi
                                hạn xử lý
                            </div>
                            <TaskList tasks={priorityOthers} showFullTaskList={true} showExpireNew={true}/>
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

                <div className={cx('p-3', 'container')}>
                    <div className={cx('d-flex', 'position-relative')}>
                        <div className={cx('text_header_module_xu_ly_nhanh', 'col-md-12')}>
                            Danh sách nhiệm vụ cần hoàn thành trong ngày
                        </div>
                        <button
                            onClick={() => props.setShowModule(false)}
                            className={cx("btn", 'show_list')}
                        >
                            <i className='bx bx-chevron-down'></i>
                        </button>
                    </div>

                    <div className={cx('p-3', 'container')}>
                        <TaskList tasks={dataList} showFullTaskList={true}/>
                    </div>

                    <div className={cx('col-md-12', 'container', 'mb-5', 'fw-bold', 'text_red')}>
                        Hôm nay bạn cần xử lý nhiều công việc, bạn nên cân nhắc làm thêm giờ hoặc xin gia hạn xử lý các nhiệm vụ chưa hoàn thành.
                    </div>
                </div>
            </div>
        </div>
    )
}

export default QuicklyHandleTasksScreen;
