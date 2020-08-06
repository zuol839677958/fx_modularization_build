import React, { FC } from 'react'
import { ICorrelationSpecialModel } from '../../store/data'

import SpecialItem from './components/SpecialItem'

import './index.less'

interface ICorrelationSpecialProps {
  data: ICorrelationSpecialModel[]
  fontColor?: string
}

const CorrelationSpecial: FC<ICorrelationSpecialProps> = props => {
  const { data, fontColor } = props

  return (
    <div className="CorrelationSpecial_Box">
      <h2 style={{ color: fontColor }}>相关专题</h2>
      {
        data.map(item => (
          <SpecialItem key={item.specailId} data={item} />
        ))
      }
    </div>
  )
}

export default CorrelationSpecial