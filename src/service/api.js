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


//-----------------------------------------------镜像管理----------------------------------------------------

//镜像管理列表
export function getImages(){
  return get('/api2/v1/admin/images')
}
//镜像的详情-病案资料-诊断结果-投票内容
export function getImages_details(id){
  return get('/api2/v1/admin/images/'+id)
}

//镜像添加
export function addImages(){
  return get('/api2/v1/admin/images')
}

//--------------------------------------------------相关资料----------------------------

//相关资料列表
export function getImagesRelateInfo(id){
  return get('/api2/v1/admin/images-relate-info',{image_id:id,page_no:0,page_size:10})
}

//相关资料上移与下移
export function putUpOrDown(id,type){
  return put('/api2/v1/admin/images-relate-info/2/UpOrDown/'+id,{type:type})
}

//相关资料修改
/**
 *
 * @param id    	资料的ID
 * @param cover_url 封面图
 * @param title 标题
 * @param jump_url 跳转路径
 */
export function putAmendImagesRelateInfo(id,cover_url,title,jump_url){
  return put('/api2/v1/admin/images-relate-info/'+id,{cover_url:cover_url,title:title,jump_url:jump_url})
}

//相关资料添加

export function postImagesRelateInfo(image_id,cover_url,title,jump_url){
  return post('/api2/v1/admin/images-relate-info',{image_id:image_id,cover_url:cover_url,title:title,jump_url:jump_url})
}

//相关资料详情
export function getImagesRelateInfoDetails(id){
  return get('/api2/v1/admin/images-relate-info/'+id)
}

// 相关资料发布与下线
export function putImagesRelateInfoStatus(id){
  return get('/api2/v1/admin/images-relate-info/'+id+'/status')
}

//相关资料删除


// //------------------------------云ICU-----------------------------
// //上传图片
// export function upload(file){
//   return yunPost('/api/v1/admin/common/uploadFile',{file:file},{type:'YUNICU'})
// }
//
// //登录后台
// export function adminLogin(login_name,password){
//   return yunPost('/api/v1/admin/auth/login',{login_name:'lyp',password:'lyp20200120'},null)
// }
// //登录
// export function login(){
//   return yunPost('/api/v1/app/login',{type:'phone',phone:'15169160632',password:'111111'})
// }
//
// //获取个人信息
// export function getinfo(){
//   return yunGet('/api/v1/app/my/info')

