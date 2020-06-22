import React, { Component, Fragment } from 'react'
import { IPageState, ITemplateModel } from '../../../store/data'
import { Dispatch, Action } from 'redux'
import { changeTempData } from '../../EditorContainer/store/actions'
import { connect } from 'react-redux'

import TitleBack from '../commonEditorComponent/titleBack'

interface IEditorPictureTextProps {
  data: ITemplateModel
  allTempData?: ITemplateModel[]
  changeTempData?: (allTempData: ITemplateModel[]) => void
  changeEditorSlideShow?: (isShow: boolean) => void
}

interface IEditorPictureTextState { }

class EditorPictureText extends Component<IEditorPictureTextProps, IEditorPictureTextState> {
  render() {
    return (
      <Fragment>
        <TitleBack titleArrow={false} title='图文模板编辑'  />
      </Fragment>
    )
  }

  closeEditorSlider() {
    const { changeEditorSlideShow } = this.props
    changeEditorSlideShow!(false)
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