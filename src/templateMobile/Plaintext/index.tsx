import React, { FC, useMemo } from 'react'
import { IPlaintextModel } from '@/store/data'

import './index.less'

interface IPlaintextProps {
  data: IPlaintextModel
}

const Plaintext: FC<IPlaintextProps> = props => {
  const { data } = props

  return useMemo(() => {
    return <div className="plaintext_box">
      <div className="general_plaintext" style={{ color: data.fontColor }}
        dangerouslySetInnerHTML={{ __html: data.textHtml }}
      ></div>
    </div>
  }, [data.fontColor, data.textHtml])
}

export default Plaintext