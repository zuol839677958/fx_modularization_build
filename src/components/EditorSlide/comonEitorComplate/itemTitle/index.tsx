import React, { Component } from 'react'
import { Radio } from 'antd';
import './index.less' 

interface IEditoritemTitle {
    isShow?: boolean;
    title?: string;
}

class itemTitle extends Component<IEditoritemTitle> {

    render() {
        return (
            <div className="item-title">
                <p>{this.props.title}</p>
                <Radio style={{}} checked={true}></Radio>
            </div>
        )
    }

   
}

export default itemTitle