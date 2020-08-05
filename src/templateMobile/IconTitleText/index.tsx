import React, { FC } from 'react'
import { IIconTitleTextModel, IBackgroundSetModel } from '../../store/data'
import { getIsShowList, initMobileTemplatePositionStyle } from '../../utils/utils'
import { BackgroundSetType } from '../../components/BackgroundSet/store/state'

import './index.less'

interface IconTitleTextProps {
  data: IIconTitleTextModel[]
}

const IconTitleText: FC<IconTitleTextProps> = props => {
  const { data } = props

  /**
   * 渲染标题背景
   * @param backgroundSet 标题背景
   */
  const initTitleBackground = (backgroundSet?: IBackgroundSetModel) => {
    if (!backgroundSet) return ''
    switch (backgroundSet.bgType) {
      case BackgroundSetType.NoneColor:
        return 'none'
      case BackgroundSetType.PureColor:
        return backgroundSet.bgColor
      case BackgroundSetType.BackgroundImage:
        return `url(${backgroundSet.bgImageUrl}) center center / cover no-repeat`
      default:
        return ''
    }
  }

  /**
   * 渲染标题间距
   * @param backgroundSet 标题背景
   */
  const initTitlePadding = (backgroundSet?: IBackgroundSetModel) => {
    if (backgroundSet?.bgType === BackgroundSetType.NoneColor) return '0rem'
  }

  if (data.length === 0) return null
  const filterList = getIsShowList(data) as IIconTitleTextModel[]
  if (filterList.length === 0) return null

  return (
    <div className="icon_title_text_box">
      {
        filterList.map((item, index) => (
          <div className="item_list" key={index} style={initMobileTemplatePositionStyle(item.positionType)}>
            {
              item.hasIcon ?
                <img className="des_icon" src={item.iconUrl} alt="" />
                : null
            }
            <span className="heading"
              style={{
                color: item.titleFontColor,
                padding: initTitlePadding(item.background),
                background: initTitleBackground(item.background)
              }}
            >{item.title}</span>
            <i className="txt">{item.text}</i>
          </div>
        ))
      }
    </div>
  )
}

export default IconTitleText