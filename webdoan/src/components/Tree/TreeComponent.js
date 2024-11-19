import React from "react";
import TreeNode from "./TreeNode";

const TreeComponent = ({ data }) => {
    return (
        <div>
            {data.map((node, i) => (
                <TreeNode key={i} node={node} />
            ))}
        </div>
    );
};

export default React.memo(TreeComponent);
