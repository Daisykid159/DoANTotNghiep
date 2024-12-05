import React, {useState} from "react";
import styles from './ListActionStyle.module.scss';
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const HandleAction = (props) => {

    const [uploadedFiles, setUploadedFiles] = useState([]);

    const handleFileUpload = (event) => {
        const files = Array.from(event.target.files); // Lấy danh sách các tệp được chọn
        setUploadedFiles((prevFiles) => [...prevFiles, ...files]); // Cập nhật danh sách tệp
    };

    const handleFileRemove = (index) => {
        setUploadedFiles((prevFiles) =>
            prevFiles.filter((_, i) => i !== index) // Loại bỏ tệp tại chỉ mục tương ứng
        );
    };

    return (
        <div className={cx('HandleAction')}>
            <div className={cx('HandleAction_body')}>
                <div className={cx('HandleAction_body_header')}>
                    <div>{props.typeAction}</div>

                    <button
                        onClick={() => props.handleCloseModule()}
                        className={cx("btn", 'HandleAction_body_close')}
                    >
                        <i className='bx bx-x'></i>
                    </button>
                </div>

                <div className={cx('container', 'p-4')}>
                    <div className={cx('row', 'col-md-12', 'mb-3', 'd-flex')}>
                        <div className={cx('col-md-12', 'd-flex')}>
                            <div className={cx('col-md-2')}>Tiêu đề:</div>
                            <div>{props.title}</div>
                        </div>
                    </div>

                    {props.showDate && (
                        <div className={cx('row', 'col-md-12', 'align-items-center', 'mb-3')}>
                            <div className={cx('col-md-6', 'd-flex', 'align-items-center')}>
                                <div className={cx('col-md-4')}>Ngày tạo:</div>
                                <input
                                    value={new Date().toISOString().split("T")[0]} // Định dạng ngày thành YYYY-MM-DD
                                    type="date"
                                    className="form-control"
                                    placeholder="Ngày tạo"
                                />
                            </div>

                            <div className={cx('col-md-6', 'd-flex', 'align-items-center')}>
                                <label className={cx('col-md-4')}>Hạn xử lý:</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    placeholder="Hạn xử lý mới"
                                />
                            </div>
                        </div>
                    )}

                    {props.showPercent && (
                        <div className={cx('row', 'col-md-12', 'mb-3')}>
                            <div className={cx('col-md-12', 'd-flex', 'align-items-center')}>
                                <div className={cx('col-md-2')}>Phần trăm hoàn thành <span className={cx('text_red')}>*</span></div>
                                <input
                                    type="number"
                                    className="form-control"
                                    placeholder="Nhập phần trăm hoàn thành"
                                />
                            </div>
                        </div>
                    )}

                    {props.showComment && (
                        <div className={cx('row', 'col-md-12', 'mb-3')}>
                            <div className={cx('col-md-12', 'd-flex')}>
                                <div className={cx('col-md-2')}>Ý kiến xử lý <span className={cx('text_red')}>*</span></div>
                                <textarea
                                    className={cx("form-control", 'input_comment')}
                                    placeholder="Ý kiến xử lý"
                                    rows="3"
                                />
                            </div>
                        </div>
                    )}

                    {props.showFile && (
                        <div className={cx('col-md-12', 'mb-3', 'row')}>
                            <div className={cx('d-flex', 'col-md-12', 'align-items-center', 'mb-3')}>
                                <label className={cx('col-md-2')}>Đính kèm file:</label>

                                <div className="file-upload__input">
                                    <label htmlFor="file-input" className="btn btn-primary">
                                        Chọn tệp
                                    </label>
                                    <input
                                        id="file-input"
                                        type="file"
                                        multiple
                                        onChange={handleFileUpload}
                                        style={{ display: "none" }} // Ẩn input thật, chỉ hiển thị nút
                                    />
                                </div>
                            </div>

                            <ul>
                                {uploadedFiles.map((file, index) => (
                                    <li key={index} className={cx("file-item")}>
                                        <span>{file.name}</span>
                                        <button
                                            className={cx("btn btn-danger btn-sm", 'btn_delete')}
                                            onClick={() => handleFileRemove(index)}
                                        >
                                            Xóa
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    <div className="d-flex justify-content-end gap-2 mt-2">
                        <button
                            className="btn btn-secondary"
                            onClick={() => props.handleCloseModule()}
                        >
                            Huỷ
                        </button>
                        <button className="btn btn-warning ms-3">Gửi</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HandleAction;
