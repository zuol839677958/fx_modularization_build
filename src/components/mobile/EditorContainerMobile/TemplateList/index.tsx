import React, { FC, useState, useCallback } from 'react'
import {
  IPageState,
  ITemplateModel,
  IBannerModel,
  IIconTitleTextModel,
  IAudioModel,
  IPlaintextModel,
  IPictureTextModel,
  ICorrelationSpecialModel,
} from '@/store/data'
import { useSelector, useDispatch } from 'react-redux'
import { getIsShowList, initTempCss } from '@/utils'
import { TemplateType } from '@/store/state/editor.state'
import { changeMobileActiveTempId } from '@/store/actions/editor.mobile.actions'
import {
  changeEditorSliderShow,
  changeEditorSliderTab,
} from '@/store/actions/editor.slider.actions'
import { changeAddTemplateSliderShow } from '@/store/actions/addTemplate.actions'

import MobileMask from '../../MobileMask'

//模板
import Banner from '@/templateMobile/Banner'
import IconTitleText from '@/templateMobile/IconTitleText'
import Audio from '@/templateMobile/Audio'
import Plaintext from '@/templateMobile/Plaintext'
import PictureText from '@/templateMobile/PictureText'
import CorrelationSpecial from '@/templateMobile/CorrelationSpecial'
import './index.less'

const TemplateList: FC = () => {
  const [isShowMaskTempId, setIsShowMaskTempId] = useState<string>('')
  const { activeTempId, allTempData } = useSelector((state: IPageState) => state.editorContainerMobileReducer)
  const dispatch = useDispatch()

  // 鼠标移入模板处理
  const handleTempMouseEnter = useCallback((tempId: string) => {
    setIsShowMaskTempId(tempId)
  }, [])

  // 鼠标移出模板处理
  const handleTempMouseLeave = useCallback(() => {
    setIsShowMaskTempId('')
  }, [])

  // 鼠标点击模板处理
  const handleTempClick = useCallback((tempId: string) => {
    dispatch(changeMobileActiveTempId!(tempId))
    dispatch(changeEditorSliderShow!(true))
    dispatch(changeAddTemplateSliderShow!(false))
    dispatch(changeEditorSliderTab!(0))
  }, [dispatch])

  /**
   * 渲染模板
   * @param tempData 模板数据
   */
  const renderTemplate = useCallback((tempData: ITemplateModel<any>) => {
    switch (tempData.type) {
      case TemplateType.Banner:
        return <Banner data={tempData.tempData as IBannerModel} />
      case TemplateType.IconTitleText:
        return (
          <IconTitleText data={tempData.tempData as IIconTitleTextModel[]} />
        )
      case TemplateType.Plaintext:
        return <Plaintext data={tempData.tempData as IPlaintextModel} />
      case TemplateType.LeftPictureRightText:
      case TemplateType.LeftTextRightPicture:
        return <PictureText data={tempData.tempData as IPictureTextModel} />
      case TemplateType.Audio:
        return <Audio data={tempData.tempData as IAudioModel} />
      case TemplateType.CorrelationSpecial:
        return (
          <CorrelationSpecial
            data={tempData.tempData as ICorrelationSpecialModel[]}
            fontColor={tempData.fontColor}
          />
        )
      default:
        return null
    }
  }, [])

  const filterMobileAllTempData = getIsShowList(
    allTempData!
  ) as ITemplateModel<any>[]
  if (filterMobileAllTempData.length === 0) return null

  return (
    <>
      {filterMobileAllTempData.map((tempData) => (
        <div
          id={tempData.id}
          className="temp-box"
          key={tempData.id}
          style={initTempCss(
            tempData.background,
            tempData.topSpacing,
            tempData.bottomSpacing,
            true
          )}
          onMouseEnter={() => handleTempMouseEnter(tempData.id)}
          onMouseLeave={handleTempMouseLeave}
          onClick={() => handleTempClick(tempData.id)}
        >
          {renderTemplate(tempData)}
          {isShowMaskTempId === tempData.id ||
            activeTempId === tempData.id ? (
              <MobileMask />
            ) : null}
        </div>
      ))}
    </>
  )
}

export default TemplateList
