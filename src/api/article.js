import request from '../utils/request'

/**
     * 获取文章列表
     */
export function fetchArticleList(p, ps, success) {
    request.post(`blog/articleList?page=${p}&pageSize=${ps}`, {}, success)
}

/**
 * 查询一个文章
 * @param {*} id 
 * @param {*} success 
 */
export function getArticle(id, success) {
    request.post(`blog/article?articleId=${id}`, {}, success)
}

/**
 * 获取所有标签
 * @param {*} success 
 */
export function getTags(success) {
    request.post('blog/Tags', {}, success)
}

/**
 * 获取推荐列表
 * @param {*} success 
 */
export function recommendationArticle(size, success) {
    request.post('blog/Recommendation?size=' + size, {}, success)
}

/**
 * 获取文章热点评论
 * @param {*} success 
 */
export function articleCommentRank(size, success) {
    request.post('blog/articleCommentRank?size=' + size, {}, success)
}


/**
 * 获取文章浏览排行
 * @param {*} success 
 */
export function articleBrowserRank(size, success) {
    request.post('blog/articleBrowserRank?size=' + size, {}, success)
}

/**
 * 获取网站热点留言
 * @param {*} success 
 */
export function websiteCommentList(size, success) {
    request.post('blog/websiteCommentList?size=' + size, {}, success)
}