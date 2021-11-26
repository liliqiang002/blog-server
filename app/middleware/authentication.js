module.exports = options => {
  return async function authentication (ctx, next) {
    console.log('中间件执行', ctx.request.header.authorization)
    if (ctx.request.header.authorization) {
      const token = ctx.request.header.authorization.split(' ')[1]
      const res = await ctx.model.Users.findOne({
        attributes: ['id', 'username', 'avatar', 'introduction', 'created_at', 'updated_at'],
        where: {
          token: token
        }
      })
      if (res && res.dataValues) {
        // ctx.body = { data: { data: res.dataValues, code: 1, msg: '获取用户信息成功' } }
        // ctx.status = 200
        // console.log(res)
        ctx.user = res
        await next()
      } else {
        ctx.body = { data: { data: null, code: 0, msg: '无效token' } }
        ctx.status = 401
      }
    } else {
      ctx.body = { data: { data: null, code: 0, msg: '未登录' } }
      ctx.status = 401
    }
    // const token = ctx.request.header.authorization.split(' ')[1]
    
  }
}