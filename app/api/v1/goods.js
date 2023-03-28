const Router = require('koa-router');

const {
  GoodsValidator,
  PositiveIdParamsValidator
} = require('@validators/goods');

const { Auth } = require('@middlewares/auth');
const { GoodsDao } = require('@dao/goods');

const { Resolve } = require('@lib/helper');
const { Goods } = require('../../models/goods');
const res = new Resolve();


const AUTH_ADMIN = 16;

const router = new Router({
  prefix: '/api/v1'
})

/**
 * 创建商品
 */
router.post('/goods', new Auth(AUTH_ADMIN).m, async (ctx) => {

  // 通过验证器校验参数是否通过
  const v = await new GoodsValidator().validate(ctx);

  // 创建商品
  const [err, data] = await GoodsDao.create(v);
  if (!err) {
    // 返回结果
    ctx.response.status = 200;
    ctx.body = res.success('创建商品成功');
  } else {
    ctx.body = res.fail(err);
  }
});

/**
 * 删除商品
 */
router.delete('/goods/:id', new Auth(AUTH_ADMIN).m, async (ctx) => {

  // 通过验证器校验参数是否通过
  const v = await new PositiveIdParamsValidator().validate(ctx);

  // 获取商品ID参数
  const id = v.get('path.id');
  // 删除商品
  const [err, data] = await GoodsDao.destroy(id);
  if (!err) {
    ctx.response.status = 200;
    ctx.body = res.success('删除商品成功');
  } else {
    ctx.body = res.fail(err);
  }
})

/**
 * 更新商品
 */
router.put('/goods/:id', new Auth(AUTH_ADMIN).m, async (ctx) => {
  // 通过验证器校验参数是否通过
  const v = await new PositiveIdParamsValidator().validate(ctx);

  // 获取商品ID参数
  const id = v.get('path.id');
  // 更新商品
  const [err, data] = await Goods.update(id, v);
  if (!err) {
    ctx.response.status = 200;
    ctx.body = res.success('更新商品成功');
  } else {
    ctx.body = res.fail(err);
  }
})


/**
 * 获取商品列表
 */
router.get('/goods', async (ctx) => {
  const [err, data] = await GoodsDao.list(ctx.query);
  if (!err) {
    ctx.response.status = 200;
    ctx.body = res.json(data)
  } else {
    ctx.body = res.fail(err)
  }
});

/**
 * 商品详情
 */
router.get('/goods-detail', async (ctx) => {

  // 通过验证器校验参数是否通过
  const v = await new PositiveIdParamsValidator().validate(ctx);
  // 查询商品
  const [err, data] = await GoodsDao.detail(ctx.query);
  if (!err) {
    // 返回结果
    ctx.response.status = 200;
    ctx.body = res.json(data);
  } else {
    ctx.body = res.fail(err);
  }
})

module.exports = router
