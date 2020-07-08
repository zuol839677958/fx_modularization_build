import React, { Component } from 'react'
import { IPageModel } from '../../store/data'

import './index.less'
import { message } from 'antd'

interface IPreviewProps {
  pageHtml: string
}

class Preview extends Component<IPreviewProps> {
  componentDidMount(){
    let s:Element = document.querySelector(".share_box")!;
    let script = document.createElement("script");
    script.src = 'https://js.wbp5.com/script/public/jquery/jquery-1.8.3.min.js';
    s.appendChild(script);
    let script2 = document.createElement("script");
    script2.src = 'https://js.wbp5.com/script/public/Bshare/bshare.min.js';
    s.appendChild(script2);
    let script1 = document.createElement("script");
    script1.src = 'https://js.wbp5.com/script/public/QRCode/generate.min.js';
    s.appendChild(script1);
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