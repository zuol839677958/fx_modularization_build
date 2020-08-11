import React, { PureComponent } from 'react'
import { Button, message, Modal, Menu, Dropdown } from 'antd'
import { IPageState, IBackgroundSetModel, IPageModel, ITemplateModel, IPictureTextModel } from '../../store/data'
import { Dispatch, Action } from 'redux'
import { connect } from 'react-redux'
import { changeBackgroundSetData } from '../BackgroundSet/store/actions'
import { savePageHtml, changeActiveTempId, changePageData } from '../EditorContainer/store/actions'
import { changeEditorSliderShow } from '../EditorSlider/store/actions'
import { changeAddTemplateSliderShow } from '../AddTemplate/store/actions'
import { RouteComponentProps } from 'react-router-dom'
import { updateTemplateData, updateSpecialContent, getSpeicalData } from '../../axios/api'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import { changeMobileActiveTempId, changeMobilePageData, saveMobilePageHtml } from '../EditorContainerMobile/store/actions'
import { TemplateType } from '../EditorContainer/store/state'

import './index.less'

interface IHeaderProps extends RouteComponentProps {
  isMobile?: boolean
  pageData?: IPageModel
  backgroundSetData?: IBackgroundSetModel
  changeBackgroundSetData?: (backgroundSet: IBackgroundSetModel) => void
  changeActiveTempId?: (activeTempId: string) => void
  changeEditorSliderShow?: (isShow: boolean) => void
  changeAddTemplateSliderShow?: (isShow: boolean) => void
  savePageHtml?: () => void
  changePageData?: (pageData: IPageModel) => void
}

interface IHeaderState {
  arrowActive: boolean
}

class Header extends PureComponent<IHeaderProps, IHeaderState> {
  state: IHeaderState = {
    arrowActive: false
  }

