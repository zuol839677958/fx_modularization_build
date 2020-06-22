import React, { Component, Fragment, Dispatch } from 'react'
import { IPageState, ITemplateModel } from '../../../store/data'
import { connect } from 'react-redux'
import { Action } from 'redux'
import TitleBack from '../commonEditorComponent/titleBack'
import { Radio } from 'antd';
import "./index.less"
interface IEditorBanner{
    data?: ITemplateModel;
    typeIndex?:number;
    topTitle?:string;
    value?:number;
}
class Banner extends Component<IEditorBanner>{
  state:IEditorBanner ={
    typeIndex:0,
    topTitle:"banner",
    value:1
  }
   render(){
    const { typeIndex,topTitle } = this.state;
    
     return (
      <Fragment>
         <TitleBack
          titleArrow={typeIndex === 1} 
          title={topTitle!}
        />
      <div className="banner-select-box">
        <Radio.Group onChange={(e)=>{this.onChange(e.target.value)}} value={this.state.value}>
          <Radio value={1}>图片</Radio>
          <Radio value={2}>轮播</Radio>
          <Radio value={3}>视频</Radio>
        </Radio.Group>
        <div className="img-content-box" style={{display:this.state.value===1?"block":"none"}}>
          <div className="img-box" >
              <img src="https://imgs.wbp5.com/api/secrecymaster/html_up/2019/6/20190610115945561.png" alt=""/>
          </div>
          <div className="size-tip">图片大小≤500KB</div>
        </div>
      </div>
        
      </Fragment>
   )} 
   onChange (e:number) {
    console.log('radio checked', e);
    this.setState({
      value: e,
    });
  }
   closeEditorSlide(){
    
  }
}


const mapStateToProps = (state: IPageState, ownProps: IEditorBanner) => ({
    allTempData: state.editorContainerReducer.allTempData,
  })
  
  const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
    changeTempData(allTempData: ITemplateModel[]) {
    
    },
  
  })
  
  export default connect(mapStateToProps, mapDispatchToProps)(Banner)