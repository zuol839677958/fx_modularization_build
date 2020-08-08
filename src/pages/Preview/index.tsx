import React, { PureComponent } from 'react'
import { IPageModel } from '../../store/data'
import { message } from 'antd'

import './index.less'
import { MobileTwoTone, FundProjectionScreenOutlined } from '@ant-design/icons'

interface IPreviewProps {
  pageHtml: string
}
interface IPreviewType{
    isWeb:boolean
}
class Preview extends PureComponent<IPreviewProps,IPreviewType> {
  state: IPreviewType = {
    isWeb: true
  }

  componentDidMount() {
    const ele: Element = document.querySelector(".share_box")!
    if (!ele) return
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
        <div className="preview_content">
          {
          this.state.isWeb?
            <section className="preview-wrap"  dangerouslySetInnerHTML={{ __html: pageHtml }}></section>
          : <section className="preview-mobile">
                  <div className="mobile-content">
                        <div className="editor-wrap">
                            <div className="mobile-wrap">
                              <iframe src="http://mtestolv1.tostar.top/special/3197" title="专题" style={{border:0,width:375,height:660}} frameBorder="0" ></iframe>
                              {/* <iframe src="https:m.baidu.com" title="专题" style={{border:0,width:370,height:660}} frameBorder="0" ></iframe> */}

                            </div>
                        </div>
                  </div>
            </section>
          }
          <section className="preview-bottom-bar">
              <div className="Mobile_box">
                <FundProjectionScreenOutlined onClick={ ()=>{ this.changeToWeb()} } style={{ fontSize:24,marginRight:10,color:"blue"}} /> 
                <MobileTwoTone onClick={ ()=>{ this.changeToMoblie()} } twoToneColor="#ddd" style={{ fontSize:24 }}/> 
              </div>
          </section>
        </div>
      )
    } catch (e) {
      message.error('模板解析错误！')
      return null
    }
  }
  changeToWeb = () => {
    this.setState({
       isWeb:true
    })

  }
  changeToMoblie =() =>{
    this.setState({
      isWeb:false
   })
  }

}

export default Preview