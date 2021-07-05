
const YunIcuUrl = 'https://yunicu-api.yunicu.com'

module.exports = {
  devServer:{
    proxy:{
      // '/api/v1/admin/':{
      //   target:YunIcuUrl,
      //   changeOrigin:true,
      // },
      // '/api2/v1/admin/':{
      //   target:YunIcuUrl,
      //   changeOrigin:true,
      // },
      '/':{
        target:YunIcuUrl,
        changeOrigin:true,
      }
    }
  },
  lintOnSave:false,
}
