import React, { Component, Fragment } from 'react'
import { Button, Modal } from 'antd'
import { EditFilled, DeleteFilled, ArrowUpOutlined, ArrowDownOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import { ITemplateModel } from '../store/data'
import { zIndexDown, zIndexUp } from '../utils/utils'
import _ from 'lodash'
import { SketchPicker } from 'react-color'

import './MasterTemplate.less'

export interface IMasterTemplateProps { }

export interface IMasterTemplateState {
  isShowMask: boolean
  bgModalVisible?: boolean
}

export interface IRenderMaskParams {
  tempId: string
  activeTempId: string
  tempSort: number
  allTempData: ITemplateModel[]
  changeActiveTempId: (activeTempId: string) => void
  showEditorSlider: () => void
  changeTempData: (allTempData: ITemplateModel[]) => void
}

class MasterTemplate<P> extends Component<P, IMasterTemplateState> {
  state: IMasterTemplateState = {
    isShowMask: false,
    bgModalVisible: true
  }

  renderMask(params: IRenderMaskParams): JSX.Element {
    const { isShowMask } = this.state

    if (isShowMask || params.tempId === params.activeTempId) {
      return (
        <div className="mask-box">
          <div className="action-box">
            <Button type="default" shape="round" icon={<EditFilled />}
              style={{ marginRight: 10 }}
              onClick={() => {
                params.changeActiveTempId(params.tempId)
                params.showEditorSlider()
              }}
            >编辑</Button>
            <Button type="primary" shape="round" danger icon={<DeleteFilled />}
              onClick={(e) => {
                e.stopPropagation()
                this.deleteTemplate(params)
              }}
            >删除</Button>
          </div>
          <div className="sort-box">
            <Button type="primary" shape="round" style={{ marginRight: 30 }}
              onClick={(e) => {
                e.stopPropagation()
                this.setBackground()
              }}
            >背景</Button>
            <Button type="primary" shape="circle" icon={<ArrowUpOutlined />}
              style={{ marginRight: 10 }} disabled={params.tempSort === 1}
              onClick={(e) => {
                e.stopPropagation()
                params.changeTempData(this.moveUpTemplate(params.tempSort, params.allTempData))
              }}
            ></Button>
            <Button type="primary" shape="circle" icon={<ArrowDownOutlined />}
              disabled={params.tempSort === params.allTempData.length}
              onClick={(e) => {
                e.stopPropagation()
                params.changeTempData(this.moveDownTemplate(params.tempSort, params.allTempData))
              }}
            ></Button>
          </div>
        </div >
      )
    } else {
      return <Fragment></Fragment>
    }
  }

  moveUpTemplate(sort: number, tempData: ITemplateModel[]) {
    zIndexUp(tempData, sort - 1)
    return tempData
  }

  moveDownTemplate(sort: number, tempData: ITemplateModel[]) {
    zIndexDown(tempData, sort - 1, tempData.length)
    return tempData
  }

  deleteTemplate(params: IRenderMaskParams) {
    Modal.confirm({
      title: '删除提示',
      icon: <ExclamationCircleOutlined />,
      content: '确定删除此模块吗？',
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        params.changeTempData(_.filter(params.allTempData, item => item.id !== params.tempId))
      }
    })
  }

  setBackground() {
    Modal.confirm({
      title: '设置背景',
      content: <SketchPicker color="#fff" />,
      okText: '确认',
      cancelText: '取消',
    })
  }
}

export default MasterTemplate