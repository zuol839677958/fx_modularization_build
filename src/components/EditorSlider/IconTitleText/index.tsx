import React, { Component, Fragment, Dispatch } from 'react'
import { Checkbox, message, Input, Row } from 'antd';
import { connect } from 'react-redux';
import { changeEditorSlideShow } from '../store/actions';
import { IIconTitleTextModel, ITemplateModel, IPageState } from '../../../store/data';
import { updateIconTitleTextItemShow, updateCurrentTempData, deleteIconTitleTextItem, swapArray, updateIconTitleTextItemTitle, updateIconTitleTextItemText } from '../../../utils/utils';
import TitleBack from "../commonEditorComponent/titleBack"
import { Action } from 'redux';
import { changeTempData } from '../../EditorContainer/store/actions';

import './index.less'

interface IEditorIconTitleTextProps {
  isShow?: boolean;
  data: ITemplateModel;
  allTempData?: ITemplateModel[];
  titleArrow?: boolean;
  changeTempData?: (tempData: ITemplateModel[]) => void
  changeEditorSlideShow?: (isShow: boolean) => void
  closeEditorSlide?: () => void;
}

interface IEditorIconTitleTextState {
  typeIndex: number
  sort: number
  topTitle: string
  title: string
  editItemData?: IIconTitleTextModel
}

let dragStartSort = 0
let dragEndIndex = 0
let dragLiHeight = 0

class EditorIconTitleText extends Component<IEditorIconTitleTextProps, IEditorIconTitleTextState> {
  state: IEditorIconTitleTextState = {
    sort: 1,
    typeIndex: 0,
    topTitle: "图标标题文字模板编辑",
    title: "条目管理"
  }

  render() {
    const { data } = this.props;
    const { typeIndex, title, topTitle, editItemData } = this.state

    return (
      <Fragment>
        <TitleBack
          titleArrow={typeIndex === 1}
          title={topTitle!}
          closeEditorSlide={() => this.closeEditorSlide()}
          changeTypeIndex={(index) => this.changeTypeIndex(index)}
        />
        <div className="item-Manage-content" style={{ display: typeIndex === 0 ? "block" : "none" }}>
          <div className="item-Manage">
            <p>{title}</p>
          </div>
          <div className="modification_switchingPosition">
            {this.renderTemplateItem(data.tempData as IIconTitleTextModel[])}
          </div>
        </div>
        <div className="second-Manage-content" style={{ display: typeIndex === 1 ? "block" : "none" }}>
          <Row style={{ marginBottom: 20 }}>
            <p>修改标题</p>
            <Input placeholder="请输入题" maxLength={10} value={editItemData?.title}
              onChange={(e) => this.changeItemTitle(e.target.value)}
            ></Input>
          </Row>
          <Row>
            <p>修改文字</p>
            <Input placeholder="请输入文字" maxLength={20} value={editItemData?.text}
              onChange={(e) => this.changeItemText(e.target.value)}>
            </Input>
          </Row>
        </div>
      </Fragment>
    )
  }

  changeItemTitle(title: string) {
    const { data, allTempData, changeTempData } = this.props
    const { editItemData } = this.state
    editItemData!.title = title
    updateIconTitleTextItemTitle(title, editItemData!.sort, data.tempData as IIconTitleTextModel[])
    updateCurrentTempData(data, allTempData!)
    changeTempData!(allTempData!)
    this.setState({ editItemData })
  }

  changeItemText(text: string) {
    const { data, allTempData, changeTempData } = this.props
    const { editItemData } = this.state
    editItemData!.text = text
    updateIconTitleTextItemText(text, editItemData!.sort, data.tempData as IIconTitleTextModel[])
    updateCurrentTempData(data, allTempData!)
    changeTempData!(allTempData!)
    this.setState({ editItemData })
  }

  changeTypeIndex(typeIndex: number) {
    this.setState({ typeIndex })
  }

  closeEditorSlide() {
    this.setState({
      typeIndex: 0
    })
    this.props.changeEditorSlideShow && this.props.changeEditorSlideShow(false)
  }

  renderTemplateItem(tempDataList: IIconTitleTextModel[]): JSX.Element {
    if (tempDataList.length === 0) return <Fragment></Fragment>

    return (
      <ul
        onDrop={() => this.handleDrop()}
        onDragOver={(e) => this.handleDragOver(e)}>
        {
          tempDataList.map(tmp => (
            <li key={tmp.sort} draggable={true}
              onDragStart={(e) => {
                dragStartSort = tmp.sort
                dragLiHeight = e.currentTarget.offsetHeight
              }}
            >
              <div>
                <i className="iconfont">&#xE011;</i>
                <span>{tmp.title}</span>
                <div className="right">
                  <i className="iconfont amend" onClick={() => this.inToDetails(tmp)}>&#xE00C;</i>
                  <i className="iconfont recycle" onClick={() => this.deleteIconTitle(tmp.sort)}>&#xE009;</i>
                </div>
              </div>
              <Checkbox checked={tmp.isShow} onChange={(e) => this.changeChecked(e.target.checked, tmp.sort)} />
            </li>
          ))
        }
      </ul>
    )
  }

  handleDragOver(e: React.DragEvent<HTMLUListElement>) {
    e.preventDefault()
    const { data } = this.props
    const { clientY } = e
    const dragUlHeight = (data.tempData as IIconTitleTextModel[]).length * dragLiHeight
    dragEndIndex = Math.round((clientY - dragUlHeight) / dragLiHeight)
  }

  handleDrop() {
    const { data, allTempData, changeTempData } = this.props
    swapArray(data.tempData as IIconTitleTextModel[], dragStartSort - 1, dragEndIndex)
    updateCurrentTempData(data, allTempData!)
    changeTempData!(allTempData!)
  }

  inToDetails(editItemData: IIconTitleTextModel) {
    this.setState({
      topTitle: '修改详情页',
      typeIndex: 1,
      editItemData
    })
  }

  deleteIconTitle(sort: number) {
    const { data, allTempData, changeTempData } = this.props;
    if ((data.tempData as IIconTitleTextModel[]).length === 1) return message.warning('最后一条请勿删除');
    data.tempData = deleteIconTitleTextItem(sort, data.tempData as IIconTitleTextModel[])
    updateCurrentTempData(data, allTempData!)
    changeTempData!(allTempData!)
  }

  changeChecked(checkedState: boolean, sort: number) {
    const { data, allTempData, changeTempData } = this.props
    updateIconTitleTextItemShow(checkedState, sort, data.tempData as IIconTitleTextModel[])
    updateCurrentTempData(data, allTempData!)
    changeTempData!(allTempData!)
  }
}

const mapStateToProps = (state: IPageState, ownProps: IEditorIconTitleTextProps) => ({
  currentTemplateId: state.editorContainerReducer.activeTempId,
  allTempData: state.editorContainerReducer.allTempData,
})

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
  changeTempData(allTempData: ITemplateModel[]) {
    dispatch(changeTempData(allTempData))
  },
  changeEditorSlideShow(isShow: boolean) {
    dispatch(changeEditorSlideShow(isShow))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(EditorIconTitleText)