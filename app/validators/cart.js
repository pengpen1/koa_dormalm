const {
  Rule,
  LinValidator
} = require('@core/lin-validator-v2')


class CartValidator extends LinValidator {
  constructor() {
    super();

    this.goodsImage = [new Rule("isLength", "商品图片 goodsImage 不能为空", { min: 1 })];
    this.goodsName = [new Rule("isLength", "商品名字 goodsName 不能为空", { min: 1 })];
    this.goodsColor = [new Rule("isLength", "商品颜色 goodsColor 不能为空", { min: 1 })];
    this.goodsNum = [new Rule("isLength", "商品数量 goodsNum 不能为空", { min: 1 })];
  }

}
class PositiveIdParamsValidator extends LinValidator {
  constructor() {
    super();
    this.id = [
      new Rule('isInt', '地址ID需要正整数', { min: 1 })
    ]
    this.userId = [
      new Rule('isInt', '用户ID需要正整数', { min: 1 })
    ]
  }
}


module.exports = {
  CartValidator,
  PositiveIdParamsValidator,
}
