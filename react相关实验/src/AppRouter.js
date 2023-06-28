import React, { Suspense, useEffect, useState } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import routes from './routes'

const AppRouter = () => {
  const [routesSource, setRoutesSource] = useState([])
  useEffect(() => {
    setRoutesSource(flattenRoutes(routes))
  }, [])

  const flattenRoutes = (routes) => {
    let result = []

    routes.forEach((route) => {
      const { component, children = [] } = route
      if (component) result.push(route)
      if (children.length > 0) {
        let resultChildren = flattenRoutes(children)
        result = result.concat(resultChildren)
      }
    })
    return result
  }
  return (
    <Suspense fallback={
      <div>loading....</div>
    }>
      <Routes>
        {
          routesSource.map(({path, component: El}, i) => <Route key={i} path={path} element={<El></El>}></Route>)
        }
        <Route path='/404' element={<div>404</div>}></Route>
        <Route path='/' element={<Navigate to='/home'></Navigate>}></Route>
      </Routes>
    </Suspense>
  )
}
export default AppRouter