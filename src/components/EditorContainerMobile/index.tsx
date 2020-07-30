import React, { FC } from 'react'
import { RouteComponentProps } from 'react-router-dom'

import "./index.less"

interface IEditorContainerMobileProps extends RouteComponentProps { }

const EditorContainerMobile: FC<IEditorContainerMobileProps> = props => {
  return (
    <div className="mobile-editor">
      <div className="editor-wrap">
        111
      </div>
    </div>
  )
}

export default EditorContainerMobile