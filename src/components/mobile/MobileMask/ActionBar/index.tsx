import React, { FC } from 'react'
import { Button, Modal } from 'antd'
import { CopyFilled, DeleteFilled, ArrowUpOutlined, ArrowDownOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import { IPageState, ITemplateModel, IBackgroundSetModel } from '../../../../store/data'
import { Dispatch, Action } from 'redux'
import { connect } from 'react-redux'
import _ from 'lodash'
import { changeMobileActiveTempId, changeMobileTempData } from '../../EditorContainerMobile/store/actions'
import { deepClone, insertItemToArray, zIndexUp, zIndexDown } from '../../../../utils/utils'
import { changeEditorSliderShow } from '../../../commonComponents/EditorSlider/store/actions'
import { changeBackgroundSetData } from '../../../commonPlugin/BackgroundSet/store/actions'
import { BackgroundSetType } from '../../../commonPlugin/BackgroundSet/store/state'

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
  const {
    mobileActiveTempId,
    mobileAllTempData,
    changeEditorSliderShow,
    changeMobileActiveTempId,
    changeMobileTempData,
    changeBackgroundSetData
  } = props
  const tempIndex = _.findIndex(mobileAllTempData, item => item.id === mobileActiveTempId)
  const tempData = _.find(mobileAllTempData, item => item.id === mobileActiveTempId)

  // 复制模块
  const copyTemplate = () => {
    Modal.confirm({
      title: '复制提示',
      icon: <ExclamationCircleOutlined />,
      centered: true,
      content: '确定复制此模块吗？',
      getContainer: false,
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        const copyTemp = deepClone(_.filter(mobileAllTempData, item => item.id === mobileActiveTempId)[0])
        copyTemp.id = `${copyTemp.id.split('_')[0]}_${Date.now()}`
        insertItemToArray(mobileAllTempData!, tempIndex, copyTemp)
        changeMobileTempData!(mobileAllTempData!)
      }
    })
  }

  // 删除模块
  const deleteTemplate = () => {
    Modal.confirm({
      title: '删除提示',
      icon: <ExclamationCircleOutlined />,
      centered: true,
      content: '确定删除此模块吗？',
      getContainer: false,
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        changeMobileTempData!(_.filter(mobileAllTempData, item => item.id !== mobileActiveTempId))
        changeMobileActiveTempId!('')
        changeEditorSliderShow!(false)
      }
    })
  }

  // 设置模块背景
  const setTempBackground = () => {
    const backgroundSet: IBackgroundSetModel = {
      tempId: tempData?.id,
      isShow: true,
      bgType: tempData?.background?.bgType || BackgroundSetType.NoneColor,
      bgColor: tempData?.background?.bgColor,
      bgImageUrl: tempData?.background?.bgImageUrl
    }
    changeBackgroundSetData!(backgroundSet)
  }

  // 向上移动模块
  const moveUpTemplate = () => {
    const activeTempId = zIndexUp(mobileAllTempData!, tempIndex, true)
    if (activeTempId) changeMobileActiveTempId!(activeTempId)
    changeMobileTempData!(mobileAllTempData!)
  }

  // 向下移动模块
  const moveDownTemplate = () => {
    const activeTempId = zIndexDown(mobileAllTempData!, tempIndex, mobileAllTempData!.length, true)
    if (activeTempId) changeMobileActiveTempId!(activeTempId)
    changeMobileTempData!(mobileAllTempData!)
  }

  return (
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
          disabled={tempIndex === mobileAllTempData!.length - 1}
          onClick={moveDownTemplate}
        ></Button>
      </div>
    </div>
  )
}

const mapStateToProps = (state: IPageState, ownProps: IActionBarProps) => ({
  mobileActiveTempId: state.editorContainerMobileReducer.activeTempId,
  mobileAllTempData: state.editorContainerMobileReducer.allTempData
})

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
  changeEditorSliderShow(isShow: boolean) {
    dispatch(changeEditorSliderShow(isShow))
  },
  changeMobileActiveTempId(activeTempId: string) {
    dispatch(changeMobileActiveTempId(activeTempId))
  },
  changeMobileTempData(allTempData: ITemplateModel<any>[]) {
    dispatch(changeMobileTempData(allTempData))
  },
  changeBackgroundSetData(backgroundSet: IBackgroundSetModel) {
    dispatch(changeBackgroundSetData(backgroundSet))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(ActionBar)