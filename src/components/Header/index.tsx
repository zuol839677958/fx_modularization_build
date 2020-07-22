import React, { Component } from 'react'
import { Button, message, Modal } from 'antd'
import { IPageState, IBackgroundSetModel, IPageModel } from '../../store/data'
import { Dispatch, Action } from 'redux'
import { connect } from 'react-redux'
import { changeBackgroundSetData } from '../BackgroundSet/store/actions'
import { savePageHtml, changeActiveTempId, changePageData } from '../EditorContainer/store/actions'
import { changeEditorSliderShow } from '../EditorSlider/store/actions'
import { changeAddTemplateSliderShow } from '../AddTemplate/store/actions'
import { RouteComponentProps } from 'react-router-dom'
import { updateTemplateData, updateSpecialContent } from '../../axios/api'
import { ExclamationCircleOutlined } from '@ant-design/icons'

import './index.less'

interface IHeaderProps extends RouteComponentProps {
  pageData?: IPageModel
  backgroundSetData?: IBackgroundSetModel
  changeBackgroundSetData?: (backgroundSet: IBackgroundSetModel) => void
  changeActiveTempId?: (activeTempId: string) => void
  changeEditorSliderShow?: (isShow: boolean) => void
  changeAddTemplateSliderShow?: (isShow: boolean) => void
  savePageHtml?: () => void
  changePageData?: (pageData: IPageModel) => void
}

interface IHeaderState { }

class Header extends Component<IHeaderProps, IHeaderState> {
  render() {
    const { tempId } = this.props.match.params as { tempId: string }

    return (
      <div className="header-wrap">
        <div className="header-left">
          <Button type="default" shape="round"
            onClick={() => this.openAddTemplateSlider()}
          >新增模块</Button>
          <Button type="default" shape="round"
            style={{ marginLeft: 20 }}
            onClick={() => this.setPageBackground()}
          >设置背景</Button>
          <Button type="default" shape="round"
            style={{ marginLeft: 20 }}
            onClick={() => this.getHistoryEditorPageData()}
          >获取历史更改</Button>
        </div>
        <div className="header-center">
          <span>通用专题模块化</span>
        </div>
        <div className="header-right">
          <Button type="default" shape="round" onClick={() => this.jumpToPreview()}>预览</Button>
          <Button type="primary" shape="round" style={{ marginLeft: 20 }}
            onClick={() => this.saveSpecialPageData()}
          >保存</Button>
          {
            tempId
              ? <Button type="primary" shape="round" style={{ marginLeft: 20 }}
                onClick={() => this.updateTemplateData()}
              >保存为模板</Button>
              : null
          }
          <Button type="link" style={{ marginLeft: 20 }}>帮助说明</Button>
        </div>
      </div>
    )
  }

  // 设置网页背景
  setPageBackground() {
    const { backgroundSetData, pageData, changeBackgroundSetData } = this.props
    backgroundSetData!.tempId = ''
    backgroundSetData!.bgType = pageData?.background?.bgType
    backgroundSetData!.bgColor = pageData?.background?.bgColor
    backgroundSetData!.bgImageUrl = pageData?.background?.bgImageUrl
    backgroundSetData!.isShow = true
    changeBackgroundSetData!(backgroundSetData!)
  }

  // 保存至专题网页数据
  async saveSpecialPageData() {
    Modal.confirm({
      title: '保存提示',
      icon: <ExclamationCircleOutlined />,
      centered: true,
      content: '确定保存此专题网页吗？',
      getContainer: false,
      okText: '确认',
      cancelText: '取消',
      onOk: async () => {
        const key = 'savePageHtml'
        message.loading({ content: '正在保存页面...', key })
        await this.handleSavePageAction()
        const { pageData } = this.props
        const { specialId } = this.props.match.params as { specialId: string }
        await updateSpecialContent({
          SpecialId: Number(specialId),
          Content: JSON.stringify(pageData),
          EditType: 1
        })
        message.success({ content: '保存页面成功！', key })
      }
    })
  }

  // 更新模板
  async updateTemplateData() {
    Modal.confirm({
      title: '更新提示',
      icon: <ExclamationCircleOutlined />,
      centered: true,
      content: '确定更新此模板吗？',
      getContainer: false,
      okText: '确认',
      cancelText: '取消',
      onOk: async () => {
        const key = 'updateTemplate'
        message.loading({ content: '正在更新模板...', key })
        await this.handleSavePageAction()
        const { tempId } = this.props.match.params as { tempId: string }
        const { pageData } = this.props
        await updateTemplateData({
          TempId: Number(tempId),
          Content: JSON.stringify(pageData),
          EditType: 1
        })
        message.success({ content: '更新模板成功！', key })
      }
    })
  }

  // 处理保存页面动作
  async handleSavePageAction() {
    const {
      changeEditorSliderShow,
      changeAddTemplateSliderShow,
      changeActiveTempId,
      savePageHtml
    } = this.props

    await changeEditorSliderShow!(false) // 关闭编辑侧滑栏
    await changeAddTemplateSliderShow!(false) // 关闭新增模块侧滑栏
    await changeActiveTempId!('') // 去除遮罩编辑样式
    await savePageHtml!() // 保存网页html代码
  }

  // 打开新增模块侧滑栏
  openAddTemplateSlider() {
    const { changeAddTemplateSliderShow } = this.props
    changeAddTemplateSliderShow!(true)
  }

  // 跳转至预览页面
  async jumpToPreview() {
    const { savePageHtml } = this.props
    await savePageHtml!() // 保存网页html代码
    const openWindow = window.open('about:blank') as Window
    const { origin, pathname } = window.location
    openWindow.location = `${origin}${pathname}#/preview` as any
  }

  // 获取历史更改
  async getHistoryEditorPageData() {
    const historyPageData = window.localStorage.getItem('pageEditorData')
    if (!historyPageData) return message.warning('没有历史更改记录')
    const {
      changePageData,
      changeEditorSliderShow,
      changeAddTemplateSliderShow,
      changeActiveTempId } = this.props
    await changePageData!(JSON.parse(historyPageData) as IPageModel)
    await changeEditorSliderShow!(false) // 关闭编辑侧滑栏
    await changeAddTemplateSliderShow!(false) // 关闭新增模块侧滑栏
    changeActiveTempId!('') // 去除遮罩编辑样式
  }
}

const mapStateToProps = (state: IPageState, ownProps: IHeaderProps) => ({
  backgroundSetData: state.backgroundSetReducer,
  pageData: state.editorContainerReducer
})

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
  changeBackgroundSetData(backgroundSet: IBackgroundSetModel) {
    dispatch(changeBackgroundSetData(backgroundSet))
  },
  async changeEditorSliderShow(isShow: boolean) {
    await dispatch(changeEditorSliderShow(isShow))
  },
  async changeActiveTempId(activeTempId: string) {
    await dispatch(changeActiveTempId(activeTempId))
  },
  async savePageHtml() {
    await dispatch(savePageHtml())
  },
  async changeAddTemplateSliderShow(isShow: boolean) {
    await dispatch(changeAddTemplateSliderShow(isShow))
  },
  async changePageData(pageData: IPageModel) {
    await dispatch(changePageData(pageData))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Header)