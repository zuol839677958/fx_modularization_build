import React, { Component } from 'react'
import { connect } from 'react-redux'
import { IPageState } from '../../store/data'

import './index.less'

interface IPreviewProps {
  pageHtml: string
}

class Preview extends Component<IPreviewProps> {
  render() {
    const { pageHtml } = this.props

    return (
      <section className="preview-wrap" dangerouslySetInnerHTML={{ __html: pageHtml }}></section>
    )
  }
}

const mapStateToProps = (state: IPageState, ownProps: IPreviewProps) => ({
  pageHtml: state.editorContainerReducer.pageHtml
})


export default connect(mapStateToProps)(Preview)