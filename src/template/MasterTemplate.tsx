import React, { Component, Fragment, CSSProperties } from 'react'
import { Button, Modal } from 'antd'
import { EditFilled, DeleteFilled, ArrowUpOutlined, ArrowDownOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import { ITemplateModel, IBackgroundSetModel } from '../store/data'
import { zIndexDown, zIndexUp } from '../utils/utils'
import _ from 'lodash'
import { BackgroundSetType } from '../components/BackgroundSet/store/state'

import './MasterTemplate.less'

export interface IMasterTemplateProps {
  activeTempId: string
  tempData: ITemplateModel
  allTempData: ITemplateModel[]
  changeActiveTempId: (activeTempId: string) => void
  showEditorSlider: () => void
  changeTempData: (allTempData: ITemplateModel[]) => void
  setTempBackground: (backgroundSet: IBackgroundSetModel) => void
}

export interface IMasterTemplateState {
  isShowMask: boolean
  bgModalVisible?: boolean
}

export interface IRenderMaskParams {
  tempId: string
  activeTempId: string
  tempSort: number
  tempBackground?: IBackgroundSetModel
  allTempData: ITemplateModel[]
  changeActiveTempId: (activeTempId: string) => void
  showEditorSlider: () => void
  changeTempData: (allTempData: ITemplateModel[]) => void
  setTempBackground: (backgroundSet: IBackgroundSetModel) => void
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
                this.setTempBackground(params)
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

  setTempBackground(params: IRenderMaskParams) {
    const backgroundSet: IBackgroundSetModel = {
      tempId: params.tempId,
      isShow: true,
      ...params.tempBackground
    }
    params.setTempBackground(backgroundSet)
  }

  initTempBackground(background?: IBackgroundSetModel): CSSProperties {
    let bgCss: CSSProperties = {}
    if (!background) return bgCss
    switch (background.bgType) {
      case BackgroundSetType.NoneColor:
        break
      case BackgroundSetType.PureColor:
        bgCss.backgroundColor = background.bgColor
    }
    return bgCss
  }
}

export default MasterTemplate