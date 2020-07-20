import React, { FC } from 'react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import routers from "./routes/router"

import './App.less'
import { Suspense } from 'react';


const App: FC = () => (
  <div className="App">
    <Router>
      <Suspense fallback={"...loading"}>
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