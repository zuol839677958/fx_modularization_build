import React, { FC, memo, useState } from 'react'
import { IPageState, ITemplateModel, IBannerModel, IBackgroundSetModel, IIconTitleTextModel } from '../../../store/data'
import { RouteComponentProps } from 'react-router-dom'
import { connect } from 'react-redux'
import { getIsShowList, initTempBackground } from '../../../utils/utils'
import { TemplateType } from '../../EditorContainer/store/state'
import { changeMobileActiveTempId } from '../store/actions'
import { Dispatch, Action } from 'redux'
import { changeEditorSliderShow, changeEditorSliderTab } from '../../EditorSlider/store/actions'
import { changeAddTemplateSliderShow } from '../../AddTemplate/store/actions'

import MobileMask from '../../MobileMask'

//模板
import Banner from '../../../templateMobile/Banner'
import IconTitleText from "../../../templateMobile/IconTitleText"

import './index.less'

interface ITemplateListProps extends RouteComponentProps {
  mobileActiveTempId?: string
  mobileAllTempData?: ITemplateModel<any>[]
  changeMobileActiveTempId?: (activeTempId: string) => void
  changeEditorSliderShow?: (isShow: boolean) => void
  changeAddTemplateSliderShow?: (isShow: boolean) => void
  changeEditorSliderTab?: (tabTypeIndex: number) => void
}

const TemplateList: FC<ITemplateListProps> = props => {
  const [isShowMaskTempId, setIsShowMaskTempId] = useState<string>('')
  const {
    mobileActiveTempId,
    mobileAllTempData,
    changeMobileActiveTempId,
    changeEditorSliderShow,
    changeAddTemplateSliderShow,
    changeEditorSliderTab
  } = props

  // 鼠标移入模板处理
  const handleTempMouseEnter = (tempId: string) => {
    setIsShowMaskTempId(tempId)
  }

  // 鼠标移出模板处理
  const handleTempMouseLeave = () => {
    setIsShowMaskTempId('')
  }

  // 鼠标点击模板处理
  const handleTempClick = (tempId: string) => {
    changeMobileActiveTempId!(tempId)
    changeEditorSliderShow!(true)
    changeAddTemplateSliderShow!(false)
    changeEditorSliderTab!(0)
  }

  /**
   * 渲染模板
   * @param tempData 模板数据
   */
  const renderTemplate = (tempData: ITemplateModel<any>) => {
    switch (tempData.type) {
      case TemplateType.Banner:
        return <Banner data={tempData.tempData as IBannerModel} />
      case TemplateType.IconTitleText:
        return <IconTitleText data={tempData.tempData as IIconTitleTextModel}/>
      default:
        return null
    }
  }

  /**
   * 渲染模板样式
   * @param background 模板背景
   * @param spacing 模板间距
   */
  const initTempCss = (background?: IBackgroundSetModel, spacing?: number) => {
    return initTempBackground(background, spacing, true)
  }

  const filterMobileAllTempData = getIsShowList(mobileAllTempData!) as ITemplateModel<any>[]
  if (filterMobileAllTempData.length === 0) return null

  return (
    <>
      {
        filterMobileAllTempData.map(tempData => (
          <div id={tempData.id} className="temp-box" key={tempData.id}
            style={initTempCss(tempData.background, tempData.spacing)}
            onMouseEnter={() => handleTempMouseEnter(tempData.id)}
            onMouseLeave={handleTempMouseLeave}
            onClick={() => handleTempClick(tempData.id)}
          >
            {renderTemplate(tempData)}
            {isShowMaskTempId === tempData.id || mobileActiveTempId === tempData.id
              ? <MobileMask /> : null}
          </div>
        ))
      }
    </>
  )
}

const mapStateToProps = (state: IPageState, ownProps: ITemplateListProps) => ({
  mobileActiveTempId: state.editorContainerMobileReducer.activeTempId,
  mobileAllTempData: state.editorContainerMobileReducer.allTempData
})

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
  changeMobileActiveTempId(activeTempId: string) {
    dispatch(changeMobileActiveTempId(activeTempId))
  },
  changeEditorSliderShow(isShow: boolean) {
    dispatch(changeEditorSliderShow(isShow))
  },
  changeAddTemplateSliderShow(isShow: boolean) {
    dispatch(changeAddTemplateSliderShow(isShow))
  },
  changeEditorSliderTab(tabTypeIndex: number) {
    dispatch(changeEditorSliderTab(tabTypeIndex))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(memo(TemplateList))