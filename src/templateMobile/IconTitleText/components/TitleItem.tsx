import React, { FC, useMemo } from 'react'
import { IBackgroundSetModel } from '@/store/data'
import { initTitlePadding, initTitleBackground } from '@/utils'

interface ITitleItemProps {
  title: string
  titleFontColor?: string
  background?: IBackgroundSetModel
}

const TitleItem: FC<ITitleItemProps> = props => {
  const { title, titleFontColor, background } = props

  return useMemo(() => (
    <span className="heading"
      style={{
        color: titleFontColor,
        padding: initTitlePadding(background),
        background: initTitleBackground(background)
      }}
    >{title}</span>
  ), [background, title, titleFontColor])
}

export default TitleItem