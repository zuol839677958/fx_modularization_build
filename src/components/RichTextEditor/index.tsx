import React, { Component } from 'react'
import ReactQuill from 'react-quill'
import { Modal } from 'antd'
import 'react-quill/dist/quill.snow.css'

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

class RichTextEditor extends Component<IRichTextEditorProps, IRichTextEditorState> {
  state: IRichTextEditorState = {
    content: ''
  }

  handleOk = () => {
    let { saveContent } = this.props
    const { content } = this.state
    saveContent!(content)
  }

  handleEditorContentChange = (content: string) => {
    this.setState({ content })
  }

  render() {
    const { modalVisible, richTextContent, handleModalVisible } = this.props
    const { content } = this.state

    return (
      <Modal
        title="编辑内容"
        width={1000}
        visible={modalVisible}
        destroyOnClose
        okText='确定'
        cancelText='取消'
        onOk={this.handleOk}
        onCancel={() => handleModalVisible(false)}
      >
        <ReactQuill
          placeholder="请输入"
          theme="snow"
          modules={{
            toolbar: [
              ['bold', 'italic', 'underline', 'strike'],
              [{ list: 'ordered' }, { list: 'bullet' }],
              [{ indent: '-1' }, { indent: '+1' }],
              [{ color: [] }, { background: [] }],
              [{ size: ['small', false, 'large', 'huge'] }],
              [{ align: [] }],
              ['clean'],
              ['image'],
              ['link']
            ],
          }}
          value={content || richTextContent}
          onChange={this.handleEditorContentChange}
          style={{ width: '100%', height: '500px', marginBottom: 40 }}
        />
      </Modal>
    )
  }
}

export default RichTextEditor