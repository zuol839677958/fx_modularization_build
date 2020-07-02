
import { RouteProps } from 'react-router-dom'

import TemplateSelect from '../pages/TemplateSelect'
import Home from '../pages/Home'
import Preview from '../pages/Preview'


const routers: RouteProps[] = [
  {
    path: '/',
    component: TemplateSelect
  },
  {
    path: '/Home/:specialId/:tempId',
    component: Home
  },
  {
    path: '/Preview',
    component: Preview
  }
]

export default routers