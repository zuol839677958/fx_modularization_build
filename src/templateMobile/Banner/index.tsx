import React, { FC } from 'react'
import { IBannerModel } from '../../store/data'

import './index.less'

interface IBannerProps {
  data: IBannerModel
}

const Banner: FC<IBannerProps> = props => {
  return (
    <div>banner模板</div>
  )
}

export default Banner