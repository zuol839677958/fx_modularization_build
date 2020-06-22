import React, { Component, Fragment } from 'react'
import { IPageState, ITemplateModel, IPictureTextModel, IIconTitleTextModel } from '../../../store/data'
import { Dispatch, Action } from 'redux'
import { changeTempData } from '../../EditorContainer/store/actions'
import { connect } from 'react-redux'
import { updateIconTitleTextItemShow, updateCurrentTempData, swapArray, deleteIconTitleTextItem, updateIconTitleTextItemTitle, updateIconTitleTextItemText } from '../../../utils/utils'
import { InputNumber, message, Input, Row, Button } from 'antd'

import TitleBack from '../commonEditorComponent/titleBack'
import Draggable from '../commonEditorComponent/draggable'
import RichTextEditor from '../../RichTextEditor'

import './index.less'

interface IEditorPictureTextProps {
  data: ITemplateModel
  allTempData?: ITemplateModel[]
  changeTempData?: (allTempData: ITemplateModel[]) => void
  changeEditorSlideShow?: (isShow: boolean) => void
}

interface IEditorPictureTextState {
  tabTypeIndex: number
  tabTitle: string
  editItemData?: IIconTitleTextModel
  richTextEditorModalVisible: boolean
}

class EditorPictureText extends Component<IEditorPictureTextProps, IEditorPictureTextState> {
  state: IEditorPictureTextState = {
    tabTypeIndex: 0,
    tabTitle: '图文模板编辑',
    richTextEditorModalVisible: false
  }

  render() {
    const { data } = this.props
    const { tabTypeIndex, tabTitle, editItemData, richTextEditorModalVisible } = this.state

    return (
      <Fragment>
        <TitleBack
          titleArrow={tabTypeIndex === 1}
          title={tabTitle}
          changeTypeIndex={(index) => this.changeTabTypeIndex(index)}
        />
        <div className="editor_box" style={{ display: tabTypeIndex === 0 ? "block" : "none" }}>
          <p>图文间距</p>
          <div className="spacing-box">
            <InputNumber
              value={(data.tempData as IPictureTextModel).spacingPercent}
              onChange={(value) => this.changePictureTextSpacing(value as number)}
            />
            <span>%</span>
          </div>
          <p>条目管理</p>
          <Draggable
            data={(data.tempData as IPictureTextModel).titleTextList}
            handleEditItem={(itemData) => this.initEditDetails(itemData as IIconTitleTextModel)}
            handleDeleteItem={(itemSort) => this.deleteTxtListItem(itemSort)}
            handleIsShowItem={(checked, itemSort) => this.checkedTxtListItem(checked, itemSort)}
            handleDraggableItemChange={(dragItemStartIndex, dragItemEndIndex) =>
              this.changeTxtListItemSort(dragItemStartIndex, dragItemEndIndex)}
          />
        </div>
        <div className="details_box" style={{ display: tabTypeIndex === 1 ? "block" : "none" }}>
          <Row style={{ marginBottom: 20 }}>
            <p>修改标题</p>
            <Input placeholder="请输入标题" maxLength={10} value={editItemData?.title}
              onChange={(e) => this.changeItemTitle(e.target.value)}
            />
          </Row>
          <p>修改文字</p>
          <Button type="primary" shape="round"
            onClick={() => this.handleRichTextEditorModalVisible(true)}
          >编辑内容</Button>
          <RichTextEditor
            modalVisible={richTextEditorModalVisible}
            richTextContent={editItemData?.text as string}
            handleModalVisible={(flag) => this.handleRichTextEditorModalVisible(flag)}
            saveContent={(content) => this.changeItemText(content)}
          />
        </div>
      </Fragment>
    )
  }

  changeItemTitle(title: string) {
    const { data, allTempData, changeTempData } = this.props
    const { editItemData } = this.state
    updateIconTitleTextItemTitle(title, editItemData!.sort, (data.tempData as IPictureTextModel).titleTextList)
    updateCurrentTempData(data, allTempData!)
    changeTempData!(allTempData!)
  }

  handleRichTextEditorModalVisible(richTextEditorModalVisible: boolean) {
    this.setState({ richTextEditorModalVisible })
  }

  changeItemText(text: string) {
    const { data, allTempData, changeTempData } = this.props
    const { editItemData } = this.state
    updateIconTitleTextItemText(text, editItemData!.sort, (data.tempData as IPictureTextModel).titleTextList)
    updateCurrentTempData(data, allTempData!)
    changeTempData!(allTempData!)
    this.handleRichTextEditorModalVisible(false)
  }

  changePictureTextSpacing(spacing: number) {
    if (!Number(spacing)) return
    const { data, allTempData, changeTempData } = this.props
    const tempData = data.tempData as IPictureTextModel
    tempData.spacingPercent = spacing
    updateCurrentTempData(data, allTempData!)
    changeTempData!(allTempData!)
  }

  closeEditorSlider() {
    const { changeEditorSlideShow } = this.props
    changeEditorSlideShow!(false)
  }

  changeTabTypeIndex(tabTypeIndex: number) {
    this.setState({
      tabTypeIndex
    })
    if (tabTypeIndex === 0) {
      this.setState({ tabTitle: '图文模板编辑' })
    }
  }

  initEditDetails(itemData: IIconTitleTextModel) {
    this.setState({
      tabTypeIndex: 1,
      tabTitle: '修改详情页',
      editItemData: itemData
    })
  }

  deleteTxtListItem(itemSort: number) {
    const { data, allTempData, changeTempData } = this.props
    const tempData = data.tempData as IPictureTextModel
    if (tempData.titleTextList.length === 1) return message.warning('最后一条请勿删除')
    tempData.titleTextList = deleteIconTitleTextItem(itemSort, tempData.titleTextList)
    updateCurrentTempData(data, allTempData!)
    changeTempData!(allTempData!)
  }

  checkedTxtListItem(checked: boolean, itemSort: number) {
    const { data, allTempData, changeTempData } = this.props
    updateIconTitleTextItemShow(checked, itemSort, (data.tempData as IPictureTextModel).titleTextList)
    updateCurrentTempData(data, allTempData!)
    changeTempData!(allTempData!)
  }

  changeTxtListItemSort(dragItemStartIndex: number, dragItemEndIndex: number) {
    const { data, allTempData, changeTempData } = this.props
    swapArray((data.tempData as IPictureTextModel).titleTextList, dragItemStartIndex, dragItemEndIndex)
    updateCurrentTempData(data, allTempData!)
    changeTempData!(allTempData!)
  }
}

const mapStateToProps = (state: IPageState, ownProps: IEditorPictureTextProps) => ({
  allTempData: state.editorContainerReducer.allTempData,
})

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
  changeTempData(allTempData: ITemplateModel[]) {
    dispatch(changeTempData(allTempData))
  },

})

export default connect(mapStateToProps, mapDispatchToProps)(EditorPictureText)