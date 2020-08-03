import React, { FC } from 'react'
import { IBannerModel } from '../../store/data'

import './index.less'

interface IBannerProps {
  data: IBannerModel
}

const Banner: FC<IBannerProps> = props => {
  return (
    <div className="content_box">
        <div className="img_content_box">
          <img  src="https://img.wbp5.com/upload/files/master/2020/06/02/165117995.png" alt=""/>
      </div>
      <div className="video_content_box">
          <video controls src="https://file.wbp5.com/upload/files/master/2020/07/25/154931384.mp4"></video>
      </div>
    </div>
    
  )
}

export default Banner