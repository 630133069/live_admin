<template>
  <div>
    <p>直播后台管理System</p>
    <el-button type="primary" @click="addLive_meet">添加</el-button>
    <el-button @click="adminLogin">临时登录</el-button>
    <el-table
      :data="live_tab"
      >
      <el-table-column
        prop="id"
        label="id">
      </el-table-column>
      <el-table-column
        prop="title"
        label="标题">
      </el-table-column>
      <el-table-column
        label="视频封面图">
        <template #default="scope">
          <el-image :src=scope.row.cover_url></el-image>
        </template>
      </el-table-column>
      <el-table-column
        prop="created_time"
        label="开始时间">
      </el-table-column>
      <el-table-column
        prop="end_time"
        label="结束时间">
      </el-table-column>
      <el-table-column
        label="宣传海报">
        <template #default="scope">
          <el-image
            fit="contain"
            style="width: 100px; height: 100px"
            :src=scope.row.desc_image_url></el-image>
        </template>
      </el-table-column>
      <el-table-column
        label="获取推流拉流">
        <template #default="scope">
          <el-button  type="primary" @click="getpush(scope.row.obs_push_ip,scope.row.obs_push_name)"  size="small">推流</el-button>
          <el-button type="primary" @click="getpull(scope.row.pull_rtmp_ip,scope.row.pull_flv_ip,scope.row.pull_m3u8_ip)" size="small">拉流</el-button>
        </template>
      </el-table-column>
      <el-table-column
        label="修改">
        <template #default="scope">
          <el-button  type="primary" @click="alterLive_meet(scope.row)"  size="small">修改</el-button>
        </template>
      </el-table-column>
    </el-table>

<!--    推流地址对话框-->
    <el-dialog
      v-model="push_dialogVisible"
      width="70%">
      <el-descriptions
        title="推流地址"
        :column="1"
        direction="vertical"
        border
      >
        <el-descriptions-item label="服务器:">{{ push_data.obs_push_ip }}</el-descriptions-item>
        <el-descriptions-item label="串流密钥(yue):">{{ push_data.obs_push_name }}</el-descriptions-item>
      </el-descriptions>
        <template #footer>
            <span class="dialog-footer">
              <el-button @click="this.pull_dialogVisible = false">关 闭</el-button>
            </span>
        </template>
    </el-dialog>

<!--拉流地址对话框-->
    <el-dialog
      v-model="pull_dialogVisible"
      width="70%">
      <el-descriptions
        title="播放地址"
        :column="1"
        direction="vertical"
        border
      >
        <el-descriptions-item label="rtmp:">{{ pull_data.pull_rtmp_ip }}</el-descriptions-item>
        <el-descriptions-item label="flv:">{{ pull_data.pull_rtmp_ip }}</el-descriptions-item>
        <el-descriptions-item label="m3u8:">{{ pull_data.pull_rtmp_ip }}</el-descriptions-item>

      </el-descriptions>
      <template #footer>
            <span class="dialog-footer">
              <el-button @click="this.pull_dialogVisible = false">关 闭</el-button>
            </span>
      </template>
    </el-dialog>

    <!--    添加对话框-->
    <el-dialog
      title="添加会议"
      v-model="addLive_meet_dialogVisible"
      width="60%">
      {{addLiveMeet_form.start_time}}
      <el-form ref="form" :model="addLiveMeet_form">
        <el-form-item label="视频标题">
          <el-input v-model="addLiveMeet_form.title"></el-input>
        </el-form-item>
        <el-form-item label="直播时间">
          <el-date-picker
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="YYYY-MM-DD HH:mm:ss"
            v-model="dateStart_end"
            @change="dateSelectOk">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="视频封面">


