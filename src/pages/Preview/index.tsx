import React, { Component } from 'react'
import { IPageModel } from '../../store/data'

import './index.less'
import { message } from 'antd'

interface IPreviewProps {
  pageHtml: string
}

class Preview extends Component<IPreviewProps> {
  componentDidMount() {
    const ele: Element = document.querySelector(".share_box")!
    const script1 = document.createElement("script")
    script1.src = 'https://js.wbp5.com/script/public/jquery/jquery-1.8.3.min.js'
    ele.appendChild(script1)
    script1.onload = () => {
      const script2 = document.createElement("script")
      script2.src = 'https://js.wbp5.com/script/public/Bshare/bshare.min.js'
      ele.appendChild(script2)
      const script3 = document.createElement("script")
      script3.src = 'https://js.wbp5.com/script/public/QRCode/generate.min.js'
      ele.appendChild(script3)
      const script4 = document.createElement("script")
      script4.src = 'https://www.fx110.com.tw/Scripts/SharedViewmin/twShare.js'
      ele.appendChild(script4)
    }
  }

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