import React, { Component, Dispatch } from 'react'
import { connect } from 'react-redux'
import { Action } from 'redux'
import { IPageState, ITemplateModel } from '../../store/data'
import { changeSlideShow } from './store/actions'

//模板
import EditorIconTitleText from "./IconTitleText" //编辑部分左图右文


import './index.less'

interface IEditorBoxProps {
  isShow?: boolean;
  title?: string;
  allTempData?: ITemplateModel[]
  currentTemplateId?:string;
  hasBackBtn?: boolean;
  changeEditorSlideShow?: (isShow: boolean) => void
}

class EditorBox extends Component<IEditorBoxProps> {
  render() {
    const { isShow, title, hasBackBtn ,currentTemplateId } = this.props

    return (
      <div className="slide-content" style={{ display: isShow ? 'block' : 'none' }}>
        {this.renderSlideBox()}
        <EditorIconTitleText title={"标题文字修改"} hasBackBtn={hasBackBtn as boolean} closeEditorSlide={() => this.closeEditorSlide()} />
      </div>
    )
  }
  renderSlideBox(){
    
  }

  closeEditorSlide() {
    this.props.changeEditorSlideShow && this.props.changeEditorSlideShow(false)
  }
}

const mapStateToProps = (state: IPageState, ownProps: IEditorBoxProps) => ({
  currentTemplateId : state.editorContainerReducer.activeTempId,
  allTempData: state.editorContainerReducer.allTempData,
  isShow: state.editorSlideReducer.isShow
})

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
  changeEditorSlideShow(isShow: boolean) {
    dispatch(changeSlideShow(isShow))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(EditorBox)