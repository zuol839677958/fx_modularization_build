import React, { FC, useMemo } from 'react'

interface IImageItemProps {
  picUrl: string
  picWidthPercent?: number
  isHidePic?: boolean
}

const ImageItem: FC<IImageItemProps> = props => {
  const { picUrl, picWidthPercent, isHidePic } = props

  return useMemo(() => (
    isHidePic ? null :
      <div className="describe_img">
        <img src={picUrl} alt="" data-preview-src={picUrl} data-preview-group="1"
          style={{ width: `${picWidthPercent}%` }}
        />
      </div>
  ), [isHidePic, picUrl, picWidthPercent])
}

export default ImageItem