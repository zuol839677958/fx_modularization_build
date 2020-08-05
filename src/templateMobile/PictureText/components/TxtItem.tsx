import React, { FC } from 'react'
import { IIconTitleTextModel } from '../../../store/data'

interface ITxtItemProps {
  data: IIconTitleTextModel
}

const TxtItem: FC<ITxtItemProps> = props => {
  const { data } = props

  return (
    <div className="top_title_text">
      <h3 className="title"
        style={{ fontSize: data.titleFontSize, color: data.titleFontColor }}
      >{data.title}</h3>
      <div className="text">{data.text}</div>
    </div>
  )
}

export default TxtItem