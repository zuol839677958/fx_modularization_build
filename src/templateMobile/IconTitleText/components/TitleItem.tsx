import React, { FC, useMemo } from 'react'
import { IBackgroundSetModel } from '@/store/data'
import { initTitlePadding, initTitleBackground, initMobileFontSize } from '@/utils'

interface ITitleItemProps {
  title: string
  titleFontSize?: number
  titleFontColor?: string
  background?: IBackgroundSetModel
}

const TitleItem: FC<ITitleItemProps> = props => {
  const { title, titleFontSize, titleFontColor, background } = props

  return useMemo(() => (
    <span className="heading"
      style={{
        fontSize: initMobileFontSize(titleFontSize),
        color: titleFontColor,
        padding: initTitlePadding(background),
        background: initTitleBackground(background)
      }}
    >{title}</span>
  ), [background, title, titleFontColor, titleFontSize])
}

export default TitleItem