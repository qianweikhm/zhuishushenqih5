import React, { Component, useEffect, useState } from 'react';
import { NavBar, Tabs, PullRefresh, List, Cell, Image, Empty } from 'react-vant';
import { catslv2, categories } from '../../utils/api'

function Detail({ location, history }) {
  const { state } = location
  const [mins, setMins] = useState([])
  const [infoObj, setInfoObj] = useState({ type: 'hot', major: state.name, minor: '', start: 0, limit: 10, total: 0, gender: state.gender })
  const getCatslv2 = async () => {
    const data = await catslv2()
    const gender = data[state.gender]
    const mins = (gender.filter(ele => ele.major == state.name))[0].mins
    setMins(mins)
  }
  useEffect(() => {
  }, [])

  const [list, setList] = useState([])
  const [finished, setFinished] = useState(false)
  const onLoadRefresh = async (isRefresh) => {
    if (!infoObj.minor) {
      console.log(1);
      const data = await catslv2()
      const gender = data[state.gender]
      const mins = (gender.filter(ele => ele.major == state.name))[0].mins
      setMins(mins)
      infoObj.minor = mins[0]
    }
    const { books, total } = await categories(infoObj)
    infoObj.start = list.length
    setList(v => {
      const newList = isRefresh ? books : [...v, ...books]
      if (newList.length >= total) {
        setFinished(true)
      }
      return newList
    })
  }

  const onRefresh = async () => {
    setFinished(false)
    await onLoadRefresh(1)
  }

  const onChange = (v) => {
    console.log(mins[v]);
    infoObj.minor = mins[v]
    infoObj.start = 0
    onRefresh()
  }
  const handleImg = (cover) => {
    return decodeURIComponent(cover).split('/agent/')[1]
  }

  return (<div >
    <NavBar
      className={`text-black`}
      title={state.name}
      onClickLeft={() => history.go(-1)}
    />
    {
      mins.length ? <Tabs onChange={onChange} color='red' defaultActive={0}>
        {mins.map((item, index) => (
          <Tabs.TabPane key={index} title={`${item}`}></Tabs.TabPane>
        ))}
      </Tabs> : ''
    }
    <div className=''>
      <PullRefresh onRefresh={onRefresh}>
        {/* List 组件可以与 PullRefresh 组件结合使用，实现下拉刷新的效果 */}
        <List finished={finished} onLoad={onLoadRefresh}>
          {list.map((ele, i) => (
            <Cell onClick={() => history.push({ pathname: '/book/index', state: { ...ele } })} className='w-full' key={i}>
              <div className={`flex w-full`}>
                <Image className={`w-10 flex-shrink-0 rounded-sm overflow-hidden`} src={handleImg(ele.cover)} />
                <div style={{ width: 'calc(100% - 2.55rem)' }} className={`ml-1 flex flex-col justify-between`}>
                  <p className={`font-bold`}>{ele.title}</p>
                  <p className='w-full  line-clamp-2' style={{ fontSize: "0.3rem" }}>{ele.shortIntro}</p>
                  <p className='whitespace-nowrap  text-gray-500' style={{ fontSize: "0.2rem" }}>
                    <span className='text-blue-500'>{ele.majorCate}</span> · <span className='text-red-500'>{ele.minorCate}</span> · <span className='text-gray-500 font-bold'>{ele.author}</span>
                  </p>
                </div>
              </div>
            </Cell>
          ))}
        </List>
        {
          !list.length && <Empty description="暂无数据" />
        }
      </PullRefresh>
    </div>
  </div>);
}

export default Detail;