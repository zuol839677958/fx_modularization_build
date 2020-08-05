import React, { FC } from 'react'
import { IPlaintextModel } from '../../store/data'

import './index.less'

interface PlaintextProps {
    data: IPlaintextModel
}

const Plaintext: FC<PlaintextProps> = props => {
    return (
        <div className="plaintext_box">
            <div className="general_plaintext">
                请输入文本
            </div>
        </div>
    )
}

export default Plaintext