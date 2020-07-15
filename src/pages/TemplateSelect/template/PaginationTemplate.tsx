import React, { memo } from 'react';
import { Pagination } from 'antd';




/**
 * 分页控件
 * @param {PaginationModel} props 
    * @param {number} PageSize 每页的数量
    * @param {number} TotalCount 总条数
 * @return {jsxComponent} jsxComponent
 */


interface PaginationModel {
    PageSize?: number; //每页的数量
    TotalCount?: number; //总条数
}

function onShowSizeChange(current: any, pageSize: any) {

}


function TemplateSelectPaginationTemplateComponent(props: PaginationModel) {

    return (
        <Pagination
            showQuickJumper
            size="small"
            onShowSizeChange={onShowSizeChange}
            defaultCurrent={1}
            hideOnSinglePage={true}
            pageSize={props.PageSize || 10}
            pageSizeOptions={["8"]}
            total={props.TotalCount || 1}
        />
    )
}

function areEqual(prevProps: PaginationModel, nextProps: PaginationModel) {
    if (prevProps.PageSize !== nextProps.PageSize) return false;
    if (prevProps.TotalCount !== nextProps.TotalCount) return false;
    return true;

}

export default memo(TemplateSelectPaginationTemplateComponent, areEqual)






