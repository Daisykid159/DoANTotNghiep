import React from "react";
import classNames from "classnames/bind";
import styles from "./DetailProjectStyle.module.scss";

const cx = classNames.bind(styles);

const DetailProjectScreen = () => {
    return (
        <div className={cx('DetailProjectScreen', 'container')}>
            <div>Chi tiết dự án</div>
        </div>
    )
}

export default DetailProjectScreen
