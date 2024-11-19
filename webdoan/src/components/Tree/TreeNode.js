import TreeView from "react-treeview";
import React from "react";

const TreeNode = ({ node }) => {
    const hasChildren = node.children && node.children.length > 0;

    return (
        <TreeView nodeLabel={node.label} defaultCollapsed={false}>
            {hasChildren &&
            node.children.map((child, i) => (
                <TreeNode key={i} node={child} />
            ))}
        </TreeView>
    );
};

export default React.memo(TreeNode);
