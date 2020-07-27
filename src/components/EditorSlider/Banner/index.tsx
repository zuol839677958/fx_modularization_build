import React, { PureComponent, Fragment, Dispatch } from 'react'
import { IPageState, ITemplateModel, IBannerModel, IBannerVideoModel } from '../../../store/data'
import { connect } from 'react-redux'
import { Action } from 'redux'
import TitleBack from '../commonEditorComponent/titleBack'
import { Radio, Row, Slider, Input } from 'antd'
import { BannerType } from '../../EditorContainer/store/state'
import { changeTempData } from '../../EditorContainer/store/actions'
import { updateCurrentTempData } from '../../../utils/utils'
import { SliderValue } from 'antd/lib/slider'

import AliyunOSSUpload from '../../AliyunOSSUpload'

import "./index.less"

interface IEditorBannerProps {
  data: ITemplateModel<IBannerModel>
  allTempData?: ITemplateModel<any>[]
  changeTempData?: (allTempData: ITemplateModel<any>[]) => void
}

interface IEditorBannerState {
  typeIndex: number
  topTitle: string
}

class Banner extends PureComponent<IEditorBannerProps, IEditorBannerState> {
  state: IEditorBannerState = {
    typeIndex: 0,
    topTitle: "Banner模板编辑"
  }

  render() {
    const { data } = this.props
    const { typeIndex, topTitle } = this.state

    return (
      <Fragment>
        <TitleBack
          titleArrow={typeIndex === 1}
          title={topTitle!}
        />
        <div className="banner-select-box">
          <Row style={{ marginBottom: 20, flexDirection: 'column' }}>
            <p>模板间距(像素)</p>
            <Slider
              style={{ width: '100%' }}
              min={0}
              max={200}
              value={data.spacing || 0}
              onChange={this.changeTempSpacing}
            />
          </Row>
          <Radio.Group
            value={data.tempData.bannerType}
            onChange={e => this.changeBannerType(e.target.value)}
          >
            <Radio value={BannerType.SingleImage}>图片</Radio>
            {/* <Radio value={BannerType.Swiper}>轮播</Radio> */}
            <Radio value={BannerType.Video}>视频</Radio>
          </Radio.Group>
          <div className="action-box">
            {this.renderBannerTypeItem()}
          </div>
          <Row style={{ flexDirection: 'column', marginBottom: 20 }}>
            <p>是否铺满</p>
            <Radio.Group
              value={data.tempData.isFull}
              onChange={e => { this.changeBannerIsFull(e.target.value) }}>
              <Radio value={true}>是</Radio>
              <Radio value={false}>否</Radio>
            </Radio.Group>
          </Row>
          <Row style={{ flexDirection: 'column', marginBottom: 20 }}>
            <p>宽度(%)</p>
            <Slider
              style={{ width: '100%' }}
              min={1}
              max={100}
              value={data.tempData.widthPercent || 100}
              onChange={this.changeBannerWidth}
            />
          </Row>
        </div>
      </Fragment>
    )
  }

  // 更改模板间距
  changeTempSpacing = (spacing: SliderValue) => {
    const { data, allTempData, changeTempData } = this.props
    data.spacing = spacing as number
    updateCurrentTempData(data, allTempData!)
    changeTempData!(allTempData!)
  }

  // 切换Banner模板类型
  changeBannerType(e: number) {
    const { data, allTempData, changeTempData } = this.props
    data.tempData.bannerType = e
    updateCurrentTempData(data, allTempData!)
    changeTempData!(allTempData!)
  }

  // 加载Banner模板编辑子项
  renderBannerTypeItem() {
    const { data } = this.props

    switch (data.tempData.bannerType) {
      case BannerType.SingleImage:
        return <AliyunOSSUpload
          preImageUrl={data!.tempData.imageData.imageUrl}
          handleUploadImageChange={imageUrl => this.changeBannerSingleImageUrl(imageUrl)}
        />
      case BannerType.Video:
        return this.renderVedioEditor(data.tempData.videoData)
    }
  }

  // 渲染视频编辑项
  renderVedioEditor(videoData?: IBannerVideoModel) {
    return (
      <Fragment>
        <Row style={{ marginBottom: 20, flexDirection: 'column' }}>
          <p>视频封面</p>
          <AliyunOSSUpload
            preImageUrl={videoData?.poster}
            uploadTip="上传视频封面"
            handleUploadImageChange={this.changeVideoPoster}
          />
        </Row>
        <Row style={{ marginBottom: 20, flexDirection: 'column' }}>
          <p>视频链接地址</p>
          <Input placeholder="请输入视频链接地址"
            value={videoData?.videoSrc}
            onChange={e => this.changeVideoSrc(e.target.value)}
          />
        </Row>
      </Fragment>
    )
  }

  // 更换Banner单图
  changeBannerSingleImageUrl = (imageUrl: string) => {
    const { data, allTempData, changeTempData } = this.props
    const tempData = data.tempData
    tempData.imageData.imageUrl = imageUrl
    updateCurrentTempData(data, allTempData!)
    changeTempData!(allTempData!)
  }

  // 切换Banner是否铺满
  changeBannerIsFull(isFull: boolean) {
    const { data, allTempData, changeTempData } = this.props
    const tempData = data.tempData
    tempData.isFull = isFull
    updateCurrentTempData(data, allTempData!)
    changeTempData!(allTempData!)
  }

  // 更改Banner宽度
  changeBannerWidth = (widthPercent: SliderValue) => {
    const { data, allTempData, changeTempData } = this.props
    const tempData = data.tempData
    tempData.widthPercent = widthPercent as number
    updateCurrentTempData(data, allTempData!)
    changeTempData!(allTempData!)
  }

  // 更改视频封面
  changeVideoPoster = (poster: string) => {
    const { data, allTempData, changeTempData } = this.props
    const tempData = data.tempData
    if (tempData.videoData) tempData.videoData!.poster = poster
    else tempData.videoData = {
      poster,
      videoSrc: ''
    }
    updateCurrentTempData(data, allTempData!)
    changeTempData!(allTempData!)
  }


  // 更改视频链接地址
  changeVideoSrc(videoSrc: string) {
    const { data, allTempData, changeTempData } = this.props
    const tempData = data.tempData
    if (tempData.videoData) tempData.videoData!.videoSrc = videoSrc
    else tempData.videoData = {
      poster: '',
      videoSrc
    }
    updateCurrentTempData(data, allTempData!)
    changeTempData!(allTempData!)
  }
}

const mapStateToProps = (state: IPageState, ownProps: IEditorBannerProps) => ({
  allTempData: state.editorContainerReducer.allTempData
})

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
  changeTempData(allTempData: ITemplateModel<any>[]) {
    dispatch(changeTempData(allTempData))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Banner)