import React, { FC, useState, useEffect, useMemo } from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import { getSepecialLinkUrl, getMobileSpecialLinkUrl } from '@/axios/env'

import WebPreview from './components/WebPreview'
import MobilePreview from './components/MobilePreview'

import './index.less'

const Preview: FC<RouteComponentProps> = props => {
  const [isWeb, setIsWeb] = useState<boolean>(true)
  const { specialId } = props.match.params as { specialId: string }
  const { isMobile } = props.match.params as { isMobile: string }
  const specialLinkUrl = `${getSepecialLinkUrl()}${specialId}`
  const mobileSpecialLinkUrl = `${getMobileSpecialLinkUrl()}${specialId}`

  const isDisplayWeb = useMemo(() => (isWeb ? 'block' : 'none'), [isWeb])
  const isDisplayMobile = useMemo(() => (!isWeb ? 'block' : 'none'), [isWeb])
  const webTabActive = useMemo(() => (isWeb ? 'span_active' : ''), [isWeb])
  const mobileTabActive = useMemo(() => (isWeb ? '' : 'i_active'), [isWeb])

  useEffect(() => {
    setIsWeb(!Number(isMobile))
  }, [isMobile])

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