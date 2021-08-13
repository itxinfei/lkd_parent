English | [简体中文](./README-zh.md)

## Project setup

```bash
yarn install
```

### Compiles and hot-reloads for development

```bash
yarn serve
```

### Compiles and minifies for production

```bash
yarn build
```

### Lints and fixes files

```bash
yarn lint
```

### Run your unit tests

```bash
yarn test:unit
```

### Run your end-to-end tests

```bash
yarn test:e2e
```

### Generate all svg components

```bash
yarn svg
```

### 待办事项
1.导航守卫
2.异常页面
3.token失效和校验失败特殊异常处理，用mock接口登录切到真实接口登录就能复现
4.ui规范
5.封装el-select loadmore
6.表格序号
7.统一使用一倍图
8.scss后缀文件格式化
9.时间选择器限制30天，年去掉，延期解决
10.Object.assign()方法实行的是浅拷贝，而不是深拷贝。
```
defaultNode = {
  id: '',
  name: '',
  addr: '',
  createUserId: 0,
  ownerId: 0,
  ownerName: '',
  businessId: 0,
  regionId: '',
  vmCount: 0,
  businessType: {
    name: ''
  },
  region: {
    name: ''
  },
  areaCode: 0
}
```
11.any尽量用强类型
12.Using 1 worker with 2048MB memory limit
13.分页加v-loading