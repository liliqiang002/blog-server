'use strict';

const Controller = require('egg').Controller;

class ArticleController extends Controller {
  /**
   * 文章添加
   * params: 
   */
  async add() {
    const { ctx } = this;
    const res = await ctx.model.Article.create(ctx.request.body)
    ctx.body = { data: { data: res, code: 1, msg: '添加成功' } }
    ctx.status = 200;
  }
  /**
   * 文章列表
   * params:
   */
  async list() {
    const { ctx } = this;
    const { page, per_page } = ctx.query
    const articleModel = ctx.model.Article
    const cagegoryModel = ctx.model.Category
    const tagsModel = ctx.model.Tags
    const usersModel = ctx.model.Users
    articleModel.belongsTo(cagegoryModel, {
      foreginkey: 'category_id',
      targetkey: 'id'
    })
    articleModel.belongsTo(tagsModel, {
      foreginkey: 'tag_id',
      targetkey: 'id'
    })
    articleModel.belongsTo(usersModel, {
      foreginkey: 'user_id',
      targetkey: 'id'
    })
    const res = await ctx.model.Article.findAll({
      include: [
        { model: cagegoryModel, attributes: ['id', 'name'] },
        { model: tagsModel, attributes: ['id', 'name']},
        { model: usersModel, attributes: ['id', 'username']}
      ],
      attributes: ['id', 'title', 'summary', 'created_at'],
      limit: Number(per_page),
      offset: per_page * (page - 1),
      order: [
        ['updated_at', 'DESC']
      ]
    })
    ctx.body = { data: { data: res, code: 1, msg: '获取文章列表成功' } }
    ctx.status = 200;
  }
  /**
   * 文章详情
   * params: id 文章id
   */
  async detail() {
    const { ctx } = this
    const { id } = ctx.query
    const articleModel = ctx.model.Article
    const cagegoryModel = ctx.model.Category
    const tagsModel = ctx.model.Tags
    const usersModel = ctx.model.Users
    // const likeModel = ctx.model.Likes
    articleModel.belongsTo(cagegoryModel, {
      foreginkey: 'category_id',
      targetkey: 'id'
    })
    articleModel.belongsTo(tagsModel, {
      foreginkey: 'tag_id',
      targetkey: 'id'
    })
    articleModel.belongsTo(usersModel, {
      foreginkey: 'user_id',
      targetkey: 'id'
    })
    // articleModel.hasMany(likeModel, {
    //   foreginkey: 'article_id',
    //   targetkey: 'id'
    // })
    const res = await ctx.model.Article.findOne({
      include: [
        { model: cagegoryModel, attributes: ['id', 'name'] },
        { model: tagsModel, attributes: ['id', 'name'] },
        { model: usersModel, attributes: ['id', 'username', 'avatar'] },
        // {
        //   model: likeModel,
        //   as: 'likes',
        //   attributes: [
        //     [sequelize.fn('COUNT', sequelize.col('id')), 'like_count']
        //   ]
        // }
      ],
      attributes: ['id', 'title', 'summary', 'content', 'created_at', 'updated_at'],
      where: {
        id: id
      }
    })
    console.log(res)
    ctx.body = { data: { data: res, code: 1, msg: '获取文章详情成功' } }
    ctx.status = 200;
  }
  /**
   * 点赞与取消点赞
   * params: id 文章id
   */
  async like () {
    const { ctx } = this
    const { id } = ctx.request.body
    console.log('参数：文章id_' + id + ' ' + '用户id_' + ctx.user.id )
    const [likeData, created] = await ctx.model.Likes.findOrCreate({
      where: {
        article_id: id,
        user_id: ctx.user.id
      },
      defaults: {
        article_id: id,
        user_id: ctx.user.id
      }
    })
    if (created) {
      console.log('新创建：', likeData)
      ctx.body = { data: { data: { is_like: 1, article_id: id, user_id: ctx.user.id }, code: 1, msg: '点赞成功' } }
    } else {
      await ctx.model.Likes.destroy({
        where: {
          article_id: id,
          user_id: ctx.user.id
        }
      })
      ctx.body = { data: { data: { is_like: 0, article_id: id, user_id: ctx.user.id }, code: 1, msg: '取消点赞成功' } }
    }
    
    ctx.status = 200;
  }
}

module.exports = ArticleController;