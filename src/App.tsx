import React, { FC } from 'react'
import EditorContainer from '../src/components/EditorContainer'
import Header from '../src/components/Header'
import EditorBox from '../src/components/EditorSlide'
import BackgroundSet from './components/BackgroundSet'
import './App.less'

const App: FC = () => (
  <div className="App">
    <Header />
    <EditorBox />
    <EditorContainer />
    <BackgroundSet />
  </div>
)

export default App