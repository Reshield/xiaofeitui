<template>
  <div class="index">
    <div>
      <x-header >笔记<a slot="right" @click="postyouji">发布笔记</a></x-header>
      <group title='开始分享你的笔记'>
        <x-input placeholder="输入笔记标题" :max=30 v-model='youji_title'></x-input>
        <x-textarea :max=2500 placeholder="笔记内容" :rows=15 :autosize='false' :height=280 v-model='youji_content'></x-textarea>
      </group>
      
      <!--<div class="input">
        <label for="upload-file" class="uplable"><x-icon type="ios-plus" size="50"></x-icon></label>
        <input type="file" hidden="true" id="upload-file" name="file" url="" @change="getfile"/>   
      </div>-->
      <el-select 
      v-model="valuefirst" 
      placeholder="请选择" 
      @change="valuechange"
      size="mini">
        <el-option
          v-for="item in classfirst"
          :key="item.value"
          :value="item.value"
          >
          <span style="float: left">{{item.value}}</span>
        </el-option>
      </el-select>
      <el-select
        v-model="valuesecond"
        multiple
        filterable
        allow-create
        default-first-option
        @change="valuesecondchange"
        placeholder="请输入关键字"
        size="mini">
        <el-option
          v-for="item in valueget"
          :key="item"
          :value="item">
          <span style="float: left">{{item}}</span>
        </el-option>
      </el-select>
      <el-input
        placeholder="请输入链接"
        v-model="link"
        clearable>
      </el-input>
      <el-upload
      action=""
      :on-change="changeUpload"
      list-type="picture-card"
      :file-list="filelist"
      :before-upload="beforeUpload"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
      class="el-upload">
      <i class="el-icon-plus"></i>
      </el-upload>
      <el-dialog :visible.sync="dialogVisible" width="100%">
        <img width="100%" :src="dialogImageUrl" alt="">
      </el-dialog>
        
    </div>
  </div>
</template>

<script>
import jwt from 'jsonwebtoken'
import { decode } from 'punycode';
export default {
  data () {
    return {
      youji_title:'',
      youji_content:'',
      author_id:'',
      warning:false,
      classification:'',
      link:'',
      message:'',
      file:'',
      files:[],
      photos:[],
      img:'',
      image_show:false,
      dialogImageUrl: '',
      dialogVisible: false,
      filelist:[
        ],
      valuefirst:'',
      classfirst:[
        {value:'科技'},
        {value:'数码'},
        {value:'旅游'},
        {value:'美妆'},
        {value:'影视'},
        {value:'穿搭'},
        {value:'游戏'},
        {value:'健身'},
        {value:'汽车'},
        {value:'家居'},
        {value:'读书'},
        {value:'美食'},
      ],
      valuesecond:[],
      classsecond:[
        ['手机','笔记本','新玩物'],
        ['单反','无人机','稳定器'],
        ['游记','设备','景点'],
        ['口红','粉底','教程'],
        ['电视剧','电影','动漫'],
        ['男生','女生','配饰'],
        ['手游','单机','页游'],
        ['教程','器材','健身房'],
        ['轿车','跑车','配件'],
        ['家具','装饰','装修攻略'],
        ['经典名著','网络小说','工具书'],
        ['小吃','好店','美食攻略'],
      ],
      valueget:[]
      
    }
  },
  created(){
        const userinfo = this.getuserid();
        if(userinfo !=null && userinfo !='null'){
          this.author_id=userinfo.id
        }else{
          this.author_id=''
        }
  },
  methods:{
    beforeUpload:function(file){
      console.log(file)
      
      this.file=file
      this.photos.push(file)
      console.log(111+this.photos[0].name)
      formimg.append('file',file)
    },
    handleRemove(file, fileList) {
     
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      console.log(file.url)
      this.dialogVisible = true;
    },
    changeUpload:function(file,fileList){
      console.log('changeUpload')
    },
    getfile(event){
      this.file=event.target.files[0]
      this.photos.push(event.target.files[0])
      console.log(event.target.files[0])
      console.log(this.photos)
    },
    valuechange(){
      var i;
      for(i=0;i<this.classfirst.length;i++){
        if(this.classfirst[i].value==this.valuefirst){
          this.valueget = this.classsecond[i];
        }
      }
    },
    valuesecondchange(){
      this.classification = this.valuefirst+','+this.valuesecond;
      console.log(this.classification)
    },
    postyouji(){
      let obj ={
        title: this.youji_title,
        content: this.youji_content,
        id:this.author_id,
        file:this.files
      }
      let title=this.youji_title
      let content=this.youji_content
      let id = this.author_id
      let classification=this.classification
      let link = this.link
      let form=new FormData();
      form.append('title',title)
      form.append('content',content)
      form.append('id',id)
      form.append('classification',classification)
      form.append('link',link)
      //console.log(this.photos)
      for(let i=0;i<this.photos.length;i++){
        form.append('photos',this.photos[i])
      }
      //console.log(form.get('photos'))
      const result = this.$http.post('/api/youji',form,{headers:{'Content-Type':'multipart/form-data'}})
      result.then((res)=>{
        if(res.data.success){
          console.log('发布成功')
          this.$router.push('/')
        }else{
          if(res.data.success==false){
          console.log(res.data.info)
          }else{
            console.log('发布失败')
          }
        }
      },(err)=>{
        console.log('请求错误')
         //console.log(err.response.data);
        this.warning=true;
        //console.log(err)
        this.message=err.response.data.info
      })
    },
    getuserid(){
       const token = sessionStorage.getItem('demo-token');
      if(token !=null && token != 'null'){
        let decode = jwt.decode(token);
        return decode
      }else{
        return null
      }
    }
  }
}
</script>

<style>
.index{
  max-height: 647px;
  overflow: scroll;
}
.input{
  position: relative;
  top: 0px;
  text-align:center;
  font-size:18px;
  background-color: #F0FFF0;
  margin-left: auto;
  
}
.uplable{
  top:0%;
}
.vux-x-icon {
  fill: #F70968;
}
.el-upload .el-icon-plus{
  width:50px;
}
.el-upload{
  overflow: auto;
}
.inline-input{
  display: block;
}
.el-upload{
  display: block;
}
</style>
