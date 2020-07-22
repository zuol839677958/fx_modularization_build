import React, { PureComponent } from 'react'
import BraftEditor, { EditorState } from 'braft-editor'
import { Modal } from 'antd'

import 'braft-editor/dist/index.css'
import './index.less'

interface IRichTextEditorProps {
  modalVisible: boolean
  richTextContent: string
  handleModalVisible: (flag: boolean) => void
  saveContent: (content: string) => void
}

interface IRichTextEditorState {
  content: string
}

class RichTextEditor extends PureComponent<IRichTextEditorProps, IRichTextEditorState> {
  state: IRichTextEditorState = {
    content: BraftEditor.createEditorState('')
  }

  handleOk = () => {
    const { saveContent, richTextContent } = this.props
    const { content } = this.state
    this.setState({ content: '' })
    saveContent!(content || richTextContent)
  }

  handleEditorContentChange = (editorState: EditorState) => {
    this.setState({ content: editorState.toHTML() })
  }

  render() {
    const { modalVisible, richTextContent, handleModalVisible } = this.props
    const { content } = this.state

    return (
      <Modal
        title="编辑内容"
        width={1000}
        visible={modalVisible}
        centered={true}
        getContainer={false}
        destroyOnClose
        okText='确定'
        cancelText='取消'
        onOk={this.handleOk}
        onCancel={() => {
          this.setState({ content: '' })
          handleModalVisible(false)
        }}
      >
        <BraftEditor
          value={content}
          defaultValue={BraftEditor.createEditorState(richTextContent)}
          onChange={this.handleEditorContentChange}
          style={{ width: '100%', height: '500px', marginBottom: 80 }}
        />
      </Modal>
    )
  }
}

export default RichTextEditor