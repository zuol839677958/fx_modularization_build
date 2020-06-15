import React, { Component } from 'react'
import { Button } from 'antd'
import { IPageState, IBackgroundSetModel } from '../../store/data'
import { Dispatch, Action } from 'redux'
import { connect } from 'react-redux'
import { changeBackgroundSetData } from '../BackgroundSet/store/actions'

import './index.less'

interface IHeaderProps {
  backgroundSetData?: IBackgroundSetModel
  changeBackgroundSetData?: (backgroundSet: IBackgroundSetModel) => void
}

interface IHeaderState { }

class Header extends Component<IHeaderProps, IHeaderState> {
  render() {
    return (
      <div className="header-wrap">
        <div className="header-left">
          <Button type="primary" shape="round">新增模块</Button>
          <Button type="primary" shape="round"
            style={{ marginLeft: 20 }}
            onClick={() => this.setPageBackground()}
          >设置背景</Button>
        </div>
        <div className="header-center">
          <span>通用专题模块化</span>
        </div>
        <div className="header-right">
          <Button type="default" shape="round">预览</Button>
          <Button type="primary" shape="round" style={{ marginLeft: 20 }}>保存</Button>
          <Button type="link" style={{ marginLeft: 20 }}>帮助说明</Button>
        </div>
      </div>
    )
  }

  setPageBackground() {
    let { backgroundSetData, changeBackgroundSetData } = this.props
    backgroundSetData!.isShow = true
    changeBackgroundSetData!(backgroundSetData!)
  }
}

const mapStateToProps = (state: IPageState, ownProps: IHeaderProps) => ({
  backgroundSetData: state.backgroundSetReducer
})

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
  changeBackgroundSetData(backgroundSet: IBackgroundSetModel) {
    dispatch(changeBackgroundSetData(backgroundSet))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Header)