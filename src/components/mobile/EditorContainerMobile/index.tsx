import React, { FC, CSSProperties, useState, useEffect, useCallback, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { IPageState, IPageModel } from '@/store/data'
import { useDispatch, useSelector } from 'react-redux'
import { BackgroundSetType } from '@/store/state/backgroundSet.state'
import { getSpeicalData, getTemplateDetail } from '@/axios/api'
import { Spin, message } from 'antd'
import { changeMobilePageData } from '@/store/actions/editor.mobile.actions'

import TemplateList from './TemplateList'
import ActionBar from '../MobileMask/ActionBar'

import './index.less'

type EditorContainerMobileRoutesOptions = {
  specialId: string
  tempId: string
  hasContent: string
}

const EditorContainerMobile: FC = () => {
  const [loading, setLoading] = useState<boolean>(true)
  const { activeTempId, background } = useSelector((state: IPageState) => state.editorContainerMobileReducer)
  const { isShow: isShowSlider } = useSelector((state: IPageState) => state.editorSliderReducer)
  const { isShow: isShowAddTemplate } = useSelector((state: IPageState) => state.addTemplateSliderReducer)
  const { specialId, tempId, hasContent } = useParams<EditorContainerMobileRoutesOptions>()
  const dispatch = useDispatch()

  const changeMobilePageDataHandler = useCallback((pageData: IPageModel) => {
    dispatch(changeMobilePageData(pageData))
  }, [dispatch])

  // 获取专题H5已编辑模板数据
  const getSpecialDetailData = useCallback(async () => {
    try {
      const res = await getSpeicalData(specialId)
      if (!res) return message.warning('此专题没有任何H5内容！')
      const pageData = JSON.parse(res.ContentH5!) as IPageModel
      changeMobilePageDataHandler!(pageData)
      setLoading(false)
    } catch (e) {
      console.warn('模板渲染错误：', e)
      message.error('专题H5网页解析错误！')
      setLoading(false)
    }
  }, [changeMobilePageDataHandler, specialId])

  // 获取H5模板数据
  const getTemplateDetailData = useCallback(async () => {
    try {
      const res = await getTemplateDetail(Number(tempId))
      if (!res) return message.warning('此模板没有任何H5内容！')
      const pageData = JSON.parse(res.ContentH5!) as IPageModel
      changeMobilePageDataHandler!(pageData)
      setLoading(false)
    } catch (e) {
      console.warn('模板渲染错误：', e)
      message.error('H5模板解析错误！')
      setLoading(false)
    }
  }, [changeMobilePageDataHandler, tempId])

  useEffect(() => {
    if (Number(hasContent)) {
      getSpecialDetailData()
    } else {
      getTemplateDetailData()
    }
  }, [getSpecialDetailData, getTemplateDetailData, hasContent])

  // 渲染H5网页背景
  const initGeneralMobilePageBackground = useCallback(() => {
    let bgCss: CSSProperties = {}
    if (!background!.bgType) return bgCss
    switch (background!.bgType) {
      case BackgroundSetType.NoneColor:
        break
      case BackgroundSetType.PureColor:
        bgCss.backgroundColor = background!.bgColor
        break
      case BackgroundSetType.BackgroundImage:
        bgCss.background = `url(${background!.bgImageUrl}) no-repeat center center`
        bgCss.backgroundSize = 'cover'
        break
    }
    return bgCss
  }, [background])

  return useMemo(() => (
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
                <TemplateList />
              </div>
          }
        </div>
        {activeTempId ? <ActionBar /> : null}
      </div>
    </div>
  ), [activeTempId, initGeneralMobilePageBackground, isShowAddTemplate, isShowSlider, loading])
}

export default EditorContainerMobile