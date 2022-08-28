import React, { useState } from 'react'
import Tabbar from '../../components/tabbar';
import { Search } from 'react-vant';

function Home() {
  const [value, setValue] = useState('');
  return (
    <>
      <div className='head'>
        <Search value={value} onChange={setValue} placeholder="请输入搜索关键词" />
      </div>
      <Tabbar />
    </>
  );
}

export default Home;