import React, { FC, CSSProperties, useState, useEffect, useCallback } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { IPageState, IBackgroundSetModel, IPageModel } from '../../store/data'
import { connect } from 'react-redux'
import { BackgroundSetType } from '../BackgroundSet/store/state'
import { getSpeicalData, getTemplateDetail } from '../../axios/api'
import { Spin, message } from 'antd'
import { Dispatch, Action } from 'redux'
import { changeMobilePageData } from './store/actions'

import TemplateList from './TemplateList'
import ActionBar from '../MobileMask/ActionBar'

import './index.less'

interface IEditorContainerMobileProps extends RouteComponentProps {
  mobileActiveTempId?: string
  isShowSlider?: boolean
  isShowAddTemplate?: boolean
  generalMobilePageBackground?: IBackgroundSetModel
  changeMobilePageData?: (pageData: IPageModel) => void
}

const EditorContainerMobile: FC<IEditorContainerMobileProps> = props => {
  const [loading, setLoading] = useState<boolean>(true)

  const {
    mobileActiveTempId,
    isShowSlider,
    isShowAddTemplate,
    history,
    location,
    match,
    changeMobilePageData
  } = props

  // 获取专题H5已编辑模板数据
  const getSpecialDetailData = useCallback(async () => {
    try {
      const { specialId } = match.params as { specialId: string }
      const res = await getSpeicalData(specialId)
      changeMobilePageData!(JSON.parse(res.ContentH5!))
      setLoading(false)
    } catch (e) {
      console.warn('模板渲染错误：', e)
      message.error('专题H5网页解析错误！')
      setLoading(false)
    }
  }, [changeMobilePageData, match.params])

  // 获取H5模板数据
  const getTemplateDetailData = useCallback(async () => {
    try {
      const { tempId } = match.params as { tempId: string }
      const res = await getTemplateDetail(Number(tempId))
      changeMobilePageData!(JSON.parse(res.ContentH5!))
      setLoading(false)
    } catch (e) {
      console.warn('模板渲染错误：', e)
      message.error('H5模板解析错误！')
      setLoading(false)
    }
  }, [changeMobilePageData, match.params])

  useEffect(() => {
    const { hasContent } = match.params as { hasContent: string }
    if (Number(hasContent)) {
      getSpecialDetailData()
    } else {
      getTemplateDetailData()
    }
  }, [getSpecialDetailData, getTemplateDetailData, match.params])

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
          {
            loading ?
              <div className="loading-box">
                <Spin size="large" />
              </div>
              :
              <div id="generalMobilePage" style={initGeneralMobilePageBackground()}>
                <TemplateList history={history} location={location} match={match} />
              </div>
          }
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

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
  changeMobilePageData(pageData: IPageModel) {
    dispatch(changeMobilePageData(pageData))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(EditorContainerMobile)