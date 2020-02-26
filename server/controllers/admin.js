const admin = require('../models/admin.js');

// var router = require('koa-router')();
// const jwt = require('koa-jwt');

const getadminInfo = async function (ctx){
  const id = ctx.params.id; // 获取url里传过来的参数里的id
  const result = await admin.getadminById(id);  // 通过await “同步”地返回查询结果
  ctx.body = result // 将请求的结果放到response的body里返回
}

const postadminAuth = async function (ctx){
const data = await ctx.request.body; 
console.log(data);
const result = await admin.getadminByName(data.username);
if(result){ 
if(result.password != data.password){
console.log('登录失败！')
}else{ 
console.log('登录成功！')
await ctx.render('myhome')
}
}else{
await console.log('用户不存在！')
}
}

const tologin = async function(ctx){
    const user = await admin.getuser()
    
    await ctx.render('login.ejs',{title:132,user:user})
}
const tomyhome = async function(ctx){
  await ctx.render('myhome',{title:132})
}

const touser_admin = async function(ctx){
  const user = await admin.getuserinformation()
  await ctx.render('user_admin',{user:user})
}

const tocomments = async function(ctx){
    const comment = await admin.getcomments()
    await ctx.render('comments',{comment:comment})
}

const toyouji_admin = async function(ctx){
    const youji = await admin.getyoujiinformation()
    await ctx.render('youji_admin',{youji:youji})
}

const getyouji = async function(ctx){
    const youjif=await admin.getfklist()
    await ctx.render('home.ejs',{youji:youjif,image:55})
    
}

const houtaicreateyouji = async function(ctx){
    
    const data = await ctx.request.body
    const result = await admin.createyouji(data)
    const youjif=await admin.getfklist()
    ctx.redirect('home',{youji:youjif})
}

const houtaideleteyouji = async function(ctx){
    
    const data = await ctx.request.body
    console.log(data)
    const deleteyouji=await admin.deleteyouji(data.id)
    const youjif=await admin.getfklist()
    await ctx.redirect('home',{youji:youjif})
}

const deletecommentbyid = async function(ctx){
    const data=ctx.request.body
    const deletecomment=await admin.deletecommentbyid(data.id)
    if(deletecomment){
    ctx.body={
        success:true
    }}
    else{
        ctx.body={
            success:false
        }
    }
    const youjif=await admin.getfklist()
    await ctx.redirect('comments',{youji:youjif})
}

const getimage_name=async function(ctx){
    let imagearr = []
    const data=await ctx.request.body
    const image_name = await admin.getimage(data.title)
    for(let i=0;i<image_name.length;i++){
        imagearr.push(image_name[i].imagename)
    }
    console.log(imagearr)
    // const imagesrc=await result.imagename
    if(image_name!=null){
        const youjif=await admin.getfklist()
        console.log(3)
        await ctx.render('home.ejs',{youji:youjif,image:imagearr})
    }else{
        const youjif=await admin.getfklist()
        await ctx.render('home.ejs',{youji:youjif,image:'haha图片'})
    }
}

const createimage = async function(ctx){
    const data = await ctx.request.body
    console.log(data)
    const result = await admin.createyouji(data)
    const youjif=await admin.getfklist()
    ctx.redirect('home',{youji:youjif})
}
module.exports = {
  getadminInfo, // 把获取用户信息的方法暴露出去 
  postadminAuth,
  tologin,
  tomyhome,
  touser_admin,
  toyouji_admin,
  tocomments,
  getyouji,
  houtaicreateyouji,
  houtaideleteyouji,
  deletecommentbyid,
  getimage_name,
  createimage
}