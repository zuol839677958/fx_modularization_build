import React, { FC } from 'react'
import { HashRouter as Router, Route } from 'react-router-dom'
import routers from "./routes/router"
import './App.less'

const App: FC = () => (
  <div className="App">
    <Router>
      {
        routers.map(item => (
          <Route key={item.path as string} exact path={item.path} component={item.component}></Route>
        ))
      }
    </Router>
  </div>
)

export default App