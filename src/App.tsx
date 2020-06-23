import React, { FC } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import selectTemplatePage from './pages/templateSelect'
import Home from './pages/Home'
import Preview from './pages/Preview'

import './App.less'

const App: FC = () => (
  <div className="App">
    <Router>
      <Route exact path="/" component={selectTemplatePage}></Route>
      <Route exact path="/home" component={Home}></Route>
      <Route exact path="/preview" component={Preview}></Route>
    </Router>
  </div>
)

export default App