import React, { FC } from 'react'
import { IIconTitleTextModel } from '../../../store/data'
import { initTitlePadding, initTitleBackground } from '../../../utils/utils'

interface ITxtItemProps {
  data: IIconTitleTextModel
}

const TxtItem: FC<ITxtItemProps> = props => {
  const { data } = props

  return (
    <div className="top_title_text">
      <h3 className="title"
        style={{
          fontSize: data.titleFontSize,
          color: data.titleFontColor,
          padding: initTitlePadding(data.background),
          background: initTitleBackground(data.background)
        }}
      >{data.title}</h3>
      <div className="text">{data.text}</div>
    </div>
  )
}

export default TxtItem