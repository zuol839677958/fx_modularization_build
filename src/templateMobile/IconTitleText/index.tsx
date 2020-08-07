import React, { FC } from 'react'
import { IIconTitleTextModel } from '../../store/data'
import { getIsShowList, initMobileTemplatePositionStyle, initTitlePadding, initTitleBackground } from '../../utils/utils'

import IconItem from './components/IconItem'
import TitleItem from './components/TitleItem'
import TextItem from './components/TextItem'

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
            <IconItem {...item} />
            <TitleItem {...item} />
            <TextItem  {...item} />
          </div>
        ))
      }
    </div>
  )
}

export default IconTitleText