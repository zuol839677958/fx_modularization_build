import React, { Component } from 'react'

import { ITemplateModel } from '../../../store/data'
import ItemMangement from "../commonEitorModel/ItemManagement"
import './index.less'



interface IEditorIconTitleText {
  data: ITemplateModel;
}



class EditorIconTitleText extends Component<IEditorIconTitleText> {
 

  render() {
    const { data} = this.props
    return (
      <div className="slide-content">
        <ItemMangement  data={data} />
      </div>
    )
  }

 
}

export default EditorIconTitleText