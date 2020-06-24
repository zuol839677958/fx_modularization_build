import React, { Component, Fragment } from 'react'
import { IPlaintextModel, IPageState, ITemplateModel } from '../../../store/data'
import { Dispatch, Action } from 'redux'
import { changeTempData } from '../../EditorContainer/store/actions'
import { connect } from 'react-redux'
import { Button, Row } from 'antd'
import { updateCurrentTempData } from '../../../utils/utils'

import TitleBack from '../commonEditorComponent/titleBack'
import RichTextEditor from '../../RichTextEditor'
import FontColorSet from '../../FontColorSet'

import './index.less'

interface IEditorPlaintextProps {
  data: ITemplateModel
  allTempData?: ITemplateModel[]
  changeTempData?: (allTempData: ITemplateModel[]) => void
  changeEditorSlideShow?: (isShow: boolean) => void
}

interface IEditorPlaintextState {
  richTextEditorModalVisible: boolean
  currentFontColor: string
  fontColorSelectModalVisible: boolean
}

class EditorPlaintext extends Component<IEditorPlaintextProps, IEditorPlaintextState> {
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
          <Row className="inputAndColor_wrap">
            <p>纯文字内容</p>
            <div className="inputAndColor_box">
              <Button type="primary" shape="round"
                onClick={() => this.handleRichTextEditorModalVisible(true)}
              >编辑内容</Button>
              <div className="fontColorSelect"
                style={{ background: (data.tempData as IPlaintextModel).fontColor }}
                onClick={() => this.initFontColorSelectModal((data.tempData as IPlaintextModel).fontColor!)}
              ></div>
            </div>
          </Row>
        </div>
        <RichTextEditor
          modalVisible={richTextEditorModalVisible}
          richTextContent={(data.tempData as IPlaintextModel).textHtml}
          handleModalVisible={(flag: boolean) => this.handleRichTextEditorModalVisible(flag)}
          saveContent={(content: string) => this.saveRichTextContent(content)}
        />
        <FontColorSet
          modalVisible={fontColorSelectModalVisible}
          fontColor={currentFontColor}
          handleModalVisible={flag => this.handleFontColorSelectModalVisible(flag)}
          handleChangeFontColor={color => this.handleChangeFontColor(color)}
        />
      </Fragment>
    )
  }

  // 打开颜色选择弹窗
  initFontColorSelectModal(currentFontColor: string) {
    this.setState({ currentFontColor })
    this.handleFontColorSelectModalVisible(true)
  }

  // 处理颜色选择弹框显示和隐藏
  handleFontColorSelectModalVisible(fontColorSelectModalVisible: boolean) {
    this.setState({ fontColorSelectModalVisible })
  }

  // 改变字体颜色
  handleChangeFontColor(color: string) {
    const { data, allTempData, changeTempData } = this.props
    const tempData = data.tempData as IPlaintextModel
    tempData.fontColor = color
    updateCurrentTempData(data, allTempData!)
    changeTempData!(allTempData!)
    this.handleFontColorSelectModalVisible(false)
  }

  // 关闭侧滑栏编辑框
  closeEditorSlider() {
    const { changeEditorSlideShow } = this.props
    changeEditorSlideShow!(false)
  }

  // 处理富文本编辑弹窗显示和隐藏
  handleRichTextEditorModalVisible(richTextEditorModalVisible: boolean) {
    this.setState({ richTextEditorModalVisible })
  }

  // 保存富文本内容
  saveRichTextContent(content: string) {
    const { data, allTempData, changeTempData } = this.props
    const tempData = data.tempData as IPlaintextModel
    tempData.textHtml = content
    updateCurrentTempData(data, allTempData!)
    changeTempData!(allTempData!)
    this.handleRichTextEditorModalVisible(false)
  }
}

const mapStateToProps = (state: IPageState, ownProps: IEditorPlaintextProps) => ({
  allTempData: state.editorContainerReducer.allTempData,
})

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
  changeTempData(allTempData: ITemplateModel[]) {
    dispatch(changeTempData(allTempData))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(EditorPlaintext)