import React, { FC, useState } from 'react'
import { IPageState, ITemplateModel, IBannerModel, IIconTitleTextModel } from '../../../store/data'
import { RouteComponentProps } from 'react-router-dom'
import { connect } from 'react-redux'
import { getIsShowList } from '../../../utils/utils'
import { TemplateType } from '../../EditorContainer/store/state'
import { changeMobileActiveTempId } from '../store/actions'
import { Dispatch, Action } from 'redux'

import MobileMask from '../../MobileMask'

//模板
import Banner from '../../../templateMobile/Banner'
import IconTitleText from "../../../templateMobile/IconTitleText"

import './index.less'

interface ITemplateListProps extends RouteComponentProps {
  mobileActiveTempId?: string
  mobileAllTempData?: ITemplateModel<any>[]
  changeMobileActiveTempId?: (activeTempId: string) => void
}

const TemplateList: FC<ITemplateListProps> = props => {
  const [isShowMaskTempId, setIsShowMaskTempId] = useState<string>('')
  const { mobileActiveTempId, mobileAllTempData, changeMobileActiveTempId } = props

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

  const filterMobileAllTempData = getIsShowList(mobileAllTempData!) as ITemplateModel<any>[]
  if (filterMobileAllTempData.length === 0) return null

  return (
    <>
      {
        filterMobileAllTempData.map(tempData => (
          <div id={tempData.id} className="temp-box" key={tempData.id}
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
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(TemplateList)