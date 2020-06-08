import React, { FC } from 'react'
import EditorContainer from '../src/components/EditorContainer'
import Header from '../src/components/Header'

import './App.css'

const App: FC = () => (
  <div className="App">
    <Header />
    <EditorContainer />
  </div>
)

export default App
