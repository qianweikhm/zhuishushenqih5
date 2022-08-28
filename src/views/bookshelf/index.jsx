import React, { Component, useEffect, useState } from 'react';
import { PullRefresh, List, Toast, Cell, Image, Dialog } from 'react-vant';
import Tabbar from '../../components/tabbar';
import { getPost, getPostDetail } from '../../utils/api'
function Bookshelf() {
  const [infoObj] = useState({ block: 'ramble', duration: 'all', start: 0, limit: 10, sort: 'created', type: 'all', distillate: '' })
  const [list, setList] = useState([])
  const [finished, setFinished] = useState(false)

  const onLoadRefresh = async (isRefresh) => {
    const { posts } = await getPost(infoObj)
    infoObj.start = list.length
    setList(v => {
      const newList = isRefresh ? posts : [...v, ...posts]
      return newList
    })
  }
  const onRefresh = async () => {
    setFinished(false)
    await onLoadRefresh(1)
  }

  const getDetail = async (ele) => {
    const { post } = await getPostDetail(ele._id)
    Dialog.confirm({
      title: post.title,
      message: post.content,
    })
      .then(() => {
        console.log('confirm')
      })
      .catch(() => {
        console.log('catch')
      })
  }

  return (<>
    <PullRefresh onRefresh={onRefresh}>
      {/* List 组件可以与 PullRefresh 组件结合使用，实现下拉刷新的效果 */}
      <List finished={finished} onLoad={onLoadRefresh}>
        {list.map((ele, i) => (
          <Cell key={i} className='flex' onClick={() => getDetail(ele)}>
            <div className='flex'>
              <Image src={'http://statics.zhuishushenqi.com' + ele.author.avatar} className='w-4 rounded-sm overflow-hidden' />
              <div className='ml-1'>
                <p className='font-bold'>{ele.title}</p>
                <p className='text-gray-500'>{ele.author.nickname}</p>
              </div>
            </div>
          </Cell>
        ))}
      </List>
    </PullRefresh>
    <Tabbar />
  </>);
}

export default Bookshelf;