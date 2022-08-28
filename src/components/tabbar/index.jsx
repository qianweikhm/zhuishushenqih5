import React, { useState, useEffect } from 'react'
import { Tabbar } from 'react-vant';
import { FriendsO, CouponO, CartO, ClusterO } from '@react-vant/icons'
import { useLocation, useHistory } from 'react-router-dom'
const list = [
  { path: 'bookshelf', name: 'bookshelf', icon: <CouponO />, title: '讨论' },
  { path: 'bookcity', name: 'bookcity', icon: <CartO />, title: '书城' },
  { path: 'classific', name: 'classific', icon: <ClusterO />, title: '分类' },
  { path: 'my', name: 'my', icon: <FriendsO />, title: '书荒' },
]
function TabbarList() {
  const location = useLocation()
  const history = useHistory()
  const [name, setName] = React.useState('bookshelf')
  const [menu] = useState(list)
  const onChange = (v) => {
    const cur = menu.filter(ele => ele.name == v)
    history.push(cur[0].path)
    setName(v)
  }

  useEffect(() => {
    const pathname = location.pathname.split('/')[1]
    setName(pathname)
  }, [location])
  return (
    <Tabbar value={name} onChange={onChange}>
      {
        menu.map((ele, index) => (
          <Tabbar.Item name={ele.name} key={index} icon={ele.icon}>{ele.title}</Tabbar.Item>
        ))
      }
    </Tabbar>
  );
}

export default TabbarList;