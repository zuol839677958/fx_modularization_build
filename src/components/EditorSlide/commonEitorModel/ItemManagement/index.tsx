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
                <p>条目管理</p>
               <ItemTitle />
               
            </div>
        )
    }
}

export default ItemManagement