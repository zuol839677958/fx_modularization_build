import React, { Component, Fragment, Dispatch } from 'react'
import { IPageState, ITemplateModel } from '../../../store/data'
import { CloseOutlined ,PlusSquareOutlined,DeleteOutlined } from '@ant-design/icons';
import { connect } from 'react-redux'
import { Action } from 'redux'
import { getSpeicalData } from '../../../axios/api';

import TitleBack from '../commonEditorComponent/titleBack'

import "./index.less"

interface ICorrelationSpecialProps {
  data?: ITemplateModel
}

interface ICorrelationSpecialState {
  typeIndex: number
  topTitle: string
  addShow:boolean
  inputValue:string
}

class CorrelationSpecial extends Component<ICorrelationSpecialProps, ICorrelationSpecialState> {
  state: ICorrelationSpecialState = {
    typeIndex: 0,
    topTitle: "列表编辑",
    addShow:false,
    inputValue:""
  }

  render() {
    const { typeIndex, topTitle } = this.state;
    return (
      <Fragment>
        <TitleBack
          titleArrow={typeIndex === 1}
          title={topTitle!}
        />
        <div className="special_editor_box">
            <div className="add_btn" onClick={()=>{this.addSpecialTmp()}}>
                新增条目
            </div>
            <div className="add_item_box" style={{display:this.state.addShow?"block":"none"}}>
                <div className="add_head">
                     新增条目
                    <CloseOutlined  onClick={()=>{this.closeSpeacialTmp()}} style={{ fontSize: '10px'}}/>
                </div>
                <div className="add_item_c">
                    <div className="item_number">
                        条目编号
                    </div>
                    <input type="text" placeholder="请输入专题编号" onChange={(e)=>this.inputChange(e)}/>
                    <div className="sure_cancel">
                         <span className="sure_btn" onClick={()=>{this.searchSpecialData()}}>确定</span><span className="cancel_Btn" onClick={()=>{this.closeSpeacialTmp()}}>取消</span>
                    </div>
                </div>
            </div>
        </div>
        <div className="action_bar">
            <div className="action_head">
                <span>专栏编号</span><i>操作</i>
            </div>
            <ul>
                <li>
                    <i>编号89757</i> 
                    <DeleteOutlined style={{ fontSize: '14px',marginRight:"10px"}}/>
                </li>
            </ul>
        </div>
      </Fragment>
    )
  }

   inputChange(e:any){
    this.setState({
      inputValue:e.target.value
    })
  }
  //搜索获取专题数据
  async searchSpecialData() {
    let inputVal = this.state.inputValue
    if(inputVal.length <0 ){ return false };
    getSpeicalData(inputVal).then(res=>{
      console.log(res);
    })
  }
  //点击显示新增条目
  addSpecialTmp() {
    this.state.addShow?this.setState({addShow:this.state.addShow}):this.setState({addShow:!this.state.addShow})
  }
  //关闭新增条目框
  closeSpeacialTmp(){
    this.setState({addShow:false})
  }
}


const mapStateToProps = (state: IPageState, ownProps: ICorrelationSpecialProps) => ({
  allTempData: state.editorContainerReducer.allTempData,
})

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
  changeTempData(allTempData: ITemplateModel[]) {

  },
})

export default connect(mapStateToProps, mapDispatchToProps)(CorrelationSpecial)