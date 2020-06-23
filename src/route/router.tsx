import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import TemplateSelect from '../pages/TemplateSelect'
import Home from '../pages/Home'
import Preview from '../pages/Preview'

const router = (
  <Router>
    <Route exact path="/" component={TemplateSelect}></Route>
    <Route exact path="/home" component={Home}></Route>
    <Route exact path="/preview" component={Preview}></Route>
  </Router>
)

export default router