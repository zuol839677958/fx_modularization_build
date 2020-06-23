import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Button, message } from 'antd'
import { IPageState, IBackgroundSetModel } from '../../store/data'
import { Dispatch, Action } from 'redux'
import { connect } from 'react-redux'
import { changeBackgroundSetData } from '../BackgroundSet/store/actions'
import { savePageHtml, changeActiveTempId } from '../EditorContainer/store/actions'
import { changeEditorSlideShow } from '../EditorSlider/store/actions'
import { changeAddTemplateSliderShow } from '../AddTemplate/store/actions'

import './index.less'

interface IHeaderProps {
  backgroundSetData?: IBackgroundSetModel
  changeBackgroundSetData?: (backgroundSet: IBackgroundSetModel) => void
  changeActiveTempId?: (activeTempId: string) => void
  changeEditorSliderShow?: (isShow: boolean) => void
  changeAddTemplateSliderShow?: (isShow: boolean) => void
  savePageHtml?: () => void
}

interface IHeaderState { }

class Header extends Component<IHeaderProps, IHeaderState> {
  render() {
    return (
      <div className="header-wrap">
        <div className="header-left">
          <Button type="primary" shape="round"
            onClick={() => this.openAddTemplateSlider()}
          >新增模块</Button>
          <Button type="primary" shape="round"
            style={{ marginLeft: 20 }}
            onClick={() => this.setPageBackground()}
          >设置背景</Button>
        </div>
        <div className="header-center">
          <span>通用专题模块化</span>
        </div>
        <div className="header-right">
          <Link to="/preview">
            <Button type="default" shape="round">预览</Button>
          </Link>
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
    const { changeEditorSliderShow, changeAddTemplateSliderShow, changeActiveTempId, savePageHtml } = this.props
    const key = 'savePageHtml'
    message.loading({ content: '正在保存页面...', key })
    await changeEditorSliderShow!(false) // 关闭编辑侧滑栏
    await changeAddTemplateSliderShow!(false) // 关闭新增模块侧滑栏
    await changeActiveTempId!('') // 去除遮罩编辑样式
    await savePageHtml!() // 保存网页html代码
    message.success({ content: '保存页面成功！', key })
  }

  // 打开新增模块侧滑栏
  openAddTemplateSlider() {
    const { changeAddTemplateSliderShow } = this.props
    changeAddTemplateSliderShow!(true)
  }
}

const mapStateToProps = (state: IPageState, ownProps: IHeaderProps) => ({
  backgroundSetData: state.backgroundSetReducer
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
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Header)