import React, { PureComponent, Dispatch, Fragment } from 'react'
import { ITemplateModel, IPageState, IShareModel } from '../../../store/data'
import { changeTempData } from '../../EditorContainer/store/actions'
import { Action } from 'redux'
import { connect } from 'react-redux'
import { updateCurrentTempData } from '../../../utils/utils'
import { SketchPicker } from 'react-color'
import { Row, Slider, Radio } from 'antd'
import { SharePositionType } from '../../EditorContainer/store/state'
import { SliderValue } from 'antd/lib/slider'

import TitleBack from '../commonEditorComponent/titleBack'

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
          <Row style={{ marginBottom: 20, flexDirection: 'column' }}>
            <p>模板间距(像素)</p>
            <Slider
              style={{ width: '100%' }}
              min={0}
              max={200}
              value={data.spacing}
              onChange={this.changeTempSpacing}
            />
          </Row>
          <Row style={{ marginBottom: 20, flexDirection: 'column' }}>
            <p>分享显示位置</p>
            <Radio.Group
              value={data.tempData.positionType}
              onChange={e => this.changeTempPosition(e.target.value)}
            >
              <Radio value={SharePositionType.Left}>居左</Radio>
              <Radio value={SharePositionType.Center}>居中</Radio>
              <Radio value={SharePositionType.Right}>居右</Radio>
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

  // 更改模板间距
  changeTempSpacing = (spacing: SliderValue) => {
    const { data, allTempData, changeTempData } = this.props
    data.spacing = spacing as number
    updateCurrentTempData(data, allTempData!)
    changeTempData!(allTempData!)
  }

  // 切换分享显示位置
  changeTempPosition(postionType: SharePositionType) {
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