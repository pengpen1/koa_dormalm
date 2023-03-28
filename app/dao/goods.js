const { Op } = require("sequelize");

const { Goods } = require("@models/goods");

// 定义商品模型
class GoodsDao {
  // 创建商品
  static async create(v) {
    // 检测是否存在商品
    const title = v.get("body.title");
    const hasGoods = await Goods.findOne({
      where: {
        title,
      },
    });

    // 如果存在，抛出存在信息
    if (hasGoods) {
      throw new global.errs.Existing("商品已存在");
    }

    // 创建商品
    const goods = new Goods();

    goods.title = title;
    goods.img_url = v.get("body.img_url");
    goods.type = v.get("body.type");
    goods.imgs = v.get("body.imgs");
    goods.price = v.get("body.price");
    goods.status = v.get("body.status") || 1;

    try {
      const res = await goods.save();
      return [null, res];
    } catch (err) {
      console.log(err);
      return [err, null];
    }
  }

  // 获取商品列表
  static async list(params = {}) {
    const { keyword, page_size = 10, status, type, page = 1 } = params;

    // 筛选方式
    let filter = {
      deleted_at: null,
    };

    // 状态筛选，0-上架，1-下架
    if (status || status === 0) {
      filter.status = status;
    }

    // 筛选方式：存在type
    if (type && type !== "all") {
      filter.type = type;
    }

    // 筛选方式：存在搜索关键字
    if (keyword) {
      filter.title = {
        [Op.like]: `%${keyword}%`,
      };
    }

    try {
      const goods = await Goods.scope("iv").findAndCountAll({
        limit: page_size, //每页10条
        offset: (page - 1) * page_size,
        where: filter,
        order: [["created_at", "DESC"]],
      });

      let rows = goods.rows;
      const data = {
        data: rows,
        // 分页
        meta: {
          current_page: parseInt(page),
          per_page: 10,
          count: goods.count,
          total: goods.count,
          total_pages: Math.ceil(goods.count / 10),
        },
      };

      return [null, data];
    } catch (err) {
      return [err, null];
    }
  }

  // 删除商品
  static async destroy(id) {
    // 检测是否存在商品
    const goods = await Goods.findOne({
      where: {
        id,
        deleted_at: null,
      },
    });
    // 不存在抛出错误
    if (!goods) {
      throw new global.errs.NotFound("没有找到相关商品");
    }

    try {
      // 软删除商品
      const res = await goods.destroy();
      return [null, res];
    } catch (err) {
      return [err, null];
    }
  }

  // 更新商品
  static async update(id, v) {
    // 查询商品
    const goods = await Goods.findByPk(id);
    if (!goods) {
      throw new global.errs.NotFound("没有找到相关商品");
    }

    // 更新商品
    goods.title = v.get("body.title");
    goods.img_url = v.get("body.img_url");
    goods.type = v.get("body.type");
    goods.imgs = v.get("body.imgs");
    goods.price = v.get("body.price");
    goods.status = v.get("body.status") || 1;

    try {
      const res = await goods.save();
      return [null, res];
    } catch (err) {
      return [err, null];
    }
  }

  // 商品详情
  static async detail(query) {
    const { id } = query;
    try {
      let filter = {
        id,
        deleted_at: null,
      };

      let article = await Goods.findOne({
        where: filter,
      });

      if (!article) {
        throw new global.errs.NotFound("没有找到相关文章");
      }

      return [null, article];
    } catch (err) {
      return [err, null];
    }
  }
}

module.exports = {
  GoodsDao,
};
