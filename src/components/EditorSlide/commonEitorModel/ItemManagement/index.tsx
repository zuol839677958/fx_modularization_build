import React, { Component } from 'react'

import ItemTitle from "../../comonEitorComplate/itemTitle"
import './index.less'

interface IEditorItemManagement {
    isShow?: boolean;
    titleArrow?: boolean;
    title?: string;
}

class ItemManagement extends Component<IEditorItemManagement> {

    render() {
        return ( 
            <div className="item-Manage">
                <p>{this.props.title}</p>
               <ItemTitle checkShow={true} />
                
            </div>
        )
    }
}

export default ItemManagement