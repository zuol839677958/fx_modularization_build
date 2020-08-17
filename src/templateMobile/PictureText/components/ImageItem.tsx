import React, { FC, useMemo } from 'react'

interface IImageItemProps {
  picUrl: string
  picWidthPercent?: number
}

const ImageItem: FC<IImageItemProps> = props => {
  const { picUrl, picWidthPercent } = props

  return useMemo(() => (
    <div className="describe_img">
      <img src={picUrl} alt="" data-preview-src={picUrl} data-preview-group="1"
        style={{ width: `${picWidthPercent}%` }}
      />
    </div>
  ), [picUrl, picWidthPercent])
}

export default ImageItem