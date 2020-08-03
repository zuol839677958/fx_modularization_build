import React, { PureComponent, Fragment } from 'react'
import { connect } from 'react-redux'
import { IPageState, ITemplateModel } from '../../store/data'
import { TemplateType } from '../EditorContainer/store/state'

import './index.less'

//模板
import EditorIconTitleText from "./IconTitleText" //编辑部分图标文字
import EditorPlaintext from './Plaintext'//编辑纯文本
import EditorPictureText from './PictureText'//图文模块
import EditorBanner from "./Banner"//banner模块
import EditorShare from "./Share"//分享模块
import EditorCorrelationSpecial from "./CorrelationSpecial"//专题列表
import EditorAudio from "./Audio"//音频模块
import EditorMorePicture from "./MorePicture" //双图模板

interface IEditorBoxProps {
  isMobile?: boolean
  isShowEditorSlider?: boolean
  title?: string
  allTempData?: ITemplateModel<any>[]
  currentTemplateId?: string
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
    const { isMobile } = this.props

    switch (currentTempData.type) {
      case TemplateType.Banner:
        return <EditorBanner isMobile={isMobile} data={currentTempData} />
      case TemplateType.Share:
        return <EditorShare data={currentTempData} />
      case TemplateType.IconTitleText:
        return <EditorIconTitleText data={currentTempData} />
      case TemplateType.Plaintext:
        return <EditorPlaintext data={currentTempData} />
      case TemplateType.LeftPictureRightText:
      case TemplateType.LeftTextRightPicture:
        return <EditorPictureText data={currentTempData} />
      case TemplateType.CorrelationSpecial:
        return <EditorCorrelationSpecial data={currentTempData} />
      case TemplateType.Audio:
        return <EditorAudio data={currentTempData} />
      case TemplateType.MorePicture:
        return <EditorMorePicture data={currentTempData} />
      default:
        return <Fragment></Fragment>
    }
  }
}

const mapStateToProps = (state: IPageState, ownProps: IEditorBoxProps) => ({
  currentTemplateId: ownProps.isMobile ? state.editorContainerMobileReducer.activeTempId : state.editorContainerReducer.activeTempId,
  allTempData: ownProps.isMobile ? state.editorContainerMobileReducer.allTempData : state.editorContainerReducer.allTempData,
  isShowEditorSlider: state.editorSliderReducer.isShow
})

export default connect(mapStateToProps)(EditorBox)