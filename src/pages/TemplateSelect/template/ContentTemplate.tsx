import RenderTemplateList from "./ItemTemplate";
import React, { createContext, useEffect, useState } from "react";
import TipTemplate from "./TipTemplate";
import PaginationTemplate from "./PaginationTemplate";
import { PageResponse, TemplateResponseModel } from "@/axios/data";
import { getTemplateList } from '@/axios/api'


interface matchModel {
    params: any
}

/**
 * 列表的上下文   供 ItemTemplate 使用
 * @param {object} ContentContext 上下文
    * @param {object} params 路由match里面params参数
        * @param {string | undefined} specialId 专题id
 * @reutrn {context} ContentContext
 */

export const ContentContext = createContext<matchModel>({ params: {} });
/**
 * 整个列表数据
 *  @return jsxComponent
 */
function ContentTempate() {

    let [TemplateList, setTemplateList] = useState<PageResponse<TemplateResponseModel>>();

    useEffect(() => {
        (async function getTemplate() {
            const data: PageResponse<TemplateResponseModel>
                = await getTemplateList()
            setTemplateList(data);
        })()
    }, []);


    return (<div className="tmplate-content-list">
        <div className="list-tmp-box">
            <RenderTemplateList {...TemplateList} />
        </div>
        <div className="tip-pagination">
            <TipTemplate />
            <div className="select-pagination">
                <PaginationTemplate PageSize={TemplateList?.PageSize} TotalCount={TemplateList?.TotalCount} />
            </div>
        </div>
    </div>)
}

export default ContentTempate;