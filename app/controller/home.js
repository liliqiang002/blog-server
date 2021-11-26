'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    console.log(ctx.request.query)
    ctx.body = { id: 1 };
    ctx.status = 201;
  }
}

module.exports = HomeController;
