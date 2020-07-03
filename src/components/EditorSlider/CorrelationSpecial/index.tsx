import React, { Component, Fragment, Dispatch } from 'react'
import { IPageState, ITemplateModel, ICorrelationSpecialModel } from '../../../store/data'
import { CloseOutlined, DeleteOutlined } from '@ant-design/icons';
import { updateCurrentTempData } from '../../../utils/utils';
import { message } from 'antd';
import { connect } from 'react-redux'
import { Action } from 'redux'
import { getSpeicalData } from '../../../axios/api';
import { changeTempData } from '../../EditorContainer/store/actions';
import TitleBack from '../commonEditorComponent/titleBack'

import "./index.less"

interface ICorrelationSpecialProps {
  data: ITemplateModel
  allTempData?: ITemplateModel[]
  changeTempData?: (tempData: ITemplateModel[]) => void
}

interface ICorrelationSpecialState {
  typeIndex: number
  topTitle: string
  addShow: boolean
  inputValue: string
  hasSpecial: boolean
}

class CorrelationSpecial extends Component<ICorrelationSpecialProps, ICorrelationSpecialState> {
  state: ICorrelationSpecialState = {
    typeIndex: 0,
    topTitle: "列表编辑",
    addShow: false,
    inputValue: "",
    hasSpecial: false
  }

  render() {
    const { typeIndex, topTitle } = this.state;
    return (
      <Fragment>
        <TitleBack
          titleArrow={typeIndex === 1}
          title={topTitle!}
        />
        <div className="special_editor_box">
          <div className="add_btn" onClick={() => { this.addSpecialTmp() }}>
            新增条目
            </div>
          <div className="add_item_box" style={{ display: this.state.addShow ? "block" : "none" }}>
            <div className="add_head">
              新增条目
                    <CloseOutlined onClick={() => { this.closeSpeacialTmp() }} style={{ fontSize: '10px' }} />
            </div>
            <div className="add_item_c">
              <div className="item_number">
                条目编号
                    </div>
              <input type="text" placeholder="请输入专题编号" onChange={(e) => this.inputChange(e)} />
              <div className="sure_cancel">
                <span className="sure_btn" onClick={() => { this.searchSpecialData() }}>确定</span><span className="cancel_Btn" onClick={() => { this.closeSpeacialTmp() }}>取消</span>
              </div>
            </div>
          </div>
        </div>
        <div className="action_bar" style={{ display: this.state.hasSpecial ? "block" : "none" }}>
          <div className="action_head">
            <span>专栏编号</span><i>操作</i>
          </div>
          <ul>
            {this.renderSpecailData(this.props.data?.tempData as ICorrelationSpecialModel[])}
          </ul>
        </div>
      </Fragment>
    )
  }
  
  //渲染
  renderSpecailData(dataList: ICorrelationSpecialModel[]): JSX.Element {
    return (
      <Fragment>
        {
          dataList.map((item) => (
            <li key={item.specailId}>
              <i>{item.specailId}</i>
              <DeleteOutlined style={{ fontSize: '14px', marginRight: "10px" }} onClick={() => { this.deleteSpecialTemp(item.specailId) }} />
            </li>
          ))
        }
      </Fragment>
    )
  }

  //删除专题
  deleteSpecialTemp(specailId: number) {
    const { data, changeTempData, allTempData } = this.props
    const tempData = data.tempData as ICorrelationSpecialModel[]
    const newTemdata = tempData.filter(item => item.specailId !== specailId)
    data.tempData = newTemdata
    if (data.tempData.length === 0) {
      this.setState({
        hasSpecial: false
      })
    }
    updateCurrentTempData(data, allTempData!)
    changeTempData!(allTempData!)
  }

  inputChange(e: any): void {
    this.setState({
      inputValue: e.target.value
    })
  }

  //搜索获取专题数据
  async searchSpecialData() {
    let inputVal = this.state.inputValue
    const { data, changeTempData, allTempData } = this.props
    if (inputVal.length < 0) return false
    const res = await getSpeicalData(inputVal)
    this.setState({ addShow: false })
    if (!res) { return message.warning("请重新输入专题编号") }
    //判断是否为已发布专题，未发布提示 
    if (res.Status !== 1) {
      return message.warning("请选择已发布专题,请重新输入专题编号")
    }
    (data?.tempData as ICorrelationSpecialModel[]).push({
      specailId: res.SpecialId,
      title: res.Title,
      imageUrl: res.TitleImg
    })
    updateCurrentTempData(data, allTempData!)
    changeTempData!(allTempData!)
    this.setState({
      hasSpecial: true
    })
  }

  //点击显示新增条目
  addSpecialTmp() {
    this.state.addShow ? this.setState({ addShow: this.state.addShow }) : this.setState({ addShow: !this.state.addShow })
  }

  //关闭新增条目框
  closeSpeacialTmp() {
    this.setState({ addShow: false })
  }
}

const mapStateToProps = (state: IPageState, ownProps: ICorrelationSpecialProps) => ({
  allTempData: state.editorContainerReducer.allTempData,
})

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
  changeTempData(allTempData: ITemplateModel[]) {
    dispatch(changeTempData(allTempData))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(CorrelationSpecial)