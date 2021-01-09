import React, { FC, useState, useMemo } from 'react'
import { RouteComponentProps, withRouter, useParams } from 'react-router-dom'
import { getSpecialPreviewUrl, getMobileSpecialPreviewUrl } from '@/axios/env'
import { getSpecialPreviewRouteParams } from '@/utils'

import WebPreview from './components/WebPreview'
import MobilePreview from './components/MobilePreview'

import './index.less'

const Preview: FC<RouteComponentProps> = props => {
  const { specialId, isMobile } = useParams()
  const [isWeb, setIsWeb] = useState<boolean>(!Number(isMobile))

  const previewRoutesParams = getSpecialPreviewRouteParams(specialId)
  const specialLinkUrl = `${getSpecialPreviewUrl()}?${previewRoutesParams}`
  const mobileSpecialLinkUrl = `${getMobileSpecialPreviewUrl()}?${previewRoutesParams}`

  const isDisplayWeb = useMemo(() => (isWeb ? 'block' : 'none'), [isWeb])
  const isDisplayMobile = useMemo(() => (!isWeb ? 'block' : 'none'), [isWeb])
  const webTabActive = useMemo(() => (isWeb ? 'span_active' : ''), [isWeb])
  const mobileTabActive = useMemo(() => (isWeb ? '' : 'i_active'), [isWeb])

  return (
    <div className="preview_content">
      <section className="preview-wrap" style={{ display: isDisplayWeb }}>
        <WebPreview isFromSpecial={!!specialId} specialLinkUrl={specialLinkUrl} />
      </section>
      <section className="preview-mobile" style={{ display: isDisplayMobile }}>
        <MobilePreview isFromSpecial={!!specialId} mobileSpecialLinkUrl={mobileSpecialLinkUrl} />
      </section>
      <section className="preview-bottom-bar">
        <div className="Mobile_box">
          <span className={webTabActive} onClick={() => setIsWeb(true)} />
          <i className={mobileTabActive} onClick={() => setIsWeb(false)} />
        </div>
      </section>
    </div>
  )
}

export default withRouter(Preview)