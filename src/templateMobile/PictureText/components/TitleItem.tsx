import React, { FC, useMemo } from 'react'
import { IBackgroundSetModel } from '@/store/data'
import { initTitlePadding, initTitleBackground } from '@/utils'

interface ITitleItemProps {
  title: string
  titleFontSize?: number
  titleFontColor?: string
  background?: IBackgroundSetModel
}

const TitleItem: FC<ITitleItemProps> = props => {
  const { title, titleFontSize, titleFontColor, background } = props

  return useMemo(() => (
    <h3 className="title"
      style={{
        fontSize: titleFontSize,
        color: titleFontColor,
        padding: initTitlePadding(background),
        background: initTitleBackground(background)
      }}
    >{title}</h3>
  ), [background, title, titleFontColor, titleFontSize])
}

export default TitleItem