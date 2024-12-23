import React from 'react';
import classNames from "classnames/bind";
import styles from "./nopage.module.scss";

const cx = classNames.bind(styles);

const RowChild = ({ item, index }) => {
    console.log("item", index);
    return (
        <div className={cx('item_child')}>
            <div className={cx('brank_child')} style={{
                top: index === 0 ? '0px' : '-25px',
                height: index === 0 ? '25px' : '50px',
            }}></div>
            <div className={cx('text_child')}>
                <div className={cx('parent')}>{item.parent}</div>
                {item.children?.length > 0 && item.children.map((itemChild, indexChild) => {
                    return (
                        <div className={cx('list_child')}>
                            <div className={cx('list_child_border_left')}></div>
                            <RowChild item={itemChild} index={indexChild}/>
                        </div>
                    )
                })}
            </div>
        </div>
    )
};

const NoPage = () => {

    const treeData = [
        {
            parent: "Con 1",
            children: [
                {
                    parent: "con 1.1",
                    children: [
                        {
                            parent: "con 1.1.1",
                            children: [
                                {
                                    parent: "con 1.1.1.1",
                                    children: [
                                        { parent: "con 1.1.1.1.1", children: [] },
                                        { parent: "con 1.1.1.1.2", children: [] },
                                        { parent: "con 1.1.1.1.3", children: [] },
                                    ],
                                },
                                { parent: "Chazzzzzzzzzz", children: [] },
                                { parent: "Chazzzzzzzzzz", children: [] },
                                { parent: "Chazzzzzzzzzz", children: [] },
                            ],
                        },
                        { parent: "Chazzzzzzzzzz", children: [] },
                        { parent: "Chazzzzzzzzzz", children: [] },
                    ],
                },
                { parent: "con 1.2", children: [] },
                { parent: "con 1.3", children: [] },
            ],
        },
        {
            parent: "Con 2",
            children: [],
        },
        {
            parent: "Con 3",
            children: [],
        },
        {
            parent: "Con 4",
            children: [],
        },
    ];

    return (
        <div className={cx('w90')}>
            <h1>404 - Trang không tồn tại</h1>
            <p>Xin lỗi, trang bạn đang tìm kiếm không tồn tại.</p>
            <div className={'container'}>
                <div className={cx('parent')}>item.parent</div>
                {treeData?.length > 0 && treeData.map((itemChild, index) => {
                    return (
                        <div className={cx('list_child')}>
                            <div className={cx('list_child_border_left')}></div>
                            <RowChild item={itemChild} index={index}/>
                        </div>
                    )
                })}
            </div>
        </div>
    );
}

export default NoPage;
