# ejs

```sh
npm install ejs
```

### 动态输出内容

```js
const ejs=require('ejs')

ejs.renderFile('./views/1.ejs', {name: 'blue'}, function (err, data){
  console.log(data)
})
```

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title></title>
  </head>
  <body>
    <div>
      <%=name%>
    </div>
  </body>
</html>
```

### json

```js
const ejs=require('ejs')

ejs.renderFile('./views/2.ejs', {json: {arr: [
  {user: 'blue', pass: '123456'},
  {user: 'zhangsan', pass: '654321'},
  {user: 'xiaoming', pass: '999999'},
]}}, function (err, data){
  console.log(data)
})
```

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title></title>
  </head>
  <body>
    <div>
      <%=json.arr[0].user%>
    </div>
  </body>
</html>
```

### 循环

```js
```

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title></title>
  </head>
  <body>
    <% for(var i=0;i<json.arr.length;i++){ %>
    <div>用户名：<%=json.arr[i].user%> 密码：<%=json.arr[i].pass%></div>
    <% } %>
  </body>
</html>
```

### 非转义输出

`=` 是转义数组，`-` 是不转义

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title></title>
  </head>
  <body>
    <%
    var str="<div></div>"
    %>

    <%- str %>
  </body>
</html>
```

### include

```js
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title></title>
  </head>
  <body>
    <% for(var i=0;i<5;i++){ %>
    <% include ../a.txt %>
    <% } %>
  </body>
</html>
```

### 判断

```js
const ejs=require('ejs')

ejs.renderFile('./views/6.ejs', {type: 'admin'}, function (err, data){
  console.log(data)
})
```

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title></title>
  </head>
  <body>
    <% if(type=='admin'){ %>
    <% include ../style/admin.css %>
    <%}else{%>
    <% include ../style/user.css %>
    <% } %>
  </body>
</html>
```

注意，**`include` 里不能直接包变量**