import React, { memo } from "react"





/**
 * 标题
 * @param {Object} props 父级传过来的对象
 * @return {jsxComponent} jsxComponent
 */

function TemplateSelectTitleTemplateComponent() {

    return (
        <h2>请选择网站模板</h2>
    )
}
function areEqual(prevProps: any, nextProps: any) {
    return true;
}


export default memo(TemplateSelectTitleTemplateComponent, areEqual);