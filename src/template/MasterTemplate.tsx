import React, { Component, Fragment } from 'react'
import { Button } from 'antd'
import { EditFilled, DeleteFilled, ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons'

import './MasterTemplate.less'

export interface IMasterTemplateProps { }

export interface IMasterTemplateState {
  isShowMask: boolean
}

export interface IRenderMaskParams {
  tempId: string
  activeTempId: string
  tempSort: number
  allTempDataLength: number
}

class MasterTemplate<P> extends Component<P, IMasterTemplateState> {
  renderMask(params: IRenderMaskParams): JSX.Element {
    const { isShowMask } = this.state

    if (isShowMask || params.tempId === params.activeTempId) {
      return (
        <div className="mask-box">
          <div className="action-box">
            <Button type="default" shape="round" icon={<EditFilled />} style={{ marginRight: 10 }}>编辑</Button>
            <Button type="primary" shape="round" danger icon={<DeleteFilled />}>删除</Button>
          </div>
          <div className="sort-box">
            <Button type="primary" shape="round" style={{ marginRight: 30 }}>背景</Button>
            <Button type="primary" shape="circle" icon={<ArrowUpOutlined />} style={{ marginRight: 10 }} disabled={params.tempSort === 1}></Button>
            <Button type="primary" shape="circle" icon={<ArrowDownOutlined />} disabled={params.tempSort === params.allTempDataLength}></Button>
          </div>
        </div >
      )
    } else {
      return <Fragment></Fragment>
    }
  }
}

export default MasterTemplate