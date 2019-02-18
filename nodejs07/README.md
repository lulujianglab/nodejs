# 包管理器

`require` - 引入其他模块
`exports` - 输出
`module.exports` - 批量输出

```js
const test233=require('mod.js')
const test233=require('./mod.js')
```

上面那句代表的是引入模块，下面这句代表的是引入当前目录下的 js 文件

对外输出东西，必须加给export - `exports.a = 1`

nodejs 没有全局变量，所以需要被外部引用的内容就需要通过 `exports` 导出出去

`module.exports` 是批量输出，比如

```js
exports.a = 1
exports.b = 2
exports.c = 3
```

可以改为

```js
module.exports = {a: 1, b: 2, c: 3}
```

需要注意的是

```js
console.log(module.exports == exports)
```

输出的是 true

包管理器需要用到的是 `npm` ,全称是 `NodeJS Package Manager` ( `NodeJS` 包管理器 )

1. 帮助下载模块
2. 自动解决依赖

安装依赖和卸载依赖

```sh
npm install
npm uninstall
```

node_modules 文件夹中时存放依赖模块的

所以之前提到的不加 './' 必须放在 node_modules 里面，如果有 './' ,从当前目录找；如果没有 './'，先从系统模块，再从 node_modules 找

```sh
npm init

npm publish

npm --force unpublish
```

发布 npm 和 取消发布的 npm
