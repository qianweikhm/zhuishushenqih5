import React, { Component, useEffect, useState } from 'react'
import styles from './index.module.scss'
import { Arrow } from '@react-vant/icons';
import { Tag } from 'react-vant';
import { Image } from 'react-vant';
import { bookListDetail } from '../../utils/api'
import { useHistory } from 'react-router-dom'

function BookCard(props) {
  const history = useHistory()
  const { title, id } = props
  const [books, setBooks] = useState([])
  const getData = async () => {
    const { bookList } = await bookListDetail(id)
    bookList.books.forEach(ele => {
      ele._id = ele.book._id
      if (ele.book && ele.book.cover) {
        ele.book.cover = decodeURIComponent(ele.book.cover).split('/agent/')[1]
      }
    })
    setBooks(bookList.books)
  }
  useEffect(() => {
    getData()
  }, [props])
  return (<div className={`${styles.main} mt-1`}>
    <div className={`${styles.title}  flex justify-between items-center`}>
      <p className={styles.titleLeft}>{title}</p>
      <p className={`flex text-gray-500 items-center ${styles.more}`}>更多<Arrow fontSize={12} /></p>
    </div>
    <div className={`${styles.list} mt-1`}>
      {
        books.length && books.map((ele, index) => (
          <div onClick={() => history.push({ pathname: '/book/index', state: { ...ele } })} key={index} className={`${styles.item} mb-2 flex overflow-hidden`}>
            <Image src={ele.book.cover} className={`w-8 flex-shrink-0 rounded-sm overflow-hidden`} />
            <div className={`ml-1 w-full`} style={{ width: 'calc(100% - 2.4rem' }}>
              <p className={`text-gray-500 w-full overflow-ellipsis overflow-hidden whitespace-nowrap`}>{ele.book.title}</p>
              <p className={`text-blue-500 mt-3`}>
                <Tag> {ele.book.majorCate}</Tag>
              </p>
              <p className={`w-full text-red-500 mt-1 overflow-ellipsis overflow-hidden whitespace-nowrap`}>{ele.book.author}</p>
            </div>
          </div>
        ))
      }
    </div>
  </div>);
}

export default BookCard;