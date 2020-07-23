import React, { PureComponent, Fragment } from 'react'
import { connect } from 'react-redux'
import { IPageState, ITemplateModel } from '../../store/data'
import { TemplateType } from '../EditorContainer/store/state'

import './index.less'

//模板
import EditorIconTitleText from "./IconTitleText" //编辑部分图标文字
import EditorPlaintext from './Plaintext'//编辑纯文本
import PictureText from './PictureText'
import Banner from "./Banner"
import Share from "./Share"
import CorrelationSpecial from "./CorrelationSpecial"

interface IEditorBoxProps {
  isShowEditorSlider?: boolean;
  title?: string;
  allTempData?: ITemplateModel<any>[]
  currentTemplateId?: string;
}

class EditorBox extends PureComponent<IEditorBoxProps> {
  render() {
    const { isShowEditorSlider, currentTemplateId, allTempData } = this.props
    if (!currentTemplateId) return null
    const currentTempData = allTempData!.filter(item => item.id === currentTemplateId)[0] as ITemplateModel<any>

    return (
      <div className="slider-content" style={{ display: isShowEditorSlider ? 'block' : 'none' }}>
        {this.renderSliderBox(currentTempData)}
      </div>
    )
  }

  renderSliderBox(currentTempData: ITemplateModel<any>): JSX.Element {
    return (
      <Fragment>
        {
          this.switchEditorModel(currentTempData)
        }
      </Fragment>
    )
  }

  switchEditorModel(currentTempData: ITemplateModel<any>) {
    switch (currentTempData.type) {
      case TemplateType.Banner:
        return <Banner data={currentTempData} />
      case TemplateType.Share:
        return <Share data={currentTempData} />
      case TemplateType.IconTitleText:
        return <EditorIconTitleText data={currentTempData} />
      case TemplateType.Plaintext:
        return <EditorPlaintext data={currentTempData} />
      case TemplateType.LeftPictureRightText:
      case TemplateType.LeftTextRightPicture:
        return <PictureText data={currentTempData} />
      case TemplateType.CorrelationSpecial:
        return <CorrelationSpecial data={currentTempData} />
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