import React, { PureComponent } from 'react'
import BraftEditor, { EditorState, ControlType } from 'braft-editor'
//@ts-ignore
import ColorPicker from 'braft-extensions/dist/color-picker'
import { Modal } from 'antd'

import 'braft-editor/dist/index.css'
import 'braft-extensions/dist/color-picker.css'
import './index.less'

BraftEditor.use(ColorPicker({
  includeEditors: ['editor-with-color-picker'],
  theme: 'light' // 支持dark和light两种主题，默认为dark
}))

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

  getEditorControls = () => {
    const controls = [
      'undo', 'redo', 'separator',
      'font-size', 'font-family', 'line-height', 'letter-spacing', 'separator',
      'text-color', 'bold', 'italic', 'underline', 'strike-through', 'separator',
      'superscript', 'subscript', 'remove-styles', 'emoji', 'separator', 'text-indent', 'text-align', 'separator',
      'headings', 'list-ul', 'list-ol', 'blockquote', 'code', 'separator',
      'link', 'separator', 'hr', 'separator',
      'media', 'separator',
      'clear', 'fullscreen'
    ]
    return controls.map(item => ({ key: item } as ControlType))
  }

  getFontFamilies = () => { 
    const fontFamilies = [
      {
        name: '宋体',
        family: '"宋体",sans-serif'
      }, {
        name: '黑体',
        family: '"黑体",serif'
      }, {
        name: '隶书',
        family: '隶书'
      },
      {
        name: '微软雅黑',
        family: '微软雅黑'
      },
      {
        name: '楷体',
        family: '楷体'
      },
      {
        name: 'Impact',
        family: 'Impact,Charcoal'
      }, {
        name: 'Monospace',
        family: '"Courier New", Courier, monospace'
      }, {
        name: 'Tahoma',
        family: "tahoma, 'Hiragino Sans GB', sans-serif"
      }]
    return fontFamilies
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
          id="editor-with-color-picker"
          controls={this.getEditorControls()}
          fontFamilies={this.getFontFamilies()}
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