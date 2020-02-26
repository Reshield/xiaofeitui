
const youji = require('../models/youji.js');
const path = require('path')
const fs = require('fs')

const getyoujilist =async function (ctx){
    const id =ctx.params.id;
    const result = await youji.getyoujilistbyid(id);
    ctx.body = result
}
const createyouji = async function (ctx){
    // console.log(ctx.req.files);
    //console.log(ctx.req)
    if(ctx.req.files){
        for(let i = 0;i<ctx.req.files.length;i++){
            const image_name=ctx.req.files[i].filename+path.parse(ctx.req.files[i].originalname).ext
            fs.rename(ctx.req.files[i].path,ctx.req.files[i].destination+'/'+image_name,async (err)=>{
                //console.log(err)
            })
                await youji.createimage(ctx.req.body.title,image_name)
        }
    }
    const data = ctx.req.body;
    const result = await youji.createyouji(data);
    if(result){
        ctx.body={
            success: true
        }
    }else{
        ctx.body={
            success : false,
            info:'后端提交失败'
        }
    }
}

const getyoujibyuserid = async function(ctx){
    const data =ctx.request.body
    const result = await youji.getyoujibyuserid(data.id)
    ctx.body = result
}
const getlist = async function (ctx){
    const youjilist = await youji.getyoujilist()
    ctx.body = youjilist
}
const getcommentlist = async function(ctx){
    const id = ctx.params.id
    const commentlist = await youji.getcomment(id)
    ctx.body=commentlist
}
const createcomment = async function(ctx){
    const data = ctx.request.body
    const result = await youji.createcomment(data)
    if(result){
        ctx.body={
            success:true
        }
    }else{
        ctx.body={
            success:false
        }
    } 
}
const createlike = async function(ctx){
    const data = ctx.request.body
    const result = await youji.createlike(data)
    if(result){
        ctx.body={
            success:true
        }
    }else{
        ctx.body={
            success:false
        }}
}
const getcommentlistbyuser = async function(ctx){
    const data= ctx.request.body
    const commentlist = await youji.getcommentbyuser(data.id);
    ctx.body=commentlist
}
const deletecommentbyid = async function(ctx){
    const data=ctx.request.body
    const deletecomment=await youji.deletecommentbyid(data.id)
    if(deletecomment){
    ctx.body={
        success:true
    }}
    else{
        ctx.body={
            success:false
        }
    }
}
const deleteyoujibyid=async function(ctx){
    const data = ctx.request.body
    const deleteyouji=await youji.deleteyouji(data.id)
    if(deleteyouji){
        ctx.body={
            success:true
        }
    }else{
        ctx.body={
            success:false
        }
    }
}
const getimage_name=async function(ctx){
    const data=ctx.request.body
    const image_name=await youji.getimage(data.title)
    ctx.body={
        image_name:image_name
    }
}
const search = async function(ctx){
    const data = ctx.request.body;
    
    const searchlist = await youji.search(data.title);
    
    ctx.body={
        searchlist:searchlist
        
    }
    console.log(searchlist)
}
const classification = async function(ctx){
    const data = ctx.request.body;
    const searchlist = await youji.classification(data.classification);
    
    ctx.body={
        searchlist:searchlist
    }
    
}
module.exports={
    getyoujilist,
    createyouji,
    getyoujibyuserid,
    getlist,
    getcommentlist,
    createcomment,
    createlike,
    getcommentlistbyuser,
    deletecommentbyid,
    deleteyoujibyid,
    getimage_name,
    search,
    classification
}