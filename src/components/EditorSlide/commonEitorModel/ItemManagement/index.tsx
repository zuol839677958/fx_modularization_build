import React, { Component, Fragment, Dispatch } from 'react'
import { Checkbox,message } from 'antd';
import { connect } from 'react-redux';
import { changeEditorSlideShow } from '../../store/actions';
import { IIconTitleTextModel, ITemplateModel, IPageState } from '../../../../store/data';
import { updateIconTitleTextItemShow, updateCurrentTempData, deleteIconTitleTextItem } from '../../../../utils/utils';
import ItemTitle from "../../comonEitorComplate/itemTitle"
import TitleBack from "../../comonEitorComplate/titleBack"
import { Action } from 'redux';
import { changeTempData } from '../../../EditorContainer/store/actions';

import './index.less'


interface IEditorItemManagement {
  isShow?: boolean;
  data: ITemplateModel;

  allTempData?: ITemplateModel[];
  titleArrow?: boolean;

  changeTempData?: (tempData: ITemplateModel[]) => void
  changeEditorSlideShow?: (isShow: boolean) => void
  closeEditorSlide?: () => void;
}
interface IEditorIconTitleTextState {
  typeIndex: number
  sort: number
  topTitle: string
  title: string
}

class ItemManagement extends Component<IEditorItemManagement, IEditorIconTitleTextState> {
  state: IEditorIconTitleTextState = {
    sort: 1,
    typeIndex: 0,
    topTitle: "标题文字修改",
    title: "条目管理"
  }
  render() {
    let { data } = this.props;
    const { typeIndex, title, topTitle } = this.state
    return (
      <Fragment>
        <TitleBack titleArrow={typeIndex === 1} title={topTitle!} closeEditorSlide={() => this.closeEditorSlide()} changeTypeIndex={(index) => this.changeTypeIndex(index)} />
        <div className="item-Manage-content" style={{ display: typeIndex === 0 ? "block" : "none" }}>
          <div className="item-Manage">
            <p>{title}</p>
            <ItemTitle checkShow={true} />
          </div>
          <div className="modification_switchingPosition">
            <ul>
              {this.renderTemplateItem(data.tempData as IIconTitleTextModel[])}
            </ul>
          </div>
        </div>
        <div className="second-Manage-content" style={{ display: typeIndex === 1 ? "block" : "none" }}>
          111
        </div>
      </Fragment>
    )
  }
  changeTypeIndex(typeIndex: number) {
    this.setState({ typeIndex })
  }
  closeEditorSlide() {
    this.setState({
      typeIndex: 0
    })
    this.props.changeEditorSlideShow && this.props.changeEditorSlideShow(false)
  }

  renderTemplateItem(tempDataList: IIconTitleTextModel[]): JSX.Element {
    if (tempDataList.length === 0) return <Fragment></Fragment>

    return (
      <Fragment>
        {
          tempDataList.map(tmp => (
            <li key={tmp.sort} draggable={true} onDragStart={(e)=>console.log(e)} onDragEnd={(e)=>console.log(e)}>
              <div>
                <i className="iconfont">&#xE011;</i>
                <span>{tmp.title}</span>
                <div className="right">
                  <i className="iconfont recycle" onClick={() => this.deleteIconTitle(tmp.sort)}>&#xE009;</i>
                  <i className="iconfont amend" onClick={() => { this.inToDetails() }}>&#xE00C;</i>
                </div>
              </div>
              <Checkbox checked={tmp.isShow} onChange={(e) => this.changeChecked(e.target.checked, tmp.sort)} />
            </li>
          ))
        }
      </Fragment>
    )
  }
  inToDetails() {
    this.setState({
      typeIndex: 1
    })
  }
  deleteIconTitle(sort: number) {
    debugger

    const { data, allTempData, changeTempData } = this.props;
    
    if ((data.tempData as IIconTitleTextModel[]).length === 1) return message.warning('最后一条请勿删除');
    
    data.tempData = deleteIconTitleTextItem(sort, data.tempData as IIconTitleTextModel[])
    updateCurrentTempData(data, allTempData!)
    changeTempData!(allTempData!)
  }
  changeChecked(checkedState: boolean, sort: number) {
    const { data, allTempData, changeTempData } = this.props
    updateIconTitleTextItemShow(checkedState, sort, data.tempData as IIconTitleTextModel[])
    updateCurrentTempData(data, allTempData!)
    changeTempData!(allTempData!)
  }
}

const mapStateToProps = (state: IPageState, ownProps: IEditorItemManagement) => ({
  currentTemplateId: state.editorContainerReducer.activeTempId,
  allTempData: state.editorContainerReducer.allTempData,
})

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
  changeTempData(allTempData: ITemplateModel[]) {
    dispatch(changeTempData(allTempData))
  },
  changeEditorSlideShow(isShow: boolean) {
    dispatch(changeEditorSlideShow(isShow))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(ItemManagement)