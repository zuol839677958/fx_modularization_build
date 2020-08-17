import React, { FC, useMemo,useCallback } from 'react'
import { ICorrelationSpecialModel } from '@/store/data'

import SpecialItem from './components/SpecialItem'

import './index.less'
import { deepClone } from '@/utils'

interface ICorrelationSpecialProps {
  data: ICorrelationSpecialModel[]
  fontColor?: string
}

const CorrelationSpecial: FC<ICorrelationSpecialProps> = props => {
  const { data, fontColor } = props

  const handleSpecialPaging = useCallback(() => {
    const copyData = deepClone(data)
    const pageSize = 4
    const size = copyData.length / pageSize
    const resData: ICorrelationSpecialModel[][] = []
    for (let i = 0; i < size; i++) {
      resData.push(copyData.splice(0, pageSize))
    }

    const specoalItemDOM = resData.map((res, idx) =>
      <div key={idx} className={idx > 0 ? 'hide-special' : 'special'}>
        {res.map(item => (
          <SpecialItem key={item.specailId} data={item} />
        ))}
      </div>
    )

    const controllerBtn = data.length > pageSize ? <span id='loadMoreSpecial' className="loadMore">查看更多专题</span> : null

    return (
      <>
        {specoalItemDOM}
        {controllerBtn}
      </>
    )
  }, [data])


  return useMemo(() => (
    <>
      <div className="CorrelationSpecial_Box">
        <h2 style={{ color: fontColor }}>相关专题</h2>
        {handleSpecialPaging()}
      </div>
    </>
  ), [fontColor, handleSpecialPaging])
}

export default CorrelationSpecial