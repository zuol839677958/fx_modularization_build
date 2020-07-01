import React, { Component, Fragment, Dispatch } from 'react'
import { IPageState, ITemplateModel, IBannerModel } from '../../../store/data'
import { connect } from 'react-redux'
import { Action } from 'redux'
import TitleBack from '../commonEditorComponent/titleBack'
import { Radio } from 'antd'
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
          <p>是否铺满</p>
          <Radio.Group
            value={(data.tempData as IBannerModel).isFull}
            onChange={e => { this.changeBannerIsFull(e.target.value) }}>
            <Radio value={true}>是</Radio>
            <Radio value={false}>否</Radio>
          </Radio.Group>
        </div>
      </Fragment>
    )
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