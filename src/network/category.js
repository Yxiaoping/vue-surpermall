import {request} from './request'
export function getCategory(){
    return request({
        url: '/category'
    })
}
export function getsubcategory(maitKey) {
    return request({
        url:'/subcategory',
        params: {
            maitKey
        }
    })
}
export function getContentDetail(miniWallkey, type){
    return request({
        url: '/subcategory/detail',
        params: {
            miniWallkey,
            type
        }
    })
}