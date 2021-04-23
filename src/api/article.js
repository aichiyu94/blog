import request from '../utils/request'

/**
 * 获取文章列表
 */
export async function fetchArticleList(condition) {
    return await request.postAsync(`blog/articleList`, condition);
}

/**
 * 查询一个文章
 * @param {*} title 
 * @param {*} success 
 */
export function getArticle(id, success) {
    request.post(`blog/article`, { ResourceId: id }, success)
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
export function recommendationArticle(data, success) {
    request.post('blog/Recommendation', data, success)
}

/**
 * 获取文章热点评论
 * @param {*} success 
 */
export function articleCommentRank(data, success) {
    request.post('blog/articleCommentRank', data, success)
}


/**
 * 获取文章浏览排行
 * @param {*} success 
 */
export function articleBrowserRank(data, success) {
    request.post('blog/articleBrowserRank', data, success)
}

/**
 * 获取网站热点留言
 * @param {*} success 
 */
export function websiteCommentList(data, success) {
    request.post('blog/websiteCommentList', data, success)
}