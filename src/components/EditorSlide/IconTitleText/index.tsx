import React, { Component } from 'react'
import TitleBack from "../comonEitorComplate/titleBack"
import ItemMangement from "../commonEitorModel/ItemManagement"
import './index.less'

interface IEditorIconTitleText {
    isShow?: boolean;
    title?: string;
}

class EditorIconTitleText extends Component<IEditorIconTitleText> {
    render() {
        return (
            <div className="slide-content">
               <TitleBack titleArrow={true} title={"标题文字修改"}/> 
               <ItemMangement />
            </div>
        )
    }
}

export default EditorIconTitleText