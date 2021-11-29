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
   * 列表
   * params:
   */
   async list() {
    const { ctx } = this;
    const { page, per_page, keywords } = ctx.query
    const { Op } = require("sequelize");
    const res = await ctx.model.Daily.findAll({
      limit: Number(per_page),
      offset: per_page * (page - 1),
      order: [
        ['updated_at', 'DESC']
      ],
      where: {
        user_id: ctx.user.id,
        title: keywords ? {
          [Op.substring]: keywords
        } : { [Op.not]: null }
      }
    })
    ctx.body = { data: { data: res, code: 1, msg: '获取记录列表成功' } }
    ctx.status = 200;
  }
  /**
   * 删除
   * params: id
   */
  async delete () {
    const { ctx } = this
    console.log(ctx.params)
    const res = await ctx.model.Daily.destroy({
      where: {
        id: ctx.params.id
      }
    })
    ctx.body = { data: { data: res, code: 1, msg: '删除成功' } }
    ctx.status = 200;
  }
  /**
   * 修改
   * params: id
   */
  async edit () {
    const { ctx } = this
    const { title, type, content, id } = ctx.request.body
    await ctx.model.Daily.update({
      title: title,
      type: type,
      content: content
    }, {
      where: { id: id}
    })
    const res = await ctx.model.Daily.findOne({
      where: {
        id: id
      }
    })
    ctx.body = { data: { data: res, code: 1, msg: '修改成功' } }
    ctx.status = 200;
  }
}

module.exports = DailyController