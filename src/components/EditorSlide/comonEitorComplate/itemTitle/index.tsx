import React, { Component } from 'react'
import './index.less' 
interface IEditoritemTitle {
    isShow?: boolean;
    title?: string;
    label?: string;
    checkShow?:boolean;
    disabled?: boolean;
}

class itemTitle extends Component<IEditoritemTitle> {

    render() {
        return (
            <div className="item-title">
                <p>{this.props.title}</p>
                
            </div>
        )
    }
}

export default itemTitle