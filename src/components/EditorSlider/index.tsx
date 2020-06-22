import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { IPageState, ITemplateModel } from '../../store/data'
import { TemplateType } from '../EditorContainer/store/state'

//模板
import EditorIconTitleText from "./IconTitleText" //编辑部分左图右文
import EditorPlaintext from './Plaintext'
import PictureText from './PictureText'
import Banner from "./Banner"
import './index.less'

interface IEditorBoxProps {
  isShowEditorSlider?: boolean;
  title?: string;
  allTempData?: ITemplateModel[]
  currentTemplateId?: string;
}

class EditorBox extends Component<IEditorBoxProps> {
  render() {
    const { isShowEditorSlider, currentTemplateId, allTempData } = this.props
    if (!currentTemplateId) return null
    const currentTempData = allTempData!.filter(item => item.id === currentTemplateId)[0] as ITemplateModel

    return (
      <div className="slide-content" style={{ display: isShowEditorSlider ? 'block' : 'none' }}>
        {this.renderSliderBox(currentTempData)}
      </div>
    )
  }

  renderSliderBox(currentTempData: ITemplateModel): JSX.Element {
    return (
      <Fragment>
        {
          this.switchEditorModel(currentTempData)
        }
      </Fragment>
    )
  }

  switchEditorModel(currentTempData: ITemplateModel) {
    switch (currentTempData.type) {
      case TemplateType.Banner:
        return  <Banner data={currentTempData as ITemplateModel}/>
      case TemplateType.IconTitleText:
        return <EditorIconTitleText data={currentTempData as ITemplateModel} />
      case TemplateType.Plaintext:
        return <EditorPlaintext data={currentTempData as ITemplateModel} />
      case TemplateType.LeftPictureRightText:
      case TemplateType.LeftTextRightPicture:
        return <PictureText data={currentTempData as ITemplateModel} />
      default:
        return <Fragment></Fragment>
    }
  }
}

const mapStateToProps = (state: IPageState, ownProps: IEditorBoxProps) => ({
  currentTemplateId: state.editorContainerReducer.activeTempId,
  allTempData: state.editorContainerReducer.allTempData,
  isShowEditorSlider: state.editorSliderReducer.isShow
})

export default connect(mapStateToProps)(EditorBox)