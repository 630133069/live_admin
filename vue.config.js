
const YunIcuUrl = 'https://yunicu-api.yunicu.com'

module.exports = {
  devServer:{
    proxy:{
      '/api/v1/admin/':{
        target:YunIcuUrl,
        changeOrigin:true,
      }
    }
  }
}
