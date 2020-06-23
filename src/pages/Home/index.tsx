import React, { Component, Fragment } from 'react'

import EditorContainer from '../../components/EditorContainer'
import Header from '../../components/Header'
import EditorBox from '../../components/EditorSlider'
import BackgroundSet from '../../components/BackgroundSet'
import AddTemplate from '../../components/AddTemplate'

export default class Home extends Component {
  render() {
    return (
      <Fragment>
        <Header />
        <EditorBox />
        <EditorContainer />
        <BackgroundSet />
        <AddTemplate />
      </Fragment>
    )
  }
}