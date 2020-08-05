import React, { FC } from 'react'
import { IIconTitleTextModel } from '../../store/data'
import { getIsShowList, initMobileTemplatePositionStyle, initTitlePadding, initTitleBackground } from '../../utils/utils'

import './index.less'

interface IconTitleTextProps {
  data: IIconTitleTextModel[]
}

const IconTitleText: FC<IconTitleTextProps> = props => {
  const { data } = props

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