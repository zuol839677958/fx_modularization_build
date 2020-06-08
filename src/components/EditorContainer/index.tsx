import React, { Component } from 'react'
import { Button } from 'antd'
import { connect } from 'react-redux'
import { addCount } from '../../store/actions'

import './index.css'

interface IEditorContainerProps {
  count: number;
  clickTest: Function
}

class EditorContainer extends Component<IEditorContainerProps> {
  render() {
    console.log('test:', this.props)

    return (
      <div className="editor-wrap">
        <span>{this.props.count}</span>
        <Button type="primary" onClick={() => this.props.clickTest()}>测试</Button>
      </div>
    )
  }
}

const mapStateToProps = (state: any, ownProps: any) => ({
  count: state.testReducer.count
})

const mapDispatchToProps = (dispatch: any) => ({
  clickTest: () => {
    dispatch(addCount())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(EditorContainer)
