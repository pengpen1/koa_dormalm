### 1.1.项目模块
使用 Node.js Koa2 框架做服务端 API 接口。

- 管理员模块
    - 实现权限管理，能够对其他模块进行增删改查权限
    - 登录注册模块，登录管理后台
- 用户模块
    - 实现在前台博客网站中登录注册
- 文章模块
    - 实现文章的新增，修改，删除，查询
    - 文章进行对分类，评论，回复关联
- 分类模块
    - 实现分类的新增，修改，删除，查询
    - 实现分类与文章进行关联
- 评论 / 回复模块
    - 实现评论 / 回复的新增，修改，删除，查询
    - 实现评论 / 回复与文章进行关联

### 1.2.接口文档
在doc目录下


### 1.3.项目结构 
.
├── _tests 单元测试
├── app *重点, 项目工程入口
    ├── api 接口
    ├── dao 数据存取对象（Data Access Objects）
    ├── lib 工具库
    ├── models 建模，把业务逻辑映射成数据模型
    ├── service 数据处理
    └── validators 数据验证
├── app.js 入口文件
├── config 配置文件
├── core 核心公共工具库
├── doc 接口文档
├── jest.config.js  测试配置文件
├── middlewares 中间件
├── package-lock.json
├── package.json
└── yarn.lock
```

### 2.3.创建数据库

启动项目前一定要在创建好 boblog 数据库
```
# 登录数据库
mysql -uroot -p (回车然后输入你的本机数据库密码)

# 创建 boblog 数据库

CREATE DATABASE IF NOT EXISTS boblog DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```


### 2.4.启动项目
以下是启动服务端项目的操作命令：
```
# 进入项目根目录
cd 路径

# 安装依赖包

npm install 或者 yarn install

# 启动 Node.js Koa2 项目

npm run dev 或者 yarn dev

```


