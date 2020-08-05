import React, { FC } from 'react'
import { IPlaintextModel } from '../../store/data'

import './index.less'

interface PlaintextProps {
  data: IPlaintextModel
}

const Plaintext: FC<PlaintextProps> = props => {
  const { data } = props

  return (
    <div className="plaintext_box">
      <div className="general_plaintext" style={{ color: data.fontColor }}
        dangerouslySetInnerHTML={{ __html: data.textHtml }}
      ></div>
    </div>
  )
}

export default Plaintext