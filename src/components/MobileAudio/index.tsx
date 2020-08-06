import React, { Component } from "react"
import { IAudioModel } from "../../store/data"

import "./index.less"

interface AudioState {
  current: string
  allTime: string
  isPlay?: boolean
}
interface IAudioProps {
  data: IAudioModel
}

class AudioTemp extends Component<IAudioProps, AudioState> {
  outer: React.RefObject<any>
  inner: React.RefObject<any>
  audio: React.RefObject<any>

  constructor(props: IAudioProps) {
    super(props)
    this.state = {
      current: "00:00", //当前时间
      allTime: "00:00", //当前歌曲时长
      isPlay: false  //是否是播放状态
    }

    this.outer = React.createRef() //自定义进度条外框
    this.inner = React.createRef() //自定义进度条内核
    this.audio = React.createRef()
    this.audioX = this.audioX.bind(this)
    this.canplay = this.canplay.bind(this)
    this.timeUpdate = this.timeUpdate.bind(this)
  }

  componentDidMount() {
    this.canplay()
    this.timeUpdate()
  }

  //在音频可以播放时就显示总时长
  canplay() {
    if (!this.audio.current.duration) return
    this.audio.current.oncanplay = () => {
      const allTime =
        (Math.floor(this.audio.current.duration / 60) + "").padStart(2, "0") +
        ":" +
        (Math.floor(this.audio.current.duration % 60) + "").padStart(2, "0")
      this.setState({
        allTime
      })
    }
  }

  audioWaiting() {
    this.audio.current.onwaiting = () => {
      alert("加载中")
    }
  }

  //在音频播放时当前时间也跟着变化
  timeUpdate() {
    this.audio.current.ontimeupdate = () => {
      // console.log(this.audio.current.currentTime)
      // console.log(this.audio.current.duration)
      var currentTime =
        (Math.floor(this.audio.current.currentTime / 60) + "").padStart(
          2,
          "0"
        ) +
        ":" +
        (Math.floor(this.audio.current.currentTime % 60) + "").padStart(2, "0")
      this.setState({
        current: currentTime
      })
      this.inner.current.style.width =
        (this.audio.current.currentTime / this.audio.current.duration) * 100 +
        "%"
    }
  }

  //播放速度
  audioPlayBackRate(str: string) {
    this.audio.current.playbackRate = str
  }

  //播放
  audioPlay() {
    if (this.state.isPlay) {
      this.setState({
        isPlay: false
      })
      this.audio.current.pause()
    } else {
      this.setState({
        isPlay: true
      })
      this.audio.current.play()
    }
  }

  //快进
  audioGo() {
    this.audio.current.currentTime += 20
  }

  //快退
  audioBack() {
    this.audio.current.currentTime -= 20
  }

  //设置播放进度
  audioX(e: any) {
    console.log(e.targetTouches[0].clientX)
    var outerWidth = this.outer.current.offsetWidth //父元素宽
    var innerWidth =
      e.targetTouches[0].clientX -
      this.outer.current.getBoundingClientRect().left //鼠标到可视区左侧的距离-父元素到可视区左侧的距离
    if (innerWidth > outerWidth || innerWidth < 0) {
      return
    }
    this.inner.current.style.width = innerWidth + "px"
    this.audio.current.currentTime =
      (innerWidth / outerWidth) * this.audio.current.duration
    this.audio.current.play()
  }

  handleAudio() {
    let audio = this.audio.current
    // timeupdate,播放位置改变时触发
    audio.addEventListener("timeupdate", () => {
      console.log("播放位置改变")
    })
    // canplay,表示音频可以播放了，准备就绪
    audio.addEventListener("canplay", () => {
      console.log("可以播放了")
    })
    // progress，音频在加载或缓冲
    audio.addEventListener("progress", () => {
      console.log("音频在加载或缓冲")
    })
    // waiting,需要缓冲下一帧而停止播放时触发
    audio.addEventListener("waiting", () => {
      console.log("需要缓冲下一帧")
    })
    // playing,音频或视频已开始播放时触发
    audio.addEventListener("playing", () => {
      console.log("开始播放")
    })
    // pause,音频或视频文件暂停时触发
    audio.addEventListener("pause", () => {
      console.log("已经暂停")
    })
  }

  render() {
    const { data } = this.props
    const { current, allTime, isPlay } = this.state

    return (
      <div className="Audio_box">
        <section id="" className="linkBreak audio-wrapper">
          <audio ref={this.audio} src={data.audioUrl} controls preload="auto"></audio>
          <div className="audio-left">
            {isPlay ?
               <img id="audioPlayer" onClick={() => this.audioPlay()} className="play-pause" alt="" src="https://img.wbp5.com/upload/images/firstnews/2019/07/31/144634661.png" />
              :<img id="audioPlayer" onClick={() => this.audioPlay()} className="play-pause" alt="" src="https://img.wbp5.com/upload/images/firstnews/2019/08/01/200512349.png" />
            }
          </div>

          <div className="audio-right">
            <div
              className="outer"
              ref={this.outer}
              onTouchMove={e => this.audioX(e)}
              onTouchStart={e => this.audioX(e)}
            >
              <div className="inner" ref={this.inner}>
                <div className="innerBtn"></div>
              </div>
            </div>
            <div className="audio-time">
              <span className="audio-length-current" id="audioCurTime">{current}</span>
              <span className="audio-length-total">{allTime}</span>
            </div>
          </div>
        </section>
      </div>
    )
  }
}

export default AudioTemp