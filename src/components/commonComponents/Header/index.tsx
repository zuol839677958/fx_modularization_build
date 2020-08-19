import React, { useMemo, useCallback, useState } from 'react'
import { Button, message, Modal, Menu, Dropdown, Space } from 'antd'
import {
  IPageState,
  IBackgroundSetModel,
  IPageModel,
  ITemplateModel,
  IPictureTextModel,
} from '@/store/data'
import { Dispatch, Action } from 'redux'
import { connect } from 'react-redux'
import { changeBackgroundSetData } from '@/store/actions/backgroundSet.actions'
import {
  savePageHtml,
  changeActiveTempId,
  changePageData,
} from '@/store/actions/editor.actions'
import { changeEditorSliderShow } from '@/store/actions/editor.slider.actions'
import { changeAddTemplateSliderShow } from '@/store/actions/addTemplate.actions'
import { RouteComponentProps, useLocation, useParams } from 'react-router-dom'
import {
  updateTemplateData,
  updateSpecialContent,
  getSpeicalData,
} from '@/axios/api'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import {
  changeMobileActiveTempId,
  changeMobilePageData,
  saveMobilePageHtml,
} from '@/store/actions/editor.mobile.actions'
import { TemplateType } from '@/store/state/editor.state'
import { openWindow } from '@/utils'
import './index.less'
import { ModalFuncProps } from 'antd/lib/modal/Modal'

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
interface BtnProps {
  value: any
  props: any
  handleClick?: Function
  show?: boolean
}

function DropMenu(props: { isMobile?: boolean }) {
  const { isMobile } = props
  const hashArgs = useMemo(
    () => (isMobile ? ['mobile-home', 'home'] : ['home', 'mobile-home']),
    [isMobile]
  )
  const text = useMemo(() => (isMobile ? '电脑端设计' : '移动端设计'), [
    isMobile,
  ])
  // 切换编辑页面
  const switchEditorPage = () => {
    const { hash } = window.location
    openWindow(`${String.prototype.replace.apply(hash, hashArgs as any)}`)
  }

  return (
    <Menu>
      <Menu.Item key={1} onClick={switchEditorPage}>
        {text}
      </Menu.Item>
    </Menu>
  )
}

