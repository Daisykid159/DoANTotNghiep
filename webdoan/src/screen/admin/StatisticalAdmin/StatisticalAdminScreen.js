import React, {useState} from 'react';
import styles from './StatisticalAdminStyle.module.scss';
import classNames from "classnames/bind";
import TaskOverview from "../../../components/TaskOverview/TaskOverview";
import Chart from "../../../components/Chart/Chart";
import TableComponent from "../../../components/TableComponent/TableComponent";

const cx = classNames.bind(styles);

const StatisticalAdminScreen = () => {

    const filters = [
        { label: "Thời gian", type: "date" },
        { label: "Đơn vị giao", options: ["Phòng A", "Phòng B", "Phòng C"] },
        { label: "Đơn vị xử lý", options: ["Nhân sự 1", "Nhân sự 2"] },
        { label: "Nguồn", options: ["Nguồn 1", "Nguồn 2", "Nguồn 3"] },
        { label: "Trạng thái", options: ["Đang xử lý", "Hoàn thành", "Quá hạn"] },
        { label: "Mức độ quan trọng", options: ["Cao", "Trung bình", "Thấp"] },
    ];

    const [dateRange, setDateRange] = useState({ fromDate: "", toDate: "" });

    const data = [
        {
            name: "Và Truyền Thông Tỉnh Tây Ninh/eGov - Beta/Tij xã Hòa Thành Test",
            totalTasks: 1,
            unfinishedInTime: 1,
            unfinishedOverdue: 0,
            finishedInTime: 0,
            finishedOverdue: 0,
        },
        {
            name: "Và Truyền Thông Tỉnh Tây Ninh/eGov - Beta/Sở TTTT test",
            totalTasks: 8,
            unfinishedInTime: 0,
            unfinishedOverdue: 6,
            finishedInTime: 1,
            finishedOverdue: 1,
        },
        {
            name: "eGov - Beta",
            totalTasks: 12,
            unfinishedInTime: 0,
            unfinishedOverdue: 8,
            finishedInTime: 1,
            finishedOverdue: 3,
        },
    ];

    const handleDateChange = (event) => {
        const { name, value } = event.target;
        setDateRange((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <div className={cx('StatisticalAdminScreen')}>
            <div className={cx('StatisticalAdminScreen_header')}>
                <div className={cx('d-flex', 'align-items-center')}>
                    <i className={cx('bx bx-line-chart', 'icon_header', 'me-2')}></i>
                    <h4>Thống kê</h4>
                </div>

                <div className="mt-4 col-md-12">
                    <div className="row">
                        {filters.map((filter, index) => (
                            <div
                                className={cx(
                                    filter.type === "date" ? "col-md-4" : "col-md-125"
                                )}
                                key={index}
                            >
                                <div className="form-group">
                                    <label htmlFor={`filter-${index}`} className="form-label">
                                        {filter.label}
                                    </label>
                                    {filter.type === "date" ? (
                                        <div className="d-flex align-items-center">
                                            <div className="d-flex align-items-center flex-grow-1">
                                                <label className="me-2">Từ</label>
                                                <input
                                                    type="date"
                                                    id={`fromDate-${index}`}
                                                    name="fromDate"
                                                    className="form-control me-2"
                                                    value={dateRange.fromDate}
                                                    onChange={handleDateChange}
                                                />
                                            </div>
                                            <div className="d-flex align-items-center flex-grow-1">
                                                <label className="me-2">đến</label>
                                                <input
                                                    type="date"
                                                    id={`toDate-${index}`}
                                                    name="toDate"
                                                    className="form-control"
                                                    value={dateRange.toDate}
                                                    onChange={handleDateChange}
                                                />
                                            </div>
                                        </div>
                                    ) : (
                                        <select id={`filter-${index}`} className="form-select">
                                            <option value="">Chọn {filter.label.toLowerCase()}</option>
                                            {filter.options?.map((option, i) => (
                                                <option key={i} value={option}>
                                                    {option}
                                                </option>
                                            ))}
                                        </select>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className={cx('col-md-12', 'mt-4', 'StatisticalAdminScreen_body')}>
                <TaskOverview/>
                <Chart/>

                <div className={cx('col-md-12', 'd-flex', 'align-items-center', 'justify-content-end', 'mt-4', 'mb-3')}>
                    <button className="btn btn-primary btn-lg">
                        Xuất báo cáo
                    </button>
                </div>

                <TableComponent data={data}/>
            </div>
        </div>
    )
}

export default StatisticalAdminScreen;
