import request from '../utils/request'

/**
     * 获取文章列表
     */
export function fetchArticleList(success) {
    request.post('http://localhost:5005/v1/blog/articleList', {}, success)
}