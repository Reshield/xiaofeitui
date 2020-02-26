<template>
  <div>
    <x-header >我的游记</x-header>
   <panel button v-for="youji in data" :key="youji.id" :list='youji' class="myyouji"></panel>
  </div>
</template>

<script>
import jwt from 'jsonwebtoken'
export default {
  data () {
    return {
      data:''
    }
  },
  created(){
      const userinfo=this.getuserinfo()
    let obj ={
        id:userinfo.id
    }
    const result = this.$http.post('/api/myyoujilist',obj)
    result.then((res)=>{
      this.data=res.data
      console.log(res.data)
    })
  },
  methods:{
      getuserinfo(){
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
.myyouji{
  width: 50%;
}
</style>
