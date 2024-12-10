import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";
import styles from "./ChartStyle.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const Chart = () => {

    const [state1, setState1] = useState({
        series: [
            {
                name: "Bình thường",
                type: "column",
                data: [1.4, 2, 2.5],
            },
            {
                name: "Trọng tâm",
                type: "column",
                data: [1.1, 3, 3.1],
            },
            {
                name: "Rất trọng tâm",
                type: "line",
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
        series: [44, 55, 13, 43],
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
                name: "Cột 1 (Chi phí)",
                data: [10, 15, 20, 25], // Dữ liệu qua các năm
            },
            {
                name: "Cột 2 (Doanh thu)",
                data: [20, 25, 30, 35],
            },
            {
                name: "Cột 3 (Lợi nhuận)",
                data: [5, 10, 15, 20],
            },
        ],
        options: {
            title: {
                text: "XYZ - Stock Analysis (2009 - 2016)",
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
            stroke: {
                show: true,
                width: 2,
                colors: ["transparent"],
            },
            xaxis: {
                categories: ["2019", "2020", "2021", "2022"], // Các năm
            },
            yaxis: {
                title: {
                    text: "Đơn vị tính: Tỷ đồng", // Đơn vị chung cho các cột
                },
            },
            fill: {
                opacity: 1,
            },
            tooltip: {
                y: {
                    formatter: (val) => `${val} Tỷ đồng`, // Tooltip thêm đơn vị
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
            name: 'PRODUCT A',
            data: [44, 55, 41, 67, 22, 43]
        }, {
            name: 'PRODUCT B',
            data: [13, 23, 20, 8, 13, 27]
        }, {
            name: 'PRODUCT C',
            data: [11, 17, 15, 15, 21, 14]
        }, {
            name: 'PRODUCT D',
            data: [21, 7, 25, 13, 22, 8]
        }],
        options: {
            title: {
                text: "XYZ - Stock Analysis (2009 - 2016)",
                align: "left",
                offsetX: 110,
            },
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
                type: 'datetime',
                categories: ['01/01/2011 GMT', '01/02/2011 GMT', '01/03/2011 GMT', '01/04/2011 GMT',
                    '01/05/2011 GMT', '01/06/2011 GMT'
                ],
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
