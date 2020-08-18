import React, { FC, useCallback, useMemo, memo } from 'react'
import QrcodeBox from './QrcodeBox'
import { IPageModel } from '@/store/data'
import { message } from 'antd'

interface IMobilePreviewProps {
  isFromSpecial: boolean
  mobileSpecialLinkUrl: string
}

const MobilePreview: FC<IMobilePreviewProps> = props => {
  const { isFromSpecial, mobileSpecialLinkUrl } = props

  const pageHtml = useCallback(() => {
    try {
      const pageData = JSON.parse(localStorage.getItem('pageMobileEditorData') as string) as IPageModel
      return pageData.pageHtml
    } catch (e) {
      message.error('H5模板解析错误！')
      return ''
    }
  }, [])

  return useMemo(() => (
    <div className="mobile-content">
      <div className="editor-wrap">
        <div className="mobile-wrap">
          {
            isFromSpecial ?
              <iframe src={mobileSpecialLinkUrl} title="H5专题" frameBorder="0"></iframe>
              : <section dangerouslySetInnerHTML={{ __html: pageHtml() }}></section>
          }
        </div>
      </div>
      {
        isFromSpecial ? <QrcodeBox mobileSpecialLinkUrl={mobileSpecialLinkUrl} /> : null
      }
    </div>
  ), [isFromSpecial, mobileSpecialLinkUrl, pageHtml])
}

export default memo(MobilePreview)