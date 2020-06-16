import React, { Component, Dispatch, Fragment, CSSProperties } from 'react'
import { connect } from 'react-redux'
import { Action } from 'redux'
import { ITemplateModel, IPageState, IBackgroundSetModel } from '../../store/data'
import { TemplateType } from './store/state'
import { changeEditorSlideShow } from '../EditorSlide/store/actions'
import { changeActiveTempId, changeTempData } from './store/actions'
import { getIsShowList } from '../../utils/utils'
import { BackgroundSetType } from '../BackgroundSet/store/state'
import { changeBackgroundSetData } from '../BackgroundSet/store/actions'
import { IMasterTemplateProps } from '../../template/MasterTemplate'

//模板
import IconTitleText from '../../template/IconTitleText'
import PictureText from '../../template/PictureText'

import './index.less'

interface IEditorContainerProps {
  activeTempId?: string
  allTempData?: ITemplateModel[]
  isShowSlider?: boolean
  generalPageBackground?: IBackgroundSetModel
  changeEditorSliderShow?: (isShow: boolean) => void
  changeActiveTempId?: (activeTempId: string) => void
  changeTempData?: (tempData: ITemplateModel[]) => void
  changeBackgroundSetData?: (backgroundSet: IBackgroundSetModel) => void
}

class EditorContainer extends Component<IEditorContainerProps> {
  render() {
    const { allTempData, isShowSlider } = this.props

    return (
      <div className="editor-content" style={{ paddingLeft: isShowSlider ? "340px" : "0px" }}>
        <div className="editor-wrap">
          <div id="generalPage" className="page-wrap" style={this.initGeneralPageBackground()}>
            {this.renderAllTemplate(allTempData as ITemplateModel[])}
          </div>
        </div>
      </div>
    )
  }

  renderAllTemplate(allTempData: ITemplateModel[]): JSX.Element {
    if (allTempData.length === 0) return <Fragment></Fragment>
    const { activeTempId, changeActiveTempId, changeTempData, changeBackgroundSetData } = this.props
    const filterAllTempData = getIsShowList(allTempData) as ITemplateModel[]
    return (
      <Fragment>
        {
          filterAllTempData.map(tempData => {
            const masterProps: IMasterTemplateProps = {
              activeTempId: activeTempId!,
              tempData,
              allTempData: filterAllTempData,
              changeActiveTempId: (activeTempId: string) => changeActiveTempId!(activeTempId),
              showEditorSlider: () => this.showEditorSlider(),
              changeTempData: (tempData: ITemplateModel[]) => changeTempData!(tempData),
              setTempBackground: (backgroundSet: IBackgroundSetModel) => changeBackgroundSetData!(backgroundSet)
            }
            switch (tempData.type) {
              case TemplateType.IconTitleText:
                return <IconTitleText
                  key={tempData.id}
                  {...masterProps}
                />
              case TemplateType.LeftPictureRightText:
              case TemplateType.LeftTextRightPicture:
                return <PictureText
                  key={tempData.id}
                  {...masterProps}
                />
              default:
                return <Fragment></Fragment>
            }
          })
        }
      </Fragment>
    )
  }

  showEditorSlider() {
    const { isShowSlider, changeEditorSliderShow } = this.props
    if (isShowSlider) return
    changeEditorSliderShow!(true)
  }

  initGeneralPageBackground(): CSSProperties {
    let bgCss: CSSProperties = {}
    const { generalPageBackground } = this.props
    if (!generalPageBackground) return bgCss
    switch (generalPageBackground.bgType) {
      case BackgroundSetType.NoneColor:
        break
      case BackgroundSetType.PureColor:
        bgCss.backgroundColor = generalPageBackground.bgColor
    }
    return bgCss
  }
}

const mapStateToProps = (state: IPageState, ownProps: IEditorContainerProps) => ({
  activeTempId: state.editorContainerReducer.activeTempId,
  allTempData: state.editorContainerReducer.allTempData,
  isShowSlider: state.editorSliderReducer.isShow,
  generalPageBackground: state.editorContainerReducer.background
})

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
  changeEditorSliderShow(isShow: boolean) {
    dispatch(changeEditorSlideShow(isShow))
  },
  changeActiveTempId(activeTempId: string) {
    dispatch(changeActiveTempId(activeTempId))
  },
  changeTempData(allTempData: ITemplateModel[]) {
    dispatch(changeTempData(allTempData))
  },
  changeBackgroundSetData(backgroundSet: IBackgroundSetModel) {
    dispatch(changeBackgroundSetData(backgroundSet))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(EditorContainer)
