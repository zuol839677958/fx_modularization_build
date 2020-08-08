import React, { FC, useMemo } from 'react'

interface ITextItemProps {
  text: string
  textFontColor?: string
}

const TextItem: FC<ITextItemProps> = props => {
  const { text, textFontColor } = props

  return useMemo(() => (
    <div className="text"
      style={{ color: textFontColor }}
      dangerouslySetInnerHTML={{ __html: text }}></div>
  ), [text, textFontColor])
}

export default TextItem