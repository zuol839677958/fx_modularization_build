import React, { FC } from 'react'
import { withRouter } from 'react-router-dom'

import EditorContainerMobile from '@/components/mobile/EditorContainerMobile'
import Header from '@/components/commonComponents/Header'
import EditorSlider from '@/components/commonComponents/EditorSlider'
import BackgroundSet from '@/components/commonPlugin/BackgroundSet'
import AddTemplate from '@/components/commonComponents/AddTemplate'

const MobileHome: FC = () => {
  return (
    <>
      <Header isMobile={true} />
      <EditorContainerMobile />
      <EditorSlider isMobile={true} />
      <BackgroundSet isMobile={true} />
      <AddTemplate isMobile={true} />
    </>
  )
}

export default withRouter(MobileHome)