import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";
import styles from "./ChartStyle.module.scss";
import classNames from "classnames/bind";
import {useSelector} from "react-redux";

const cx = classNames.bind(styles);

const Chart = () => {

    const staticResponse = useSelector(state => state.reducerUser.staticResponse);

    const [state1, setState1] = useState({
        series: [
            {
                name: "Bình thường",
                type: "column",
                data: [1.4, 2, 2.5],
            },
            {
                name: "Quan trọng",
                type: "column",
                data: [1.1, 3, 3.1],
            },
            {
                name: "Rất quan trọng",
                type: "column",
                data: [20, 29, 37],
            },
        ],
        options: {
            chart: {
                height: 350,
                type: "line",
                stacked: false,
            },
            dataLabels: {
                enabled: false,
            },
            stroke: {
                width: [1, 1, 4],
            },
            title: {
                text: "Nhiệm vụ hoàn thành",
                align: "left",
                offsetX: 110,
            },
            xaxis: {
                categories: [2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016],
            },
            yaxis: [
                {
                    seriesName: "Income",
                    axisTicks: {
                        show: true,
                    },
                    axisBorder: {
                        show: true,
                        color: "#008FFB",
                    },
                    labels: {
                        style: {
                            colors: "#008FFB",
                        },
                    },
                    title: {
                        text: "",
                        style: {
                            color: "#008FFB",
                        },
                    },
                    tooltip: {
                        enabled: true,
                    },
                },
                {
                    seriesName: "Cashflow",
                    opposite: true,
                    axisTicks: {
                        show: true,
                    },
                    axisBorder: {
                        show: true,
                        color: "#00E396",
                    },
                    labels: {
                        style: {
                            colors: "#00E396",
                        },
                    },
                    title: {
                        text: "",
                        style: {
                            color: "#00E396",
                        },
                    },
                }
            ],
            tooltip: {
                fixed: {
                    enabled: true,
                    position: "topLeft", // topRight, topLeft, bottomRight, bottomLeft
                    offsetY: 30,
                    offsetX: 60,
                },
            },
            legend: {
                horizontalAlign: "left",
                offsetX: 40,
            },
        },
    });
    const [state2, setState2] = React.useState({
        series: [staticResponse?.user?.pending_on_time, staticResponse?.user?.pending_overdue, staticResponse?.user?.completed_on_time, staticResponse?.user?.completed_overdue],
        options: {
            chart: {
                width: 380,
                type: 'pie',
            },
            labels: ['Hoàn thành đúng hạn', 'Hoàn thành quá hạn', 'Chưa hoàn thành quá hạn', 'Chưa hoàn thành còn hạn'],
            title: {
                text: "Tỷ lệ nhiệm vụ hoàn thành",
                align: "left",
                offsetX: 110,
            },
            colors: ['#4CAF50', '#2196F3', '#F44336', '#FF9800'],
            responsive: [{
                breakpoint: 480,
                options: {
                    chart: {
                        width: 200
                    },
                    legend: {
                        position: 'bottom'
                    }
                }
            }]
        },
    });
    const [state3, setState3] = useState({
        series: [
            {
                name: "Hoàn thành đúng hạn",
                data: [10, 15], // Dữ liệu qua các năm
            },
            {
                name: "Hoàn thành quá hạn",
                data: [20, 25],
            },
            {
                name: "Chưa hoàn thành quá hạn",
                data: [5, 10],
            },
            {
                name: "Chưa hoàn thành còn hạn",
                data: [5, 10],
            }
        ],
        options: {
            title: {
                text: "Tình hình nhiệm vụ của các phòng ban",
                align: "left",
                offsetX: 110,
            },
            chart: {
                type: "bar",
                height: 350,
            },
            plotOptions: {
                bar: {
                    horizontal: false,
                    columnWidth: "45%",
                    endingShape: "rounded",
                },
            },
            dataLabels: {
                enabled: false,
            },
            colors: ['#4CAF50', '#2196F3', '#F44336', '#FF9800'],
            stroke: {
                show: true,
                width: 2,
                colors: ["transparent"],
            },
            xaxis: {
                categories: ["Ban điều hành", "Team LGSP"], // Các năm
            },
            yaxis: {
                title: {
                    text: "Đơn vị tính: nhiệm vụ", // Đơn vị chung cho các cột
                },
            },
            fill: {
                opacity: 1,
            },
            tooltip: {
                y: {
                    formatter: (val) => `${val} nhiệm vụ`, // Tooltip thêm đơn vị
                },
            },
            legend: {
                position: "top",
                horizontalAlign: "center",
            },
        },
    });
    const [state4, setState4] = React.useState({
        series: [{
            name: 'Hoàn thành đúng hạn',
            data: [4, 5, 4]
        }, {
            name: 'Hoàn thành quá hạn',
            data: [3, 3, 0]
        }, {
            name: 'Chưa hoàn thành quá hạn',
            data: [1, 7, 5]
        }, {
            name: 'Chưa hoàn thành còn hạn',
            data: [1, 7, 5]
        }],
        options: {
            title: {
                text: "Tình hình nhiệm vụ của các dự án",
                align: "left",
                offsetX: 110,
            },
            colors: ['#4CAF50', '#2196F3', '#F44336', '#FF9800'],
            chart: {
                type: 'bar',
                height: 350,
                stacked: true,
                toolbar: {
                    show: true
                },
                zoom: {
                    enabled: true
                }
            },
            responsive: [{
                breakpoint: 480,
                options: {
                    legend: {
                        position: 'bottom',
                        offsetX: -10,
                        offsetY: 0
                    }
                }
            }],
            plotOptions: {
                bar: {
                    horizontal: false,
                    dataLabels: {
                        total: {
                            enabled: true,
                            style: {
                                fontSize: '13px',
                                fontWeight: 900
                            }
                        }
                    }
                },
            },
            xaxis: {
                type: 'text',
                categories: ['CRM', 'HRM', 'Hệ thống Giám sát An ninh Mạng'],
            },
            legend: {
                position: 'right',
                offsetY: 40
            },
            fill: {
                opacity: 1
            }
        },
    });

    return (
        <div className={cx('col-md-12', 'row')}>
            <div className={cx('col-md-6')}>
                <ReactApexChart
                    options={state1.options}
                    series={state1.series}
                    type="line"
                    width={'100%'}
                    height={400}
                />
            </div>

            <div className={cx('col-md-6')}>
                <ReactApexChart
                    options={state2.options}
                    series={state2.series}
                    type="pie"
                    width={'100%'}
                    height={400}
                />
            </div>

            <div className={cx('col-md-6')}>
                <ReactApexChart
                    options={state3.options}
                    series={state3.series}
                    type="bar"
                    width={'100%'}
                    height={400}
                />
            </div>

            <div className={cx('col-md-6')}>
                <ReactApexChart
                    options={state4.options}
                    series={state4.series}
                    type="bar"
                    width={'100%'}
                    height={400}
                />
            </div>
        </div>
    );
};

export default Chart;
