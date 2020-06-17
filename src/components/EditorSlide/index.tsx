import React, { Component, Dispatch, Fragment } from 'react'
import { connect } from 'react-redux'
import { Action } from 'redux'
import { IPageState, ITemplateModel } from '../../store/data'
import { changeEditorSlideShow } from './store/actions'

//模板
import EditorIconTitleText from "./IconTitleText" //编辑部分左图右文
import { TemplateType } from '../EditorContainer/store/state'

import './index.less'


interface IEditorBoxProps {
  isShow?: boolean;
  title?: string;
  allTempData?: ITemplateModel[]
  currentTemplateId?: string;
  hasBackBtn?: boolean;
  changeEditorSlideShow?: (isShow: boolean) => void
}

class EditorBox extends Component<IEditorBoxProps> {
  render() {
    const { isShow, hasBackBtn, currentTemplateId, allTempData } = this.props
    console.log('11', currentTemplateId)
    console.log('22', allTempData)
    //@ts-ignore
    const tempType: TemplateType = allTempData && allTempData.filter(item => item.id === currentTemplateId)[0]?.type
    const currentTempData = allTempData!.filter(item => item.id === currentTemplateId)[0] as ITemplateModel

    return (
      <div className="slide-content" style={{ display: isShow ? 'block' : 'none' }}>
        {this.renderSlideBox(currentTemplateId as string, allTempData as ITemplateModel[], tempType,hasBackBtn as boolean ,currentTempData)}

      </div>
    )
  }
  renderSlideBox(temId: string, allTempData: ITemplateModel[], tempType: TemplateType,hasBackBtn: boolean, currentTempData: ITemplateModel): JSX.Element {
    if (temId.length === 0) return <Fragment></Fragment>;
    
    return (

      <Fragment>
        {
          this.switchEditorModel(tempType as TemplateType, currentTempData,hasBackBtn)
        }
      </Fragment>
    )
  }

  switchEditorModel(tempType: TemplateType,currentTempData: ITemplateModel,hasBackBtn:boolean){
    switch (tempType) {
      case TemplateType.IconTitleText:
        return <EditorIconTitleText title={"标题文字修改"}  key={currentTempData.id} data={currentTempData as ITemplateModel} hasBackBtn={hasBackBtn as boolean} closeEditorSlide={() => this.closeEditorSlide()} />
      
        default:
          return <Fragment></Fragment>
    }
  }
  closeEditorSlide() {
    this.props.changeEditorSlideShow && this.props.changeEditorSlideShow(false)
  }
}

const mapStateToProps = (state: IPageState, ownProps: IEditorBoxProps) => ({
  currentTemplateId: state.editorContainerReducer.activeTempId,
  allTempData: state.editorContainerReducer.allTempData,
  isShow: state.editorSliderReducer.isShow
})

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
  changeEditorSlideShow(isShow: boolean) {
    dispatch(changeEditorSlideShow(isShow))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(EditorBox)