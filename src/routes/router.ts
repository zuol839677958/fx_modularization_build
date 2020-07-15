
import { RouteProps } from 'react-router-dom'

import TemplateSelect from '../pages/TemplateSelect'
import Home from '../pages/Home'
import Preview from '../pages/Preview'


const routers: RouteProps[] = [
  {
    path: '/temp/:specialId',
    exact: true,
    component: TemplateSelect
  },
  {
    path: '/home/:specialId/:hasContent/:tempId?',
    exact: true,
    component: Home
  },
  {
    path: '/preview',
    exact: true,
    component: Preview
  }
]

export default routers