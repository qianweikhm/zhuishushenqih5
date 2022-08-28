import React, { useEffect, useState } from 'react'
import { Search, Tag, PullRefresh, List, Tabs, Cell, Image, } from 'react-vant'
import { getHotWord, getFuzzySearch } from '../../utils/api'
import { Arrow } from '@react-vant/icons';

// 模拟异步请求
async function getData(throwError) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (throwError) {
        reject(new Error('error'))
      }
      resolve(Array.from({ length: 10 }, (_, i) => i))
    }, 2000)
  })
}

function BookSearch({ history }) {
  const [value, setValue] = useState('斗破');
  const [hotWords, setHotWords] = useState([])
  const [newHotWords, setnewHotWords] = useState([])
  const [start, setStart] = useState(0)
  useEffect(() => {
    const getData = async () => {
      const { hotWords, newHotWords } = await getHotWord()
      setHotWords(hotWords)
      setnewHotWords(newHotWords)
    }
    getData()
  }, [])

  const handleSearch = async (v) => {
    onRefresh()
    setValue(v)
  }
  const [list, setList] = useState([])
  const [finished, setFinished] = useState(false)

  const onLoadRefresh = async (isRefresh) => {
    const { books, total } = await getFuzzySearch({ query: value, start: start, limit: 10 })
    setList(v => {
      const newList = isRefresh ? books : [...v, ...books]
      if (newList.length >= total) {
        setFinished(true)
      }
      return newList
    })
    setStart(list.length)
  }

  const handleImg = (cover) => {
    return decodeURIComponent(cover).split('/agent/')[1]
  }
  const onRefresh = async () => {
    setFinished(false)
    await onLoadRefresh(1)
  }

  const BookList = () => {
    return (
      <PullRefresh onRefresh={onRefresh}>
        {/* List 组件可以与 PullRefresh 组件结合使用，实现下拉刷新的效果 */}
        <List finished={finished} onLoad={onLoadRefresh}>
          {
            list.map((ele, index) => (
              <div onClick={() => history.push({ pathname: '/book/index', state: { ...ele } })} key={index} className='p-1 flex'>
                <Image src={handleImg(ele.cover)} className='flex-shrink-0 w-8 mr-1' />
                <div className=''>
                  <p className='font-bold'>{ele.title}</p>
                  <p className='mt-0.5 text-gray-500 line-clamp-2'>{ele.shortIntro}</p>
                  <p className='text-gray-500 mt-1.5 flex justify-between items-center'>
                    <span>{ele.author}</span>
                    <Tag>{ele.cat}</Tag>
                  </p>
                </div>
              </div>
            ))
          }
        </List>
      </PullRefresh>
    )
  }
  const BooksEmpty = () => {
    return (<div className='p-1'>
      <div className='flex justify-between'>
        <p className='font-bold'>搜索热词</p>
        <p className='flex items-center text-gray-500'>查看更多<Arrow /></p>
      </div>
      <div className='mt-1'>
        {
          hotWords.length ? <>
            {
              hotWords.map((ele, index) => <Tag round className='mr-1 mb-1' key={index}>{ele}</Tag>)
            }
          </> : ''
        }
      </div>
      <div className='flex justify-between'>
        <p className='font-bold'>全站热搜</p>
      </div>
      <div className='mt-1'>
        {
          newHotWords.length ? <>
            {
              newHotWords.map((ele, index) => <Tag round className='mr-1 mb-1' key={index}>{ele.word}</Tag>)
            }
          </> : ''
        }
      </div>
    </div>)
  }
  return (<>
    <Search
      value={value}
      onChange={setValue}
      placeholder="请输入搜索关键词"
      showAction
      onSearch={(val) => handleSearch(val)}
      onCancel={() => {
        setValue('');
        setList([])
      }}
      onClear={() => {
        setValue('');
        setList([])
      }}
      onClickInput={() => {
      }}
    />

    {
      list.length ? <BookList /> : <BooksEmpty />
    }
  </>);
}

export default BookSearch;