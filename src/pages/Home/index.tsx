import React, { PureComponent, Fragment } from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'

import EditorContainer from '@/components/web/EditorContainer'
import Header from '@/components/commonComponents/Header'
import EditorSlider from '@/components/commonComponents/EditorSlider'
import BackgroundSet from '@/components/commonPlugin/BackgroundSet'
import AddTemplate from '@/components/commonComponents/AddTemplate'

class Home extends PureComponent<RouteComponentProps> {
  render() {
    return (
      <Fragment>
        <Header />
        <EditorSlider />
        <EditorContainer {...this.props} />
        <BackgroundSet />
        <AddTemplate />
      </Fragment>
    )
  }
}

export default withRouter(Home)