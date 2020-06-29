import React, { Component, Dispatch, Fragment, CSSProperties } from 'react'
import { connect } from 'react-redux'
import { Action } from 'redux'
import { ITemplateModel, IPageState, IBackgroundSetModel, IPageModel } from '../../store/data'
import { TemplateType } from './store/state'
import { changeEditorSlideShow } from '../EditorSlider/store/actions'
import { changeActiveTempId, changeTempData, changePageData } from './store/actions'
import { getIsShowList } from '../../utils/utils'
import { BackgroundSetType } from '../BackgroundSet/store/state'
import { changeBackgroundSetData } from '../BackgroundSet/store/actions'
import { IMasterTemplateProps } from '../../template/MasterTemplate'
import { getTemplateDetail } from '../../axios/api'

//模板
import Banner from '../../template/Banner'
import IconTitleText from '../../template/IconTitleText'
import PictureText from '../../template/PictureText'
import Plaintext from '../../template/Plaintext'
import { RouteComponentProps } from 'react-router-dom'

import './index.less'

interface IEditorContainerProps extends RouteComponentProps {
  activeTempId?: string
  allTempData?: ITemplateModel[]
  isShowSlider?: boolean
  isShowAddTemplate?: boolean
  generalPageBackground?: IBackgroundSetModel
  changeEditorSliderShow?: (isShow: boolean) => void
  changeActiveTempId?: (activeTempId: string) => void
  changeTempData?: (tempData: ITemplateModel[]) => void
  changeBackgroundSetData?: (backgroundSet: IBackgroundSetModel) => void
  changePageData?: (pageData: IPageModel) => void
}

class EditorContainer extends Component<IEditorContainerProps> {
  render() {
    const { allTempData, isShowSlider, isShowAddTemplate } = this.props

    return (
      <div className="editor-content"
        style={{ paddingLeft: isShowAddTemplate ? '400px' : isShowSlider ? "340px" : "0px" }}
      >
        <div className="editor-wrap">
          <div id="generalPage" className="page-wrap" style={this.initGeneralPageBackground()}>
            {this.renderAllTemplate(allTempData as ITemplateModel[])}
          </div>
        </div>
      </div>
    )
  }

  // componentDidMount() {
  //   this.getTemplateDetail()
  // }

  // async getTemplateDetail() {
  //   const { tempId } = this.props.match.params as { tempId: number }
  //   const res = await getTemplateDetail(tempId)
  //   const { changePageData } = this.props
  //   changePageData!(JSON.parse(res.Content))
  // }

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
              changeEditorSliderShow: (isShow: boolean) => this.changeEditorSliderShow(isShow),
              changeTempData: (tempData: ITemplateModel[]) => changeTempData!(tempData),
              setTempBackground: (backgroundSet: IBackgroundSetModel) => changeBackgroundSetData!(backgroundSet)
            }
            switch (tempData.type) {
              case TemplateType.Banner:
                return <Banner key={tempData.id} {...masterProps} />
              case TemplateType.IconTitleText:
                return <IconTitleText key={tempData.id} {...masterProps} />
              case TemplateType.LeftPictureRightText:
              case TemplateType.LeftTextRightPicture:
                return <PictureText key={tempData.id} {...masterProps} />
              case TemplateType.Plaintext:
                return <Plaintext key={tempData.id} {...masterProps} />
              default:
                return <Fragment></Fragment>
            }
          })
        }
      </Fragment>
    )
  }

  changeEditorSliderShow(isShow: boolean) {
    const { isShowSlider, changeEditorSliderShow } = this.props
    if (isShow === isShowSlider) return
    changeEditorSliderShow!(isShow)
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
  isShowAddTemplate: state.addTemplateSliderReducer.isShow,
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
  changePageData(pageData: IPageModel) {
    dispatch(changePageData(pageData))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(EditorContainer)
