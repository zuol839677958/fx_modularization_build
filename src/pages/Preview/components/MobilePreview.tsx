import React, { FC, useRef, useEffect } from 'react'
import QrcodeBox from './QrcodeBox'
import { IPageModel } from '../../../store/data'
import { message } from 'antd'

interface IMobilePreviewProps {
  isFromSpecial: boolean
  mobileSpecialLinkUrl: string
}

const MobilePreview: FC<IMobilePreviewProps> = props => {
  const { isFromSpecial, mobileSpecialLinkUrl } = props
  const pageHtml = useRef<string>('')

  useEffect(() => {
    try {
      const pageData = JSON.parse(localStorage.getItem('pageMobileEditorData') as string) as IPageModel
      pageHtml.current = pageData.pageHtml
    } catch (e) {
      message.error('H5模板解析错误！')
    }
  })

  return (
    <div className="mobile-content">
      <div className="editor-wrap">
        <div className="mobile-wrap">
          {
            isFromSpecial ?
              <iframe src={mobileSpecialLinkUrl} title="H5专题" frameBorder="0"></iframe>
              : <section dangerouslySetInnerHTML={{ __html: pageHtml.current }}></section>
          }
        </div>
      </div>
      {
        isFromSpecial ? <QrcodeBox mobileSpecialLinkUrl={mobileSpecialLinkUrl} /> : null
      }
    </div>
  )
}

export default MobilePreview