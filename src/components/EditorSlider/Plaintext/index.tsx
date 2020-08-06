import React, { PureComponent, Fragment } from 'react'
import { IPlaintextModel, IPageState, ITemplateModel } from '../../../store/data'
import { Dispatch, Action } from 'redux'
import { changeTempData } from '../../EditorContainer/store/actions'
import { connect } from 'react-redux'
import { Button, Row, Slider } from 'antd'
import { updateCurrentTempData } from '../../../utils/utils'
import { changeMobileTempData } from '../../EditorContainerMobile/store/actions'

import TitleBack from '../commonEditorComponent/titleBack'
import RichTextEditor from '../../RichTextEditor'
import FontColorSet from '../../FontColorSet'

import './index.less'

interface IEditorPlaintextProps {
  isMobile?: boolean
  data: ITemplateModel<IPlaintextModel>
  allTempData?: ITemplateModel<any>[]
  changeTempData?: (allTempData: ITemplateModel<any>[]) => void
}

interface IEditorPlaintextState {
  richTextEditorModalVisible: boolean
  currentFontColor: string
  fontColorSelectModalVisible: boolean
}

class EditorPlaintext extends PureComponent<IEditorPlaintextProps, IEditorPlaintextState> {
  state: IEditorPlaintextState = {
    richTextEditorModalVisible: false,
    currentFontColor: '',
    fontColorSelectModalVisible: false
  }

  render() {
    const { data } = this.props
    const { richTextEditorModalVisible, currentFontColor, fontColorSelectModalVisible } = this.state

    return (
      <Fragment>
        <TitleBack titleArrow={false} title='纯文字模板编辑' />
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
          <Row className="inputAndColor_wrap">
            <p>纯文字内容</p>
            <div className="inputAndColor_box">
              <Button type="primary" shape="round"
                onClick={() => this.handleRichTextEditorModalVisible(true)}
              >编辑内容</Button>
              {/* <div className="fontColorSelect"
                style={{ background: data.tempData.fontColor }}
                onClick={() => this.initFontColorSelectModal(data.tempData.fontColor!)}
              ></div> */}
            </div>
          </Row>
        </div>
        <RichTextEditor
          modalVisible={richTextEditorModalVisible}
          richTextContent={data.tempData.textHtml}
          handleModalVisible={this.handleRichTextEditorModalVisible}
          saveContent={this.saveRichTextContent}
        />
        <FontColorSet
          modalVisible={fontColorSelectModalVisible}
          fontColor={currentFontColor}
          handleModalVisible={this.handleFontColorSelectModalVisible}
          handleChangeFontColor={this.handleChangeFontColor}
        />
      </Fragment>
    )
  }

  // 更改模板间距
  changeTempSpacing = (spacing: number) => {
    const { data, allTempData, changeTempData } = this.props
    data.spacing = spacing
    updateCurrentTempData(data, allTempData!)
    changeTempData!(allTempData!)
  }

  // 打开颜色选择弹窗
  initFontColorSelectModal(currentFontColor: string) {
    this.setState({ currentFontColor })
    this.handleFontColorSelectModalVisible(true)
  }

  // 处理颜色选择弹框显示和隐藏
  handleFontColorSelectModalVisible = (fontColorSelectModalVisible: boolean) => {
    this.setState({ fontColorSelectModalVisible })
  }

  // 改变字体颜色
  handleChangeFontColor = (color: string) => {
    const { data, allTempData, changeTempData } = this.props
    const tempData = data.tempData
    tempData.fontColor = color
    updateCurrentTempData(data, allTempData!)
    changeTempData!(allTempData!)
    this.handleFontColorSelectModalVisible(false)
  }

  // 处理富文本编辑弹窗显示和隐藏
  handleRichTextEditorModalVisible = (richTextEditorModalVisible: boolean) => {
    this.setState({ richTextEditorModalVisible })
  }

  // 保存富文本内容
  saveRichTextContent = (content: string) => {
    const { data, allTempData, changeTempData } = this.props
    const tempData = data.tempData
    tempData.textHtml = content
    updateCurrentTempData(data, allTempData!)
    changeTempData!(allTempData!)
    this.handleRichTextEditorModalVisible(false)
  }
}

const mapStateToProps = (state: IPageState, ownProps: IEditorPlaintextProps) => ({
  allTempData: ownProps.isMobile ? state.editorContainerMobileReducer.allTempData : state.editorContainerReducer.allTempData
})

const mapDispatchToProps = (dispatch: Dispatch<Action>, ownProps: IEditorPlaintextProps) => ({
  changeTempData(allTempData: ITemplateModel<any>[]) {
    if (ownProps.isMobile) {
      dispatch(changeMobileTempData(allTempData))
    } else {
      dispatch(changeTempData(allTempData))
    }
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(EditorPlaintext)