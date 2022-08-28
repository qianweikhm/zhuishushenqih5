import React, { useState, useEffect } from 'react';
import { bookDetail, bookReview, btoc } from '../../utils/api'
import { Image, NavBar, Rate, Tag, Skeleton } from 'react-vant'
import { Arrow, ChatO, MedalO, Edit, GoodJobO, CouponO, FontO, ServiceO } from '@react-vant/icons';

const ingUrl = 'http://statics.zhuishushenqi.com'
function BookIndex({ location, history }) {
  const { state } = location
  const [infoObj, setInfoObj] = useState({})
  const [reviewObj, setReviewObj] = useState([])
  const [loading, setLoading] = useState(true);
  const [sourceid, setsourceid] = useState('')
  const getBookDetail = async () => {
    const data = await bookDetail(state._id)
    setInfoObj(data)
    getBookReview()
    getBtoc()
  }
  const getBookReview = async () => {
    const data = await bookReview({ book: state._id, limit: 10 })
    setReviewObj(data)
    setLoading(false)
  }

  const getBtoc = async () => {
    const data = await btoc({ book: state._id, view: 'summary' })
    setsourceid(data[0]._id)
  }
  useEffect(() => {
    getBookDetail()
  }, [])
  const handleImg = (cover) => {
    return decodeURIComponent(cover).split('/agent/')[1]
  }
  const formatNumber = (num) => {
    num = Number(num);
    if (num == 0) {
      return num + '';
    } else
      if (num > 1 && num < 10000) {
        return num + '';
      } else {
        return (num / 10000).toFixed(2);
      }
  }
  const formatDate = (fmt, time) => {
    const date = new Date(time)
    let ret;
    const opt = {
      "Y+": date.getFullYear().toString(),        // 年
      "m+": (date.getMonth() + 1).toString(),     // 月
      "d+": date.getDate().toString(),            // 日
      "H+": date.getHours().toString(),           // 时
      "M+": date.getMinutes().toString(),         // 分
      "S+": date.getSeconds().toString()          // 秒
      // 有其他格式化字符需求可以继续添加，必须转化成字符串
    };
    for (let k in opt) {
      ret = new RegExp("(" + k + ")").exec(fmt);
      if (ret) {
        fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
      };
    };
    return fmt;
  }
  return (
    <Skeleton avatar loading={loading}>
      <>
        <NavBar
          className={`text-black`}
          onClickLeft={() => history.go(-1)}
        />
        <div className=''>
          <div className='p-1 flex justify-between'>
            <div className='flex flex-col justify-between'>
              <p className='font-bold' style={{ fontSize: '0.5rem' }}>{infoObj.title}</p>
              <div>
                <p className='flex items-center text-gray-500'>{infoObj.author}<Arrow /></p>
                <p className='mt-0.5 text-gray-500'>{infoObj.cat} · 完结 · {formatNumber(infoObj.wordCount)}万字</p>
              </div>
            </div>
            <div className='flex-shrink-0 rounded-sm overflow-hidden'>
              <Image className='w-8 rounded-sm' src={handleImg(infoObj.cover)} />
            </div>
          </div>
          <div className='p-1'>
            <div className='rounded-sm justify-between items-center text-yellow-500 box-border flex mt-1 bg-black text-white p-0.5'>
              <div className='flex'> <MedalO color='#d7ba17' fontSize='20' />
                开通VIP,免广告,可缓存</div>
              <Arrow />
            </div>
          </div>
          <div className='p-1 my-1 flex'>
            <div className='w-1/3 '>
              <div className='flex items-center'>
                <p style={{ fontSize: '0.5rem' }} className='font-bold mr-0.5'>{infoObj.ratingPack | '-'}</p>
                <Rate size='8' color='#d7ba17' value={infoObj.starRatingCount} />
              </div>
              <p className='flex items-center text-gray-500 mt-0.25' style={{ fontSize: '0.2rem' }}>小编评分<Arrow fontSize='10' /></p>
            </div>
            <div className='w-1/3 '>
              <p style={{ fontSize: '0.5rem' }} className='font-bold mr-0.5'> {formatNumber(infoObj.totalFollower)}<span className='text-gray-500' style={{ fontSize: '0.2rem' }}>万</span></p>
              <p className='text-gray-500 mt-0.25' style={{ fontSize: '0.2rem' }}>七日人气</p>
            </div>
            <div className='w-1/3 '>
              <p style={{ fontSize: '0.5rem' }} className='font-bold mr-0.5'> {infoObj.retentionRatio}<span className='text-gray-500' style={{ fontSize: '0.2rem' }}>%</span></p>
              <p className='text-gray-500 mt-0.25' style={{ fontSize: '0.2rem' }}>保留率</p>
            </div>
          </div>
          <div className='bg-gray-100 h-0.5'></div>
          <div>
            <p className='p-1'>简介</p>
            <div className='w-full h-px bg-gray-100'></div>
            <p className='p-1 text-gray-500'>{infoObj.longIntro}</p>
            <div className='px-1'>
              {
                infoObj.tags ? <>
                  {
                    infoObj.tags.map((ele, index) => (
                      <Tag round key={index} color="#c8cace" className='mr-1 '>{ele}</Tag>
                    ))
                  }
                </> : ''
              }
            </div>
          </div>
          <div className='bg-gray-100 mt-1 h-0.5'></div>
          <div onClick={() => history.push({ pathname: '/book/catalogue', state: { sourceid: sourceid, ...infoObj } })} className='p-1 flex justify-between items-center'>
            <p className='font-bold' style={{ fontSize: '0.4rem' }}>目录</p>
            <p className='text-gray-500 flex items-center'>已完结·{infoObj.chaptersCount}章<Arrow fontSize='10' /></p>
          </div>
          <div className='bg-gray-100 h-0.5'></div>
          <div className='p-1 flex justify-between items-center'>
            <p className='font-bold' style={{ fontSize: '0.4rem' }}>热门书评  {reviewObj.total}条</p>
            <p className='flex items-center text-red-500'><Edit className='mr-0.25' />写书评</p>
          </div>
          <div className='w-full h-px bg-gray-100'></div>
          <div className='p-1'>
            {
              reviewObj.reviews && reviewObj.reviews.map((ele, index) => (
                <div key={index} className='flex mb-1'>
                  <Image round className='w-4 flex-shrink-0  overflow-hidden' src={ingUrl + ele.author.avatar} />
                  <div className='ml-1 overflow-hidden' style={{ width: 'calc(100% - 1.5rem' }}>
                    <p>{ele.author.nickname}<span className='pl-1 text-red-500'>Lv{ele.author.lv}</span></p>
                    <p className='text-gray-400'>{formatDate("YYYY-mm-dd HH:MM", ele.updated)}</p>
                    <Rate size='8' color='#d7ba17' value={ele.rating} />
                    <p className='text-gray-500 w-full'>{ele.content}</p>
                    <div className='flex justify-end items-center'>
                      <p className='text-gray-500  flex items-center mr-1'><ChatO className='mr-0.25' fontSize='14' />{ele.commentCount}</p>
                      <p className='text-gray-500 flex items-center'><GoodJobO className='mr-0.25' fontSize='14' />{ele.likeCount}</p>
                    </div>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
        <div className='fixed flex justify-center shadow-sm items-center h-6 bg-white w-screen bottom-0 left-0'>
          <p className='flex flex-col items-center'><CouponO color='red' fontSize={20} />追更新</p>
          <p className='flex flex-col items-center ml-4'> <ServiceO color='red' fontSize={20} />听书</p>
          <p className='flex flex-col items-center  ml-4'><FontO color='red' fontSize={20} />免费阅读</p>
        </div>
      </>
    </Skeleton>
  )
}

export default BookIndex;