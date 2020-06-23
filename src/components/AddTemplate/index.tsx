import React, { Component } from 'react'
import { connect } from 'react-redux'
import { IPageState } from '../../store/data'
import { Dispatch, Action } from 'redux'
import { changeAddTemplateSliderShow } from './store/actions'

import TitleBack from '../EditorSlider/commonEditorComponent/titleBack'

import './index.less'

interface IAddTemplateProps {
  isShow?: boolean
  changeAddTemplateSliderShow?: (isShow: boolean) => void
}

interface IAddTemplateState {

}

class AddTemplate extends Component<IAddTemplateProps, IAddTemplateState> {
  render() {
    const { isShow } = this.props

    return (
      <div className="addTemplate_slider" style={{ display: isShow ? 'block' : 'none' }}>
        <TitleBack
          title='新增模块'
          titleArrow={false}
          customCloseSlider={() => this.closeAddTemplateSlider()}
        />
      </div>
    )
  }

  // 关闭新增模块侧滑栏
  closeAddTemplateSlider() {
    const { changeAddTemplateSliderShow } = this.props
    changeAddTemplateSliderShow!(false)
  }
}

const mapStateToProps = (state: IPageState, ownProps: IAddTemplateProps) => ({
  isShow: state.addTemplateSliderReducer.isShow
})

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
  changeAddTemplateSliderShow(isShow: boolean) {
    dispatch(changeAddTemplateSliderShow(isShow))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(AddTemplate)