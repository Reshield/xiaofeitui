
const koa2 = require('koa')
  , koarouter = require('koa-router')
  , json = require('koa-json')
  , logger = require('koa-logger')
  , views = require('koa-views')
  , auth = require('./server/routes/auth.js')
  ,api = require('./server/routes/api.js')
  ,adminauth = require('./server/routes/adminauth.js')
  ,koajwt =require('koa-jwt')
  ,multermodle=require('koa-multer')
  ,serve= require('koa-static')
  ,historyApiFallback = require('koa-history-api-fallback');

const app =new koa2();
const koa=new koarouter();
//const multer=multermodle({dest:'./server/public'})

app.use(require('koa-bodyparser')());
app.use(json());
app.use(logger());
app.use(views(__dirname + '/server/views', {
  extension:"ejs"
}));
app.use(koa.routes());
app.use(historyApiFallback());
app.use(serve(__dirname+'/server/public'))

app.use(async function (ctx, next) {
  try {
    await next()
  } catch (err) {
    if (err.status === 401) {
      ctx.status = 401
      ctx.body = {
        success: false,
        token: null,
        info: '未登录'
      }
      throw err
    } else {
      throw err
    }
  }
}); 

app.on('error', function(err, ctx){
  console.log('server error', err);
});

koa.use('/auth', auth.routes()); 
koa.use('/adminauth', adminauth.routes()); 
koa.use('/api',koajwt({secret:'yiyouji'}),api.routes())
//koa.use('/api',api.routes())



app.listen(8889,() => {
  console.log('Koa is listening in 8889');
});

module.exports = app;