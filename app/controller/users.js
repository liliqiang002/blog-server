'use strict';

const Controller = require('egg').Controller;

class UsersController extends Controller {
  /**
   * 登录
   * params: username: 用户名  password：密码
   */
  async login() {
    const { ctx, app } = this;
    const { username, password } = ctx.request.body
    const res = await ctx.model.Users.findOne({
      where: {
        username: username,
        password: password
      }
    })
    if (res) {
      const token = app.jwt.sign({
        nickname: username,
        password: password
      }, app.config.jwt.secret);
      await ctx.model.Users.update({
        token: token
      }, {
        where: {
          username: username,
          password: password
        }
      })
      const userInfo = await ctx.model.Users.findOne({
        attributes: ['id', 'username', 'avatar', 'introduction', 'created_at', 'updated_at'],
        where: {
          username: username,
          password: password
        }
      })
      ctx.body = { data: { token: token, userInfo: userInfo, code: 1, msg: '登录成功！' } };
      ctx.status = 200;
    } else {
      ctx.body = { data: { token: null, code: 0, msg: '账号或密码错误' } };
      ctx.status = 422;
    }
  }
  /**
   * 登录用户信息
   * params: 无
   */
  async getUserInfo () {
    const { ctx } = this;
    const token = ctx.request.header.authorization.split(' ')[1]
    const res = await ctx.model.Users.findOne({
      attributes: ['id', 'username', 'avatar', 'introduction', 'created_at', 'updated_at'],
      where: {
        token: token
      }
    })
    if (res && res.dataValues) {
      ctx.body = { data: { data: res.dataValues, code: 1, msg: '获取用户信息成功' } }
      ctx.status = 200
    } else {
      ctx.body = { data: { data: null, code: 0, msg: '无效token' } }
      ctx.status = 401
    }
  }
}

module.exports = UsersController;