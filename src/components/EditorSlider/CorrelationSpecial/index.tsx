import React, { Component, Fragment, Dispatch } from 'react'
import { IPageState, ITemplateModel } from '../../../store/data'
import { CloseOutlined ,PlusSquareOutlined,DeleteOutlined } from '@ant-design/icons';
import { connect } from 'react-redux'
import { Action } from 'redux'
import TitleBack from '../commonEditorComponent/titleBack'

import "./index.less"

interface ICorrelationSpecialProps {
  data?: ITemplateModel
}

interface ICorrelationSpecialState {
  typeIndex: number
  topTitle: string
}

class CorrelationSpecial extends Component<ICorrelationSpecialProps, ICorrelationSpecialState> {
  state: ICorrelationSpecialState = {
    typeIndex: 0,
    topTitle: "列表编辑",
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
            <div className="add_btn">
                新增条目
            </div>
            <div className="add_item_box">
                <div className="add_head">
                     新增条目
                    <CloseOutlined />
                </div>
                <div className="add_item_c">
                    <div className="item_number">
                        条目编号
                    </div>
                    <input type="text"/>
                    <div className="sure_cancel">
                        <span>取消</span> <span>确定</span>
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
                    <span>编号89757</span> 
                    <PlusSquareOutlined />
                    <DeleteOutlined />
                </li>
            </ul>
        </div>
      </Fragment>
    )
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