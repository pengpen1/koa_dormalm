const {
  Rule,
  LinValidator
} = require('@core/lin-validator-v2')


class GoodsValidator extends LinValidator {
  constructor() {
    super();

    this.type = [new Rule("isLength", "商品类型 type 不能为空", { min: 1 })];
    this.img_url = [new Rule("isLength", "商品封面 img_url 不能为空", { min: 1 })];
    this.price = [new Rule("isLength", "商品价格 price 不能为空", { min: 1 })];
    this.title = [new Rule("isLength", "商品标题 title 不能为空", { min: 1 })];
  }

}
class PositiveIdParamsValidator extends LinValidator {
  constructor() {
    super();
    this.id = [
      new Rule('isInt', '商品ID需要正整数', { min: 1 })
    ]
  }
}


module.exports = {
  GoodsValidator,
  PositiveIdParamsValidator,
}
