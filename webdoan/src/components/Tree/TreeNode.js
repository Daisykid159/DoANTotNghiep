import TreeView from "react-treeview";
import React from "react";

const TreeNode = ({ node, onNodeClick }) => {
    const hasChildren = node.child_departments && node.child_departments.length > 0;

    const handleClick = () => {
        if (onNodeClick) {
            onNodeClick(node); // Gửi dữ liệu nhánh được click ra ngoài
        }
    };

    return (
        <TreeView
            nodeLabel={
                <span onClick={handleClick} style={{ cursor: "pointer" }}>
                    {node.departmentName}
                </span>
            }
            defaultCollapsed={false}
        >
            {hasChildren &&
                node.child_departments.map((child, i) => (
                    <TreeNode key={i} node={child} onNodeClick={onNodeClick} />
                ))}
        </TreeView>
    );
};

export default React.memo(TreeNode);
