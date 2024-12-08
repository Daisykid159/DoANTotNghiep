import React, { useState } from "react";
import classNames from "classnames/bind";
import styles from "./DetailTaskAdminStyle.module.scss";
import {formatDate} from "../../../utils";
import moment from "moment";

const cx = classNames.bind(styles);

const DetailTaskAdminScreen = () => {

    const detailTask = {
        "task_id": 726,
        "task_user_id": 3673,
        "parent_id": null,
        "type": 0,
        "status": 0,
        "state": 0,
        "can_edit": true,
        "role": 1,
        "title": "Test kịch bản eGov - QLNV teétbanaja",
        "assign_organization": null,
        "assign_department": "490",
        "assign_organization_department_name": "/eGov - Beta",
        "create_user": 314,
        "create_user_department": "490.491",
        "create_user_name": "Nguyễn Tấn Đức",
        "assign_user": 314,
        "assign_user_name": "Nguyễn Tấn Đức",
        "target_organization": null,
        "target_department": "490",
        "target_organization_department_name": "/eGov - Beta",
        "target_user_name": "Nguyễn Thị Kim Hà",
        "target_user": 291,
        "has_sub_task": false,
        "charge_user": 314,
        "code": "2024-00058",
        "is_returned": false,
        "external_id": null,
        "status_target_user": "Chưa báo cáo - Hạn 22/11/2024",
        "source_id": 0,
        "other_source_des": "",
        "document_id": null,
        "compendium": "Test kịch bản eGov - QLNV teétbanaja",
        "doc_code": null,
        "content": "",
        "priority": 3,
        "document_copy_id": 0,
        "permission": 0,
        "progress": 0,
        "expire_date": "2024-11-22T00:00:00",
        "completed_date": null,
        "deleted_date": null,
        "created_date": "2024-11-22T00:00:00",
        "tags": [],
        "group_ids": [
            3
        ],
        "can_finished": false,
        "task_tags": [],
        "task_groups": [
            {
                "id": 1388,
                "task_id": 726,
                "group_id": 3
            }
        ],
        "reports": [
            {
                "report_id": 760,
                "task_id": 726,
                "create_user": 603,
                "user_id": 603,
                "parent_id": null,
                "combination_id": null,
                "external_id": null,
                "approved_user": 314,
                "approved_at": "2024-05-17T09:09:35",
                "type": 3,
                "status": 1,
                "state": 1,
                "content": "<p>B&aacute;o c&aacute;o ho&agrave;n th&agrave;nh.</p>\n",
                "organization_id": null,
                "label_name": "PGĐ_ Test",
                "new_expired_date": null,
                "completed_date": "2024-05-17T09:09:35",
                "created_date": "2024-05-17T09:09:20",
                "updated_date": "2024-05-17T09:43:28"
            }
        ],
        "files": [
            {
                "file_id": 338,
                "task_id": 726,
                "user_id": 314,
                "user_name": "Nguyễn Tấn Đức",
                "file_name": "VB_PGD.docx",
                "file_local_name": "b465049e-a009-40c8-a3f0-1c1a2082a162",
                "file_path": "~/Uploads\\2024\\5",
                "extension": "docx",
                "size": 13788,
                "can_delete": false,
                "is_sync": true,
                "created_date": "2024-05-17T09:03:39",
                "updated_date": "2024-05-17T09:03:39",
                "deleted_date": null
            }
        ],
        "timelines": [
            {
                "timeline_id": 1577,
                "organization_id": null,
                "task_id": 726,
                "create_user": 314,
                "user_id": 314,
                "report_id": null,
                "role": -1,
                "content": "Tạo mới nhiệm vụ",
                "label_name": "(Giám đốc) Nguyễn Tấn Đức - Người tạo nhiệm vụ",
                "created_date": "2024-05-17T09:03:38.692918"
            },
            {
                "timeline_id": 1578,
                "organization_id": null,
                "task_id": 726,
                "create_user": 314,
                "user_id": 314,
                "report_id": null,
                "role": 0,
                "content": "Chỉnh sửa nhiệm vụ",
                "label_name": "(Giám đốc) Nguyễn Tấn Đức - Người giao nhiệm vụ",
                "created_date": "2024-05-17T09:07:57.655238"
            },
            {
                "timeline_id": 1579,
                "organization_id": null,
                "task_id": 726,
                "create_user": 603,
                "user_id": 603,
                "report_id": null,
                "role": 1,
                "content": "Báo cáo hoàn thành",
                "label_name": " PGĐ_ Test - Người chủ trì xử lý",
                "created_date": "2024-05-17T09:09:20.53023"
            },
            {
                "timeline_id": 1580,
                "organization_id": null,
                "task_id": 726,
                "create_user": 314,
                "user_id": 314,
                "report_id": 760,
                "role": 0,
                "content": "Duyệt báo cáo",
                "label_name": "(Giám đốc) Nguyễn Tấn Đức - Người giao nhiệm vụ",
                "created_date": "2024-05-17T09:09:35.245307"
            },
            {
                "timeline_id": 2221,
                "organization_id": null,
                "task_id": 726,
                "create_user": 314,
                "user_id": 314,
                "report_id": null,
                "role": 0,
                "content": "Chỉnh sửa nhiệm vụ",
                "label_name": "(Giám đốc) Nguyễn Tấn Đức - Người giao nhiệm vụ",
                "created_date": "2024-11-22T17:23:34.674425"
            },
            {
                "timeline_id": 2245,
                "organization_id": null,
                "task_id": 726,
                "create_user": 291,
                "user_id": 291,
                "report_id": null,
                "role": 0,
                "content": "Chỉnh sửa nhiệm vụ",
                "label_name": " Nguyễn Thị Kim Hà - Người giao nhiệm vụ",
                "created_date": "2024-11-26T10:54:35.653525"
            }
        ],
        "combinations": [
            {
                "combination_id": 131,
                "task_id": 726,
                "status": false,
                "state": 0,
                "title": null,
                "target_department": "490",
                "department_name": "eGov - Beta",
                "target_user": 291,
                "content": "Chưa báo cáo - Hạn 22/11/2024",
                "expire_date": "2024-11-22T00:00:00",
                "created_date": "2024-11-26T10:54:35",
                "updated_date": "2024-11-26T10:54:35",
                "deleted_date": null,
                "target_user_name": "Nguyễn Thị Kim Hà"
            },
            {
                "combination_id": 129,
                "task_id": 726,
                "status": false,
                "state": 0,
                "title": null,
                "target_department": "490",
                "department_name": "eGov - Beta",
                "target_user": 318,
                "content": "Chưa báo cáo",
                "expire_date": "2024-11-22T00:00:00",
                "created_date": "2024-11-26T10:54:35",
                "updated_date": "2024-11-26T10:54:35",
                "deleted_date": null,
                "target_user_name": "Lê Thị Bích  Thuận"
            },
            {
                "combination_id": 130,
                "task_id": 726,
                "status": false,
                "state": 0,
                "title": null,
                "target_department": "490",
                "department_name": "eGov - Beta",
                "target_user": 326,
                "content": "Chưa báo cáo",
                "expire_date": "2024-11-22T00:00:00",
                "created_date": "2024-11-26T10:54:35",
                "updated_date": "2024-11-26T10:54:35",
                "deleted_date": null,
                "target_user_name": "Phạm Thị Thu Vân"
            }
        ],
        "rotation": null,
        "combination_user_ids": [],
        "task_sources": [],
        "comments": [
            {
                "report_id": 1064,
                "task_id": 738,
                "create_user": 291,
                "user_id": 291,
                "parent_id": null,
                "combination_id": null,
                "external_id": null,
                "approved_user": null,
                "approved_at": null,
                "type": 6,
                "status": 1,
                "state": 1,
                "content": "xử lý",
                "organization_id": null,
                "new_expired_date": null,
                "completed_date": null,
                "deleted_date": null,
                "children": [
                    {
                        "report_id": 1065,
                        "task_id": 738,
                        "create_user": 291,
                        "user_id": 291,
                        "parent_id": 1064,
                        "combination_id": null,
                        "external_id": null,
                        "approved_user": null,
                        "approved_at": null,
                        "type": 6,
                        "status": 1,
                        "state": 1,
                        "content": "test",
                        "organization_id": null,
                        "new_expired_date": null,
                        "completed_date": null,
                        "deleted_date": null,
                        "children": null,
                        "created_date": "2024-11-28T16:49:17",
                        "label_name": "Nguyễn Thị Kim Hà"
                    }
                ],
                "created_date": "2024-11-28T16:45:54",
                "label_name": "Nguyễn Thị Kim Hà"
            }
        ],
        "file_in_report_complete": [
            {
                "file_id": 338,
                "task_id": 726,
                "user_id": 314,
                "report_id": null,
                "file_name": "VB_PGD.docx",
                "file_local_name": "b465049e-a009-40c8-a3f0-1c1a2082a162",
                "file_path": "~/Uploads\\2024\\5",
                "extension": "docx",
                "size": 13788,
                "is_sync": true,
                "deleted_date": null,
                "created_date": "2024-05-17T09:03:39",
                "updated_date": "2024-05-17T09:03:39"
            }
        ],
        "task_source_in_report_complete": [],
        "is_priority": false,
        "list_child_task": [],
        "parent_task": null
    }

    const itemRowComment = (item) => (
        <div>
            <div className={cx('d-flex', 'align-items-center', 'justify-content-between', 'mb-3')}>
                <div className={cx('d-flex', 'align-items-center')}>
                    <i className={cx('bx bx-user-circle', 'icon_user', 'me-2')}></i>
                    <div>
                        <div>{item.label_name}</div>
                        <div>{item.content}</div>
                    </div>
                </div>

                <div>
                    {moment(item.created_date).format('hh:mm A DD/MM/yyyy')}
                </div>
            </div>
            {item.children && item.children.length && item.children.map(itemChildren => (
                <div className={cx('d-flex', 'align-items-center', 'justify-content-between', 'mb-3', 'ms-5')}>
                    <div className={cx('d-flex', 'align-items-center')}>
                        <i className={cx('bx bx-user-circle', 'icon_user', 'me-2')}></i>
                        <div>
                            <div>{itemChildren.label_name}</div>
                            <div>{itemChildren.content}</div>
                        </div>
                    </div>

                    <div>
                        {moment(itemChildren.created_date).format('hh:mm A DD/MM/yyyy')}
                    </div>
                </div>
            ))}
        </div>
    )

    return (
        <div className={cx('DetailTaskAdminScreen', 'container')}>
            <div className={cx('d-flex', 'align-items-center', 'justify-content-between', 'mb-3')}>
                <div className={cx('d-flex', 'align-items-center')}>
                    <i className={cx('bx bx-task', 'icon_header', 'me-2')}></i>
                    <h4>Chi tiết nhiệm vụ</h4>
                </div>

                <button
                    type="button"
                    className="btn btn-success col-md-2 margin_left_20"
                >CẬP NHẬT</button>
            </div>

            <div className={cx('text_header_title')}>{detailTask.title}</div>

            <div className={cx('body_detail_task')}>
                <div className={cx('col-md-12', 'mb-3')}>
                    <div className={cx('text_title_type', 'mb-3')}>
                        <div><i className={cx('bx bx-file', 'icon_document')}></i></div>
                        <div>Nội dung công việc</div>
                    </div>
                    <div className={cx('task_content')}>
                        <div className={cx('col-md-6', 'd-flex', 'align-items-center', 'mb-2')}>
                            <div className={cx('col-md-3', 'fw-bold')}>Người giao:</div>
                            <input
                                type="text"
                                className={cx('form-control', 'me-5')}
                                value={`${detailTask.assign_organization_department_name}/ ${detailTask.assign_user_name}`}
                            />
                        </div>

                        <div className={cx('col-md-6', 'd-flex', 'align-items-center', 'mb-2')}>
                            <div className={cx('col-md-3', 'fw-bold')}>Người chủ trì:</div>
                            <input
                                type="text"
                                className={cx('form-control', 'me-5')}
                                value={`${detailTask.target_organization_department_name}/ ${detailTask.target_user_name}`}
                            />
                        </div>

                        <div className={cx('col-md-6', 'd-flex', 'mb-2')}>
                            <div className={cx('col-md-3', 'fw-bold')}>Người phối hợp:</div>
                            <div className={cx('col-md-8')}>
                                {detailTask.combinations.length && detailTask.combinations.map(item => (
                                    <div>{item.department_name}/ {item.target_user_name}</div>
                                ))}
                            </div>
                        </div>

                        <div className={cx('col-md-6', 'd-flex', 'mb-2')}>
                            <div className={cx('col-md-3', 'fw-bold')}>Người theo dõi:</div>
                            <div className={cx('col-md-8')}>
                                {detailTask.combinations.length && detailTask.combinations.map(item => (
                                    <div>{item.department_name}/ {item.target_user_name}</div>
                                ))}
                            </div>
                        </div>

                        <div className={cx('col-md-6', 'd-flex', 'align-items-center', 'mb-2')}>
                            <div className={cx('col-md-3', 'fw-bold')}>Ngày tạo:</div>
                            <div className={cx('col-md-8')}>{formatDate(detailTask.created_date)}</div>
                        </div>

                        <div className={cx('col-md-6', 'd-flex', 'align-items-center', 'mb-2')}>
                            <div className={cx('col-md-3', 'fw-bold')}>Hạn xử lý:</div>
                            <div className={cx('col-md-8')}>{formatDate(detailTask.expire_date)}</div>
                        </div>

                        <div className={cx('col-md-6', 'd-flex', 'align-items-center', 'mb-2')}>
                            <div className={cx('col-md-3', 'fw-bold')}>Mức độ ưu tiên:</div>
                            <div className={cx('col-md-8')}>{detailTask.priority}</div>
                        </div>

                        <div className={cx('col-md-6', 'd-flex', 'align-items-center', 'mb-2')}>
                            <div className={cx('col-md-3', 'fw-bold')}>Nguồn nhiệm vụ:</div>
                            <div className={cx('col-md-8')}>{detailTask.target_organization_department_name}</div>
                        </div>

                        <div className={cx('col-md-12', 'd-flex', 'mb-2')}>
                            <div className={cx('col-md-1', 'fw-bold')}>Nội dung:</div>
                            <div className={cx('col-md-10')}>Người giao nhiệm vụ: Chọn duyệt/từ chối báo (nhập ý kiến xử lý từ chối) cáo tiến độ. Hệ thống xử lý chuyển màn hình hiển thị cho phép nhập ý kiến xử lý từ chối cáo tiến độ.Người giao nhiệm vụ: Chọn duyệt/từ chối báo (nhập ý kiến xử lý từ chối) cáo tiến độ. Hệ thống xử lý chuyển màn hình hiển thị cho phép nhập ý kiến xử lý từ chối cáo tiến độ.Người giao nhiệm vụ: Chọn duyệt/từ chối báo (nhập ý kiến xử lý từ chối) cáo tiến độ. Hệ thống xử lý chuyển màn hình hiển thị cho phép nhập ý kiến xử lý từ chối cáo tiến độ.Người giao nhiệm vụ: Chọn duyệt/từ chối báo (nhập ý kiến xử lý từ chối) cáo tiến độ. Hệ thống xử lý chuyển màn hình hiển thị cho phép nhập ý kiến xử lý từ chối cáo tiến độ.Người giao nhiệm vụ: Chọn duyệt/từ chối báo (nhập ý kiến xử lý từ chối) cáo tiến độ. Hệ thống xử lý chuyển màn hình hiển thị cho phép nhập ý kiến xử lý từ chối cáo tiến độ</div>
                        </div>

                        <div className={cx('col-md-12', 'mb-2')}>
                            <div className={cx('col-md-2', 'fw-bold', 'mb-1')}>kết quả nhiệm vụ:</div>
                            <div className={cx('col-md-11')}>
                                {detailTask.file_in_report_complete.length && detailTask.file_in_report_complete.map(item => (
                                    <div className={cx('row_file')}>
                                        <div className={cx('d-flex', 'align-items-center', 'justify-content-between', 'me-2', 'col-md-11')}>
                                            <div className={cx('text_file')}>{item.file_name}</div>
                                            <i className={cx('bx bx-cloud-download', 'icon_download')}></i>
                                        </div>

                                        <div className={cx('text_red', 'ms-3')}>Xoá</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className={cx('col-md-12', 'mb-3')}>
                    <div className={cx('text_title_type', 'mb-2')}>
                        <div><i className={cx('bx bxs-file-blank', 'icon_document')}></i></div>
                        <div>Báo cáo</div>
                    </div>

                    <table bordered hover className={cx("col-md-11", "table-fixed")}>
                        <thead>
                        <tr>
                            <th>Người gửi</th>
                            <th>Ý kiến xử lý</th>
                            <th>Ngày gửi</th>
                            <th>Ngày duyệt</th>
                            <th>Trạng thái</th>
                        </tr>
                        </thead>
                        <tbody>
                        {detailTask.reports.length && detailTask.reports.map((report, index) => (
                            <tr key={index}>
                                <td>{report.label_name}</td>
                                <td className={cx('text_left')}>Báo cáo tiến độ</td>
                                <td>{formatDate(report.created_date)}</td>
                                <td>{formatDate(report.completed_date)}</td>
                                <td className={cx('text_green')}>Đã duyệt</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>

                <div className={cx('col-md-12', 'mb-3')}>
                    <div className={cx('text_title_type', 'mb-2')}>
                        <div><i className={cx('bx bx-purchase-tag-alt', 'icon_document')}></i></div>
                        <div>File đính kèm</div>
                    </div>
                    <div className={cx('col-md-11')}>
                        {detailTask.file_in_report_complete.length && detailTask.file_in_report_complete.map(item => (
                            <div className={cx('row_file')}>
                                <div className={cx('d-flex', 'align-items-center', 'justify-content-between', 'me-2', 'col-md-11')}>
                                    <div className={cx('text_file')}>{item.file_name}</div>
                                    <i className={cx('bx bx-cloud-download', 'icon_download')}></i>
                                </div>

                                <div className={cx('text_red', 'ms-3')}>Xoá</div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className={cx('col-md-12', 'mb-3')}>
                    <div className={cx('text_title_type', 'mb-2')}>
                        <div><i className={cx('bx bx-time-five', 'icon_document')}></i></div>
                        <div>Lịch sử tiến độ xử lý</div>
                    </div>
                    <div className={cx('col-md-11')}>
                        {detailTask.timelines.length && detailTask.timelines.map(item => {
                            return itemRowComment(item)
                        })}
                    </div>
                </div>

                <div className={cx('col-md-12', 'mb-3')}>
                    <div className={cx('text_title_type', 'mb-2')}>
                        <div><i className={cx('bx bx-message-rounded-dots', 'icon_document')}></i></div>
                        <div>Ý kiến xử lý</div>
                    </div>
                    <div className={cx('col-md-11')}>
                        {detailTask.comments.length && detailTask.comments.map(item => {
                            return itemRowComment(item)
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DetailTaskAdminScreen
