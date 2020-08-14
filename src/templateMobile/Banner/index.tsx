import React, { FC, useMemo, useCallback } from 'react'
import { IBannerModel } from '../../store/data'
import { BannerType } from '../../components/web/EditorContainer/store/state'

import './index.less'

interface IBannerProps {
  data: IBannerModel
}

const Banner: FC<IBannerProps> = props => {
  const { data } = props

  const renderBannerTemplate = useCallback(() => {
    switch (data.bannerType) {
      case BannerType.SingleImage:
        return (
          <>
            {
              data.isFull ?
                <img
                  style={{ width: `${data.widthPercent || 100}%` }}
                  src={data.imageData.imageUrl}
                  title={data.imageData.imageTitle}
                  alt={data.imageData.imageDesc} />
                :
                <img
                  style={{ width: `${data.widthPercent || 100}%` }}
                  data-preview-src ={data.imageData.imageUrl}
                  data-preview-group="1"
                  src={data.imageData.imageUrl}
                  title={data.imageData.imageTitle}
                  alt={data.imageData.imageDesc} />
            }
          </>
        )
      case BannerType.Swiper:
      case BannerType.Video:
        return (
          <video
            style={{ width: `${data.widthPercent || 100}%` }}
            controls
            poster={data.videoData?.poster}
            src={data.videoData?.videoSrc}
          />
        )
      default:
        return <></>
    }
  }, [data.bannerType, data.imageData.imageDesc, data.imageData.imageTitle, data.imageData.imageUrl, data.isFull, data.videoData, data.widthPercent])

  return useMemo(() => (
    <div className={`banner_mbox ${data.isFull ? 'isFull' : ''}`}>{renderBannerTemplate()}</div>
  ), [data.isFull, renderBannerTemplate])
}

export default Banner