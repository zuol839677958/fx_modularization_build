import React, { Fragment } from 'react'
import { IIconTitleTextModel, IBackgroundSetModel } from '../../store/data'
import MasterTemplate, { IMasterTemplateProps, IMasterTemplateState, IRenderMaskParams } from '../MasterTemplate'
import { getIsShowList } from '../../utils/utils'
import { BackgroundSetType } from '../../components/BackgroundSet/store/state'

import './index.less'

interface IIconTitleTextProps extends IMasterTemplateProps { }

interface IIconTitleTextState extends IMasterTemplateState { }

class IconTitleText extends MasterTemplate<IIconTitleTextProps> {
  state: IIconTitleTextState = {
    isShowMask: false
  }

  render() {
    const {
      activeTempId,
      tempData,
      allTempData,
      changeActiveTempId,
      changeEditorSliderShow,
      changeTempData,
      setTempBackground,
      changeAddTemplateSliderShow,
      changeEditorSliderTab
    } = this.props
    const maskParams: IRenderMaskParams = {
      tempId: tempData.id,
      activeTempId,
      tempSort: tempData.sort,
      allTempData,
      changeActiveTempId,
      changeEditorSliderShow,
      changeTempData,
      setTempBackground,
      tempBackground: tempData.background,
      changeAddTemplateSliderShow,
      changeEditorSliderTab
    }

    return (
      <div id={tempData.id} className="iconTitleText_box"
        style={this.initTempBackground(tempData.background, tempData.spacing)}
        onMouseEnter={() => this.setState({ isShowMask: true })}
        onMouseLeave={() => this.setState({ isShowMask: false })}
        onClick={(e) => {
          changeActiveTempId(tempData.id)
          changeEditorSliderShow(true)
          changeAddTemplateSliderShow(false)
          changeEditorSliderTab(0)
        }}
      >
        {this.renderMask(maskParams)}
        {this.renderTemplateItem(tempData.tempData as IIconTitleTextModel[])}
      </div>
    )
  }

  renderTemplateItem(tempDataList: IIconTitleTextModel[]): JSX.Element {
    if (tempDataList.length === 0) return <Fragment></Fragment>
    const filterList = getIsShowList(tempDataList) as IIconTitleTextModel[]
    return (
      <Fragment>
        {
          filterList.map(tempData => (
            <div className="rightContent-list" key={tempData.sort}>
              <div className="list-left">
                {tempData.hasIcon ? <img className="des_icon" src={tempData.iconUrl} alt={tempData.title} /> : null}
                <span className="heading"
                  style={{ color: tempData.titleFontColor, background: this.initTitleBackground(tempData.background) }}
                >{tempData.title}</span>
              </div>
              <div className="list-right">
                <p className="txt" style={{ color: tempData.textFontColor }}>{tempData.text}</p>
              </div>
            </div>
          ))
        }
      </Fragment>
    )
  }

  initTitleBackground(backgroundSet?: IBackgroundSetModel) {
    if (!backgroundSet) return ''
    switch (backgroundSet.bgType) {
      case BackgroundSetType.NoneColor:
        return 'none'
      case BackgroundSetType.PureColor:
        return backgroundSet.bgColor
      case BackgroundSetType.BackgroundImage:
        return `url(${backgroundSet.bgImageUrl}) center center / cover no-repeat`
      default:
        return ''
    }
  }
}

export default IconTitleText