function HeaderFC(props: IHeaderProps) {
  const {
    isMobile,
    changeAddTemplateSliderShow,
    backgroundSetData,
    pageData,
    changeBackgroundSetData,
    changePageData,
    changeEditorSliderShow,
    changeActiveTempId,
    savePageHtml,
  } = props
  const [arrowActive, setArrowActive] = useState(false)
  const { search } = useLocation()
  const { specialId, tempId } = useParams()
  const isShowSaveTempBtn = useMemo(() => search.includes('code=sukeji666'), [
    search,
  ])
  const isShowGetHistoryBtn = useMemo(() => search.includes('history=1'), [
    search,
  ])
  // 打开新增模块侧滑栏
  const openAddTemplateSlider = useCallback(() => {
    changeAddTemplateSliderShow!(true)
  }, [changeAddTemplateSliderShow])

  // 设置网页背景
  const setPageBackground = useCallback(() => {
    Object.assign(backgroundSetData, pageData?.background)
    backgroundSetData!.tempId = ''
    backgroundSetData!.isShow = true
    changeBackgroundSetData!(backgroundSetData!)
  }, [backgroundSetData, changeBackgroundSetData, pageData])

  // 同步PC端内容
  const synchronizePCContent = async () => {
    const res = await ModalConfirm({
      title: '同步提示',
      content: '确定将电脑内容同步到此吗？',
    })
    if (!res) return
    try {
      const res = await getSpeicalData(specialId)
      const pageData = JSON.parse(res.Content!) as IPageModel
      pageData.allTempData = pageData.allTempData.filter(
        (item: ITemplateModel<any>) =>
          ![TemplateType.Share, TemplateType.MorePicture].includes(item.type)
      )
      pageData.allTempData.forEach((item: ITemplateModel<any>) => {
        if (
          item.type === TemplateType.LeftPictureRightText ||
          item.type === TemplateType.LeftTextRightPicture
        ) {
          ; (item.tempData as IPictureTextModel).picWidthPercent = 100
            ; (item.tempData as IPictureTextModel).titleTextList.forEach(
              (item) => {
                item.titleFontSize = 14
              }
            )
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

  // 更新模板
  async function updateTemplate() {
    const res = await ModalConfirm({
      title: '更新提示',
      content: '确定更新此模板吗？',
    })
    if (!res) return
    const key = 'updateTemplate'
    message.loading({ content: '正在更新模板...', key })
    await handleSavePageAction()
    const Content = JSON.stringify(pageData)
    await updateTemplateData({
      TempId: Number(tempId),
      ContentH5: Content,
      Content,
      EditType: +!!isMobile + 1, // 2 | 1
    })
    message.success({ content: '更新模板成功！', key })
  }

  // 处理保存页面动作
  const handleSavePageAction = async () => {
    await changeEditorSliderShow!(false) // 关闭编辑侧滑栏
    await changeAddTemplateSliderShow!(false) // 关闭新增模块侧滑栏
    await changeActiveTempId!('') // 去除遮罩编辑样式
    await savePageHtml!() // 保存网页html代码
  }

  // 保存至专题网页数据
  const saveSpecialPageData = async () => {
    const res = await ModalConfirm({
      title: '保存提示',
      content: '确定保存此专题网页吗？',
    })
    if (!res) return
    const key = 'savePageHtml'
    message.loading({ content: '正在保存页面...', key })
    await handleSavePageAction()
    const Content = JSON.stringify(pageData)
    await updateSpecialContent({
      SpecialId: Number(specialId),
      ContentH5: Content,
      Content,
      EditType: +!!isMobile + 1, // 2 | 1
    })
    message.success({ content: '保存页面成功！', key })
  }

  // 跳转至预览页面
  const jumpToPreview = async () => {
    await savePageHtml!() // 保存网页html代码
    openWindow(`#/preview/${specialId}/${+!!isMobile}`)
  }

  const leftBtns: BtnProps[] = useMemo(() => {
    return [
      {
        value: '新增模块',
        props: { type: 'default', shape: 'round' },
        handleClick: openAddTemplateSlider,
      },
      {
        value: '设置背景',
        props: { type: 'default', shape: 'round' },
        handleClick: setPageBackground,
      },
      {
        value: '获取历史更改',
        props: { type: 'default', shape: 'round' },
        handleClick: setPageBackground,
        show: isShowGetHistoryBtn,
      },
    ]
  }, [isShowGetHistoryBtn, openAddTemplateSlider, setPageBackground])
  const rightBtns: BtnProps[] = [
    {
      value: '将电脑内容同步到此',
      props: { type: 'default', shape: 'round' },
      handleClick: synchronizePCContent,
      show: !!isMobile,
    },
    {
      value: '保存',
      props: { type: 'primary', shape: 'round' },
      handleClick: saveSpecialPageData,
    },
    {
      value: '保存为模板',
      props: { type: 'primary', shape: 'round' },
      handleClick: updateTemplate,
      show: isShowSaveTempBtn,
    },
    {
      value: '预览',
      props: { type: 'default', shape: 'round' },
      handleClick: jumpToPreview,
    },
    {
      value: (
        <a
          href="https://docs.qq.com/doc/DRmtBV21udnJMT0h1"
          target="_blank"
          rel="noopener noreferrer"
        >
          帮助说明
        </a>
      ),
      props: { type: 'link' },
    },
  ]
  const dropMenu = <DropMenu isMobile={isMobile} />
  const btnsDOM = (arr: BtnProps[]) =>
    arr.map((btn: BtnProps) => {
      if (btn?.show === false) return null
      return (
        <Button key={btn.value} {...btn.props} onClick={btn.handleClick}>
          {btn.value}
        </Button>
      )
    })
  const leftBtnDOM = useMemo(() => {
    return btnsDOM(leftBtns)
  }, [leftBtns])
  const rightBtnDOM = useMemo(() => btnsDOM(rightBtns), [rightBtns])
  
  return (
    <div className="header-wrap">
      <Space size={20} className="header-left">
        {leftBtnDOM}
        <Dropdown
          overlay={dropMenu}
          placement="bottomCenter"
          trigger={['click']}
          arrow
          onVisibleChange={setArrowActive}
        >
          <div className="menu-box">
            <img
              className="menu"
              src="https://img.wbp5.com/upload/files/master/2020/08/04/152856206.png"
              alt=""
            />
            <img
              className={`arrow ${arrowActive ? '' : 'down'}`}
              src="https://img.wbp5.com/upload/files/master/2020/08/04/153412998.png"
              alt=""
            />
          </div>
        </Dropdown>
      </Space>
      <div className="header-center">
        <span>通用专题模块化</span>
      </div>
      <Space size={20} className="header-right">
        {rightBtnDOM}
      </Space>
    </div>
  )
}

function ModalConfirm(opts: ModalFuncProps) {
  return new Promise((res, rej) => {
    Modal.confirm(
      Object.assign(
        {
          title: '温馨提示',
          icon: <ExclamationCircleOutlined />,
          centered: true,
          content: '确定进行此操作嘛？',
          getContainer: false,
          okText: '确认',
          cancelText: '取消',
          onOk: () => res(true),
        },
        opts
      )
    )
  })
}

const mapStateToProps = (state: IPageState, ownProps: IHeaderProps) => {
  return {
    backgroundSetData: state.backgroundSetReducer,
    pageData: ownProps.isMobile
      ? state.editorContainerMobileReducer
      : state.editorContainerReducer,
  }
}

const mapDispatchToProps = (
  dispatch: Dispatch<Action>,
  ownProps: IHeaderProps
) => {
  return {
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
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderFC)
