
import React, { useState, Fragment, useContext, useCallback, useRef, memo, useEffect } from 'react'
import { TemplateResponseModel, PageResponse } from '../../../axios/data';

import { Link } from 'react-router-dom';
import { message } from 'antd'
import { ContentContext } from './ContentTemplate';


/**
 * 选择模块的列表数据
 * @param {Object} props  父级传进来的参数 需要
    * @param {Object} match 获取路由的上下文参数
   @return {jsxComponent} jsxComponent
 */


interface TemplateItemModel extends TemplateResponseModel {
    SpecialId?: string;
}


interface TemplateItemModel extends TemplateResponseModel {
    SpecialId?: string;
}



function TemplateSelectItemTemplateComponent(props: TemplateItemModel) {



    const ref = useRef<string>();

    useEffect(() => {
        ref.current = props.Content!;
    })
    // 跳转至预览页面
    const jumpToPreview = useCallback(() => {
        if (!ref.current) return message.warning('此模板没有任何内容！')
        localStorage.setItem('pageEditorData', ref.current)
        const openWindow = window.open('about:blank') as Window
        const { origin, pathname } = window.location
        openWindow.location = `${origin}${pathname}#/preview` as any
    }, [ref])

    if (!props.TempId) return (<></>)

    return (
        <>
            <li>
                <div className="tmp-left">
                    <div className="img-box" >
                        <img src={props.Img} alt={props.Title} />
                    </div>
                    <div className="preview-usered">
                        <span className="preview" onClick={jumpToPreview}>预览</span>
                        <Link to={`/home/${props.SpecialId}/0/${props.TempId}`}>
                            <span className="usered">使用</span>
                        </Link>
                    </div>
                </div>
                <div className="tmp-right">
                    <h6>{props.Title}</h6>
                    <p>模板说明：{props.Summary}</p>
                </div>
            </li>
        </>
    )
}

function areEqual(prevProps: TemplateItemModel, nextProps: TemplateItemModel) {

    if (prevProps.SpecialId !== nextProps.SpecialId) return false;

    if (prevProps.Content !== nextProps.Content) return false;

    return true;

}

///list里面的每个小的模块
const TemplateItem = memo(TemplateSelectItemTemplateComponent, areEqual);

/**
 * 选择模块的列表数据
 * @param {PageResponse<TemplateResponseModel> | undefined} props  父级传进来的参数 需要
   @return 列表
 */
function TemplateSelectTemplateList(props: PageResponse<TemplateResponseModel> | undefined) {

    const context = useContext(ContentContext);

    let [SpecialId] = useState<string>(context.params.specialId);

    if (!props) return (<Fragment></Fragment>);

    return <ul key={1}>
        {
            props.PageDatas?.map(item => {
                let data = { ...item, SpecialId };
                return (<TemplateItem key={item.TempId} {...data} />)
            })
        }
    </ul>

}


export default TemplateSelectTemplateList;
