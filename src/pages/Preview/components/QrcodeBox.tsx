import React, { FC, useMemo, memo } from 'react'
import CopyToClipboard from 'react-copy-to-clipboard'
import { message } from 'antd'
import QRCode from 'qrcode.react'

interface IQrcodeBoxProps {
  mobileSpecialLinkUrl: string
}

const QrcodeBox: FC<IQrcodeBoxProps> = props => {
  const { mobileSpecialLinkUrl } = props

  return useMemo(() => (
    <div className="qrcode_copy_url">
      <div className="qrcode">
        <h3>微信扫一扫，看效果</h3>
        <div className="qr_box">
          <QRCode
            value={mobileSpecialLinkUrl}  //value参数为生成二维码的链接
            size={140} //二维码的宽高尺寸
            fgColor="#000000"  //二维码的颜色
          />
        </div>
      </div>
      <div className="copy_url">
        <input value={mobileSpecialLinkUrl} readOnly />
        <div className="copy_box">
          <CopyToClipboard text={mobileSpecialLinkUrl}>
            <button onClick={() => message.success('复制成功')}>复制链接</button>
          </CopyToClipboard>
        </div>
      </div>
    </div>
  ), [mobileSpecialLinkUrl])
}

export default memo(QrcodeBox)