import React, { Fragment } from 'react'
import { IIconTitleTextModel } from '@/store/data'
import MasterTemplate, { IMasterTemplateProps, IMasterTemplateState, IRenderMaskParams } from '../MasterTemplate'
import { getIsShowList, initTemplatePositionStyle, initTitlePadding, initTitleBackground } from '@/utils'

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
        style={this.initTempCss(tempData.background, tempData.topSpacing, tempData.bottomSpacing)}
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
          filterList.map((tempData, index) => (
            <div className="rightContent-list" key={index} style={initTemplatePositionStyle(tempData.positionType!)}>
              <div className="list-left">
                {tempData.hasIcon ? <img className="des_icon" src={tempData.iconUrl} alt={tempData.title} /> : null}
                <span className="heading"
                  style={{
                    color: tempData.titleFontColor,
                    padding: initTitlePadding(tempData.background),
                    background: initTitleBackground(tempData.background)
                  }}
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
}

export default IconTitleText