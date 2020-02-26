const db = require('../config/db.js')
const adminModel = '../schema/admin.js'; // 引入admin的表结构
const youjimodel='../schema/youji.js'
const usermodel='../schema/user.js'
const likemodel='../schema/like0.js'
const commentmodel='../schema/comment.js'
const imagemodel='../schema/images.js'
const youjilist = db.yiyouji
const adminlist = db.yiyouji; // 引入数据库
const user = youjilist.import(usermodel)
const like0 = youjilist.import(likemodel)
const youji=youjilist.import(youjimodel)
const comment=youjilist.import(commentmodel)
const admin = adminlist.import(adminModel)// 用sequelize的import方法引入表结构，实例化了admin。
const image=youjilist.import(imagemodel) 

youji.belongsTo(user,{foreignKey:'author_id'})
youji.hasMany(like0,{foreignKey:'youji_id'})
like0.belongsTo(youji,{foreignKey:'youji_id'})
comment.belongsTo(user,{foreignKey:'user_id'})

const getadminById = async function (id){ // 注意是function* 而不是function 对于需要yield操作的函数都需要这种generator函数。
  const adminInfo = await admin.findOne({ // 用yield控制异步操作，将返回的Promise对象里的数据返回出来。也就实现了“同步”的写法获取异步IO操作的数据
    where: {
      id: id
    }
  });
  return adminInfo // 返回数据
}

const getadminByName = async function (name){
  const admininfo = await admin.findOne({
    where: {
      username: name
    }
  })
  return admininfo
}
const getuser = async function (){
  const userinfo = await admin.findAll({
    attributes:['username','password']
  })
  return userinfo
}

const getfklist = async function(){
    const youjilist=await youji.findAll({
      attributes:['youji_id','title','content','author_id','classification','link']
    });
    return youjilist
}

const getcomments = async function(){
    const commentlist=await comment.findAll({
      attributes:['comment_id','user_id','content','create_time']
    });
    return commentlist
}
const getuserinformation = async function(){
    const userlist=await user.findAll({
      attributes:['id','user_name','email','phone']
    });
    return userlist
}
const createyouji =async function (data){
    await youji.create({
        author_id:data.id,
        content:data.content,
        title:data.title,
        create_time:data.time
    })
    return true
}

const createimage=async function(youji_title,imagename){
    await image.create({
        youji_title:youji_title,
        imagename:imagename
    })
    return true
}

const deleteyouji = async function(id){
    await like0.destroy({
        where:{youji_id:id}
    })
    await comment.destroy({
        where:{
            youji_id:id
        }
    })
    await youji.destroy({
        where:{
            youji_id:id
        }
    })
    return true
}

const deletecommentbyid = async function(id){
    await comment.destroy({
        where:{
            comment_id:id
        }
    })
    return true
}

const getimage=async function(title){
    const imageinfo=await image.findAll({
        where:{
            'youji_title':title
        },
        attributes:['imagename']
    })
    return imageinfo
}
module.exports = {
    getadminById,  // 导出getadminById的方法，将会在controller里调用
    getadminByName,
    getuser,
    getfklist,
    getcomments,
    getuserinformation,
    createyouji,
    deleteyouji,
    deletecommentbyid,
    getimage,
    createimage
}