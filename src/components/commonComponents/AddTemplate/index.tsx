import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { IPageState, ITemplateModel } from '@/store/data'
import { Dispatch, Action } from 'redux'
import {
  AddTemplateActions,
  EditorActions,
  EditorMobileActions,
} from '@/store/actions'
import {
  addTemplateListData,
  IAddTemplateListDataModel,
} from '@/config/addTemplateListData'
import { defaultTemplateList } from '@/config/addTemplateDefaultData'
import { Modal } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import { deepClone } from '@/utils'
import { addMobileTemplateListData } from '@/config/addMobileTemplateListData'

import TitleBack from '../EditorSlider/commonEditorComponent/titleBack'

import './index.less'
const { changeAddTemplateSliderShow } = AddTemplateActions
const { changeTempData } = EditorActions
const { changeMobileTempData } = EditorMobileActions

interface IAddTemplateProps {
  isMobile?: boolean
  isShow?: boolean
  allTempData?: ITemplateModel<any>[]
  changeTempData?: (tempData: ITemplateModel<any>[]) => void
  changeAddTemplateSliderShow?: (isShow: boolean) => void
}

interface IAddTemplateState {
  activeTemplateListData: IAddTemplateListDataModel[]
}

class AddTemplate extends Component<IAddTemplateProps, IAddTemplateState> {
  state: IAddTemplateState = {
    activeTemplateListData: [],
  }

  render() {
    const { isMobile, isShow } = this.props

    return (
      <div
        className="addTemplate_slider"
        style={{ display: isShow ? 'block' : 'none' }}
      >
        <TitleBack
          title="新增模块"
          titleArrow={false}
          customCloseSlider={() => this.closeAddTemplateSlider()}
        />
        <div className="Menu-add-box">
          <div className="Menu-left-list">
            <ul>
              {this.renderMenuList(
                isMobile ? addMobileTemplateListData : addTemplateListData
              )}
            </ul>
          </div>
          <div className="tmp-right-show">
            {this.renderContentList(
              isMobile ? addMobileTemplateListData : addTemplateListData
            )}
          </div>
        </div>
      </div>
    )
  }

  renderContentList(
    addTemplateListData: IAddTemplateListDataModel[]
  ): JSX.Element {
    if (addTemplateListData.length === 0) return <Fragment></Fragment>

    const tempList = addTemplateListData.filter((item) => item.isActive)[0]
      .tempList

    return (
      <div className="right-box">
        {tempList.map((item, index) => (
          <img
            onClick={() => this.addTemplateModel(item.type)}
            key={index}
            src={item.tempImageUrl}
            alt=""
          />
        ))}
      </div>
    )
  }

  //点击添加模板
  addTemplateModel(type: number) {
    Modal.confirm({
      title: '添加提示',
      icon: <ExclamationCircleOutlined />,
      content: '确定在尾部添加此模块吗？',
      centered: true,
      getContainer: false,
      okText: '确认',
      cancelText: '取消',
      onOk: async () => {
        const { allTempData, changeTempData } = this.props
        const currentTempData = deepClone(
          defaultTemplateList.filter((item) => item.type === type)[0]
        ) as ITemplateModel<any>
        currentTempData.id = `${currentTempData.id}_${Date.now()}`
        allTempData!.push(currentTempData)
        await changeTempData!(allTempData!)
        window.scrollTo(
          0,
          document.getElementsByTagName('body')[0].scrollHeight
        )
      },
    })
  }

  /**
   *
   * @param {IAddTemplateListDataModel[]} MenuList
   * @memberof AddTemplate
   * @MenuList 菜单列表数据
   */
  renderMenuList(menuList: IAddTemplateListDataModel[]): JSX.Element {
    if (menuList.length === 0) return <Fragment></Fragment>
    return (
      <Fragment>
        {menuList.map((item, index) => (
          <li
            key={index}
            className={item.isActive ? 'active' : ''}
            onClick={() => this.changeType(index)}
          >
            {item.tempName}
          </li>
        ))}
      </Fragment>
    )
  }

  /**
   * @param {number} activeIndex
   * @memberof AddTemplate
   * @activeIndex 当前点击元素
   */
  changeType = (activeIndex: number) => {
    const { isMobile } = this.props
    const activeTemplateListData = isMobile
      ? addMobileTemplateListData
      : addTemplateListData
    activeTemplateListData.forEach((item, index) => {
      item.isActive = false
      if (index === activeIndex) {
        item.isActive = true
      }
    })
    this.setState({ activeTemplateListData })
  }

  // 关闭新增模块侧滑栏
  closeAddTemplateSlider() {
    const { changeAddTemplateSliderShow } = this.props
    changeAddTemplateSliderShow!(false)
  }
}

const mapStateToProps = (state: IPageState, ownProps: IAddTemplateProps) => ({
  allTempData: ownProps.isMobile
    ? state.editorContainerMobileReducer.allTempData
    : state.editorContainerReducer.allTempData,
  isShow: state.addTemplateSliderReducer.isShow,
})

const mapDispatchToProps = (
  dispatch: Dispatch<Action>,
  ownProps: IAddTemplateProps
) => ({
  changeAddTemplateSliderShow(isShow: boolean) {
    dispatch(changeAddTemplateSliderShow(isShow))
  },
  async changeTempData(allTempData: ITemplateModel<any>[]) {
    if (ownProps.isMobile) {
      await dispatch(changeMobileTempData(allTempData))
    } else {
      await dispatch(changeTempData(allTempData))
    }
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(AddTemplate)
