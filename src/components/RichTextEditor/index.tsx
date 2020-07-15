import React, { Component } from 'react'
import ReactQuill, { Quill } from 'react-quill'
import { Modal } from 'antd'
import 'react-quill/dist/quill.snow.css'

import './index.less'

const fontSizeStyle = Quill.import('attributors/style/size')
fontSizeStyle.whitelist = ['10px', '12px', '14px', '16px', '20px', '24px', '36px', '48px']
Quill.register(fontSizeStyle, true)

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
    const { saveContent, richTextContent } = this.props
    const { content } = this.state
    this.setState({ content: '' })
    saveContent!(content || richTextContent)
  }

  handleEditorContentChange = (content: string) => {
    this.setState({ content })
  }

  render() {
    const { modalVisible, richTextContent, handleModalVisible } = this.props
    const { content } = this.state
    this.renderEditorTitle()

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
        <ReactQuill
          placeholder="请输入"
          theme="snow"
          modules={{
            toolbar: [
              ['underline', 'strike'],
              [{ color: [] }, { background: [] }],
              [{ size: fontSizeStyle.whitelist }],
              [{ align: [] }],
              ['clean'],
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

  renderEditorTitle() {
    document.querySelector('.ql-underline')?.setAttribute('title', '下划线')
    document.querySelector('.ql-strike')?.setAttribute('title', '中划线')
    document.querySelector('.ql-color')?.setAttribute('title', '字体颜色')
    document.querySelector('.ql-background')?.setAttribute('title', '字体背景色')
    document.querySelector('.ql-size')?.setAttribute('title', '字体大小')
    document.querySelector('.ql-align')?.setAttribute('title', '字体对齐方式')
    document.querySelectorAll('.ql-align .ql-picker-item')[0]?.setAttribute('title', '居左对齐')
    document.querySelectorAll('.ql-align .ql-picker-item')[1]?.setAttribute('title', '居中对齐')
    document.querySelectorAll('.ql-align .ql-picker-item')[2]?.setAttribute('title', '居右对齐')
    document.querySelectorAll('.ql-align .ql-picker-item')[3]?.setAttribute('title', '两端对齐')
    document.querySelector('.ql-clean')?.setAttribute('title', '清除样式')
    document.querySelector('.ql-link')?.setAttribute('title', '超链接')
  }
}

export default RichTextEditor