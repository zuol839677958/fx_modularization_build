import React, { FC } from 'react'
import { ICorrelationSpecialModel } from '../../store/data'

import './index.less'

interface CorrelationSpecialProps {
    data: ICorrelationSpecialModel
}

const CorrelationSpecial: FC<CorrelationSpecialProps> = props => {
    return (
       <div className="CorrelationSpecial_Box">
           <h2>相关专题</h2>
           <div className="special_list">
                <div className="list_item">
                    <div className="item_left">
                        <img src="https://img.wbp5.com/upload/images/master/2020/07/27/110815640.jpg" alt=""/>
                    </div>
                    <div className="item_right">
                        <span>外汇短线讲究的是果断执行，做不到就放弃吧！</span>
                        <i>2020-08-01 09:06</i>
                    </div>
                </div>

           </div>
           <div className="special_list">
                <div className="list_item">
                    <div className="item_left">
                        <img src="https://img.wbp5.com/upload/images/master/2020/07/27/110815640.jpg" alt=""/>
                    </div>
                    <div className="item_right">
                        <span>外汇短线讲究的是果断执行，做不到就放弃吧！</span>
                        <i>2020-08-01 09:06</i>
                    </div>
                </div>

           </div>
       </div>
    )
}

export default CorrelationSpecial