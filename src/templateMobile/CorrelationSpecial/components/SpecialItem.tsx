import React, { FC } from 'react'
import { ICorrelationSpecialModel } from '../../../store/data'

interface ISpecialItemProps {
  data: ICorrelationSpecialModel
}

const SpecialItem: FC<ISpecialItemProps> = props => {
  const { data } = props

  return (
    <a href="/" rel="noopener noreferrer">
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
  )
}

export default SpecialItem