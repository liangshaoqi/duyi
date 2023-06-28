import React from 'react';
import { Button, Input, Switch } from 'antd'
import { useNavigate, Link } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate()
  return <div>
    <h2>欢迎来到home页面</h2>
    <Button onClick={() => {
      navigate('/routeIdPage/1')
    }}>按钮</Button>
    <Link to='/routeIdPage/998'>路由id传递</Link>
    <Input></Input>
    <Switch checkedChildren="开启" unCheckedChildren="关闭" defaultChecked />
  </div>;
};

export default Home;