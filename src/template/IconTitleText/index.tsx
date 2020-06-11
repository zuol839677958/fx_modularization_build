import React, { Fragment } from 'react'
import { ITemplateModel, IIconTitleTextModel } from '../../store/data'
import MasterTemplate, { IMasterTemplateProps } from '../MasterTemplate'

import './index.less'

interface IIconTitleTextProps extends IMasterTemplateProps {
  iconTitleTextTempData: ITemplateModel
}

class IconTitleText extends MasterTemplate<IIconTitleTextProps> {
  render() {
    const { iconTitleTextTempData } = this.props

    return (
      <div id={iconTitleTextTempData.id} className="iconTitleText_box">
        {this.renderTemplateItem(iconTitleTextTempData.tempData as IIconTitleTextModel[])}
      </div>
    )
  }

  renderTemplateItem(tempDataList: IIconTitleTextModel[]): JSX.Element {
    if (tempDataList.length === 0) return <Fragment></Fragment>
    const filterList = this.getIsShowList(tempDataList) as IIconTitleTextModel[]
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