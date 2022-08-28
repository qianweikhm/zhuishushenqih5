import React, { useState, useEffect } from 'react';
import Tabbar from '../../components/tabbar';
import { Image, Tabs, Sticky } from 'react-vant'
import { statistics } from '../../utils/api'
function Classific({ history }) {
  const handleNav = (e, i) => {
    history.push({
      pathname: '/classific/detail',
      state: {
        gender: gender,
        ...e
      }
    })
  }
  const [tabList] = useState([
    { label: '男频', value: 'male' },
    { label: '女频', value: 'female' },
    { label: '漫画', value: 'picture' },
    { label: '出版', value: 'press' },
  ])
  const [gender, setGender] = useState('male')
  const [list, setList] = useState([])
  const getData = async () => {
    const { male } = await statistics()
    setList(male)
  }
  useEffect(() => {
    getData()
  }, [])
  const onChange = async (i) => {
    const data = await statistics()
    setList(data[tabList[i].value])
    setGender(tabList[i].value)
  }
  const handleImg = (cover) => {
    return decodeURIComponent(cover).split('/agent/')[1]
  }
  return (<div className={`bg-gray-100 h-screen`}>
    <Sticky>
      <Tabs defaultActive={0} active={gender} color='red' onChange={onChange}>
        {tabList.map((item, index) => (
          <Tabs.TabPane key={index} title={`${item.label}`}></Tabs.TabPane>
        ))}
      </Tabs>
    </Sticky>
    <div className={`p-1 mt-1 w-full `}>
      <div className={`flex w-full flex-wrap justify-between`}>
        {
          list.length ? list.map((ele, index) => (
            <div onClick={() => handleNav(ele, index)} style={{ width: "48%" }} className={`flex mb-1 p-1 bg-white rounded-sm`} key={index}>
              <Image className={`w-4 rounded-sm overflow-hidden`} src={handleImg(ele.bookCover[0])} />
              <div className={`ml-1`}>
                <p>{ele.name}</p>
                <p className={`mt-1 text-gray-500`}>{ele.bookCount}本</p>
              </div>
            </div>
          )) : ''
        }
      </div>
    </div>
    <Tabbar />
  </div>);
}

export default Classific;