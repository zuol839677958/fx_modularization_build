import React, { PureComponent, Dispatch, Fragment } from 'react'
import { ITemplateModel, IPageState, IAudioModel } from '../../../store/data'
import { changeTempData } from '../../EditorContainer/store/actions'
import { Action } from 'redux'
import { connect } from 'react-redux'
import { updateCurrentTempData } from '../../../utils/utils'
import { Row, Slider, Radio, Input } from 'antd'
import { TemplatePositionType } from '../../EditorContainer/store/state'
import { changeMobileTempData } from '../../EditorContainerMobile/store/actions'

import TitleBack from '../commonEditorComponent/titleBack'

import './index.less'

interface IEditorAudioProps {
  isMobile?: boolean
  data: ITemplateModel<IAudioModel>
  allTempData?: ITemplateModel<any>[]
  changeTempData?: (allTempData: ITemplateModel<any>[]) => void
}

interface IEditorAudioState { }

class EditorAudio extends PureComponent<IEditorAudioProps, IEditorAudioState> {
  render() {
    const { data } = this.props

    return (
      <Fragment>
        <TitleBack titleArrow={false} title='音频模板编辑' />
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
            <p>音频显示位置</p>
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
            <p>音频链接地址</p>
            <Input placeholder="请输入音频链接地址"
              value={data.tempData.audioUrl}
              onChange={this.changeAudioUrl}
            />
          </Row>
        </div>
      </Fragment>
    )
  }
  //修改音频地址
  changeAudioUrl = (e: any) => {
    let inputVal = e.target.value
    const { data, allTempData, changeTempData } = this.props
    const tempData = data.tempData
    tempData.audioUrl = inputVal
    updateCurrentTempData(data, allTempData!)
    changeTempData!(allTempData!)
  }

  // 更改模板间距
  changeTempSpacing = (spacing: number) => {
    const { data, allTempData, changeTempData } = this.props
    data.spacing = spacing
    updateCurrentTempData(data, allTempData!)
    changeTempData!(allTempData!)
  }

  // 切换音频按钮显示位置
  changeTempPosition(postionType: TemplatePositionType) {
    const { data, allTempData, changeTempData } = this.props
    const tempData = data.tempData
    tempData.positionType = postionType
    updateCurrentTempData(data, allTempData!)
    changeTempData!(allTempData!)
  }
}

const mapStateToProps = (state: IPageState, ownProps: IEditorAudioProps) => ({
  allTempData: state.editorContainerReducer.allTempData,
})

const mapDispatchToProps = (dispatch: Dispatch<Action>, ownProps: IEditorAudioProps) => ({
  changeTempData(allTempData: ITemplateModel<any>[]) {
    if (ownProps.isMobile) {
      dispatch(changeMobileTempData(allTempData))
    } else {
      dispatch(changeTempData(allTempData))
    }
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(EditorAudio)