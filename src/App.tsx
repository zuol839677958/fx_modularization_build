import React, { FC } from 'react'
import router from './route/router'

import './App.less'

const App: FC = () => (
  <div className="App">
    {router}
  </div>
)

export default App