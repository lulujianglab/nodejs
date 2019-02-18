# 数据库连接

1. 首先引入 `mysql`

```js
const mysql=require('mysql')
```

2. 连接数据库，`createConnection`(哪台服务器，用户名，密码，库)

```js
var db=mysql.createConnection({host: 'localhost', port: '3306', user: 'root', password: 'xxxxxx'. database: 'mydatabase' })
```

`localhost` 代表本地 mysql 数据库, 3306 端口号是默认端口号, mydatabase 是数据库名

3. 查询，`query`(干啥，回调)

```js
db.query("SELECT * FROM `user_table`", (err, data) => {
  if(err) {
    console.log('出错了', err)
  }else {
    console.log('成功了',data)
  }
})
```

SQL 结构化查询语句
4大查询语句 - 增删改查

增 - INSERT
INSERT INFO 表（字段列表）VALUES(值列表)
INSERT INFO `user_table`(`ID`, `username`, `password`) VALUES(0, 'bule2', '987654')

删 - DELETE

改 - UPDATE

查 - SELECT
SELECT * FROM `user_table`

SQL标准写法：
1. 关键字大写
2. 库、表、字段需要加上