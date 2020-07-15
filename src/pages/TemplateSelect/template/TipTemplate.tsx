
import React,{ memo } from 'react';




/**
 * 提示文字
 * @return {jsxComponent} jsxComponent
 */



function TemplateSelectTipTemplateComponent() {

    return (<div className="select-tip">注意：必需选择一个模板，才能进入下一步</div>)
}

function areEqual(prevProps: any, nextProps: any) {
    return true;
}


export default memo(TemplateSelectTipTemplateComponent, areEqual)





//   <div className="select-tip">注意：必需选择一个模板，才能进入下一步</div>