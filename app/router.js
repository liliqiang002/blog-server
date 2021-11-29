'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, jwt } = app;
  const authentication = app.middleware.authentication()
  /**
   * 通用接口
   */
  router.post('/common/upload', jwt, controller.common.upload);
  router.get('/', controller.home.index);
  /**
   * 用户相关
   */
  router.post('users', '/users/login', controller.users.login);
  router.get('users', '/users/getUserInfo', jwt, controller.users.getUserInfo);
  /**
   * 文章相关
   */
  router.post('article', '/article/add', authentication, controller.article.add);
  router.get('article', '/article/list', controller.article.list);
  router.get('article', '/article/detail', controller.article.detail);
  router.post('article', '/article/like', authentication, controller.article.like);

  router.get('category', '/category/list', controller.category.list);
  router.get('tags', '/tags/list', controller.tags.list);

  /**
   * 记录相关
   */
   router.post('daily', '/daily/add', authentication, controller.daily.add);
   router.get('daily', '/daily/list', authentication, controller.daily.list);
   router.delete('daily', '/daily/delete/:id', authentication, controller.daily.delete);
   router.post('daily', '/daily/edit', authentication, controller.daily.edit);
};
