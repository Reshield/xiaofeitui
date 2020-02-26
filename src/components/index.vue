<template>
     <div>
        <div>
          <div class="foricon" @click="showpopup"></div>
            <x-header>
              <x-icon slot="overwrite-left" type="navicon" size="35" style="fill:#fff;position:relative;top:-8px;left:-3px;"></x-icon>
                主页
              <a slot="right" @click="goto">搜索</a>
            </x-header>
        </div>
        <div v-transfer-dom>
          <popup v-model="show8" position="left" width="60%">
            <div class="position-horizontal-demo">
              <!--<span class="vux-close" @click="show8 = false">ABC</span>-->
              <div class="classlist" id="classlist" v-for="item in classlist" :key="item.value">
                <div class="classvalue" id="classvalue" @click="changeindex"><span class="span">{{item.value}}</span></div><hr/>
              </div>
            </div>
          </popup>
        </div>
        <swiper auto height="100px">
          <swiper-item class="black"><h2 class="title fadeInUp animated">它无孔不入</h2></swiper-item>
          <swiper-item class="black"><h2 class="title fadeInUp animated">你无处可藏</h2></swiper-item>
          <swiper-item class="black"><h2 class="title fadeInUp animated">不是它可恶</h2></swiper-item>
          <swiper-item class="black"><h2 class="title fadeInUp animated">而是它不懂你</h2></swiper-item>
          <swiper-item class="black"><h2 class="title fadeInUp animated">我们试图</h2></swiper-item>
          <swiper-item class="black"><h2 class="title fadeInUp animated">做些改变</h2></swiper-item>
        </swiper>
        <div class="flex">
          
          <panel v-for="youji in data" :key="youji.id" :list='youji'>
          </panel>
        </div>
     </div>
</template>

<script>
export default {
  data () {
    return {
      list:{
        title:'123',
        content:'12315465',
        user:{
          name:'ada'
        }
      },
      img_src:'http://localhost:8889/f42d43d71368673a941d715ebd2177cf.png',
      classlist:[
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
        {value:'母婴'},
      ],
      data:'',
      show8: false,
      
    }
  },
  created(){
    const result = this.$http.get('/auth/youji')
    result.then((res)=>{
      this.data=res.data
    })
    
  },
  methods:{
    goto(){
      this.$router.push('/search')
    },
    showpopup(){
      this.show8 = true;
    },
    changeindex:function(obj){
      let classification = obj.target.innerText;
      this.$http.post('/auth/classification/',{classification:classification})
        .then((res)=>{
          if(res.data.searchlist == null || res.data.searchlist.length ==0){
            console.log("class获取不到后台")
            this.show8 = false;
          }else{
            this.data = res.data.searchlist;
            this.show8 = false;
            }
        })
    }
  }
  
}
</script>

<style>
.flex{
  display: flex;
  flex-direction: row;
  flex-wrap:wrap;
  width: 100%
}
.black {
  background-color: #000;
}
.title{
  line-height: 100px;
  text-align: center;
  color: #fff;
}
.position-horizontal-demo {
  position: relative;
  height: 100%;
}
.vux-close {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%) scale(4);
    color: #000;
  }
.foricon{
  width:60px;
  height: 46px;
  left: 0px;
  top: 0px;
  position: relative;
  background-color: red;
  margin-bottom: -46px;
  z-index: 1;
  opacity:0;
}
.classvalue{
  margin-left: 20px;
  color: 	#a6a6a6;
  height: 40px;
}
.span{
  position: relative;
  top: 15%;
}
.imageclass{
    width: 40%;
    margin-top: -6%;
    margin-left: -4%;;
    margin-right: -4%;
    border-radius: 8px;
}
</style>
