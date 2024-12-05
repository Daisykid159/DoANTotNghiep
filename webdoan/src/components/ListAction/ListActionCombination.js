import React, {useState} from "react";
import styles from './ListActionStyle.module.scss';
import classNames from "classnames/bind";
import HandleAction from "./HandleAction";

const cx = classNames.bind(styles);

const ListActionCombination = (props) => {

    const [showHandleAction, setShowHandleAction] = useState(false);
    const [typeAction, setTypeAction] = useState('')

    const handleCloseModule = () => {
        setShowHandleAction(false);
    }

    return (
        <div className={cx('row_action')}>
            <div
                className={cx('d-flex', 'action_item')}
                onClick={() => {
                    setTypeAction('Báo cáo tiến độ')
                    setShowHandleAction(true)
                }}
            >
                <i className={cx('bx bx-share', 'icon_action', 'me-2')}></i>
                <div>Báo cáo</div>
            </div>

            {showHandleAction && (
                <HandleAction typeAction={typeAction} title={'Iphone 12'} handleCloseModule={handleCloseModule} />
            )}
        </div>
    )
};

export default ListActionCombination;
