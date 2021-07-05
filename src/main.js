import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'element-plus/lib/theme-chalk/index.css'
import lang from 'element-plus/lib/locale/lang/zh-cn'
import 'dayjs/locale/zh-cn'

import {
  locale,
  ElButton ,
  ElTable ,
  ElTableColumn,
  ElImage,ElDialog,
  ElDescriptions ,
  ElDescriptionsItem,
  ElForm,
  ElFormItem,
  ElInput,
  ElDatePicker,
  ElTimePicker,
  ElUpload
} from 'element-plus'

locale(lang)

const app = createApp(App)
app.use(ElButton)
  .use(ElTable)
  .use(ElTableColumn)
  .use(ElImage)
  .use(ElDialog)
  .use(ElDescriptions)
  .use(ElDescriptionsItem)
  .use(ElForm)
  .use(ElFormItem)
  .use(ElInput)
  .use(ElDatePicker)
  .use(ElTimePicker)
  .use(ElUpload)



app.use(store).use(router).mount('#app')
