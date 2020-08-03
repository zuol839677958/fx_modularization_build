import React, { FC, CSSProperties } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { IPageState, IBackgroundSetModel } from '../../store/data'
import { connect } from 'react-redux'
import { BackgroundSetType } from '../BackgroundSet/store/state'

import TemplateList from './TemplateList'
import ActionBar from '../MobileMask/ActionBar'

import './index.less'

interface IEditorContainerMobileProps extends RouteComponentProps {
  mobileActiveTempId?: string
  isShowSlider?: boolean
  isShowAddTemplate?: boolean
  generalMobilePageBackground?: IBackgroundSetModel
}

const EditorContainerMobile: FC<IEditorContainerMobileProps> = props => {
  const {
    mobileActiveTempId,
    isShowSlider,
    isShowAddTemplate,
    history,
    location,
    match
  } = props

  // 渲染H5网页背景
  const initGeneralMobilePageBackground = () => {
    let bgCss: CSSProperties = {}
    const { generalMobilePageBackground } = props
    if (!generalMobilePageBackground!.bgType) return bgCss
    switch (generalMobilePageBackground!.bgType) {
      case BackgroundSetType.NoneColor:
        break
      case BackgroundSetType.PureColor:
        bgCss.backgroundColor = generalMobilePageBackground!.bgColor
        break
      case BackgroundSetType.BackgroundImage:
        bgCss.background = `url(${generalMobilePageBackground!.bgImageUrl}) no-repeat center center`
        bgCss.backgroundSize = 'cover'
        break
    }
    return bgCss
  }


  return (
    <div className="mobile-editor"
      style={{ paddingLeft: isShowAddTemplate ? '400px' : isShowSlider ? "340px" : "0px" }}
    >
      <div className="editor-wrap">
        <div className="mobile-wrap">
          <div id="generalMobilePage" style={initGeneralMobilePageBackground()}>
            <TemplateList history={history} location={location} match={match} />
          </div>
          
        </div>
        {mobileActiveTempId ? <ActionBar /> : null}
      </div>
    </div>
  )
}

const mapStateToProps = (state: IPageState, ownProps: IEditorContainerMobileProps) => ({
  mobileActiveTempId: state.editorContainerMobileReducer.activeTempId,
  isShowSlider: state.editorSliderReducer.isShow,
  isShowAddTemplate: state.addTemplateSliderReducer.isShow,
  generalMobilePageBackground: state.editorContainerMobileReducer.background
})

export default connect(mapStateToProps)(EditorContainerMobile)