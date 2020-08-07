import React, { FC, useMemo } from 'react'

interface ITxtItemProps {
  text: string
  textFontColor?: string
}

const TxtItem: FC<ITxtItemProps> = props => {
  const { text, textFontColor } = props

  return useMemo(() => (
    <div className="text"
      style={{ color: textFontColor }}
      dangerouslySetInnerHTML={{ __html: text }}></div>
  ), [text, textFontColor])
}

export default TxtItem