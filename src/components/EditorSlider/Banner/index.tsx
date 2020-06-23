import React, { Component, Fragment, Dispatch } from 'react'
import { IPageState, ITemplateModel } from '../../../store/data'
import { connect } from 'react-redux'
import { Action } from 'redux'
import TitleBack from '../commonEditorComponent/titleBack'
import { Radio } from 'antd'
import { BannerType } from '../../EditorContainer/store/state'

import "./index.less"

interface IEditorBannerProps {
  data?: ITemplateModel
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
    const { typeIndex, topTitle } = this.state;

    return (
      <Fragment>
        <TitleBack
          titleArrow={typeIndex === 1}
          title={topTitle!}
        />
        <div className="banner-select-box">
          <Radio.Group onChange={(e) => { this.onChange(e.target.value) }} value={this.state.bannerType}>
            <Radio value={BannerType.SingleImage}>图片</Radio>
            <Radio value={BannerType.Swiper}>轮播</Radio>
            <Radio value={BannerType.Video}>视频</Radio>
          </Radio.Group>
          <div className="img-content-box" style={{ display: this.state.bannerType === BannerType.SingleImage ? "block" : "none" }}>
            <div className="img-box" >
              <img src="https://imgs.wbp5.com/api/secrecymaster/html_up/2019/6/20190610115945561.png" alt="" />
            </div>
            <div className="size-tip">图片大小≤500KB</div>
          </div>
        </div>
      </Fragment>
    )
  }

  onChange(e: number) {
    console.log('radio checked', e)
    this.setState({
      bannerType: e,
    })
  }
}


const mapStateToProps = (state: IPageState, ownProps: IEditorBannerProps) => ({
  allTempData: state.editorContainerReducer.allTempData,
})

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
  changeTempData(allTempData: ITemplateModel[]) {

  },
})

export default connect(mapStateToProps, mapDispatchToProps)(Banner)