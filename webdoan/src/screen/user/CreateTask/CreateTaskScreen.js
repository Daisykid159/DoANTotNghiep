import React, {useState} from "react";
import styles from './CreateTaskStyle.module.scss'
import classNames from "classnames/bind";
import ListActionTarget from "../../../components/ListAction/ListActionTarget";

const cx = classNames.bind(styles);

const CreateTaskScreen = (props) => {

    const [titleTask, setTitleTask] = useState(props?.dataEdit?.title || '');
    const [assignTask, setAssignTask] = useState('');
    const [targetTask, setTargetTask] = useState('');
    const [combinationTask, setCombinationTask] = useState('');
    const [createTask, setCreateTask] = useState( '');
    const [sourceTask, setSourceTask] = useState(null);
    const [levelTask, setLevelTask] = useState(null);
    const [createDate, setCreateDate] = useState(null);
    const [deadlineTask, setDeadlineTask] = useState(null);
    const [contentTask, setContentTask] = useState('');
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
        <div className={cx('CreateTaskScreen')}>
            <div className={cx('CreateTaskScreen_body')}>
                <div className={cx('d-flex', 'align-items-center', 'CreateTaskScreen_body_header')}>
                    <i className={cx('bx bx-stats', 'me-2', 'icon_stats')}></i>
                    <div>{props.dataEdit ? 'Chỉnh sửa nhiệm vụ' : 'Giao nhiệm vụ'}</div>

                    <button
                        onClick={() => props.setShowModuleCreateTask(false)}
                        className={cx("btn", 'CreateTaskScreen_body_close')}
                    >
                        <i className='bx bx-x'></i>
                    </button>
                </div>

                <div className={cx('p-3', 'row')}>
                    <div className={cx('col-md-12', 'mb-3')}>
                        <div className={cx('d-flex', 'align-items-center')}>
                            <label className={cx("col-md-125")}>Tiêu đề nhiệm vụ <span className={cx('text_red')}>*</span></label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Tiêu đề nhiệm vụ"
                                value={titleTask}
                                onChange={(e) => setTitleTask(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className={cx('col-md-6', 'mb-3')}>
                        <div className={cx('d-flex', 'align-items-center')}>
                            <label className="col-md-3">Đơn vị người giao <span className={cx('text_red')}>*</span></label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Đơn vị người giao"
                            />
                        </div>
                    </div>

                    <div className={cx('col-md-6', 'mb-3')}>
                        <div className={cx('d-flex', 'align-items-center')}>
                            <label className="col-md-3">Đơn vị người chủ trì <span className={cx('text_red')}>*</span></label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Đơn vị người chủ trì"
                            />
                        </div>
                    </div>

                    <div className={cx('col-md-6', 'mb-3')}>
                        <div className={cx('d-flex', 'align-items-center')}>
                            <label className="col-md-3">Đơn vị người phối hợp <span className={cx('text_red')}>*</span></label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Đơn vị người phối hợp"
                            />
                        </div>
                    </div>

                    <div className={cx('col-md-6', 'mb-3')}>
                        <div className={cx('d-flex', 'align-items-center')}>
                            <label className="col-md-3">Đơn vị người tạo <span className={cx('text_red')}>*</span></label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Đơn vị người tạo"
                            />
                        </div>
                    </div>

                    <div className={cx('col-md-6', 'mb-3')}>
                        <div className={cx('d-flex', 'align-items-center')}>
                            <label className="col-md-3">Nguồn nhiệm vụ <span className={cx('text_red')}>*</span></label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nguồn nhiệm vụ"
                            />
                        </div>
                    </div>

                    <div className={cx('col-md-6', 'mb-3')}>
                        <div className={cx('d-flex', 'align-items-center')}>
                            <label className="col-md-3">Mức độ quan trọng <span className={cx('text_red')}>*</span></label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Mức độ quan trọng"
                            />
                        </div>
                    </div>

                    <div className={cx('col-md-6', 'mb-3')}>
                        <div className={cx('d-flex', 'align-items-center')}>
                            <label className="col-md-3">Ngày tạo <span className={cx('text_red')}>*</span></label>
                            <input
                                type="date"
                                className="form-control"
                                placeholder="Tiêu đề nhiệm vụ"
                            />
                        </div>
                    </div>

                    <div className={cx('col-md-6', 'mb-3')}>
                        <div className={cx('d-flex', 'align-items-center')}>
                            <label className="col-md-3">Hạn xử lý <span className={cx('text_red')}>*</span></label>
                            <input
                                type="date"
                                className="form-control"
                                placeholder="Tiêu đề nhiệm vụ"
                            />
                        </div>
                    </div>

                    <div className={cx('col-md-12', 'mb-3')}>
                        <div className={cx('d-flex')}>
                            <label className={cx("col-md-125", "mt-1")}>Nội dung:</label>
                            <textarea
                                className={cx("form-control", 'input_comment')}
                                placeholder="Nội dung nhiệm vụ"
                                rows="4"
                            />
                        </div>
                    </div>

                    <div className={cx('col-md-12', 'mb-3')}>
                        <div className={cx('d-flex', 'col-md-12', 'align-items-center', 'mb-3')}>
                            <label className={cx('col-md-125')}>Đính kèm file:</label>

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

                    <div className={cx('col-md-12', 'mb-3', 'd-flex', 'justify-content-end')}>
                        <div className="d-flex justify-content-between">
                            <button
                                className="btn btn-success d-flex align-items-center me-2"
                            >
                                {props.dataEdit ? 'Chỉnh sửa' : 'TẠO MỚI'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateTaskScreen;
