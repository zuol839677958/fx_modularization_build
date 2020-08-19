import React, { FC, useEffect, useRef, useState, useCallback, useMemo, memo } from 'react'
import { IAudioModel } from '@/store/data'

import './index.less'

interface IAudioProps {
  data: IAudioModel
}

const Audio: FC<IAudioProps> = props => {
  const [allTime, setAllTime] = useState<string>('00:00')
  const { data } = props
  const audio = useRef<HTMLMediaElement>(null)

  //在音频可以播放时就显示总时长
  const canplay = useCallback(() => {
    if (!audio.current) return
    audio.current.oncanplay = () => {
      const duration = audio.current?.duration
      if (!duration) return
      const allTime =
        (Math.floor(duration / 60) + "").padStart(2, "0") +
        ":" +
        (Math.floor(duration % 60) + "").padStart(2, "0")
      setAllTime(allTime)
    }
  }, [])

  useEffect(() => {
    canplay()
  }, [canplay])

  return useMemo(() => (
    <div className="Audio_box">
      <section className="linkBreak audio-wrapper">
        <audio ref={audio} src={data.audioUrl || ''} controls preload="auto"></audio>
        <div className="audio-left">
          <img id="audioPlayer" className="play-pause" src="https://img.wbp5.com/upload/images/firstnews/2019/08/01/200512349.png" alt="" /></div>
        <div className="audio-right">
          <div className="progress-bar-bg" id="progressBarBg">
            <em className="cache" style={{ width: '53.81%' }}></em>
            <span id="progressDot"></span>
            <div className="progress-bar" id="progressBar"></div>
          </div>
          <div className="audio-time">
            <span className="audio-length-current" id="audioCurTime">00:00</span>
            <span className="audio-length-total">{allTime}</span>
          </div>
        </div>
      </section>
    </div>
  ), [allTime, data.audioUrl])
}

export default memo(Audio)