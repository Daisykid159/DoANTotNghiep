import React from "react";

const TableComponent = ({ data }) => {
    return (
        <div className="table-responsive my-4">
            <table className="table table-bordered table-hover">
                <thead className="table-light">
                <tr>
                    <th>#</th>
                    <th>Tên phòng ban/Cá nhân</th>
                    <th>Tổng nhiệm vụ</th>
                    <th>Chưa hoàn thành (Còn hạn)</th>
                    <th>Chưa hoàn thành (Quá hạn)</th>
                    <th>Đã hoàn thành (Còn hạn)</th>
                    <th>Đã hoàn thành (Quá hạn)</th>
                </tr>
                </thead>
                <tbody>
                {data.length > 0 ? (
                    data.map((row, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{row.name}</td>
                            <td>{row.totalTasks}</td>
                            <td>{row.unfinishedInTime}</td>
                            <td>{row.unfinishedOverdue}</td>
                            <td>{row.finishedInTime}</td>
                            <td>{row.finishedOverdue}</td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="7" className="text-center">
                            Không có dữ liệu
                        </td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    );
};

export default TableComponent;
