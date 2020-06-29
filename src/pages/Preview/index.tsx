import React, { Component } from 'react'
import { IPageModel } from '../../store/data'

import './index.less'

interface IPreviewProps {
  pageHtml: string
}

class Preview extends Component<IPreviewProps> {
  render() {
    const pageData = JSON.parse(localStorage.getItem('pageEditorData') as string) as IPageModel
    const { pageHtml } = pageData

    return (
      <section className="preview-wrap" dangerouslySetInnerHTML={{ __html: pageHtml }}></section>
    )
  }
}

export default Preview