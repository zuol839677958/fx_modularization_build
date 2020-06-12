import React, { Fragment } from 'react'
import { ITemplateModel, IIconTitleTextModel } from '../../store/data'
import MasterTemplate, { IMasterTemplateProps, IMasterTemplateState, IRenderMaskParams } from '../MasterTemplate'
import { getIsShowList } from '../../utils/utils'

import './index.less'

interface IIconTitleTextProps extends IMasterTemplateProps {
  activeTempId: string
  allTempData: ITemplateModel[]
  iconTitleTextTempData: ITemplateModel
  changeActiveTempId: (activeTempId: string) => void
  showEditorSlider: () => void
  changeTempData: (allTempData: ITemplateModel[]) => void
}

interface IIconTitleTextState extends IMasterTemplateState { }

class IconTitleText extends MasterTemplate<IIconTitleTextProps> {
  state: IIconTitleTextState = {
    isShowMask: false
  }

  render() {
    const {
      activeTempId,
      iconTitleTextTempData,
      allTempData,
      changeActiveTempId,
      showEditorSlider,
      changeTempData
    } = this.props
    const maskParams: IRenderMaskParams = {
      tempId: iconTitleTextTempData.id,
      activeTempId,
      tempSort: iconTitleTextTempData.sort,
      allTempData,
      changeActiveTempId,
      showEditorSlider,
      changeTempData
    }

    return (
      <div id={iconTitleTextTempData.id} className="iconTitleText_box"
        onMouseEnter={() => this.setState({ isShowMask: true })}
        onMouseLeave={() => this.setState({ isShowMask: false })}
        onClick={(e) => {
          changeActiveTempId(iconTitleTextTempData.id)
          showEditorSlider()
        }}
      >
        {this.renderMask(maskParams)}
        {this.renderTemplateItem(iconTitleTextTempData.tempData as IIconTitleTextModel[])}
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
                <img className="des_icon" src={tempData.iconUrl} alt={tempData.title} />
                <span className="heading">{tempData.title}</span>
              </div>
              <div className="list-right">
                <p className="txt">: {tempData.text}</p>
              </div>
            </div>
          ))
        }
      </Fragment>
    )
  }
}

export default IconTitleText