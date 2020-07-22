
import { RouteProps } from 'react-router-dom'
import { lazy } from 'react';

const TemplateSelect = lazy(() => import(/* webpackChunkName: "TemplateSelect" */"../pages/TemplateSelect"))
const Home = lazy(() => import(/* webpackChunkName: "Home" */"../pages/Home"))
const Preview = lazy(() => import(/* webpackChunkName: "Preview" */"../pages/Preview"))

const routers: RouteProps[] = [
  {
    path: '/',
    exact: true,
    component: TemplateSelect
  },
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