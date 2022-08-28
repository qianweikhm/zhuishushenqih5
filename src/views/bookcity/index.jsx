import React, { useEffect, useState } from 'react';
import Tabbar from '../../components/tabbar';
import BookCard from '../../components/booklist';
import { Search, Swiper, Image, Sticky } from 'react-vant';
import { AppsO } from '@react-vant/icons';
import styles from './index.module.scss'
import classnames from 'classnames'
import { bookList } from '../../utils/api'
import wd from '../../assets/images/wd.png'
import fl from '../../assets/images/fl.png'
import ph from '../../assets/images/ph.png'
import sd from '../../assets/images/sd.png'
import dz from '../../assets/images/dz.png'
import n1 from '../../assets/images/1.png'
import n2 from '../../assets/images/2.png'

function BookCity({ history }) {
  const [value, setValue] = useState('');
  const [tabs, setTabs] = useState([
    { duration: 'last-seven-days', gender: '', active: true, name: '推荐' },
    { gender: 'male', active: false, name: '男频' },
    { gender: 'female', active: false, name: '女频' },
    { gender: 'picture', active: false, name: '阅文好书' },
    { gender: 'press', active: false, name: '晋江好书' },
  ])
  const [params, setParams] = useState({ duration: '', sort: '', start: '', limit: 10, tag: '', gender: '' })
  const setTab = (v, i) => {
    const tab = [...tabs]
    tab.forEach(ele => ele.active = false)
    tab[i].active = true
    setTabs(tab)

    const param = { ...params }
    param.gender = tab[i].gender
    param.duration = tab[i].duration || ''
    setParams(param)
  }
  const [list, setList] = useState([])
  const getData = async () => {
    const { bookLists } = await bookList(params)
    bookLists.forEach(ele => {
      if (ele.cover) {
        ele.coverImg = decodeURIComponent(ele.cover).split('/agent/')[1]
      }
    })
    setList(bookLists)
  }
  const [menus] = useState([
    { icon: wd, name: '分类' },
    { icon: fl, name: '排行' },
    { icon: ph, name: '私人订制' },
    { icon: sd, name: '书单' },
    { icon: dz, name: '书荒问答' },
  ])
  const [navList] = useState([
    { cover: n1, name: '男生小说', tag: ['玄幻', '都市', '仙侠', '历史'] },
    { cover: n2, name: '女生小说', tag: ['豪门总裁', '穿越重生'] },
  ])
  useEffect(() => {
    getData()
  }, [params])
  return (
    <div className='main'>
      <div className={styles.head}>
        <div className='w-full' onClick={() => history.push('/book/search')}>
          <Search readOnly style={{ 'width': "100%" }} value={value} onChange={setValue} placeholder="请输入搜索关键词" />
        </div>
        <div className={styles.class}>
          <AppsO color='#333' fontSize="24" />
        </div>
      </div>
      <Sticky>
        <div className={styles.tabs}>
          {
            tabs.map((ele, index) => (
              <div key={index} className={styles.item} onClick={() => setTab(ele, index)}>
                <p className={classnames({ [styles.active]: ele.active })}>
                  {ele.name}
                  {
                    ele.active && <span className={styles.line}></span>
                  }
                </p>
              </div>
            ))
          }
        </div>
      </Sticky>
      <div className={styles.banner}>
        <Swiper>
          {list.length && list.map((item, index) => {
            return item.coverImg && <Swiper.Item key={index}>
              <Image lazyload fit='cover' src={item.coverImg} />
            </Swiper.Item>
          })}
        </Swiper>
      </div >
      <div className={`${styles.menu} flex justify-between`}>
        {
          menus.map((ele, index) => (
            <div key={index} className={`text-gray-500 `}>
              <Image className='w-3  h-3 m-auto' src={ele.icon} />
              <p className='my-1'> {ele.name}</p>
            </div>
          ))
        }
      </div>
      {
        list.length && <BookCard title='店长的精品书单' id={list[0]._id} />
      }
      {
        list.length && <BookCard title='为你独家推荐' id={list[1]._id} />
      }
      {
        list.length && <BookCard title='小主的专属书单' id={list[2]._id} />
      }
      {
        list.length && <BookCard title='热门飙升' id={list[3]._id} />
      }
      <div className={`flex mt-1 justify-between`}>
        {
          navList.map((ele, index) => (
            <div key={index} style={{ width: '48%' }}>
              <p style={{ fontSize: '0.4rem' }} className={`text-gray-800`}>{ele.name}</p>
              <p className={`text-gray-500`}>
                {
                  ele.tag.map((v, i) => (
                    <span key={i} className={`pr-0.5`}>{v}</span>
                  ))
                }
              </p>
              <Image src={ele.cover} className={`w-full h-7 mt-0.5`} />
            </div>
          ))
        }
      </div>
      <Tabbar />
    </div >
  );
}

export default BookCity;