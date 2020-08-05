import React, { FC } from 'react'
import { IIconTitleTextModel } from '../../store/data'

import './index.less'

interface IconTitleTextProps {
  data: IIconTitleTextModel
}

const IconTitleText: FC<IconTitleTextProps> = props => {
  return (
    <div className="icon_title_text_box">
      <div className="item_list">
          <span className="des_icon" /> 
          <span className="heading">人物</span>
          <i className="txt">: Mahasagara</i>
      </div>
      <div className="item_list">
          <span className="des_icon" /> 
          <span className="heading">人物</span>
          <i className="txt">: Mahasagara</i>
      </div>
    </div>
  )
}

export default IconTitleText