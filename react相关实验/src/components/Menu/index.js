import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { Menu, } from 'antd';
import routes from '../../routes';

const MenuApp = () => {
  const navigate = useNavigate();
  const [current, setCurrent] = useState('1');
  const [menuItems, setMenuItems] = useState([])


  useEffect(() => {
    initMenuData()
  }, [])

  const getMenuItem = (item) => {
    const { name, path, children = [] } = item
    return {
      label: name,
      key: path,
      children: children.length > 0 ? children.map(item => getMenuItem(item)) : null
    }
  }

  const initMenuData = () => {
    let menuData = routes.map(item => getMenuItem(item))
    setMenuItems(menuData)
  }

  const onClick = (e) => {
    setCurrent(e.key);
    navigate(e.key)
  };
  return (
    <Menu
      theme={'dark'}
      onClick={onClick}
      style={{
        width: '100%',
      }}
      selectedKeys={[current]}
      mode="inline"
      items={menuItems}
    />
  );
};
export default MenuApp;