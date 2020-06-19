import React, { Component, Fragment } from 'react'
import { IPageState, ITemplateModel, IPictureTextModel, IIconTitleTextModel } from '../../../store/data'
import { Dispatch, Action } from 'redux'
import { changeTempData } from '../../EditorContainer/store/actions'
import { changeEditorSlideShow } from '../store/actions'
import { connect } from 'react-redux'
import { updateIconTitleTextItemShow, updateCurrentTempData, swapArray } from '../../../utils/utils'

import TitleBack from '../commonEditorComponent/titleBack'
import Draggable from '../commonEditorComponent/draggable'

import './index.less'

interface IEditorPictureTextProps {
  data: ITemplateModel
  allTempData?: ITemplateModel[]
  changeTempData?: (allTempData: ITemplateModel[]) => void
  changeEditorSlideShow?: (isShow: boolean) => void
}

interface IEditorPictureTextState {
  tabIndex: number
}

class EditorPictureText extends Component<IEditorPictureTextProps, IEditorPictureTextState> {
  state: IEditorPictureTextState = {
    tabIndex: 0
  }

  render() {
    const { data } = this.props

    return (
      <Fragment>
        <TitleBack titleArrow={false} title='图文模板编辑' closeEditorSlide={() => this.closeEditorSlider()} />
        <div className="editor_box">
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
      </Fragment>
    )
  }

  closeEditorSlider() {
    const { changeEditorSlideShow } = this.props
    changeEditorSlideShow!(false)
  }

  initEditDetails(itemData: IIconTitleTextModel) {

  }

  deleteTxtListItem(itemSort: number) {

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
  changeEditorSlideShow(isShow: boolean) {
    dispatch(changeEditorSlideShow(isShow))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(EditorPictureText)