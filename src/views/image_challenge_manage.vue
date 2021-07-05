<template>
  <div class="table">
    <el-button @click="adminLogin">临时登录</el-button>
    <el-button @click="add_image()">镜像添加</el-button>
    <el-table
      :data="images"
      style="width: 100%"
      stripe
      border>
      <!--      镜像ID-->
      <el-table-column
        prop="id"
        label="ID"
        width="50">
      </el-table-column>
      <!--      封面图-->
      <el-table-column
        label="封面图">
        <template #default="scope">
          <el-image
            style="width: 100px; height: 100px"
            :src="scope.row.cover_url"
            :fit="fit">
          </el-image>
        </template>
      </el-table-column>
      <!--      标题-->
      <el-table-column
        prop="title"
        label="标题">
      </el-table-column>
      <!--      创建时间-->
      <el-table-column
        prop="created_time"
        label="创建时间">
      </el-table-column>
      <!--      描述-->
      <el-table-column
        prop="desc"
        label="描述">
      </el-table-column>
      <!--      投票开启状态-->
      <el-table-column
        label="投票开启状态">
        <template #default="scope">
          <el-button size="small">已开启</el-button>
        </template>
      </el-table-column>
      <!--      是否公布-->
      <el-table-column
        label="是否公布(点击修改)">
        <template #default="scope">
          <el-button size="small">已公布</el-button>
        </template>
      </el-table-column>
      <!--      是否公布-->
      <el-table-column
        label="详情">
        <template #default="scope">
          <el-button size="small"  @click="getDetailsForId(scope.row.id)">查看详情(修改入口)</el-button>
        </template>
      </el-table-column>
      <!--      操作-->
      <el-table-column
        label="操作">
        <template #default="scope">
          <el-button  size="small">相关资料</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--    dialog对话框-->
    <el-dialog
      title="详情"
      v-model="dialogDetails"
      width="80%"
      :before-close="handleClose">
      <!--      dialog对话框中的内容-->
      <el-row :gutter="20">
        <el-col :span="2">镜像的ID:</el-col>
        <el-col :span="2"><el-input v-model="images_forID.id"  :disabled="true" placeholder="请输入内容"></el-input></el-col>
        <el-col :span="2">封面图:</el-col>
        <el-col :span="15"><el-input v-model="images_forID.cover_url" :disabled="true" placeholder="请输入内容"></el-input></el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="2"><p>标题:</p></el-col>
        <el-col :span="10"><el-input v-model="images_forID.title" :disabled="true" placeholder="请输入内容"></el-input></el-col>
        <el-col :span="2"><p>描述:</p></el-col>
        <el-col :span="10"><el-input v-model="images_forID.desc" :disabled="true" placeholder="请输入内容"></el-input></el-col>
      </el-row>
      <el-row gutter="20">
        <p>病案资料:</p><el-input v-model="images_forID.medical_info" :disabled="true" placeholder="请输入内容"></el-input>
      </el-row>
      <el-row>
        <p>诊断结果:</p><el-input v-model="images_forID.medical_result" :disabled="true" placeholder="请输入内容"></el-input>
      </el-row>
      <el-row>
        <p>投票类型:</p><el-input v-model="images_forID.voting_type" :disabled="true" placeholder="请输入内容"></el-input>
      </el-row>
      <el-row>
        <p>投票状态:</p><el-input v-model="images_forID.voting_status" :disabled="true" placeholder="请输入内容"></el-input>
      </el-row>
      <el-row>
        <p>公布结果状态:</p><el-input v-model="images_forID.medical_result_status" :disabled="true" placeholder="请输入内容"></el-input>
      </el-row>
      <el-row>
        <p>创建时间:</p><el-input v-model="images_forID.created_time" :disabled="true" placeholder="请输入内容"></el-input>
      </el-row>
      <el-row>
        <p>投票类型:</p><el-input v-model="images_forID.voting_data.voting_type" :disabled="true" placeholder="请输入内容"></el-input>
      </el-row>

      <!--      投票内容-->
      <el-table
        :data="images_forID.voting_data.values"
        style="width: 100%">
        <el-table-column
          prop="id"
          label="投票内容的ID">
        </el-table-column>
        <el-table-column
          prop="image_id"
          label="影像的ID">
        </el-table-column>
        <el-table-column
          prop="value"
          label="选项值">
        </el-table-column><el-table-column
        prop="is_right"
        label="是否为正确答案">
      </el-table-column>
      </el-table>
      <template #footer>
        <span class="dialog-footer">
          <el-button>修改</el-button>
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
      </template>
    </el-dialog>


    <el-dialog
      v-model="add_image_details"
      title="添加镜像"
      width="80%">
      <el-input v-model="input" placeholder="请输入内容"></el-input>
    </el-dialog>

  </div>
</template>

<script>
import { adminLogin, getImages, getImages_details } from '../../src/service/api'
export default {
  data() {
    return {
      //影响列表
      images:[],
      //详情dialog打开与关闭
      dialogDetails: false,
      //相关资料dialog打开与关闭
      dialogRelatedData: false,
      //通过id查询的的影响详情
      images_forID:[],
      //相关资料列表
      //添加列表
      add_image_details:false
    }
  },
  async created() {
    //  获取列表数据
    await adminLogin()
    const images =  await getImages();
    this.images=images.data.rows;
  },
  methods:{
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    //临时登录
    async adminLogin(){
      await adminLogin()
    },
    async getDetailsForId(Id){
      const images = await getImages_details(Id)
      this.images_forID = images.data
      console.log(Id)
      this.dialogDetails=true
    },
    add_image() {
      this.add_image_details = true
    }
  }
}
</script>

<style lang="scss">
.manage{
  //height: 100%;
  //.el-table{
  //  height: 100%;
  //}
}

</style>
