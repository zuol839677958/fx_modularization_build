import React, { Component } from 'react'
import { Checkbox } from 'antd';
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
                <Checkbox style={{display:this.props.checkShow?"block":"none"}} onChange ={this.onChange}></Checkbox>
            </div>
        )
    }
    onChange(){
        console.log(`checked`); 
    } 

   
}

export default itemTitle