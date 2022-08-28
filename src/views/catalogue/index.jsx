import React, { Component, useEffect, useState } from 'react'
import { NavBar, PullRefresh, List, Toast, Cell } from 'react-vant'
import { getChaptersList } from '../../utils/api'


function Catalogue({ location, history }) {
  const { state } = location

  const [list, setList] = useState([])
  const [finished, setFinished] = useState(false)
  const [link, setLink] = useState('')

  const onLoadRefresh = async (isRefresh) => {
    const { link, chapters } = await getChaptersList(state.sourceid)
    setLink(link)
    setList(v => {
      const newList = isRefresh ? chapters : [...v, ...chapters]
      if (newList.length >= 30) {
        setFinished(true)
      }
      return newList
    })
  }

  const onRefresh = async () => {
    setFinished(false)
    await onLoadRefresh(1)
  }


  return (<>
    <NavBar
      className={`text-black`}
      title={state.title}
      onClickLeft={() => history.go(-1)}
    />
    <PullRefresh onRefresh={onRefresh}>
      {/* List 组件可以与 PullRefresh 组件结合使用，实现下拉刷新的效果 */}
      <List finished={finished} onLoad={onLoadRefresh}>
        {list.map((ele, i) => (
          <Cell onClick={() => Toast.fail('数据源已被封')} key={i}>
            <div className='flex'>
              <p className='text-gray-500'>{ele.title}</p>
            </div>
          </Cell>
        ))}
      </List>
    </PullRefresh>
  </>);
}

export default Catalogue;