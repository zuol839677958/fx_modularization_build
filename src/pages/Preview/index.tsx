import React, { FC, useState } from 'react'
import { message } from 'antd'
import { MobileTwoTone, FundProjectionScreenOutlined } from '@ant-design/icons'
import QRCode from 'qrcode.react'
import CopyToClipboard from 'react-copy-to-clipboard'

import './index.less'

interface IPreviewType {
  isWeb: boolean
  preUrl: string
  copied: boolean
}

const Preview: FC = () => {
  const [isWeb, setIsWeb] = useState<boolean>(true)

  return (
    <div className="preview_content">
      {
        isWeb ?
          <section className="preview-wrap">
            <iframe src="https://www.fx110.uk/special/1173" title="Web专题" style={{ border: 0, width: '100%', height: 'calc(100vh - 75px)' }} frameBorder="0"></iframe>
          </section>
          : <section className="preview-mobile">
            <div className="mobile-content">
              <div className="editor-wrap">
                <div className="mobile-wrap">
                  <iframe src="http://mtestolv1.tostar.top/special/3197" title="专题" style={{ border: 0, width: 375, height: 660 }} frameBorder="0"></iframe>
                </div>
              </div>
              <div className="qrcode_copy_url">
                <div className="qrcode">
                  <h3>微信扫一扫，看效果</h3>
                  <div className="qr_box">
                    <QRCode
                      value='https://fx110.uk'  //value参数为生成二维码的链接
                      size={140} //二维码的宽高尺寸
                      fgColor="#000000"  //二维码的颜色
                    />
                  </div>
                </div>
                <div className="copy_url">
                  <input value='https://fx110.uk' />
                  <div className="copy_box">
                    <CopyToClipboard text='https://fx110.uk'>
                      <button onClick={() => message.success('复制成功')}>复制链接</button>
                    </CopyToClipboard>
                  </div>
                </div>
              </div>
            </div>
          </section>
      }
      <section className="preview-bottom-bar">
        <div className="Mobile_box">
          <FundProjectionScreenOutlined onClick={() => setIsWeb(true)} style={{ fontSize: 24, marginRight: 10, color: "blue" }} />
          <MobileTwoTone onClick={() => setIsWeb(false)} twoToneColor="#ddd" style={{ fontSize: 24 }} />
        </div>
      </section>
    </div>
  )
}

export default Preview