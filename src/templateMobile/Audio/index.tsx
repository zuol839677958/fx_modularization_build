import React, { FC } from 'react'
import { IAudioModel } from '../../store/data'

import './index.less'

interface IAudioProps {
  data: IAudioModel
}
const Audio: FC<IAudioProps> = props => {
    
  return (
    <div className="Audio_box">
        <section id="" className="linkBreak audio-wrapper">
            <audio ref="audio" src="https://file.wbp5.com/upload/files/master/2020/08/03/165957726.mp3" controls preload="auto"></audio>
            <div className="audio-left">
                <img id="audioPlayer"   className="play-pause" alt="" src="https://img.wbp5.com/upload/images/firstnews/2019/08/01/200512349.png" />
            </div>
            <div className="audio-right">
                <div className="progress-bar-bg" id="progressBarBg">
                    <em className="cache" style={{ width: '31.399%' }}></em>
                    <span id="progressDot"></span>
                </div>
                <div className="progress-bar" id="progressBar">

                </div>
            
                <div className="audio-time">
                    <span className="audio-length-current" id="audioCurTime">00:00</span>
                    <span className="audio-length-total">00:00</span>
                </div>
            </div>
        </section>
    </div>
  )
}

export default Audio