import React, { PureComponent, Fragment, CSSProperties } from 'react'
import { Button, Modal } from 'antd'
import { EditFilled, DeleteFilled, CopyFilled, ArrowUpOutlined, ArrowDownOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import { ITemplateModel, IBackgroundSetModel } from '../store/data'
import { zIndexDown, zIndexUp, insertItemToArray, deepClone, initTempCss } from '../utils/utils'
import _ from 'lodash'
import { BackgroundSetType } from '../components/commonPlugin/BackgroundSet/store/state'

import './MasterTemplate.less'

export interface IMasterTemplateProps {
  activeTempId: string
  tempData: ITemplateModel<any>
  allTempData: ITemplateModel<any>[]
  changeActiveTempId: (activeTempId: string) => void
  changeEditorSliderShow: (isShow: boolean) => void
  changeTempData: (allTempData: ITemplateModel<any>[]) => void
  setTempBackground: (backgroundSet: IBackgroundSetModel) => void
  changeAddTemplateSliderShow: (isShow: boolean) => void
  changeEditorSliderTab: (tabTypeIndex: number) => void
}

export interface IMasterTemplateState {
  isShowMask: boolean
  bgModalVisible?: boolean
  [key: string]: any
}

export interface IRenderMaskParams {
  tempId: string
  activeTempId: string
  tempBackground?: IBackgroundSetModel
  allTempData: ITemplateModel<any>[]
  changeActiveTempId: (activeTempId: string) => void
  changeEditorSliderShow: (isShow: boolean) => void
  changeTempData: (allTempData: ITemplateModel<any>[]) => void
  setTempBackground: (backgroundSet: IBackgroundSetModel) => void
  changeAddTemplateSliderShow: (isShow: boolean) => void
  changeEditorSliderTab: (tabTypeIndex: number) => void
}

class MasterTemplate<P> extends PureComponent<P, IMasterTemplateState> {
  state: IMasterTemplateState = {
    isShowMask: false,
    bgModalVisible: true
  }

  renderMask(params: IRenderMaskParams): JSX.Element {
    const { isShowMask } = this.state

    if (isShowMask || params.tempId === params.activeTempId) {
      const tempIndex = _.findIndex(params.allTempData, item => item.id === params.tempId)

      return (
        <div className="mask-box">
          <div className="action-box">
            <Button type="default" shape="round" icon={<EditFilled />}
              style={{ marginRight: 10 }}
              onClick={e => {
                e.stopPropagation()
                params.changeActiveTempId(params.tempId)
                params.changeEditorSliderShow(true)
                params.changeAddTemplateSliderShow(false)
                params.changeEditorSliderTab(0)
              }}
            >编辑</Button>
            <Button type="primary" shape="round" icon={<CopyFilled />}
              style={{ marginRight: 10 }}
              onClick={e => {
                e.stopPropagation()
                this.copyTemplate(params, tempIndex)
              }}
            >复制</Button>
            <Button type="primary" shape="round" danger icon={<DeleteFilled />}
              onClick={e => {
                e.stopPropagation()
                this.deleteTemplate(params)
              }}
            >删除</Button>
          </div>
          <div className="sort-box">
            <Button type="default" shape="round" style={{ marginRight: 30 }}
              onClick={e => {
                e.stopPropagation()
                this.setTempBackground(params)
              }}
            >背景</Button>
            <Button type="primary" shape="circle" icon={<ArrowUpOutlined />}
              style={{ marginRight: 10 }} disabled={tempIndex === 0}
              onClick={e => {
                e.stopPropagation()
                params.changeTempData(this.moveUpTemplate(params, tempIndex))
              }}
            ></Button>
            <Button type="primary" shape="circle" icon={<ArrowDownOutlined />}
              disabled={tempIndex === params.allTempData.length - 1}
              onClick={e => {
                e.stopPropagation()
                params.changeTempData(this.moveDownTemplate(params, tempIndex))
              }}
            ></Button>
          </div>
        </div >
      )
    } else {
      return <Fragment></Fragment>
    }
  }

  // 向上移动模块
  moveUpTemplate(params: IRenderMaskParams, tempIndex: number) {
    const activeTempId = zIndexUp(params.allTempData, tempIndex, true)
    if (activeTempId) params.changeActiveTempId(activeTempId)
    return params.allTempData
  }

  // 向下移动模块
  moveDownTemplate(params: IRenderMaskParams, tempIndex: number) {
    const activeTempId = zIndexDown(params.allTempData, tempIndex, params.allTempData.length, true)
    if (activeTempId) params.changeActiveTempId(activeTempId)
    return params.allTempData
  }

  // 复制模块
  copyTemplate(params: IRenderMaskParams, tempIndex: number) {
    Modal.confirm({
      title: '复制提示',
      icon: <ExclamationCircleOutlined />,
      centered: true,
      content: '确定复制此模块吗？',
      getContainer: false,
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        const copyTemp = deepClone(_.filter(params.allTempData, item => item.id === params.tempId)[0])
        copyTemp.id = `${copyTemp.id.split('_')[0]}_${Date.now()}`
        insertItemToArray(params.allTempData, tempIndex, copyTemp)
        params.changeTempData(params.allTempData)
      }
    })
  }

  // 删除模块
  deleteTemplate(params: IRenderMaskParams) {
    Modal.confirm({
      title: '删除提示',
      icon: <ExclamationCircleOutlined />,
      centered: true,
      content: '确定删除此模块吗？',
      getContainer: false,
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        params.changeTempData(_.filter(params.allTempData, item => item.id !== params.tempId))
        params.changeActiveTempId('')
        params.changeEditorSliderShow(false)
      }
    })
  }

  // 设置模块背景
  setTempBackground(params: IRenderMaskParams) {
    const backgroundSet: IBackgroundSetModel = {
      tempId: params.tempId,
      isShow: true,
      bgType: params.tempBackground?.bgType || BackgroundSetType.NoneColor,
      bgColor: params.tempBackground?.bgColor,
      bgImageUrl: params.tempBackground?.bgImageUrl
    }
    params.setTempBackground(backgroundSet)
  }

  // 渲染模板样式
  initTempCss(background?: IBackgroundSetModel, topSpacing?: number, bottomSpacing?: number): CSSProperties {
    return initTempCss(background, topSpacing, bottomSpacing)
  }
}

export default MasterTemplate