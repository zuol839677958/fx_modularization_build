import React, { Component } from 'react'
import { Button } from 'antd'

import './index.less'

class Header extends Component {
  render() {
    return (
      <div className="header-wrap">
        <div className="header-left">
          <Button type="primary" shape="round">新增模块</Button>
          <Button type="primary" shape="round" style={{ marginLeft: 20 }}>设置背景</Button>
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
}


export default Header