<!--          视频封面上传-->
          <el-upload v-if="view_cover_url == false"
            :action=upload_url
            class="upload-demo"
            :on-success = upload_cover_url_success
            accept=".bmp,.png,.tif,.gif,.JPEG,.jpg"
          >
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>

          <el-image v-if="view_cover_url" :src="addLiveMeet_form.cover_url"></el-image>

        </el-form-item>




        <el-form-item label="宣传海报">

          <!--          宣传海报上传-->
          <el-upload v-if="view_desc_image_url == false"
            :action=upload_url
            class="upload-demo"
            :on-success = upload_desc_image_url_success
             accept=".bmp,.png,.tif,.gif,.JPEG,.jpg"
          >
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>

          <el-image v-if="view_desc_image_url" :src="addLiveMeet_form.desc_image_url"></el-image>

        </el-form-item>
      </el-form>
      <template #footer>
            <span class="dialog-footer">
              <el-button @click="this.addLive_meet_dialogVisible = false">关 闭</el-button>
              <el-button type="primary" @click="submit_addLive_meet">确定</el-button>
            </span>
      </template>
    </el-dialog>



<!--    关于修改的对话框--------------------------------------------------------->

    <el-dialog
      title="添加会议"
      v-model="alterLive_meet_dialogVisible"
      width="60%">
      <el-form ref="form" :model="addLiveMeet_form">
        <el-form-item label="视频标题">
          <el-input v-model="alterLive_meet_data.title"></el-input>
        </el-form-item>


        <el-form-item label="视频封面">
          <!--          视频封面上传-->
          <el-upload
                     :action=upload_url
                     class="upload-demo"
                     :on-success = alterLive_meet_cover_url_success
                     accept=".bmp,.png,.tif,.gif,.JPEG"
          >
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>

          <el-image  :src="alterLive_meet_data.cover_url"></el-image>

        </el-form-item>


        <el-form-item label="宣传海报">

          <!--          宣传海报上传-->
          <el-upload
                     :action=upload_url
                     class="upload-demo"
                     :on-success = alterLive_meet_desc_image_url_success
                     accept=".bmp,.png,.tif,.gif,.JPEG"
          >
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>

          <el-image :src="alterLive_meet_data.desc_image_url"></el-image>

        </el-form-item>
      </el-form>
      <template #footer>
            <span class="dialog-footer">
              <el-button @click="this.alterLive_meet_dialogVisible = false">关 闭</el-button>
              <el-button type="primary" @click="submit_alterLive_meet">确定</el-button>
            </span>
      </template>
    </el-dialog>

<!---------------------------------------------------------------------------------------------------->

  </div>
</template>

