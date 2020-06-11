import React, { Component } from 'react'
import { CloseOutlined } from '@ant-design/icons';
import './index.less'

interface IEditortitleBack {
    isShow?: boolean;
    titleArrow?: boolean;
    title?: string;
}

class TitleBack extends Component<IEditortitleBack> {

    render() {
        return (
            <div className="title-back">
                <p><i style={{ display: this.props.titleArrow ? "inline-block" : "none" }}>←</i><i>{this.props.title}</i></p>
                <CloseOutlined style={{fontSize:14,marginTop:2}} onClick={() => this.click()} />
            </div>
        )
    }

    click() {
        alert(1)
    }
}

export default TitleBack