import request from '../utils/request'

/**
 * 获取访问数据
 * @param {*} success 
 */
export function visitorRecords(success) {
    request.post('blog/VisitorRecords', {}, success)
}

/**
 * 用户访问记录
 * @param {*} success 
 */
export function userVisit(success) {
    request.post('user/access', {}, success)
}

/**
 * 获取Banner
 * @param {*} success 
 */
export function getBanners(success) {
    request.get('blog/banners', {}, success)
}

/**
 * 获取访客列表
 * @param {*} success 
 */
export function getVisitors(success) {
    request.post('blog/visitors', {}, success)
}

/**
 * 获取用户信息
 */
export function getUserInfo() {
    return request.postAsync('user/me', {})
}