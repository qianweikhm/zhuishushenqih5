import { get, post, put, del, uploader } from './request'

// 获取书单列表
export const bookList = (params) => get('/book-list', params)
// 获取书单详情
export const bookListDetail = (bookListId) => get(`/book-list/${bookListId}`)
// 获取分类
export const statistics = (params) => get('/cats/lv2/statistics', params)
// 获取二级分类
export const catslv2 = (params) => get('/cats/lv2', params)
// 按分类获取书籍列表
export const categories = (params) => get('/book/by-categories', params)
// 书籍详情
export const bookDetail = (bookid) => get(`/book/${bookid}`)
// 获取书籍书评列表
export const bookReview = (params) => get('/post/review/by-book', params)
// 书籍章节列表（正版）
export const getChaptersList = (sourceid) => get(`atoc/${sourceid}?view=chapters`,)
// 获取小说源（正版）
export const btoc = (params) => get('/atoc', params)
// 章节内容详情
export const getLink = (link) => get(`/chapter/${link}`)
// 热门搜索
export const getHotWord = () => get(`/book/hot-word`)
// 模糊搜索书籍
export const getFuzzySearch = (params) => get(`/book/fuzzy-search`, params)
// 获取综合讨论区帖子列表
export const getPost = (params) => get(`/post/by-block`, params)
// 获取综合讨论区帖子详情
export const getPostDetail = (disscussionId) => get(`/post/${disscussionId}`)
// 获取书荒区帖子列表
export const getHelp = (params) => get(`/post/help`, params)
// 获取书荒区帖子列表详情
export const getHelpDetail = (helpId) => get(`/post/${helpId}`)