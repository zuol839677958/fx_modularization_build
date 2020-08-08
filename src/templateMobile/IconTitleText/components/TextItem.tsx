import React, { FC, useMemo } from 'react'

interface ITxtItemProps {
  text: string
  textFontColor?: string
}

const TxtItem: FC<ITxtItemProps> = props => {
  const { text, textFontColor } = props

  return useMemo(() => (
    <i className="txt" style={{ color: textFontColor }}>{text}</i>
  ), [text, textFontColor])
}

export default TxtItem