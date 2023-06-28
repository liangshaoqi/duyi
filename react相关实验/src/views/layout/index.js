import React from 'react'
import { Layout } from 'antd'
import AppRouter from '../../AppRouter'
import Menu from '../../components/Menu'

const { Header, Content, Sider } = Layout;

const LayoutCom = () => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header></Header>
      <Layout>
          
        <Sider><Menu></Menu></Sider>
        <Content>
          <AppRouter></AppRouter>
        </Content>

      </Layout>
    </Layout>
  )
}
export default LayoutCom