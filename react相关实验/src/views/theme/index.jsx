import React, { FC, useState, useEffect } from 'react'
import { Switch } from 'antd'
import './index.scss'
const ComponentName = () => {
  const [isDark, setIsDark] = useState(false)
  const change = () => {
    setIsDark(!isDark)
  }
  useEffect(() => {
    document.documentElement.dataset.theme = isDark ? 'dark' : 'light'
  }, [isDark])
  return (
    <div className='theme-page'>
      切换<Switch onClick={change}></Switch>
      <p>如果你使用的是 create-react-app 的老版本（2.x 或更早），那么它可能使用 node-sass 来处理 SASS/SCSS 文件。在这种情况下，你需要确保 node-sass 也被安装：

        Copy code</p>
    </div>
  )
}
export default ComponentName