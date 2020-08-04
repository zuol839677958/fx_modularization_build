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
      <Header isMobile={true} {...props} />
      <EditorContainerMobile {...props} />
      <EditorSlider isMobile={true} />
      <BackgroundSet isMobile={true} />
      <AddTemplate isMobile={true} />
    </>
  )
}

export default withRouter(MobileHome)