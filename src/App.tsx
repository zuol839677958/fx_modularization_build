import React, { FC } from 'react'
import EditorContainer from '../src/components/EditorContainer'
import Header from '../src/components/Header'
import EditorBox from '../src/components/EditorSlide'
import './App.less'

const App: FC = () => (
  <div className="App">
    <Header />
    <EditorBox />
    <EditorContainer />
  </div>
)

export default App

