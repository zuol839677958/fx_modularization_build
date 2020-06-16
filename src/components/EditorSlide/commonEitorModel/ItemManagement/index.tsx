import React, { Component } from 'react'
import { Checkbox } from 'antd';
import ItemTitle from "../../comonEitorComplate/itemTitle"
import './index.less'

interface IEditorItemManagement {
    data?:Object;
    isShow?: boolean;
    titleArrow?: boolean;
    title?: string;
}

class ItemManagement extends Component<IEditorItemManagement> {
    
    render() {
        return ( 
         <div className="item-Manage-content">
            <div className="item-Manage">
                <p>{this.props.title}</p>
               <ItemTitle checkShow={true} />
            </div>
             <div className="modification_switchingPosition">
                <ul>
                    <li>
                        <div>
                        <i className="iconfont">&#xE011;</i>
                        <span>请输入标题</span>
                            <div className="right">
                                        <i className="iconfont recycle">&#xE009;</i>
                                        <i className="iconfont amend">&#xE00C;</i>
                            </div>
                        </div>
                        <Checkbox />
                    </li>
                    <li>
                        <div>
                                <i className="iconfont">&#xE011;</i>
                                <span>请输入标题</span>
                                <div className="right">
                                            <i className="iconfont recycle">&#xE009;</i>
                                            <i className="iconfont amend">&#xE00C;</i>
                                </div>
                        </div>
                        <Checkbox />
                    </li>
                </ul>
            </div>
        </div>
        )
    }
    renderTemplateData(){
        
    }

}

export default ItemManagement