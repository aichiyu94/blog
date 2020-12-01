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