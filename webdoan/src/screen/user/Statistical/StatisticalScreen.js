import React, {useState} from 'react';
import styles from './StatisticalStyle.module.scss';
import classNames from "classnames/bind";
import TaskOverview from "../../../components/TaskOverview/TaskOverview";
import Chart from "../../../components/Chart/Chart";
import TableComponent from "../../../components/TableComponent/TableComponent";

const cx = classNames.bind(styles);

const StatisticalScreen = () => {

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
            name: "Ban điều hành",
            totalTasks: 40,
            unfinishedInTime: 10,
            unfinishedOverdue: 20,
            finishedInTime: 5,
            finishedOverdue: 5,
        },
        {
            name: "Team LGSP",
            totalTasks: 55,
            unfinishedInTime: 15,
            unfinishedOverdue: 20,
            finishedInTime: 10,
            finishedOverdue: 10,
        }
    ];

    const handleDateChange = (event) => {
        const { name, value } = event.target;
        setDateRange((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <div className={cx('StatisticalScreen')}>
            <div className={cx('StatisticalScreen_header')}>
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

            <div className={cx('col-md-12', 'mt-4', 'StatisticalScreen_body')}>
                <TaskOverview/>
                <Chart/>
                <TableComponent data={data}/>
            </div>
        </div>
    )
}

export default StatisticalScreen;
