# 模板引擎

用来动态渲染页面、生成页面的，页面中一部分内容是可以变化的，用于后台的，前台的有 react 、vue 、angluar 等

nodejs 中的模板引擎有

## jade - 破坏式、侵入式、强依赖 ，不能跟其他的并存

```sh
npm install jade
```

```js
const jade=require('jade')

var str=jade.render('html')

console.log(str)
```

运行 `node jade1` ,打印出来的结果为 `<html></html>`

渲染文件：

```js
const jade=require('jade')

var str=jade.renderFile('./views/8.jade', {pretty: true})

console.log(str)
```

其中，8.jade 内容是

```jade
html
  head
    style
  body
    div(title="aaa",id="div1")
```

`{pretty: true}` 是美化输出的内容,需要注意的是

**1. 根据缩进,规定层级**
**2. 属性放在（）里面，逗号分隔**

### jade 中添加属性值

比如 html 中的 `script` 、 `link` 等

```jade
html
  head
    style
    script(src="a.js")
    link(href="a.css",rel="stylesheet")
  body
    div
      ul
        li
          input(type="text",id="txt1",value="abc")
        li
          input(type="text",id="txt2",value="111")
        li
          input(type="text",id="txt3",value="222")
    div
```

### jade 中添加内容

与属性空一格的距离

```jade
html
  head
    style
  body
    a(href="http://www.zhinengshe.com/") 官网
    a(href="http://www.baidu.com/") 百度
```

### div 里边套元素

```jade
html
  head
    style
  body
    div aaa
      span bbb
```

### 特色属性

`class` (既可以用普通的字符串写法，又可以用数组arr) 和 `style` (既可以用普通的字符串写法，又可以用json)

```jade
html
  head
    style
  body
    div(style="width:200px;height:200px;background:red")
    div(style= {width: '200px', height: '200px', background: 'red'})
```

### json化

```jade
html
  head
    style
  body
    div(title="aaa",id="div1")
    div&attributes({title: 'aaa', id: 'div1'})
```

`attributes` 告诉 jade 引擎后面的属性不再是普通的写法，而是 JSON 的模式

```jade
html
  head
    style
  body
    div(class="aaa left-warp active")
    div(class= ['aaa', 'left-warp', 'active'])
```

### 渲染出的文件内容写入 index 文件

```js
const jade=require('jade')
const fs=require('fs')

var str=jade.renderFile('./views/2.jade', {pretty: true});

fs.writeFile('./build/2.html', str, function (err){
  if(err)
    console.log('写入失败')
  else
    console.log('写入成功')
})
```

### 简写

```js
html
  head
    style
  body
    div.box
    div#div1
```

## ejs - 温和、非侵入式、弱依赖

```sh
npm install ejs
```

```js
const ejs=require('ejs')

ejs.renderFile('./views/1.ejs', {name: 'blue'}, function (err, data){
  if(err)
    console.log('编译失败')
  else
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
    我的名字叫：<%= name %>
  </body>
</html>
```

变量 `<%= name %>` 的值为 `{name: 'blue'}`