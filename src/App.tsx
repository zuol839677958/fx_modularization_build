import React, { FC } from 'react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import routers from "./routes/router"
import { Suspense } from 'react'
import { Spin } from 'antd'

import './App.less'

const loadingBox = (
  <div className="loading-wrap">
    <Spin size="large" />
  </div>
)

const App: FC = () => (
  <div className="App">
    <Router>
      <Suspense fallback={loadingBox}>
        <Switch>
          {
            routers.map(item => (
              <Route key={item.path as string} exact path={item.path} component={item.component}></Route>
            ))
          }
        </Switch>
      </Suspense>
    </Router>
  </div>
)

export default App