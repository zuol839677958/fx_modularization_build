import React, { Component, Fragment, Dispatch } from 'react'
import { Checkbox } from 'antd';
import { connect } from 'react-redux';
import { IIconTitleTextModel, ITemplateModel, IPageState } from '../../../../store/data';
import ItemTitle from "../../comonEitorComplate/itemTitle"
import './index.less'
import { Action } from 'redux';



interface IEditorItemManagement {
    isShow?: boolean;
    data:ITemplateModel;
    titleArrow?: boolean;
    title?: string;
}

class ItemManagement extends Component<IEditorItemManagement> {
   
    render() {
        let { data } =this.props;
        return ( 
         <div className="item-Manage-content">
            <div className="item-Manage">
                <p>{this.props.title}</p>
               <ItemTitle checkShow={true} />
            </div>
             <div className="modification_switchingPosition">
                <ul>
                    {this.renderTemplateItem(data.tempData as IIconTitleTextModel[])}
                </ul>
            </div>
        </div>
        )
    }
    renderTemplateItem(tempDataList: IIconTitleTextModel[]): JSX.Element {
        if(tempDataList.length===0) return <Fragment></Fragment>
        
        return(
            <Fragment>
                {
                    tempDataList.map(tmp => (
                    <li>
                        <div>
                        <i className="iconfont">&#xE011;</i>
                        <span>{tmp.title}</span>
                            <div className="right">
                                        <i className="iconfont recycle">&#xE009;</i>
                                        <i className="iconfont amend">&#xE00C;</i>
                            </div>
                        </div>
                        <Checkbox checked={tmp.isShow} onChange ={(e)=>this.changeChecked(tmp.sort)}/>
                    </li>
                    ))
                }


            </Fragment>
        )

    }
    changeChecked(srot:any){
        
    }

}
const mapStateToProps = (state: IPageState, ownProps: IEditorItemManagement) => ({
    currentTemplateId: state.editorContainerReducer.activeTempId,
    allTempData: state.editorContainerReducer.allTempData,
  })
  
  const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
    changeEditorSlideShow(isShow: boolean) {
   
    }
  })
  
  export default connect(mapStateToProps, mapDispatchToProps)(ItemManagement)