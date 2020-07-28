import React, { PureComponent, Dispatch, Fragment, CSSProperties } from 'react'
import { connect } from 'react-redux'
import { Action } from 'redux'
import { ITemplateModel, IPageState, IBackgroundSetModel, IPageModel } from '../../store/data'
import { TemplateType } from './store/state'
import { message, Spin } from 'antd'
import { changeEditorSliderShow, changeEditorSliderTab } from '../EditorSlider/store/actions'
import { changeActiveTempId, changeTempData, changePageData } from './store/actions'
import { getIsShowList } from '../../utils/utils'
import { BackgroundSetType } from '../BackgroundSet/store/state'
import { changeBackgroundSetData } from '../BackgroundSet/store/actions'
import { IMasterTemplateProps } from '../../template/MasterTemplate'
import { getTemplateDetail, getSpeicalData } from '../../axios/api'
import { changeAddTemplateSliderShow } from '../AddTemplate/store/actions'
import { RouteComponentProps } from 'react-router-dom'

//模板
import Banner from '../../template/Banner'
import IconTitleText from '../../template/IconTitleText'
import PictureText from '../../template/PictureText'
import Plaintext from '../../template/Plaintext'
import CorrelationSpecial from "../../template/CorrelationSpecial"
import Share from "../../template/Share"
import Audio from "../../template/Audio"

import './index.less'

interface IEditorContainerProps extends RouteComponentProps {
  activeTempId?: string
  allTempData?: ITemplateModel<any>[]
  isShowSlider?: boolean
  isShowAddTemplate?: boolean
  generalPageBackground?: IBackgroundSetModel
  changeEditorSliderShow?: (isShow: boolean) => void
  changeActiveTempId?: (activeTempId: string) => void
  changeTempData?: (tempData: ITemplateModel<any>[]) => void
  changeBackgroundSetData?: (backgroundSet: IBackgroundSetModel) => void
  changePageData?: (pageData: IPageModel) => void
  changeAddTemplateSliderShow?: (isShow: boolean) => void
  changeEditorSliderTab?: (tabTypeIndex: number) => void
}

interface IEditorContainerState {
  loading: boolean
}

class EditorContainer extends PureComponent<IEditorContainerProps, IEditorContainerState> {
  state: IEditorContainerState = {
    loading: false
  }

  render() {
    const { allTempData, isShowSlider, isShowAddTemplate } = this.props
    const { loading } = this.state

    return (
      <div className="editor-content"
        style={{ paddingLeft: isShowAddTemplate ? '400px' : isShowSlider ? "340px" : "0px" }}
      >
        <div className="editor-wrap">
          {
            loading ?
              <div className="loading-box">
                <Spin size="large" />
              </div>
              :
              <div id="generalPage" className="page-wrap" style={this.initGeneralPageBackground()}>
                {this.renderAllTemplate(allTempData as ITemplateModel<any>[])}
              </div>
          }
        </div>
      </div>
    )
  }

  // componentDidMount() {
  //   const { hasContent } = this.props.match.params as { hasContent: string }
  //   if (Number(hasContent)) {
  //     this.getSpecialDetail()
  //   } else {
  //     this.getTemplateDetail()
  //   }
  // }

  // 获取专题已编辑模板数据
  async getSpecialDetail() {
    try {
      const { specialId } = this.props.match.params as { specialId: string }
      const res = await getSpeicalData(specialId)
      const { changePageData } = this.props
      changePageData!(JSON.parse(res.Content!))
      this.setState({ loading: false })
    } catch (e) {
      console.warn('模板渲染错误：', e)
      message.error('专题网页解析错误！')
      this.setState({ loading: false })
    }
  }

  // 获取模板数据
  async getTemplateDetail() {
    try {
      const { tempId } = this.props.match.params as { tempId: string }
      const res = await getTemplateDetail(Number(tempId))
      const { changePageData } = this.props
      changePageData!(JSON.parse(res.Content!))
      this.setState({ loading: false })
    } catch (e) {
      console.warn('模板渲染错误：', e)
      message.error('模板解析错误！')
      this.setState({ loading: false })
    }
  }

  renderAllTemplate(allTempData: ITemplateModel<any>[]): JSX.Element {
    if (allTempData.length === 0) return <Fragment></Fragment>
    const {
      history,
      location,
      match,
      activeTempId,
      changeActiveTempId,
      changeTempData,
      changeBackgroundSetData,
      changeAddTemplateSliderShow,
      changeEditorSliderTab
    } = this.props
    const filterAllTempData = getIsShowList(allTempData) as ITemplateModel<any>[]
    console.log(filterAllTempData)
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
              changeTempData: (tempData: ITemplateModel<any>[]) => changeTempData!(tempData),
              setTempBackground: (backgroundSet: IBackgroundSetModel) => changeBackgroundSetData!(backgroundSet),
              changeAddTemplateSliderShow: (isShow: boolean) => changeAddTemplateSliderShow!(isShow),
              changeEditorSliderTab: (tabTypeIndex: number) => changeEditorSliderTab!(tabTypeIndex)
            }
            switch (tempData.type) {
              case TemplateType.Banner:
                return <Banner key={tempData.id} {...masterProps} />
              case TemplateType.Share:
                return <Share key={tempData.id} history={history} location={location} match={match} {...masterProps} />
              case TemplateType.IconTitleText:
                return <IconTitleText key={tempData.id} {...masterProps} />
              case TemplateType.LeftPictureRightText:
              case TemplateType.LeftTextRightPicture:
                return <PictureText key={tempData.id} {...masterProps} />
              case TemplateType.Plaintext:
                return <Plaintext key={tempData.id} {...masterProps} />
              case TemplateType.CorrelationSpecial:
                return <CorrelationSpecial key={tempData.id} {...masterProps} />
              case TemplateType.Audio:
                 return <Audio key={tempData.id} {...masterProps} />
              default:
                return <Fragment key={tempData.id}></Fragment>
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
        break
      case BackgroundSetType.BackgroundImage:
        bgCss.background = `url(${generalPageBackground.bgImageUrl}) no-repeat center center`
        bgCss.backgroundSize = 'cover'
        break
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
    dispatch(changeEditorSliderShow(isShow))
  },
  changeActiveTempId(activeTempId: string) {
    dispatch(changeActiveTempId(activeTempId))
  },
  changeTempData(allTempData: ITemplateModel<any>[]) {
    dispatch(changeTempData(allTempData))
  },
  changeBackgroundSetData(backgroundSet: IBackgroundSetModel) {
    dispatch(changeBackgroundSetData(backgroundSet))
  },
  changePageData(pageData: IPageModel) {
    dispatch(changePageData(pageData))
  },
  changeAddTemplateSliderShow(isShow: boolean) {
    dispatch(changeAddTemplateSliderShow(isShow))
  },
  changeEditorSliderTab(tabTypeIndex: number) {
    dispatch(changeEditorSliderTab(tabTypeIndex))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(EditorContainer)
