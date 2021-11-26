'use strict';
const  fs = require('fs');
const path = require('path');
const Controller = require('egg').Controller;

class CommonController extends Controller {
  async upload() {
    const { ctx } = this;
    // console.log(ctx.request.files[0])
    const tempFile = ctx.request.files[0]
    // 读取文件
    let file = fs.readFileSync(tempFile.filepath) //files[0]表示获取第一个文件，若前端上传多个文件则可以遍历这个数组对象
    // 将文件存到指定位置
    // console.log(file)
    fs.writeFileSync(path.join('app/', `public/uploadfile/${tempFile.filename}`), file)
    ctx.body = { data: { url: `public/uploadfile/${tempFile.filename}`, code: 1, msg: '上传成功' } };
    ctx.status = 200;
  }
}

module.exports = CommonController;
