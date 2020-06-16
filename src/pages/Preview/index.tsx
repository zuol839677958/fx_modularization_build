import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { IPageState } from '../../store/data'

interface IPreviewProps {
  pageHtml: string
}

class Preview extends Component<IPreviewProps> {
  render() {
    const { pageHtml } = this.props

    return (
      <div dangerouslySetInnerHTML={{ __html: pageHtml }}></div>
    )
  }
}

const mapStateToProps = (state: IPageState, ownProps: IPreviewProps) => ({
  pageHtml: state.editorContainerReducer.pageHtml
})


export default connect(mapStateToProps)(Preview)