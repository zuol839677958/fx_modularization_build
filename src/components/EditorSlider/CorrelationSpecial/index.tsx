import React, { PureComponent, Fragment, Dispatch } from 'react'
import { IPageState, ITemplateModel, ICorrelationSpecialModel } from '../../../store/data'
import { CloseOutlined, DeleteOutlined } from '@ant-design/icons'
import { updateCurrentTempData } from '../../../utils/utils'
import { message, Row, Slider } from 'antd';
import { connect } from 'react-redux'
import { Action } from 'redux'
import { getSpeicalData } from '../../../axios/api';
import { changeTempData } from '../../EditorContainer/store/actions'
import { changeMobileTempData } from '../../EditorContainerMobile/store/actions'

import TitleBack from '../commonEditorComponent/titleBack'
import FontColorSet from '../../FontColorSet'

import "./index.less"

interface IEditorCorrelationSpecialProps {
  isMobile?: boolean
  data: ITemplateModel<ICorrelationSpecialModel[]>
  allTempData?: ITemplateModel<any>[]
  changeTempData?: (tempData: ITemplateModel<any>[]) => void
}

interface IEditorCorrelationSpecialState {
  typeIndex: number
  topTitle: string
  addShow: boolean
  inputValue: string
  currentFontColor: string
  fontColorSelectModalVisible: boolean
}

class EditorCorrelationSpecial extends PureComponent<IEditorCorrelationSpecialProps, IEditorCorrelationSpecialState> {
  state: IEditorCorrelationSpecialState = {
    typeIndex: 0,
    topTitle: "相关专题模板编辑",
    addShow: false,
    inputValue: "",
    currentFontColor: '',
    fontColorSelectModalVisible: false
  }

  render() {
    const { data } = this.props
    const { typeIndex, topTitle, currentFontColor, fontColorSelectModalVisible } = this.state

    return (
      <Fragment>
        <TitleBack
          titleArrow={typeIndex === 1}
          title={topTitle!}
        />
        <div className="special_editor_box">
          <Row style={{ marginBottom: 20, flexDirection: 'column' }}>
            <p>模板间距(像素)</p>
            <Slider
              style={{ width: '100%' }}
              min={0}
              max={200}
              value={data.spacing}
              onChange={this.changeTempSpacing}
            />
          </Row>
          <Row style={{ marginBottom: 20, flexDirection: 'column' }}>
            <p>标签字体颜色</p>
            <div className="fontColorSelect"
              style={{ background: data.fontColor, marginLeft: 0 }}
              onClick={this.initFontColorSelectModal}
            ></div>
          </Row>
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
              <input type="text" placeholder="请输入专题编号" value={this.state.inputValue} onChange={(e) => this.inputChange(e)} />
              <div className="sure_cancel">
                <span className="sure_btn" onClick={() => { this.searchSpecialData() }}>确定</span><span className="cancel_Btn" onClick={() => { this.closeSpeacialTmp() }}>取消</span>
              </div>
            </div>
          </div>
          <div className="action_bar" style={{ display: data?.tempData.length > 0 ? "block" : "none" }}>
            <div className="action_head">
              <span>专栏编号</span><i>操作</i>
            </div>
            <ul>
              {this.renderSpecailData(data?.tempData)}
            </ul>
          </div>
        </div>
        <FontColorSet
          modalVisible={fontColorSelectModalVisible}
          fontColor={currentFontColor}
          handleModalVisible={this.handleFontColorSelectModalVisible}
          handleChangeFontColor={this.changeFontColor}
        />
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
              <DeleteOutlined
                style={{ fontSize: '14px', marginRight: "10px" }}
                onClick={() => { this.deleteSpecialTemp(item.specailId) }}
              />
            </li>
          ))
        }
      </Fragment>
    )
  }

  // 打开颜色选择弹窗
  initFontColorSelectModal = () => {
    const { data } = this.props
    this.setState({ currentFontColor: data.fontColor || '' })
    this.handleFontColorSelectModalVisible(true)
  }

  // 处理颜色选择弹框显示和隐藏
  handleFontColorSelectModalVisible = (fontColorSelectModalVisible: boolean) => {
    this.setState({ fontColorSelectModalVisible })
  }

  // 更改模板间距
  changeTempSpacing = (spacing: number) => {
    const { data, allTempData, changeTempData } = this.props
    data.spacing = spacing
    updateCurrentTempData(data, allTempData!)
    changeTempData!(allTempData!)
  }

  // 更改文字颜色
  changeFontColor = (color: string) => {
    const { data, changeTempData, allTempData } = this.props
    data.fontColor = color
    updateCurrentTempData(data, allTempData!)
    changeTempData!(allTempData!)
    this.handleFontColorSelectModalVisible(false)
  }

  //删除专题
  deleteSpecialTemp(specailId: number) {
    const { data, changeTempData, allTempData } = this.props
    const tempData = data.tempData
    const newTemdata = tempData.filter(item => item.specailId !== specailId)
    data.tempData = newTemdata
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
    if (data.tempData.some(item => item.specailId === Number(inputVal)))
      return message.warning("已存在此专题，请勿重复添加")
    const res = await getSpeicalData(inputVal)
    this.setState({ addShow: false, inputValue: "" })
    if (!res) { return message.warning("请重新输入专题编号") }
    //判断是否为已发布专题，未发布提示 
    if (res.Status !== 1) {
      return message.warning("请选择已发布专题,请重新输入专题编号")
    }
    data?.tempData.push({
      specailId: res.SpecialId,
      title: res.Title,
      imageUrl: res.TitleImg
    })
    updateCurrentTempData(data, allTempData!)
    changeTempData!(allTempData!)
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

const mapStateToProps = (state: IPageState, ownProps: IEditorCorrelationSpecialProps) => ({
  allTempData: ownProps.isMobile ? state.editorContainerMobileReducer.allTempData : state.editorContainerReducer.allTempData
})

const mapDispatchToProps = (dispatch: Dispatch<Action>, ownProps: IEditorCorrelationSpecialProps) => ({
  changeTempData(allTempData: ITemplateModel<any>[]) {
    if (ownProps.isMobile) {
      dispatch(changeMobileTempData(allTempData))
    } else {
      dispatch(changeTempData(allTempData))
    }
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(EditorCorrelationSpecial)