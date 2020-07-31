import React, { FC } from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'

import EditorContainerMobile from '../../components/EditorContainerMobile'
import Header from '../../components/Header'
import EditorSlider from '../../components/EditorSlider'
import BackgroundSet from '../../components/BackgroundSet'
import AddTemplate from '../../components/AddTemplate'

const MobileHome: FC<RouteComponentProps> = props => {
  return (
    <>
      <Header {...props} />
      <EditorContainerMobile {...props} />
      <EditorSlider />
      <BackgroundSet isMobile={true} />
      <AddTemplate />
    </>
  )
}

export default withRouter(MobileHome)