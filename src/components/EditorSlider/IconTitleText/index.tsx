import React, { Component, Fragment, Dispatch } from 'react'
import { message, Input, Row } from 'antd'
import { connect } from 'react-redux'
import { changeEditorSlideShow } from '../store/actions'
import { IIconTitleTextModel, ITemplateModel, IPageState } from '../../../store/data';
import { updateIconTitleTextItemShow, updateCurrentTempData, deleteIconTitleTextItem, swapArray, updateIconTitleTextItemTitle, updateIconTitleTextItemText } from '../../../utils/utils'
import TitleBack from "../commonEditorComponent/titleBack"
import { Action } from 'redux'
import { changeTempData } from '../../EditorContainer/store/actions'

import Draggable, { IDraggableData } from '../commonEditorComponent/draggable'

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
          <Draggable
            data={data.tempData as IDraggableData[]}
            handleEditItem={(itemData: IDraggableData) => this.inToDetails(itemData as IIconTitleTextModel)}
            handleDeleteItem={(itemSort: number) => this.deleteIconTitle(itemSort)}
            handleIsShowItem={(checked: boolean, itemSort: number) => this.changeChecked(checked, itemSort)}
            handleDraggableItemChange={(dragItemStartIndex: number, dragItemEndIndex: number) =>
              this.changeItemSort(dragItemStartIndex, dragItemEndIndex)}
          />
        </div>
        <div className="second-Manage-content" style={{ display: typeIndex === 1 ? "block" : "none" }}>
          <Row style={{ marginBottom: 20 }}>
            <p>修改标题</p>
            <Input placeholder="请输入标题" maxLength={10} value={editItemData?.title}
              onChange={(e) => this.changeItemTitle(e.target.value)}
            />
          </Row>
          <Row>
            <p>修改文字</p>
            <Input placeholder="请输入文字" maxLength={20} value={editItemData?.text}
              onChange={(e) => this.changeItemText(e.target.value)}
            />
          </Row>
        </div>
      </Fragment >
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
    if (typeIndex === 0) {
      this.setState({ topTitle: '图标标题文字模板编辑' })
    }
  }

  closeEditorSlide() {
    this.setState({
      typeIndex: 0
    })
    this.props.changeEditorSlideShow && this.props.changeEditorSlideShow(false)
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

  changeItemSort(dragItemStartIndex: number, dragItemEndIndex: number) {
    const { data, allTempData, changeTempData } = this.props
    swapArray(data.tempData as IIconTitleTextModel[], dragItemStartIndex, dragItemEndIndex)
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