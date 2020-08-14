import React, { FC, useState, useEffect } from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import { getSepecialLinkUrl, getMobileSpecialLinkUrl } from '../../axios/env'

import WebPreview from './components/WebPreview'
import MobilePreview from './components/MobilePreview'

import './index.less'

const Preview: FC<RouteComponentProps> = props => {
  const [isWeb, setIsWeb] = useState<boolean>(true)
  const { specialId } = props.match.params as { specialId: string }
  const { isMobile } = props.match.params as { isMobile: string }
  const specialLinkUrl = `${getSepecialLinkUrl()}${specialId}`
  const mobileSpecialLinkUrl = `${getMobileSpecialLinkUrl()}${specialId}`

  
  useEffect(() => {
    setIsWeb(!Number(isMobile))
  }, [isMobile])

  return (
    <div className="preview_content">
      <section className="preview-wrap" style={{ display: isWeb ? 'block' : 'none' }}>
        <WebPreview isFromSpecial={!!specialId} specialLinkUrl={specialLinkUrl} />
      </section>
      <section className="preview-mobile" style={{ display: !isWeb ? 'block' : 'none' }}>
        <MobilePreview isFromSpecial={!!specialId} mobileSpecialLinkUrl={mobileSpecialLinkUrl} />
      </section>
      <section className="preview-bottom-bar">
        <div className="Mobile_box">
          <span className={isWeb ? "span_active" : ""} onClick={() => setIsWeb(true)} style={{ fontSize: 24, marginRight: 10, color: "blue" }} />
          <i className={isWeb ? "" : "i_active"} onClick={() => setIsWeb(false)} style={{ fontSize: 24 }} />
        </div>
      </section>
    </div>
  )
}

export default withRouter(Preview)