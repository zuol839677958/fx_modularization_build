import React, { Component } from 'react'
import EditorIconTitleText from "./IconTitleText"
import './index.less'

interface IEditorBoxProps {
    isShow?: boolean;
    title?: string;
}

class EditorBox extends Component<IEditorBoxProps> {
    render() {
        return (
            <div className="slide-content">
               <EditorIconTitleText /> 

            </div>
        )
    }

    
}

export default EditorBox