  render() {
    const { isMobile } = this.props
    const { arrowActive } = this.state

    const isShowSaveTempBtn = window.location.href.includes('code=sukeji666')
    const isShowGetHistoryBtn = window.location.href.includes('history=1')

    const actionMenu = (
      <Menu>
        <Menu.Item onClick={this.switchEditorPage}>{isMobile ? '电脑端设计' : '移动端设计'}</Menu.Item>
      </Menu>
    )

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
          {
            isShowGetHistoryBtn
              ? <Button type="default" shape="round"
                style={{ marginLeft: 20 }}
                onClick={() => this.getHistoryEditorPageData()}
              >获取历史更改</Button>
              : null
          }
          <Dropdown overlay={actionMenu} placement="bottomCenter" trigger={['click']} arrow
            onVisibleChange={this.handleMenuVisibleChange}
          >
            <div className="menu-box">
              <img className="menu" src="https://img.wbp5.com/upload/files/master/2020/08/04/152856206.png" alt="" />
              <img className={`arrow ${arrowActive ? '' : 'down'}`} src="https://img.wbp5.com/upload/files/master/2020/08/04/153412998.png" alt="" />
            </div>
          </Dropdown>
        </div>
        <div className="header-center">
          <span>通用专题模块化</span>
        </div>
        <div className="header-right">
          {
            isMobile ?
              <Button type="default" shape="round" onClick={this.synchronizePCContent}>将电脑内容同步到此</Button>
              : null
          }
          <Button type="primary" shape="round" style={{ marginLeft: 20 }}
            onClick={() => this.saveSpecialPageData()}
          >保存</Button>
          {
            isShowSaveTempBtn
              ? <Button type="primary" shape="round" style={{ marginLeft: 20 }}
                onClick={() => this.updateTemplateData()}
              >保存为模板</Button>
              : null
          }
          <Button type="default" shape="round" style={{ marginLeft: 20 }}
            onClick={() => this.jumpToPreview()}
          >预览</Button>
          <Button type="link" style={{ marginLeft: 20 }}><a href="https://docs.qq.com/doc/DRmtBV21udnJMT0h1" target="_blank" rel="noopener noreferrer">帮助说明</a></Button>
        </div>
      </div>
    )
  }

  // 菜单栏显示隐藏事件处理
  handleMenuVisibleChange = (arrowActive: boolean) => {
    this.setState({ arrowActive })
  }

  // 切换编辑页面
  switchEditorPage = () => {
    const { isMobile } = this.props
    const openWindow = window.open('about:blank') as Window
    const { origin, pathname, hash } = window.location
    openWindow.location =
      `${origin}${pathname}${isMobile ? hash.replace('mobile-home', 'home') : hash.replace('home', 'mobile-home')}` as any
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
        const { isMobile, pageData } = this.props
        const { specialId } = this.props.match.params as { specialId: string }
        if (isMobile) {
          await updateSpecialContent({
            SpecialId: Number(specialId),
            ContentH5: JSON.stringify(pageData),
            EditType: 2
          })
        } else {
          await updateSpecialContent({
            SpecialId: Number(specialId),
            Content: JSON.stringify(pageData),
            EditType: 1
          })
        }
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
        const { isMobile, pageData } = this.props
        if (isMobile) {
          await updateTemplateData({
            TempId: Number(tempId),
            ContentH5: JSON.stringify(pageData),
            EditType: 2
          })
        } else {
          await updateTemplateData({
            TempId: Number(tempId),
            Content: JSON.stringify(pageData),
            EditType: 1
          })
        }
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
    const { specialId } = this.props.match.params as { specialId: string }
    const { isMobile, savePageHtml } = this.props
    await savePageHtml!() // 保存网页html代码
    const openWindow = window.open('about:blank') as Window
    const { origin, pathname } = window.location
    openWindow.location = `${origin}${pathname}#/preview/${specialId}/${isMobile ? 1 : 0}` as any
  }

  // 获取历史更改
  async getHistoryEditorPageData() {
    const { isMobile } = this.props
    const historyPageData = window.localStorage.getItem(`${isMobile ? 'pageMobileEditorData' : 'pageEditorData'}`)
    if (!historyPageData) return message.warning('没有历史更改记录')
    const {
      changePageData,
      changeEditorSliderShow,
      changeAddTemplateSliderShow,
      changeActiveTempId
    } = this.props
    await changePageData!(JSON.parse(historyPageData) as IPageModel)
    await changeEditorSliderShow!(false) // 关闭编辑侧滑栏
    await changeAddTemplateSliderShow!(false) // 关闭新增模块侧滑栏
    changeActiveTempId!('') // 去除遮罩编辑样式
  }

  // 同步PC端内容
  synchronizePCContent = () => {
    Modal.confirm({
      title: '同步提示',
      icon: <ExclamationCircleOutlined />,
      centered: true,
      content: '确定将电脑内容同步到此吗？',
      getContainer: false,
      okText: '确认',
      cancelText: '取消',
      onOk: async () => {
        try {
          const {
            changePageData,
            changeEditorSliderShow,
            changeAddTemplateSliderShow,
            changeActiveTempId
          } = this.props
          const { specialId } = this.props.match.params as { specialId: string }
          const res = await getSpeicalData(specialId)
          const pageData = JSON.parse(res.Content!) as IPageModel
          pageData.allTempData = pageData.allTempData.filter((item: ITemplateModel<any>) =>
            (![TemplateType.Share, TemplateType.MorePicture].includes(item.type)))
          pageData.allTempData.forEach((item: ITemplateModel<any>) => {
            if (item.type === TemplateType.LeftPictureRightText || item.type === TemplateType.LeftTextRightPicture) {
              (item.tempData as IPictureTextModel).picWidthPercent = 100;
              (item.tempData as IPictureTextModel).titleTextList.forEach(item => {
                item.titleFontSize = 14
              })
            }
          })
          await changePageData!(pageData)
          await changeEditorSliderShow!(false) // 关闭编辑侧滑栏
          await changeAddTemplateSliderShow!(false) // 关闭新增模块侧滑栏
          changeActiveTempId!('') // 去除遮罩编辑样式
        } catch (e) {
          console.warn('模板渲染错误：', e)
          message.error('同步电脑端专题网页解析错误！')
        }
      }
    })
  }
}

const mapStateToProps = (state: IPageState, ownProps: IHeaderProps) => ({
  backgroundSetData: state.backgroundSetReducer,
  pageData: ownProps.isMobile ? state.editorContainerMobileReducer : state.editorContainerReducer
})

const mapDispatchToProps = (dispatch: Dispatch<Action>, ownProps: IHeaderProps) => ({
  changeBackgroundSetData(backgroundSet: IBackgroundSetModel) {
    dispatch(changeBackgroundSetData(backgroundSet))
  },
  async changeEditorSliderShow(isShow: boolean) {
    await dispatch(changeEditorSliderShow(isShow))
  },
  async changeActiveTempId(activeTempId: string) {
    if (ownProps.isMobile) {
      await dispatch(changeMobileActiveTempId(activeTempId))
    } else {
      await dispatch(changeActiveTempId(activeTempId))
    }
  },
  async savePageHtml() {
    if (ownProps.isMobile) {
      await dispatch(saveMobilePageHtml())
    } else {
      await dispatch(savePageHtml())
    }
  },
  async changeAddTemplateSliderShow(isShow: boolean) {
    await dispatch(changeAddTemplateSliderShow(isShow))
  },
  async changePageData(pageData: IPageModel) {
    if (ownProps.isMobile) {
      await dispatch(changeMobilePageData(pageData))
    } else {
      await dispatch(changePageData(pageData))
    }
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Header)