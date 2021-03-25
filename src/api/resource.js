import request from '../utils/request'

/**
 * 获取软件资源列表
 */
export function fetchSoftwareResourceList(success) {
    request.post('resource/software', {}, success)
}

/**
 * 获取热门资源列表
 */
export function fetchHotResourceList(success) {
    request.post('resource/hot', {}, success)
}

/**
 * 获取图片目录列表
 */
export function fetchPictureDirectory(success) {
    request.post('resource/pictureDirectory', {}, success)
}

/**
 * 根据目录获取图片列表
 */
export function fetchPicturesByDir(data) {
    return request.postAsync('resource/picturesByDir', data)
}