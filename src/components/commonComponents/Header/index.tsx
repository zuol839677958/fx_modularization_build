import React, { useMemo, useCallback, useState } from 'react'
import { Button, message, Modal, Menu, Dropdown, Space } from 'antd'
import {
  IPageState,
  IBackgroundSetModel,
  IPageModel,
  ITemplateModel,
  IPictureTextModel,
} from '@/store/data'
import { useSelector, useStore, useDispatch } from 'react-redux'
import { changeBackgroundSetData as changeBackgroundSetDataAction } from '@/store/actions/backgroundSet.actions'
import {
  savePageHtml as savePageHtmlAction,
  changeActiveTempId as changeActiveTempIdAction,
  changePageData as changePageDataAction,
} from '@/store/actions/editor.actions'
import { changeEditorSliderShow as changeEditorSliderShowAction } from '@/store/actions/editor.slider.actions'
import { changeAddTemplateSliderShow as changeAddTemplateSliderShowAction } from '@/store/actions/addTemplate.actions'
import { useLocation, useParams } from 'react-router-dom'
import {
  updateTemplateData,
  updateSpecialContent,
  getSpeicalData,
  savePreviewCache,
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

interface IHeaderProps {
  isMobile?: boolean
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
  const { isMobile } = props
  // 数据Key值
  const pageDataKey = useMemo(
    () =>
      isMobile ? 'editorContainerMobileReducer' : 'editorContainerReducer',
    [isMobile]
  )

  // store
  const store = useStore()
  const dispatch = useDispatch()
  // redux-state
  const pageData = useSelector((state: IPageState) => state[pageDataKey])
  const backgroundSetData = useSelector(
    ({ backgroundSetReducer }: IPageState) => backgroundSetReducer
  )
  // redux-dispatch
  const savePageHtml = useCallback(() => {
    const action = isMobile ? saveMobilePageHtml() : savePageHtmlAction()
    dispatch(action)
  }, [dispatch, isMobile])
  const changeActiveTempId = useCallback(
    (activeTempId: string) => {
      const action = isMobile
        ? changeMobileActiveTempId
        : changeActiveTempIdAction
      dispatch(action(activeTempId))
    },
    [dispatch, isMobile]
  )
  const changeEditorSliderShow = useCallback(
    (isShow: boolean) => dispatch(changeEditorSliderShowAction(isShow)),
    [dispatch]
  )
  const changePageData = useCallback(
    (pageData: IPageModel) => {
      const action = isMobile ? changeMobilePageData : changePageDataAction
      dispatch(action(pageData))
    },
    [dispatch, isMobile]
  )
  const changeAddTemplateSliderShow = useCallback(
    (isShow: boolean) => dispatch(changeAddTemplateSliderShowAction(isShow)),
    [dispatch]
  )
  const changeBackgroundSetData = useCallback(
    (backgroundSet: IBackgroundSetModel) =>
      dispatch(changeBackgroundSetDataAction(backgroundSet)),
    [dispatch]
  )
  // state
  const [arrowActive, setArrowActive] = useState(false)
  const { search } = useLocation()
  const { specialId, tempId } = useParams()
  const isShowSaveTempBtn = useMemo(() => search.includes('code=sukeji666'), [
    search,
  ])
  const isShowGetHistoryBtn = useMemo(() => search.includes('history=1'), [
    search,
  ])

  // 获取最新pageData
  const getNewPageData = useCallback(() => store.getState()[pageDataKey], [
    pageDataKey,
    store,
  ])

  // events
  // 处理保存页面动作
  const handleSavePageAction = useCallback(() => {
    changeEditorSliderShow!(false) // 关闭编辑侧滑栏
    changeAddTemplateSliderShow!(false) // 关闭新增模块侧滑栏
    changeActiveTempId!('') // 去除遮罩编辑样式
    savePageHtml!() // 保存网页html代码
  }, [
    changeActiveTempId,
    changeAddTemplateSliderShow,
    changeEditorSliderShow,
    savePageHtml,
  ])

  // 打开新增模块侧滑栏
  const openAddTemplateSlider = useCallback(
    () => changeAddTemplateSliderShow!(true),
    [changeAddTemplateSliderShow]
  )

  // 设置网页背景
  const setPageBackground = useCallback(() => {
    Object.assign(backgroundSetData, pageData.background)
    backgroundSetData!.tempId = ''
    backgroundSetData!.isShow = true
    changeBackgroundSetData!(backgroundSetData!)
  }, [backgroundSetData, changeBackgroundSetData, pageData.background])

  // 获取历史更改
  const getHistoryEditorPageData = useCallback(() => {
    const historyPageData = window.localStorage.getItem(
      `${isMobile ? 'pageMobileEditorData' : 'pageEditorData'}`
    )
    if (!historyPageData) return message.warning('没有历史更改记录')
    changePageData!(JSON.parse(historyPageData) as IPageModel)
    changeEditorSliderShow!(false) // 关闭编辑侧滑栏
    changeAddTemplateSliderShow!(false) // 关闭新增模块侧滑栏
    changeActiveTempId!('') // 去除遮罩编辑样式
  }, [changeActiveTempId, changeAddTemplateSliderShow, changeEditorSliderShow, changePageData, isMobile])

  // modal封装
  const modalConfirm = useCallback((opts: ModalFuncProps) => {
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
  }, [])

  // 同步PC端内容
  const synchronizePCContent = useCallback(async () => {
    const res = await modalConfirm({
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
      changePageData!(pageData)
      changeEditorSliderShow!(false) // 关闭编辑侧滑栏
      changeAddTemplateSliderShow!(false) // 关闭新增模块侧滑栏
      changeActiveTempId!('') // 去除遮罩编辑样式
    } catch (e) {
      console.warn('模板渲染错误：', e)
      message.error('同步电脑端专题网页解析错误！')
    }
  }, [
    changeActiveTempId,
    changeAddTemplateSliderShow,
    changeEditorSliderShow,
    changePageData,
    modalConfirm,
    specialId,
  ])

  // 更新模板
  const updateTemplate = useCallback(async () => {
    const res = await modalConfirm({
      title: '更新提示',
      content: '确定更新此模板吗？',
    })
    if (!res) return
    const key = 'updateTemplate'
    message.loading({ content: '正在更新模板...', key })
    handleSavePageAction()
    const Content = JSON.stringify(getNewPageData())
    await updateTemplateData({
      TempId: Number(tempId),
      ContentH5: Content,
      Content,
      EditType: +!!isMobile + 1, // 2 | 1
    })
    message.success({ content: '更新模板成功！', key })
  }, [getNewPageData, handleSavePageAction, isMobile, modalConfirm, tempId])

  // 保存至专题网页数据
  const saveSpecialPageData = useCallback(async () => {
    const res = await modalConfirm({
      title: '保存提示',
      content: '确定保存此专题网页吗？',
    })
    if (!res) return
    const key = 'savePageHtml'
    message.loading({ content: '正在保存页面...', key })
    handleSavePageAction()
    const Content = JSON.stringify(getNewPageData())
    await updateSpecialContent({
      SpecialId: Number(specialId),
      ContentH5: Content,
      Content,
      EditType: +!!isMobile + 1, // 2 | 1
    })
    message.success({ content: '保存页面成功！', key })
  }, [getNewPageData, handleSavePageAction, isMobile, modalConfirm, specialId])

  // 跳转至预览页面
  const jumpToPreview = useCallback(async () => {
    handleSavePageAction()
    const Content = JSON.stringify(getNewPageData())
    await savePreviewCache({
      SpecialId: Number(specialId),
      ContentH5: Content,
      Content,
      EditType: +!!isMobile + 1, // 2 | 1
    })
    openWindow(`#/preview/${specialId}/${+!!isMobile}`)
  }, [getNewPageData, handleSavePageAction, isMobile, specialId])
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
        handleClick: getHistoryEditorPageData,
        show: isShowGetHistoryBtn,
      },
    ]
  }, [getHistoryEditorPageData, isShowGetHistoryBtn, openAddTemplateSlider, setPageBackground])
  const rightBtns: BtnProps[] = useMemo(() => {
    return [
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
  }, [
    isMobile,
    isShowSaveTempBtn,
    jumpToPreview,
    saveSpecialPageData,
    synchronizePCContent,
    updateTemplate,
  ])
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
          overlayStyle={{ position: 'fixed', zIndex: 999 }}
          overlay={dropMenu}
          placement="bottomCenter"
          trigger={['click']}
          arrow
          onVisibleChange={setArrowActive}
        >
          <div className="menu-box">
            <img
              className="menu"
              src="https://img.wx168e.com/upload/files/master/2020/08/04/152856206.png"
              alt=""
            />
            <img
              className={`arrow ${arrowActive ? '' : 'down'}`}
              src="https://img.wx168e.com/upload/files/master/2020/08/04/153412998.png"
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

export default HeaderFC
