import axios from 'axios'

const api_head = 'https://yunicu-api.yunicu.com'
const baseURL = api_head
axios.defaults.baseURL = baseURL

export function get(url,params){
//封装get方法
  return axios.get(url,{
    params,
    headers: {
      'x-token':'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwibG9naW5fbmFtZSI6ImZyZWQiLCJ1c2VyX25hbWUiOiLlqITmlozmlowiLCJyb2xlX2lkIjoxLCJyb2xlX25hbWUiOiLotoXnuqfnrqHnkIblkZgifQ.V9RnbWTUqkB1kL6ytTxRRrOWjlpdH7qnT7BIfcFLutI',
    }
  },).then((res)=>{
    const serverData = res.data
      return serverData
  }).catch((e)=>{
    console.log(e);
  })
}

export function post(url,data){
  return axios.post(url,data,{headers:{
      'x-token':'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwibG9naW5fbmFtZSI6ImZyZWQiLCJ1c2VyX25hbWUiOiLlqITmlozmlowiLCJyb2xlX2lkIjoxLCJyb2xlX25hbWUiOiLotoXnuqfnrqHnkIblkZgifQ.V9RnbWTUqkB1kL6ytTxRRrOWjlpdH7qnT7BIfcFLutI',
    }})
    .then((res)=>{
      const serverData = res.data
      return serverData
    }).catch((e)=>{
      console.log(e)
    })
}

export function put(url,data){
  return axios.put(url,data)
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
