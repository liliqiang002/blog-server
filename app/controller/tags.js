'use strict';

const Controller = require('egg').Controller;

class TagsController extends Controller {
  async list() {
    const { ctx } = this;
    const res = await ctx.model.Tags.findAll()
    // console.log(res)
    ctx.body = { data: { data: res, code: 1, msg: '获取标签列表成功' } }
    ctx.status = 200
  }
}

module.exports = TagsController;
