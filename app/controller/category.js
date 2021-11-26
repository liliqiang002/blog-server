'use strict';

const Controller = require('egg').Controller;

class CategoryController extends Controller {
  async list() {
    const { ctx } = this;
    const res = await ctx.model.Category.findAll()
    // console.log(res)
    ctx.body = { data: { data: res, code: 1, msg: '获取分类列表成功' } }
    ctx.status = 200
  }
}

module.exports = CategoryController;
