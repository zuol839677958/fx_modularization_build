import React, { PureComponent, Dispatch, Fragment } from 'react'
import { ITemplateModel, IPageState, IShareModel } from '@/store/data'
import { changeTempData } from '@/store/actions/editor.actions'
import { Action } from 'redux'
import { connect } from 'react-redux'
import { updateCurrentTempData } from '@/utils'
import { SketchPicker } from 'react-color'
import { Row, Radio } from 'antd'
import { TemplatePositionType } from '@/store/state/editor.state'

import TitleBack from '../commonEditorComponent/titleBack'
import Spacing from '../commonEditorComponent/spacing'

import './index.less'

interface IEditorShareProps {
  data: ITemplateModel<IShareModel>
  allTempData?: ITemplateModel<any>[]
  changeTempData?: (allTempData: ITemplateModel<any>[]) => void
}

interface IEditorShareState { }

class EditorShare extends PureComponent<IEditorShareProps, IEditorShareState> {
  render() {
    const { data } = this.props

    return (
      <Fragment>
        <TitleBack titleArrow={false} title='分享模板编辑' />
        <div className="editor_content">
          <Spacing data={data} />
          <Row style={{ marginBottom: 20, flexDirection: 'column' }}>
            <p>分享显示位置</p>
            <Radio.Group
              value={data.tempData.positionType}
              onChange={e => this.changeTempPosition(e.target.value)}
            >
              <Radio value={TemplatePositionType.Left}>居左</Radio>
              <Radio value={TemplatePositionType.Center}>居中</Radio>
              <Radio value={TemplatePositionType.Right}>居右</Radio>
            </Radio.Group>
          </Row>
          <Row style={{ marginBottom: 20, flexDirection: 'column' }}>
            <p>分享字体颜色</p>
            <SketchPicker
              color={data.tempData.labelFontColor}
              onChange={color => this.changeShareLabelFontColor(color.hex)}
            />
          </Row>
        </div>
      </Fragment>
    )
  }

  // 切换分享显示位置
  changeTempPosition(postionType: TemplatePositionType) {
    const { data, allTempData, changeTempData } = this.props
    const tempData = data.tempData
    tempData.positionType = postionType
    updateCurrentTempData(data, allTempData!)
    changeTempData!(allTempData!)
  }

  // 更改分享字体颜色
  changeShareLabelFontColor(color: string) {
    const { data, allTempData, changeTempData } = this.props
    const tempData = data.tempData
    tempData.labelFontColor = color
    updateCurrentTempData(data, allTempData!)
    changeTempData!(allTempData!)
  }
}

const mapStateToProps = (state: IPageState, ownProps: IEditorShareProps) => ({
  allTempData: state.editorContainerReducer.allTempData,
})

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
  changeTempData(allTempData: ITemplateModel<any>[]) {
    dispatch(changeTempData(allTempData))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(EditorShare)