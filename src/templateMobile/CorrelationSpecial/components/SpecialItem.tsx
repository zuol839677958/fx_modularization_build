import React, { FC, useMemo } from 'react'
import { ICorrelationSpecialModel } from '../../../store/data'
import { getMobileSpecialLinkUrl } from '../../../axios/env'

interface ISpecialItemProps {
  data: ICorrelationSpecialModel
}

const SpecialItem: FC<ISpecialItemProps> = props => {
  const { data } = props

  return useMemo(() => (
    <a href={`${getMobileSpecialLinkUrl()}${data.specailId}`} rel="noopener noreferrer">
      <div className="special_list">
        <div className="list_item">
          <div className="item_left">
            <img src={data.imageUrl} alt="" />
          </div>
          <div className="item_right">
            <span>{data.title}</span>
            <i>{data.addTime}</i>
          </div>
        </div>
      </div>
    </a>
  ), [data.addTime, data.imageUrl, data.specailId, data.title])
}

export default SpecialItem