import React, { FC } from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import TitleTemplate from "./template/TitleTemplate"
import ContentTempate, { ContentContext } from './template/ContentTemplate'

import './index.less'

/**
 * 模板选择页面
 * @param {Object} props  父级传进来的参数 需要
    * @param {Object} match 获取路由的上下文参数
 * @return {jsxComponent} jsxComponent
 */

const TemplateSelect: FC<RouteComponentProps> = props => {
  return (
    <div className="template-select-box">
      <div className="c-box">
        <div className="select-top">
          <TitleTemplate />
          {/* <i className="iconfont close-btn">&#xE005;</i> */}
          {/* <Button type="primary" shape="round" style={{ float: 'right' }}>新增模板</Button> */}
        </div>
        <ContentContext.Provider value={{ params: props.match.params }}>
          <ContentTempate />
        </ContentContext.Provider>
      </div>
    </div>
  )
}

export default withRouter(TemplateSelect) 