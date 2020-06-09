import React, { Component, Dispatch } from 'react'
import { Button } from 'antd'
import { connect } from 'react-redux'
import { addCount } from '../../store/actions'
import { Action } from 'redux'

import 'index.less'

interface IEditorContainerProps {
  count?: number;
  clickTest?: Function
}

class EditorContainer extends Component<IEditorContainerProps> {
  render() {
    const { count, clickTest } = this.props

    return (
      <div className="editor-wrap">
        <span>{count}</span>
        <Button type="primary" onClick={() => clickTest && clickTest()}>测试</Button>
      </div>
    )
  }
}

const mapStateToProps = (state: any, ownProps: IEditorContainerProps) => ({
  count: state.testReducer.count
})

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
  clickTest: () => {
    dispatch(addCount())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(EditorContainer)
