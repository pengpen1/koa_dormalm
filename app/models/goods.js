const moment = require("moment");
const { sequelize } = require("@core/db");
const { Model, DataTypes } = require("sequelize");
// 定义商品模型
class Goods extends Model {}

// 初始文章模型
Goods.init(
  {
    id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      comment: "商品ID",
    },
    type: {
      type: DataTypes.STRING(128),
      allowNull: false,
      comment: "商品类型",
    },
    img_url: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: "商品封面图",
    },
    imgs: {
      type: DataTypes.STRING,
      allowNull: false,
      get() {
        return this.getDataValue("imgs").split(",");
      },
      set(value) {
        return this.setDataValue("imgs", value.join(","));
      },
      comment: "商品封面图",
    },
    price: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      comment: "商品价格",
    },
    title: {
      type: DataTypes.STRING(128),
      allowNull: false,
      comment: "商品标题",
    },
    status: {
      type: DataTypes.TINYINT,
      allowNull: true,
      defaultValue: 1,
      comment: "商品上架状态：0-下架,1-上架",
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      comment: "创建时间",
      get() {
        return moment(this.getDataValue("created_at")).format(
          "YYYY-MM-DD HH:mm:ss"
        );
      },
    },
  },
  {
    sequelize,
    modelName: "goods",
    tableName: "goods",
  }
);

// 增加水果
// (async function() {
//   const goods = new Goods();

//   goods.title = "1055水果沙拉";
//   goods.img_url = "https://pic.sogou.com/d?query=%E6%B0%B4%E6%9E%9C&forbidqc=&entityid=&preQuery=&rawQuery=%E6%B0%B4%E6%9E%9C&queryList=&st=255&did=11";
//   goods.type = "fruit";//零食snack，水果fruit，打印print，其他other
//   goods.imgs = ["https://i04piccdn.sogoucdn.com/bc3a98b65e35c69d","https://i01piccdn.sogoucdn.com/b033b9e6788709e7","https://pic.sogou.com/d?query=%E6%B0%B4%E6%9E%9C&forbidqc=&entityid=&preQuery=&rawQuery=%E6%B0%B4%E6%9E%9C&queryList=&st=255&did=11"];
//   goods.price = 88;
//   goods.status = 1;

//   try {
//     const res = await goods.save();
//     console.log("res",res)
//   } catch(err) {
//     console.log(err)
//   }
// })()

// 更新水果
// (async function () {
//   const goods = await Goods.findByPk(2);
//   goods.title = "3038水果";
//     try {
//     const res = await goods.save();
//     console.log("res",res)
//   } catch(err) {
//     console.log(err)
//   }
// })()

// 更新水果
// (async function () {
//   const goods = await Goods.findByPk(4);
//   goods.img_url = "https://i04piccdn.sogoucdn.com/bc3a98b65e35c69d";
//     try {
//     const res = await goods.save();
//     console.log("res",res)
//   } catch(err) {
//     console.log(err)
//   }
// })()

module.exports = {
  Goods,
};
