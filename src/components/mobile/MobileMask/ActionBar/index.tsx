import React, { FC, useCallback, useMemo } from 'react'
import { Button, Modal } from 'antd'
import { CopyFilled, DeleteFilled, ArrowUpOutlined, ArrowDownOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import { IPageState, ITemplateModel, IBackgroundSetModel } from '@/store/data'
import { useSelector, useDispatch } from 'react-redux'
import _ from 'lodash'
import { changeMobileActiveTempId, changeMobileTempData } from '@/store/actions/editor.mobile.actions'
import { deepClone, insertItemToArray, zIndexUp, zIndexDown } from '@/utils'
import { changeEditorSliderShow } from '@/store/actions/editor.slider.actions'
import { changeBackgroundSetData } from '@/store/actions/backgroundSet.actions'
import { BackgroundSetType } from '@/store/state/backgroundSet.state'

import './index.less'

interface IActionBarProps {
  mobileActiveTempId?: string
  mobileAllTempData?: ITemplateModel<any>[]
  changeEditorSliderShow?: (isShow: boolean) => void
  changeMobileActiveTempId?: (activeTempId: string) => void
  changeMobileTempData?: (allTempData: ITemplateModel<any>[]) => void
  changeBackgroundSetData?: (backgroundSet: IBackgroundSetModel) => void
}

const ActionBar: FC<IActionBarProps> = props => {
  const { activeTempId, allTempData } = useSelector((state: IPageState) => state.editorContainerMobileReducer)
  const dispatch = useDispatch()

  const tempIndex = _.findIndex(allTempData, item => item.id === activeTempId)
  const tempData = _.find(allTempData, item => item.id === activeTempId)

  // 复制模块
  const copyTemplate = useCallback(() => {
    Modal.confirm({
      title: '复制提示',
      icon: <ExclamationCircleOutlined />,
      centered: true,
      content: '确定复制此模块吗？',
      getContainer: false,
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        const copyTemp = deepClone(_.filter(allTempData, item => item.id === activeTempId)[0])
        copyTemp.id = `${copyTemp.id.split('_')[0]}_${Date.now()}`
        insertItemToArray(allTempData!, tempIndex, copyTemp)
        dispatch(changeMobileTempData!(allTempData!))
      }
    })
  }, [activeTempId, allTempData, dispatch, tempIndex])

  // 删除模块
  const deleteTemplate = useCallback(() => {
    Modal.confirm({
      title: '删除提示',
      icon: <ExclamationCircleOutlined />,
      centered: true,
      content: '确定删除此模块吗？',
      getContainer: false,
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        dispatch(changeMobileTempData!(_.filter(allTempData, item => item.id !== activeTempId)))
        dispatch(changeMobileActiveTempId!(''))
        dispatch(changeEditorSliderShow!(false))
      }
    })
  }, [activeTempId, allTempData, dispatch])

  // 设置模块背景
  const setTempBackground = useCallback(() => {
    const backgroundSet: IBackgroundSetModel = {
      tempId: tempData?.id,
      isShow: true,
      bgType: tempData?.background?.bgType || BackgroundSetType.NoneColor,
      bgColor: tempData?.background?.bgColor,
      bgImageUrl: tempData?.background?.bgImageUrl
    }
    dispatch(changeBackgroundSetData!(backgroundSet))
  }, [dispatch, tempData])

  // 向上移动模块
  const moveUpTemplate = useCallback(() => {
    const activeTempId = zIndexUp(allTempData!, tempIndex, true)
    if (activeTempId) dispatch(changeMobileActiveTempId!(activeTempId))
    dispatch(changeMobileTempData!(allTempData!))
  }, [allTempData, dispatch, tempIndex])

  // 向下移动模块
  const moveDownTemplate = useCallback(() => {
    const activeTempId = zIndexDown(allTempData!, tempIndex, allTempData!.length, true)
    if (activeTempId) dispatch(changeMobileActiveTempId!(activeTempId))
    dispatch(changeMobileTempData!(allTempData!))
  }, [allTempData, dispatch, tempIndex])

  return useMemo(() => (
    <div className="mobile-action">
      <Button type="primary" shape="round" icon={<CopyFilled />}
        style={{ marginBottom: 10 }}
        onClick={copyTemplate}
      >复制</Button>
      <Button type="primary" shape="round" danger icon={<DeleteFilled />}
        style={{ marginBottom: 30 }}
        onClick={deleteTemplate}
      >删除</Button>
      <Button type="default" shape="round"
        style={{ marginBottom: 10 }}
        onClick={setTempBackground}
      >背景</Button>
      <div className="sort-box">
        <Button type="primary" shape="circle" icon={<ArrowUpOutlined />}
          disabled={tempIndex === 0}
          style={{ marginRight: 20 }}
          onClick={moveUpTemplate}
        ></Button>
        <Button type="primary" shape="circle" icon={<ArrowDownOutlined />}
          disabled={tempIndex === allTempData!.length - 1}
          onClick={moveDownTemplate}
        ></Button>
      </div>
    </div>
  ), [allTempData, copyTemplate, deleteTemplate, moveDownTemplate, moveUpTemplate, setTempBackground, tempIndex])
}

export default ActionBar