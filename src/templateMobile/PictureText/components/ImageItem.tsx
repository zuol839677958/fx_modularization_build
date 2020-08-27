import React, { FC, useMemo } from 'react'

interface IImageItemProps {
  picUrl: string
  picWidthPercent?: number
  isNotShowPic?: boolean
}

const ImageItem: FC<IImageItemProps> = props => {
  const { picUrl, picWidthPercent, isNotShowPic } = props

  return useMemo(() => (
    isNotShowPic ? null :
      <div className="describe_img">
        <img src={picUrl} alt="" data-preview-src={picUrl} data-preview-group="1"
          style={{ width: `${picWidthPercent}%` }}
        />
      </div>
  ), [isNotShowPic, picUrl, picWidthPercent])
}

export default ImageItem