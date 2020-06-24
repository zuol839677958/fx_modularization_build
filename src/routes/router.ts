
import { RouteProps } from 'react-router-dom'

import TemplateSelect from '../pages/templateSelect'
import Home from '../pages/Home'
import Preview from '../pages/Preview'


const routers: RouteProps[] = [
  {
    path: '/',
    component: TemplateSelect
  },
  {
    path: '/Home',
    component: Home
  },
  {
    path: '/Preview',
    component: Preview
  }
]

export default routers