import React from 'react';
import { Button, Input, Switch, Form } from 'antd'
import { useNavigate, Link } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate()
  return <div>
    <h2>欢迎来到home页面</h2>
    <Button onClick={() => {
      navigate('/routeIdPage/1')
    }}>按钮</Button>
    <Link to='/routeIdPage/998'>路由id传递</Link>
    <img src="https://www.bai.com/img.png" alt="" />
    <img src="www.1.com/img.png" alt="" />
    <img src="www.2.com/img.png" alt="" />
    <img src="www.3.com/img.png" alt="" />
    <Input></Input>
    <Switch checkedChildren="开启" unCheckedChildren="关闭" defaultChecked />
  </div>;
};

export default Home;