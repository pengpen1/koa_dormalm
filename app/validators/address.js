const {
  Rule,
  LinValidator
} = require('@core/lin-validator-v2')


class AddressValidator extends LinValidator {
  constructor() {
    super();

    this.userName = [new Rule("isLength", "用户昵称 userName 不能为空", { min: 1 })];
    this.streetName = [new Rule("isLength", "地址 streetName 不能为空", { min: 1 })];
    this.postCode = [new Rule("isLength", "邮政编码 postCode 不能为空", { min: 1 })];
    this.tel = [new Rule("isLength", "电话号码 tel 不能为空", { min: 1 })];
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
  AddressValidator,
  PositiveIdParamsValidator,
}
