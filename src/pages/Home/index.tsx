import React, { Component, Fragment } from 'react'

import EditorContainer from '../../components/EditorContainer'
import Header from '../../components/Header'
import EditorBox from '../../components/EditorSlide'
import BackgroundSet from '../../components/BackgroundSet'

export default class Home extends Component {
  render() {
    return (
      <Fragment>
        <Header />
        <EditorBox />
        <EditorContainer />
        <BackgroundSet />
      </Fragment>
    )
  }
}