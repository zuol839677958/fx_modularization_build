import React, { Component, Fragment } from 'react'
import { IPlaintextModel, IPageState, ITemplateModel } from '../../../store/data'
import { Dispatch, Action } from 'redux'
import { changeTempData } from '../../EditorContainer/store/actions'
import { connect } from 'react-redux'
import { Button } from 'antd'
import { updateCurrentTempData } from '../../../utils/utils'

import TitleBack from '../commonEditorComponent/titleBack'
import RichTextEditor from '../../RichTextEditor'

import './index.less'

interface IEditorPlaintextProps {
  data: ITemplateModel
  allTempData?: ITemplateModel[]
  changeTempData?: (allTempData: ITemplateModel[]) => void
  changeEditorSlideShow?: (isShow: boolean) => void
}

interface IEditorPlaintextState {
  richTextEditorModalVisible: boolean
}

class EditorPlaintext extends Component<IEditorPlaintextProps, IEditorPlaintextState> {
  state: IEditorPlaintextState = {
    richTextEditorModalVisible: false
  }

  render() {
    const { data } = this.props
    const { richTextEditorModalVisible } = this.state

    return (
      <Fragment>
        <TitleBack titleArrow={false} title='纯文字模板编辑'/>
        <div className="editor_content">
          <p>纯文字内容</p>
          <Button type="primary" shape="round"
            onClick={() => this.handleRichTextEditorModalVisible(true)}
          >编辑内容</Button>
        </div>
        <RichTextEditor
          modalVisible={richTextEditorModalVisible}
          richTextContent={(data.tempData as IPlaintextModel).textHtml}
          handleModalVisible={(flag: boolean) => this.handleRichTextEditorModalVisible(flag)}
          saveContent={(content: string) => this.saveRichTextContent(content)}
        />
      </Fragment>
    )
  }

  closeEditorSlider() {
    const { changeEditorSlideShow } = this.props
    changeEditorSlideShow!(false)
  }

  handleRichTextEditorModalVisible(richTextEditorModalVisible: boolean) {
    this.setState({ richTextEditorModalVisible })
  }

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
  },
 
})

export default connect(mapStateToProps, mapDispatchToProps)(EditorPlaintext)