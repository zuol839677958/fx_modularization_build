import React, { Component } from 'react'
import { Button, message } from 'antd'
import { IPageState, IBackgroundSetModel, IPageModel } from '../../store/data'
import { Dispatch, Action } from 'redux'
import { connect } from 'react-redux'
import { changeBackgroundSetData } from '../BackgroundSet/store/actions'
import { savePageHtml, changeActiveTempId, changePageData } from '../EditorContainer/store/actions'
import { changeEditorSlideShow } from '../EditorSlider/store/actions'
import { changeAddTemplateSliderShow } from '../AddTemplate/store/actions'
import { RouteComponentProps } from 'react-router-dom'
import { updateTemplateData } from '../../axios/api'

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
            onClick={() => this.savePageHtml()}
          >保存</Button>
          <Button type="link" style={{ marginLeft: 20 }}>帮助说明</Button>
        </div>
      </div>
    )
  }

  // 设置网页背景
  setPageBackground() {
    const { backgroundSetData, changeBackgroundSetData } = this.props
    backgroundSetData!.isShow = true
    changeBackgroundSetData!(backgroundSetData!)
  }

  // 生成网页html代码
  async savePageHtml() {
    const {
      pageData,
      changeEditorSliderShow,
      changeAddTemplateSliderShow,
      changeActiveTempId,
      savePageHtml
    } = this.props
    const key = 'savePageHtml'
    message.loading({ content: '正在保存页面...', key })
    await changeEditorSliderShow!(false) // 关闭编辑侧滑栏
    await changeAddTemplateSliderShow!(false) // 关闭新增模块侧滑栏
    await changeActiveTempId!('') // 去除遮罩编辑样式
    await savePageHtml!() // 保存网页html代码
    // await updateTemplateData({
    //   TempId: 0,
    //   Title: '牛人榜模板1',
    //   Summary: '大图+图文+评论',
    //   Img: 'https://img.wbp5.com/upload/files/master/2020/06/28/163236016.png',
    //   Content: JSON.stringify(pageData),
    //   ContentH5: '',
    //   Describe: '',
    //   EditType: 0
    // })
    message.success({ content: '保存页面成功！', key })
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
    const openWindow = window.open('about:blank') as Window;
    const { origin, pathname } = window.location
    openWindow.location = `${origin}${pathname}#/preview` as any
  }

  // 获取历史更改
  getHistoryEditorPageData() {
    const historyPageData = window.localStorage.getItem('pageEditorData')
    if (!historyPageData) return message.warning('没有历史更改记录')
    const { changePageData } = this.props
    changePageData!(JSON.parse(historyPageData) as IPageModel)
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
    await dispatch(changeEditorSlideShow(isShow))
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
  changePageData(pageData: IPageModel) {
    dispatch(changePageData(pageData))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Header)