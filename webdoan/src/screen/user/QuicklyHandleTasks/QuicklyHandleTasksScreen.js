import React from "react";
import styles from './QuicklyHandleTasksStyle.module.scss';
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const QuicklyHandleTasksScreen = (props) => {
    return (
        <div className={cx('QuicklyHandleTasksScreen')}>
            <div className={cx('body_module_xu_ly_nhanh')}>
                <div className={cx('text_header_module_xu_ly_nhanh')}>
                    <div>Danh sách nhiệm vụ cần xử lý</div>

                    <button
                        onClick={() => props.setShowModule(false)}
                        className={cx("btn", 'QuicklyHandleTasksScreen_body_close')}
                    >
                        <i className='bx bx-x'></i>
                    </button>
                </div>

                <div className={cx('p-3')}>
                    <div className={cx('text_header_module_xu_ly_nhanh', 'mb-2')}>Danh sách nhiệm vụ chờ báo cáo</div>

                    <div className={cx('text_header_module_xu_ly_nhanh', 'mb-2')}>Danh sách nhiệm vụ chờ duyệt</div>

                    <div className={cx('text_header_module_xu_ly_nhanh', 'mb-2')}>Danh sách nhiệm vụ tới hạn</div>

                    <div className={cx('text_header_module_xu_ly_nhanh', 'mb-2')}>Danh sách nhiệm vụ quá hạn</div>
                </div>
            </div>
        </div>
    )
}

export default QuicklyHandleTasksScreen;
