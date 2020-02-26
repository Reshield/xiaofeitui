<template>
     <div>
         <x-header >笔记</x-header>
         <group title="图片" v-if="this.image_show" >
            <div class="listimg">
                <x-img v-for="(item, index) in image_src1" :src="item" width="100" :key="index" class="imgitem"></x-img>
            </div>
        </group>
         <group class="group">
         <div >
             <div v-if="header">
                <div class="listtitle">
                    <h3 class="title_h">{{list.title}}</h3>
                </div>
             </div>
             <div class="listcontent">
                 <div class="forcontent">
                    <p :style="{WebkitLineClamp: 3}" class="content">
                        {{list.content}}
                    </p>
                 </div>
             </div>
         </div>
         <span>
            <span class="author">作者：{{list.user.user_name}}</span>
        </span>
        <span v-if="button"></span> 
     </group>
     <div>
        <span @click="goto"><i slot='icon' class="iconfont icon-pinglun"></i></span>
        <span @click="like()"><i slot='icon' :class="zan"></i></span>
        <span>时间{{list.create_time}}</span>
    </div>
     <div>
        <el-button type="primary">
            <a :href="this.link" class="frame">链接</a>
        </el-button>
    </div>
     <group title='评论'>
            <commentpanel v-for="comment in commentlist" :key="comment.id" :list='comment'></commentpanel>
    </group>
     <toast v-model="warning" type='warn'>{{message}}</toast>
     </div>
</template>

<script>
import jwt from 'jsonwebtoken'
export default {
  data () {
    return {
        list:{
            user:{
                
            }
        },
        commentlist:{},
        viewer_id:'',
        viewer_name:'',
        zan:'iconfont icon-zan1',
        warning:false,
        message:'',
        image_src1:[],
        image_show:false,
        link:'',
        options: {
        getThumbBoundsFn (index) {
          // find thumbnail element
          let thumbnail = document.querySelectorAll('.previewer-demo-img')[index]
          // get window scroll Y
          let pageYScroll = window.pageYOffset || document.documentElement.scrollTop
          // optionally get horizontal scroll
          // get position of element relative to viewport
          let rect = thumbnail.getBoundingClientRect()
          // w = width
          return {x: rect.left, y: rect.top + pageYScroll, w: rect.width}
          // Good guide on how to get element coordinates:
          // http://javascript.info/tutorial/coordinates
        }
      }
    }
  },
  created(){
      const result = this.$http.get('/auth/youji/'+this.id)
    result.then((res)=>{
      this.list=res.data
      this.link=res.data.link
      //console.log(res.data.title)
      this.$http.post('/auth/getimage',{title:res.data.title})
      .then((res)=>{
          if(res.data.image_name=='null'||res.data.image_name==null){
              this.image_show=false
              console.log(333)
          }else{
            for(var i=0;i<res.data.image_name.length;i++){
                this.image_src1[i]='http://localhost:8889/'+res.data.image_name[i].imagename;
            }
            console.log(this.image_src1)
            this.image_show=true;      
          }
      })
    })
    const commentlist=this.$http.get('auth/comment/'+this.id)
    commentlist.then((res)=>{
        this.commentlist=res.data
    })
    const userinfo = this.getuserinfo()
    if(userinfo !=null){
        this.viewer_id=userinfo.id,
        this.viewer_name=userinfo.name
    }else{
        this.viewer_id='',
        this.viewer_name=''
    }
  },
  props:{
      id:String,
      header:{
          type:Boolean,
          default:true
      },
      button:{
          type:Boolean,
          default:false
      }
  },
  methods:{
      goto(){
          this.$router.push('/comment/'+this.id)
      },
      getuserinfo(){
          const token = sessionStorage.getItem('demo-token');
      if(token !=null && token != 'null'){
        let decode = jwt.decode(token);
        return decode
      }else{
        return null
      }
      },
      like(){
          let obj ={
              id:this.viewer_id,
              youji_id:this.id
          }
          const result = this.$http.post('/api/like',obj)
      result.then((res)=>{
        if(res.data.success){
          console.log('res.data')
          this.zan='iconfont icon-zan'
        }else{
          if(res.data.success==false){
              console.log('gg')
              this.warning=true;
              this.message=res.data.info
          }else{
            console.log('点赞失败')
          }
        }
      },(err)=>{
          console.log('请求错误')
          //console.log(err.response.data)
          this.warning=true;
          this.message=err.response.data.info
      })
    }
  }
}
</script>

<style>
@import '//at.alicdn.com/t/font_656419_91t68cf7fp03haor.css';
.icon{
    font-size: 20px;
}
.frame{
    width: 50px;
    height: 50px;
}
.listimg{
    height: 80px;
    overflow-y: hidden;
    overflow-x: scroll;
}
.imgitem{
    float: left;
    margin-right: 3px;
    margin-top: 2px;
    height: 80px;
}
.listtitle{
    background-color: #DCDCDC;
    height: 60px;
}
.title_h{
    position: relative;
    left: 20px;
    width: 90%;
}
.author{
    color: 	#838B8B;
    font-size: 12px;
    position: relative;
    left: 20px;
}
.content{
    color: #343b42;
    position: relative;
    left: 20px;
    width: 80%;
}
.listcontent{
    height: 250px;
    overflow-y: scroll;
    overflow-x: hidden;
}
.forcontent{
width: 90%;
}
</style>
