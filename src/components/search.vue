<template>
<div>
    <x-header >搜索</x-header>
    <search position="absolute" top="46px" :auto-scroll-to-top="false" :auto-fixed="false" :results="results" @on-submit="onSubmit" v-model="find"></search>
    <div class="search-result">
      <div v-for="(item,index) in results" :key="index" >
        <div @click="goto" class="result-list" v-show="showlist">
          <img slot="header" :src="item.image_src" class="result-img" v-show="image_show" >
          <div slot="content" class="card-padding" >
            <p class="result-title">{{item.title}}</p>
            <p class="result-content">{{item.content}}</p>
            <p class="result-time">{{item.create_time}}</p>
          </div>
        </div>
      </div>
    </div>
</div>
</template>

<script type='text/ecmascript-6'>
  export default {
    data () {
      return {
        find:'',
        zan:'iconfont icon-zan1',
        image_show:false,
        showlist:false,
        results:[],
        getimg:[],
        imgsrc:''
    }},
    methods:{
      onSubmit () {
        this.$http.post('/auth/search/',{title:this.find})
        .then((res)=>{
          if(res.data.searchlist == null || res.data.searchlist.length== 0){
            console.log("没有相应的title")
            this.searchclassication();
          }else{
            console.log(res.data.searchlist)
            this.results = res.data.searchlist
            console.log(this.results)
            this.showlist = true;
            }
        })
      },
      searchclassication(){
        var arr = [];
        
        var id,title,content,create_time,likecount,image_src
        this.$http.post('/auth/classification/',{classification:this.find})
        .then((res)=>{
          if(res.data.searchlist == null || res.data.searchlist.length ==0){
            console.log("class获取不到后台")
          }else{
            for(let i=0;i<res.data.searchlist.length;i++){
              var list={};
              list.id = res.data.searchlist[i].youji_id;
              list.title= res.data.searchlist[i].title;
              list.content= res.data.searchlist[i].content;
              list.create_time= res.data.searchlist[i].create_time;
              list.likecount= res.data.searchlist[i].likecount;
              this.$http.post('/auth/getimage',{title:list.title})
              .then((res)=>{
                if(res.data.image_name.length==0||res.data.image_name==null){
                  this.image_show=false;
                  console.log('can not find imagename')
                }else{
                  list.image_src = 'http://localhost:8889/'+res.data.image_name[0].imagename
                  this.results.push(list)
                }
              })
              console.log(this.results)
            }

            console.log(this.results)
            this.showlist = true;
            this.image_show = true;
          }
        })
        },
      goto(){
        console.log(this.results[0].youji_id)
            this.$router.push('/content/'+this.results[0].youji_id)
          },
      }
    }
  
</script>

<style type='text/css'>
.results{
  width: 100%;
  
  box-shadow: 10px 10px 5px #888888;
}
.card-padding {
  padding: 15px;
}
.search-result{
  
  display: block;
  margin-top: 150x;
}
.result-img{
  display: block;
  width: 30%;
  height: 80%;
  float: left;
  margin-left: 5px;
  margin-top: 10px;
  border-radius: 5px;
}
.result-list{
  border:2px solid #a8a8a8;
  border-radius: 8px;
  height: 100px;
}
.result-title{
  position: relative;
  left: 20px;
  font-size: 20px;
}
.result-content{
  font-size: 12px;
  color: #8f969e;
  left: 20px;
  position: relative;
}
.result-time{
  font-size: 12px;
  color: #8f969e;
  left: 20px;
  position: relative;
}
</style>