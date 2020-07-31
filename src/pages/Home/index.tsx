import React, { PureComponent, Fragment } from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'

import EditorContainer from '../../components/EditorContainer'
import Header from '../../components/Header'
import EditorSlider from '../../components/EditorSlider'
import BackgroundSet from '../../components/BackgroundSet'
import AddTemplate from '../../components/AddTemplate'

class Home extends PureComponent<RouteComponentProps> {
  render() {
    return (
      <Fragment>
        <Header {...this.props} />
        <EditorSlider />
        <EditorContainer {...this.props} />
        <BackgroundSet />
        <AddTemplate />
      </Fragment>
    )
  } 
}

export default withRouter(Home)