<script>
import { ElMessage } from 'element-plus'
import {getVideo,getLive_meet,addLive_meet,modifyLive_meet,uploadFile,adminLogin} from '@/service/api'
export default {
  data() {
    return {
      live_tab: [],
      //推流地址
      push_dialogVisible:false,
      push_data: {},
      //拉流地址
      pull_dialogVisible:false,
      pull_data:{},
      //添加对话框
      addLive_meet_dialogVisible:false,
      //时间范围
      dateStart_end:'',
      //添加方法需要传递的数据
      addLiveMeet_form:{
        title:'',
        start_time:'',
        end_time:'',
        cover_url:'',
        desc_image_url:''
      },
      //临时上传地址
      upload_url:'http://localhost:8080/api/v1/admin/common/uploadFile?type=YUNICU',
      //是否展示上传封面文件本身
      view_cover_url:false,
      //是否展示宣传海报文件本身
      view_desc_image_url:false,
      //修改dialog展示
      alterLive_meet_dialogVisible:false,
      //修改
      alterLive_meet_data:{
        "title": '',
        "cover_url":'',
        "desc_image_url": ''
      },
      //需要修改的ID
      alterLive_meet_ID:''

    }
  },
  setup() {
    return {
      addLive_meet_success () {
        ElMessage.success({
          showClose: true,
          message: '成功咯~',
          type: 'success'
        });
      },
      addLive_meet_defeated (message) {
        ElMessage.error(message);
      }
    }
  },
  async created(){
    const live_tab =  await getLive_meet()
    this.live_tab = live_tab.data.rows
  },
  methods:{
    //获取推流地址
    getpush(obs_push_ip,obs_push_name){
      this.push_data={
        obs_push_ip:obs_push_ip,
        obs_push_name:obs_push_name
      }
        this.push_dialogVisible = true
    },
    //获取拉流地址
    getpull(pull_rtmp_ip,pull_flv_ip,pull_m3u8_ip){
      this.pull_data = {
        pull_rtmp_ip,
        pull_flv_ip,
        pull_m3u8_ip
      }
      this.pull_dialogVisible = true
    },
    //添加会议按钮
    addLive_meet(){
      this.view_cover_url = false
      this.view_desc_image_url = false
      this.addLive_meet_dialogVisible = true
    },
    //视频封面上传成功
    upload_cover_url_success(response){
      if (response.code===0){
        //表示上传成功，返回链接
        this.addLiveMeet_form.cover_url = response.data.url
        this.view_cover_url = true
      }
    },
    //海报上传成功
    upload_desc_image_url_success(response){
      if (response.code===0){
        //表示上传成功，返回链接
        this.addLiveMeet_form.desc_image_url = response.data.url
        this.view_desc_image_url = true
      }
    },
    //添加会议界面，选择时间，当用户确定了选择的值的时候
    dateSelectOk(){
      this.addLiveMeet_form.start_time =  this.dateStart_end[0]
      this.addLiveMeet_form.end_time = this.dateStart_end[1]
    },
    //提交添加的会议数据
    async submit_addLive_meet(){
      const data = this.addLiveMeet_form;
      if (data.title !== ''&&data.title !== null &&
          data.start_time !== ''&&data.start_time !== null &&
          data.end_time !== ''&&data.end_time !== null &&
          data.cover_url !== ''&&data.cover_url !== null &&
          data.desc_image_url !== ''&&data.desc_image_url !== null )
      {
          const response = await addLive_meet(data)
          if (response.code === 0) {
            //弹框添加成功
            this.addLive_meet_success();
            //刷新列表
            const live_tab = await getLive_meet()
            this.live_tab = live_tab.data.rows
            //关闭添加界面
            this.addLive_meet_dialogVisible = false
          } else {
            this.addLive_meet_defeated('添加失败~请联系管理员！')
          }
      }
      else {
        this.addLive_meet_defeated('请完整输入~🤗')
      }
    },
    //临时登录
    async adminLogin(){
      await adminLogin()
    },
    //修改按钮弹出
    alterLive_meet(data){
      this.alterLive_meet_data.title =  data.title
      this.alterLive_meet_data.cover_url = data.cover_url
      this.alterLive_meet_data.desc_image_url = data.desc_image_url
      this.alterLive_meet_ID = data.id
      this.alterLive_meet_dialogVisible = true

    },
    //修改视频封面图成功的方法
    alterLive_meet_cover_url_success(response){
      if (response.code===0){
        //表示上传成功，返回链接
        this.alterLive_meet_data.cover_url = response.data.url
      }
    },
    //修改宣传海报成功的方法
    alterLive_meet_desc_image_url_success(response){
      if (response.code===0){
        //表示上传成功，返回链接
        this.alterLive_meet_data.desc_image_url = response.data.url
      }
    },
    //点击修改按钮
    async submit_alterLive_meet(){
      const data = this.alterLive_meet_data;
      if (data.title !== ''&&data.title !== null &&
        data.cover_url !== ''&&data.cover_url !== null &&
        data.desc_image_url !== ''&&data.desc_image_url !== null )
      {
        const response = await modifyLive_meet(this.alterLive_meet_ID,data)
        if (response.code === 0) {
          //弹框修改成功
          this.addLive_meet_success();
          //刷新列表
          const live_tab = await getLive_meet()
          this.live_tab = live_tab.data.rows
          //关闭添加界面
          this.alterLive_meet_dialogVisible = false
        } else {
          this.addLive_meet_defeated('修改失败~请联系管理员！')
        }
      }
      else {
        this.addLive_meet_defeated('请完整输入~🤗')
      }
    }
  }
}



</script>

<style lang="scss">
  .upload{
    .el-button{
      width: 144px;
      height: 41px;
    }
    .input_upload{
      width: 144px;
      height: 41px;
      cursor: pointer;
      outline: medium none;
      position: absolute;
      filter: alpha(opacity=0);
      -moz-opacity: 0;
      opacity: 0;
      left: 0px;
      top: 0px;
    }
  }
</style>
