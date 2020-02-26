const adminauth = require('../controllers/admin.js'); 
// const jquery = require('jquery'); 

const koaRouter =require('koa-router')
const multermodel=require('koa-multer')
const fs= require('fs')
const path=require('path')
const multer=multermodel({dest:'./server/public'})
const router=koaRouter()

router.get('/admin/:id', adminauth.getadminInfo); // 定义url的参数是id,用admin的adminauth方法引入router
router.post('/admin', adminauth.postadminAuth);
router.get('/home',adminauth.getyouji);
router.get('/login',adminauth.tologin);
router.post('/create',multer.single('file'),adminauth.houtaicreateyouji)
// router.get('/jquery',jquery)
router.post('/delete',adminauth.houtaideleteyouji)
router.get('/myhome',adminauth.tomyhome)
router.get('/user_admin',adminauth.touser_admin)
router.get('/comments',adminauth.tocomments)
router.post('/deletecomments',adminauth.deletecommentbyid)
router.post('/createimage',adminauth.createimage)
router.post('/getimage',adminauth.getimage_name)


module.exports = router; // 把router规则暴露出去a