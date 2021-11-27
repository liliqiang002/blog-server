const { Controller } = require("egg")

class DailyController extends Controller {
  /**
   * 记录添加
   * params: 
   */
   async add() {
    const { ctx } = this;
    console.log(ctx.request.body, ctx.user)
    const res = await ctx.model.Daily.create({ ...ctx.request.body, user_id: ctx.user.id })
    ctx.body = { data: { data: [], code: 1, msg: '添加成功' } }
    ctx.status = 200;
  }
  /**
   * 文章列表
   * params:
   */
   async list() {
    const { ctx } = this;
    const { page, per_page } = ctx.query
    const res = await ctx.model.Daily.findAll({
      limit: Number(per_page),
      offset: per_page * (page - 1),
      order: [
        ['updated_at', 'DESC']
      ],
      where: {
        user_id: ctx.user.id
      }
    })
    ctx.body = { data: { data: res, code: 1, msg: '获取记录列表成功' } }
    ctx.status = 200;
  }
}

module.exports = DailyController