import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { IPageState, ITemplateModel } from '../../store/data'
import { Dispatch, Action } from 'redux'
import { changeAddTemplateSliderShow } from './store/actions'
import { changeTempData } from '../EditorContainer/store/actions'
import { addTemplateListData, IAddTemplateListDataModel } from '../../config/addTemplateListData'
import { defaultTemplateList } from "../../config/addTemplateDefaultData"
import TitleBack from '../EditorSlider/commonEditorComponent/titleBack'

import './index.less'
import { Modal } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'


interface IAddTemplateProps {
  isShow?: boolean
  allTempData?: ITemplateModel[]
  defaultTemplateList?: ITemplateModel[]
  changeTempData?: (tempData: ITemplateModel[]) => void
  changeAddTemplateSliderShow?: (isShow: boolean) => void
}

interface IAddTemplateState {
  addTemplateListData: IAddTemplateListDataModel[]
  defaultTemplateList:ITemplateModel[]
}

class AddTemplate extends Component<IAddTemplateProps, IAddTemplateState> {
  state: IAddTemplateState = {
    addTemplateListData,
    defaultTemplateList
  }

  render() {
    const { isShow } = this.props
    const { addTemplateListData } = this.state

    return (
      <div className="addTemplate_slider" style={{ display: isShow ? 'block' : 'none' }}>
        <TitleBack
          title='新增模块'
          titleArrow={false}
          customCloseSlider={() => this.closeAddTemplateSlider()}
        />
        <div className="Menu-add-box">
          <div className="Menu-left-list">
            <ul>
              {this.renderMenuList(addTemplateListData)}
              {/* <li>banner</li>
              <li>分享</li>
              <li>文本</li>
              <li>图文</li>
              <li>列表</li>
              <li>评论</li> */}
            </ul>
          </div>
          <div className="tmp-right-show">
            {this.renderContentList(addTemplateListData)}
          </div>
        </div>
      </div>
    )
  }
  renderContentList(addTemplateListData: IAddTemplateListDataModel[]): JSX.Element {
    if (addTemplateListData.length === 0) return <Fragment></Fragment>

    const tempList = addTemplateListData.filter(item => item.isActive)[0].tempList

    return (
      <div className="right-box">
        {
          tempList.map((item, index) => (
            <img onClick={()=>this.addTemplateModel(item.type)} key={index} src={item.tempImageUrl} alt="" />
          ))
        }
      </div>
    )
  }
  //点击添加模板
  addTemplateModel(type: number){
   
    Modal.confirm({
      title: '添加提示',
      icon: <ExclamationCircleOutlined />,
      content: '确定添加此模块吗？',
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        const { allTempData,changeTempData } =this.props;
        const { defaultTemplateList } =this.state
        const currentTempData = defaultTemplateList!.filter(item => item.type=== type)[0] as ITemplateModel
        console.log(currentTempData);
        allTempData?.push(currentTempData);
        changeTempData!(allTempData!);
      }
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
        {
          menuList.map((item, index) => (
            <li key={index} className={item.isActive ? "active" : ""} onClick={() => this.changeType(index)}>{item.tempName}</li>
          ))
        }
      </Fragment>
    )
  }
  /**
   * @param {number} activeIndex
   * @memberof AddTemplate
   * @activeIndex 当前点击元素
   */
  changeType(activeIndex: number) {
    const { addTemplateListData } = this.state
    addTemplateListData.forEach((item, index) => {
      item.isActive = false
      if (index === activeIndex) {
        item.isActive = true
      }
    })
    this.setState({ addTemplateListData })
  }


  // 关闭新增模块侧滑栏
  closeAddTemplateSlider() {
    const { changeAddTemplateSliderShow } = this.props
    changeAddTemplateSliderShow!(false)
  }
}

const mapStateToProps = (state: IPageState, _ownProps: IAddTemplateProps) => ({
  allTempData: state.editorContainerReducer.allTempData,
  isShow: state.addTemplateSliderReducer.isShow
})

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
  changeAddTemplateSliderShow(isShow: boolean) {
    dispatch(changeAddTemplateSliderShow(isShow))
  },
  changeTempData(allTempData: ITemplateModel[]) {
    dispatch(changeTempData(allTempData))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(AddTemplate)