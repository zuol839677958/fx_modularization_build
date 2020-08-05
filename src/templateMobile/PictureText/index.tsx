import React, { FC } from 'react'
import { IPictureTextModel } from '../../store/data'

import './index.less'

interface PictureTextProps {
    data: IPictureTextModel
}

const PictureText: FC<PictureTextProps> = props => {
    return (
       <div className="PictureText_box">
        <div className="PictureText_item">
            <div className="top_title_text">
                <h3 className ="title">惊人的准确率</h3>
                <div className="text">
                    这个账户以2200美金做起，不到一年的时间做到1.54万美金，Mahasagara实现了6倍的资金增长，116笔交易中，错误仅7笔，这是个非常惊人的准确率。据Mahasagara所言，这完全得益于他对经济现状的了解以及技术面上的分析。           
                </div>
            </div>
            <div className="top_title_text">
                <h3 className ="title">从事背景</h3>
                <div className="text">
                    Mahasagara从事外贸行业，又涉及到一些其他实体，对经济形势有一个直观的感受。因为是做外贸行业，不可避免地接触到了外汇，加上读书时就对股票期货很感兴趣，对外汇的接受度自然就比较高。多番研究下，因外汇保证金交易的高杠杆、多空双向交易等优点，Mahasagara渐渐将投资从股票期货转向了外汇。           
                </div>
            </div>
           <div className="describe_img">
                <img src="https://imgs.wbp5.com/api/secrecymaster/html_up/2019/6/20190606135000441.png" alt="" data-preview-src  data-preview-group="1" />
           </div>
        </div>  
       </div>
    )
}

export default PictureText