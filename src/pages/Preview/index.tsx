import React, { Component } from 'react'
import { IPageModel } from '../../store/data'

import './index.less'
import { message } from 'antd'

interface IPreviewProps {
  pageHtml: string
}

class Preview extends Component<IPreviewProps> {
  render() {
    try {
      const pageData = JSON.parse(localStorage.getItem('pageEditorData') as string) as IPageModel
      const { pageHtml } = pageData

      return (
        <section className="preview-wrap" dangerouslySetInnerHTML={{ __html: pageHtml }}></section>
      )
    } catch (e) {
      message.error('模板解析错误！')
      return null
    }
  }
}

export default Preview