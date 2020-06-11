import React, { Component, Dispatch } from 'react'
import { connect } from 'react-redux'
import { Action } from 'redux'
import EditorIconTitleText from "./IconTitleText"
import { IPageState } from '../../store/data'
import { changeSlideShow } from './store/actions'

import './index.less'

interface IEditorBoxProps {
  isShow?: boolean;
  title?: string;
  hasBackBtn?: boolean;
  changeEditorSlideShow?: (isShow: boolean) => void
}

class EditorBox extends Component<IEditorBoxProps> {
  render() {
    const { isShow, title, hasBackBtn } = this.props

    return (
      <div className="slide-content" style={{ display: isShow ? 'block' : 'none' }}>
        <EditorIconTitleText title={title as string} hasBackBtn={hasBackBtn as boolean} closeEditorSlide={() => this.closeEditorSlide()} />
      </div>
    )
  }

  closeEditorSlide() {
    this.props.changeEditorSlideShow && this.props.changeEditorSlideShow(false)
  }
}

const mapStateToProps = (state: IPageState, ownProps: IEditorBoxProps) => ({
  isShow: state.editorSlideReducer.isShow
})

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
  changeEditorSlideShow(isShow: boolean) {
    dispatch(changeSlideShow(isShow))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(EditorBox)