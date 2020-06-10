import React, { Component, Fragment } from 'react'
import { ITemplateModel, IIconTitleTextModel } from '../../store/data'

import './index.less'

interface IIconTitleTextProps {
  iconTitleTextTempData: ITemplateModel
}

class IconTitleText extends Component<IIconTitleTextProps> {
  render() {
    const { iconTitleTextTempData } = this.props

    return (
      <div id={iconTitleTextTempData.id} className="iconTitleText_box">
        {this.renderTemplateItem(iconTitleTextTempData.tempData as IIconTitleTextModel[])}
      </div>
    )
  }

  renderTemplateItem(tempDataList: IIconTitleTextModel[]): JSX.Element {
    if (!tempDataList) return <Fragment></Fragment>
    return (
      <Fragment>
        {
          tempDataList.map(tempData => (
            <div className="rightContent-list" key={tempData.itemSort}>
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