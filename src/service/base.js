import axios from 'axios'

const baseURL = '/'
const api_head = 'https://yunicu-api.yunicu.com'
const yun_api_head = 'https://yunicu-api.yunicu.com'
axios.defaults.baseURL = baseURL

export function get(url,params){
//封装get方法
  return axios.get(api_head+url,{
    params
  }).then((res)=>{
    const serverData = res.data
      return serverData
  }).catch((e)=>{
    console.log(e);
  })
}

export function post(url,data){
  return axios.post(api_head+url,data)
    .then((res)=>{
      const serverData = res.data
      return serverData
    }).catch((e)=>{
      console.log(e)
    })
}

export function put(url,data){
  return axios.put(api_head+url,data)
    .then((res)=>{
      const serverData = res.data
      return serverData
    }).catch((e)=>{
      console.log(e)
    })
}

export function yunICUPost(url,data){
  return axios.post(url,data)
    .then((res)=>{
      const serverData = res.data
      return serverData
    }).catch((e)=>{
      console.log(e)
    })
}
