import React from "react";
import styles from './TaskOverViewStyle.module.scss';
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const TaskOverview = () => {
    const stats = [
        { label: "Tổng số nhiệm vụ đã giao", value: 21, bgColor: "bg-primary" },
        { label: "Nhiệm vụ hoàn thành đúng hạn", value: 1, bgColor: "bg-success" },
        { label: "Nhiệm vụ hoàn thành quá hạn", value: 6, bgColor: "bg-warning" },
        { label: "Nhiệm vụ chưa hoàn thành quá hạn", value: 14, bgColor: "bg-danger" },
        { label: "Nhiệm vụ chưa hoàn thành còn hạn", value: 14, bgColor: "bg-danger" },
    ];

    return (
        <div className="my-4">
            <div className="d-flex col-md-12 justify-content-between align-items-center">
                {stats.map((stat, index) => (
                    <div className={cx("box_item", "mb-3", `card text-white ${stat.bgColor}`)} key={index}>
                        <div className="text-center">
                            <h5 className="card-title">{stat.label}</h5>
                            <h2>{stat.value}</h2>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TaskOverview;
