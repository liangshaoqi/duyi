import React from 'react'
import { useParams } from 'react-router-dom'

const ComponentName = () => {
  const {id} = useParams()
  console.log(id)
  return (
    <div>
      路由参数{id}
    </div>
  )
}
export default ComponentName