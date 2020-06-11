import React, { Component } from 'react'
import TitleBack from "../comonEitorComplate/titleBack"
import ItemMangement from "../commonEitorModel/ItemManagement"
import './index.less'

interface IEditorIconTitleText {
    title: string;
    hasBackBtn: boolean;
    closeEditorSlide: () => void;
}

class EditorIconTitleText extends Component<IEditorIconTitleText> {
    render() {
        const { title, hasBackBtn, closeEditorSlide } = this.props
        return (
            <div className="slide-content">
                <TitleBack titleArrow={hasBackBtn} title={title} closeEditorSlide={() => closeEditorSlide()} />
                <ItemMangement title={"条目管理"} />
            </div>
        )
    }
}

export default EditorIconTitleText