import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { IPageState, ITemplateModel } from '../../store/data'
import { TemplateType } from '../EditorContainer/store/state'

import './index.less'

interface IEditorBoxProps {
  isShowEditorSlider?: boolean;
  allTempData?: ITemplateModel[]
  currentTemplateId?: string;
}

class EditorBox extends Component<IEditorBoxProps> {
  render() {
    // const { isShowEditorSlider, currentTemplateId, allTempData } = this.props
    // if (!currentTemplateId) return null
    // const currentTempData = allTempData!.filter(item => item.id === currentTemplateId)[0] as ITemplateModel

    return (
      <div className="add-silder-model">
          
      </div>
    )
  }
}

const mapStateToProps = (state: IPageState, ownProps: IEditorBoxProps) => ({
  currentTemplateId: state.editorContainerReducer.activeTempId,
  allTempData: state.editorContainerReducer.allTempData,
  isShowEditorSlider: state.editorSliderReducer.isShow
})

export default connect(mapStateToProps)(EditorBox)