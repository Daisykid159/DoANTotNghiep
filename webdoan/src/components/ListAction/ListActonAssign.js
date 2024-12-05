import React from "react";
import styles from './ListActionStyle.module.scss';
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const ListActionAssign = () => {
    return (
        <div className={cx('row_action')}>
            <div className={cx('d-flex', 'action_item')}>
                <i className={cx('bx bx-share', 'icon_action', 'me-2')}></i>
                <div>Yêu cầu báo cáo</div>
            </div>

            <div className={cx('d-flex', 'action_item')}>
                <i className={cx('bx bx-revision', 'icon_action', 'me-2')}></i>
                <div>Thu hồi</div>
            </div>

            <div className={cx('d-flex', 'action_item')}>
                <i className={cx('bx bx-edit-alt', 'icon_action', 'me-2')}></i>
                <div>Chỉnh sửa</div>
            </div>

            <div className={cx('d-flex', 'action_item')}>
                <i className={cx('bx bx-check-double', 'icon_action', 'me-2')}></i>
                <div>Kết thúc</div>
            </div>
        </div>
    )
}

export default ListActionAssign;
