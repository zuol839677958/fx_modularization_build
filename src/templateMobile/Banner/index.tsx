import React, { FC } from 'react'
import { IBannerModel } from '../../store/data'
import { BannerType } from '../../components/EditorContainer/store/state'

import './index.less'

interface IBannerProps {
  data: IBannerModel
}

const Banner: FC<IBannerProps> = props => {
  const { data } = props

  const renderBannerTemplate = () => {
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
                  data-preview-src
                  data-preview-group="1"
                  src={data.imageData.imageUrl}
                  title={data.imageData.imageTitle}
                  alt={data.imageData.imageDesc} />
            }
          </>
        )
      case BannerType.Swiper:
      case BannerType.Video:
      default:
        return <></>

        
    }
  }

  return (
    <div className={`banner_mbox ${data.isFull ? 'isFull' : ''}`}>{renderBannerTemplate()}</div>
  )
}

export default Banner