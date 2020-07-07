import React, { Component, Fragment, Dispatch } from 'react'
import { IPageState, ITemplateModel, IBannerModel } from '../../../store/data'
import { connect } from 'react-redux'
import { Action } from 'redux'
import TitleBack from '../commonEditorComponent/titleBack'
import { Radio, Row, Slider } from 'antd'
import { BannerType } from '../../EditorContainer/store/state'
import { changeTempData } from '../../EditorContainer/store/actions'
import { updateCurrentTempData } from '../../../utils/utils'

import AliyunOSSUpload from '../../AliyunOSSUpload'

import "./index.less"

interface IEditorBannerProps {
  data: ITemplateModel
  allTempData?: ITemplateModel[]
  changeTempData?: (allTempData: ITemplateModel[]) => void
}

interface IEditorBannerState {
  typeIndex: number
  topTitle: string
  bannerType: BannerType
}

class Banner extends Component<IEditorBannerProps, IEditorBannerState> {
  state: IEditorBannerState = {
    typeIndex: 0,
    topTitle: "Banner模板编辑",
    bannerType: BannerType.SingleImage
  }

  render() {
    const { data } = this.props
    const { typeIndex, topTitle, bannerType } = this.state

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
              onChange={value => this.changeTempSpacing(value as number)}
            />
          </Row>
          <Radio.Group
            value={bannerType}
            onChange={e => { this.changeBannerType(e.target.value) }}
          >
            <Radio value={BannerType.SingleImage}>图片</Radio>
            <Radio value={BannerType.Swiper}>轮播</Radio>
            <Radio value={BannerType.Video}>视频</Radio>
          </Radio.Group>
          <div className="action-box">
            {this.renderBannerTypeItem()}
          </div>
          <Row style={{ flexDirection: 'column', marginBottom: 20 }}>
            <p>是否铺满</p>
            <Radio.Group
              value={(data.tempData as IBannerModel).isFull}
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
              value={(data.tempData as IBannerModel).widthPercent || 100}
              onChange={value => this.changeBannerWidth(value as number)}
            />
          </Row>
        </div>
      </Fragment>
    )
  }

  // 更改模板间距
  changeTempSpacing(spacing: number) {
    const { data, allTempData, changeTempData } = this.props
    data.spacing = spacing
    updateCurrentTempData(data, allTempData!)
    changeTempData!(allTempData!)
  }

  // 切换Banner模板类型
  changeBannerType(e: number) {
    this.setState({ bannerType: e })
  }

  // 加载Banner模板编辑子项
  renderBannerTypeItem() {
    const { data } = this.props
    const { bannerType } = this.state

    switch (bannerType) {
      case BannerType.SingleImage:
        return <AliyunOSSUpload
          preImageUrl={(data!.tempData as IBannerModel).imageData.imageUrl}
          handleUploadImageChange={imageUrl => this.changeBannerSingleImageUrl(imageUrl)}
        />
    }
  }

  // 更换Banner单图
  changeBannerSingleImageUrl(imageUrl: string) {
    const { data, allTempData, changeTempData } = this.props
    const tempData = data.tempData as IBannerModel
    tempData.imageData.imageUrl = imageUrl
    updateCurrentTempData(data, allTempData!)
    changeTempData!(allTempData!)
  }

  // 切换Banner是否铺满
  changeBannerIsFull(isFull: boolean) {
    const { data, allTempData, changeTempData } = this.props
    const tempData = data.tempData as IBannerModel
    tempData.isFull = isFull
    updateCurrentTempData(data, allTempData!)
    changeTempData!(allTempData!)
  }

  // 更改Banner宽度
  changeBannerWidth(widthPercent: number) {
    const { data, allTempData, changeTempData } = this.props
    const tempData = data.tempData as IBannerModel
    tempData.widthPercent = widthPercent
    updateCurrentTempData(data, allTempData!)
    changeTempData!(allTempData!)
  }
}

const mapStateToProps = (state: IPageState, ownProps: IEditorBannerProps) => ({
  allTempData: state.editorContainerReducer.allTempData
})

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
  changeTempData(allTempData: ITemplateModel[]) {
    dispatch(changeTempData(allTempData))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Banner)