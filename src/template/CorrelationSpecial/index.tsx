
import React, { Fragment } from 'react'
import MasterTemplate, { IMasterTemplateProps, IMasterTemplateState, IRenderMaskParams } from '../MasterTemplate'
import { ICorrelationSpecialModel } from '../../store/data'
import { getSepecialLinkUrl } from '../../axios/env'

import './index.less'

interface ICorrelationSpecialProps extends IMasterTemplateProps { }

interface ICorrelationSpecialState extends IMasterTemplateState { }

class CorrelationSpecial extends MasterTemplate<ICorrelationSpecialProps> {
  state: ICorrelationSpecialState = {
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
      <div id={tempData.id}
        className={`correlationSpecial_box`}
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
        <div className="head-tip" style={{ color: tempData.fontColor }}>相关专题</div>
        {this.renderCorrelationSpecialList(tempData.tempData as ICorrelationSpecialModel[])}
      </div>
    )
  }

  renderCorrelationSpecialList(tempData: ICorrelationSpecialModel[]): JSX.Element {
    return (
      <Fragment>
        <div className="special_list_box">
          {
            tempData.map(item => (
              <div className="special_list" key={item.specailId} id={"s_" + item.specailId} >
                <a href={`${getSepecialLinkUrl()}${item.specailId}`} target="_blank" rel="noopener noreferrer">
                  <div className="special_top">
                    <img src={item.imageUrl} alt="" />
                  </div>
                  <div className="special_bottom">
                    <span>
                      {item.title}
                    </span>
                  </div>
                </a>
              </div>
            ))
          }
        </div>
      </Fragment>
    )
  }
}

export default CorrelationSpecial 