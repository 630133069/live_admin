import { get, post, put , yunICUPost} from './base'

/**
 * 获取已播放视频
 * @param params
 * @returns {Promise<unknown>}
 */
export function getVideo(params){
  return get('/api2/v1/admin/live-meet/18/video',{"id":params})
}

/**
 * 直播会议列表
 * @returns {Promise<unknown>}
 */
export function getLive_meet(){
  return get("/api2/v1/admin/live-meet")
}

/**
 * 修改直播会议
 * @param id
 * @param data
 * @returns {Promise<unknown>}
 */
export function modifyLive_meet(id,data){
  return put('/api2/v1/admin/live-meet/'+id,data)
}

/**
 * 添加直播会议
 * @returns {Promise<unknown>}
 */
export function addLive_meet(data) {
  return post('/api2/v1/admin/live-meet', data)
}

/**
 * 上传文件
 * @param path
 */
export function uploadFile(path){
  return yunICUPost('/api/v1/admin/common/uploadFile?type=YUNICU',{file:path})
}

/**
 * 后台登录
 */
export function adminLogin(){
  return yunICUPost('/api/v1/admin/auth/login',{login_name:'lyp',password:'lyp20200120'})
}
