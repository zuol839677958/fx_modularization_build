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
    <Suspense fallback={loadingBox}>
      <Router>
        <Switch>
          {
            routers.map(item => (
              <Route key={item.path as string} {...item}></Route>
            ))
          }
        </Switch>
      </Router>
    </Suspense>
  </div>
)

export default App