import React, { FC } from 'react'
import { IAudioModel } from '../../store/data'

import AudioTemp from '../../components/MobileAudio'

import './index.less'

interface IAudioProps {
  data: IAudioModel
}

const Audio: FC<IAudioProps> = props => {
  const { data } = props

  return (
    <AudioTemp data={data} />
  )
}

export default Audio