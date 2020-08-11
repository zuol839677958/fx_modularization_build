import React, { FC, useRef, useEffect } from 'react'
import { message } from 'antd'
import { IPageModel } from '../../../store/data'

interface IWebPreviewProps {
  isFromSpecial: boolean
  specialLinkUrl: string
}

const WebPreview: FC<IWebPreviewProps> = props => {
  const { isFromSpecial, specialLinkUrl } = props
  const pageHtml = useRef<string>('')

  useEffect(() => {
    try {
      const pageData = JSON.parse(localStorage.getItem('pageEditorData') as string) as IPageModel
      pageHtml.current = pageData.pageHtml
    } catch (e) {
      message.error('模板解析错误！')
    }
  })

  return (
    <>
      {
        isFromSpecial ?
          <iframe src={specialLinkUrl} title="Web专题" frameBorder="0"></iframe>
          : <section dangerouslySetInnerHTML={{ __html: pageHtml.current }}></section>
      }
    </>
  )
}

export default WebPreview