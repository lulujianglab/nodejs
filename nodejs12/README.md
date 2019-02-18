# jade

```sh
npm install jade
```

能识别单双标签

## 输出内容

### 竖线 |

代表所以下一级的内容，原样输出

```jade
html
  head
    script
      |window.onload=function (){
      | var oBtn=document.getElementById('btn1')
      | oBtn.onclick=function (){
      |   alert('aaaa')
      | }
      |}
  body
    |abc
    |ddd
    |213
```

### 加一个点 .

```jade
html
  head
    script.
      window.onload=function (){
        var oBtn=document.getElementById('btn1')
        oBtn.onclick=function (){
          alert('aaaa')
        }
      }
  body
    |abc
    |ddd
    |213
```

### 模板引擎里边一边有一个功能，叫做 `include`,可以引入一个js

```js
window.onload=function (){
  var oBtn=document.getElementById('btn1')
  oBtn.onclick=function (){
    alert('aaaa')
  }
}
```

```jade
html
  head
    script
      include a.js
  body
    |abc
    |ddd
    |213
```

```js
const jade=require('jade')

console.log(jade.renderFile('./views/5.jade', {pretty: true}))
```

## 动态输出内容

### 在变量前加一个 #

```js
const jade=require('jade')

console.log(jade.renderFile('./views/6.jade', {pretty: true, name: 'blue'}))
```

```jade
html
  head
  body
    div 我的名字：#{name}
```

### 还可以做一些运算

```js
const jade=require('jade')

console.log(jade.renderFile('./views/7.jade', {pretty: true, a: 12, b: 5}))
```

```jade
html
  head
  body
    div 我的名字：#{a+b}
```

## 特色属性 style 和 class

```js
const jade=require('jade')

console.log(jade.renderFile('./views/8.jade', {pretty: true,
  json: {width: '200px', height: '200px', background: 'red'},
  arr: ['aaa', 'left-wrap']
}))
```

```jade
html
  head
  body
    div(style=json)
    div(class=arr)
    div(class=arr class="active")
    div(class=arr)
    div(class=arr)
```

## jade 中直接操作 js

- 意味着是一段代码

```js
const jade=require('jade')

console.log(jade.renderFile('./views/10.jade', {pretty: true}))
```

```jade
html
  head
  body
    -var a=12;
    -var b=5;
    div 结果是：#{a+b}
```

### js 动态赋值,既可以用 # ,又可以用 =

```js
const jade=require('jade')

console.log(jade.renderFile('./views/10.jade', {pretty: true, a: 12, b: 5}))
```

```jade
html
  head
  body
    span #{a}
    span=a
```

### 循环输出

```js
const jade=require('jade')

console.log(jade.renderFile('./views/11.jade', {pretty: true,
  arr: ['aaa', 'sfasdf', '3423', 'asdfasdf']
}))
```

```jade
html
  head
  body
    -for(var i=0;i<arr.length;i++)
      div=arr[i]
```

### 非转义输出 html

! 表示标签原样输出

```js
const jade=require('jade')

console.log(jade.renderFile('./views/12.jade', {pretty: true,
  content: "<h2>你好啊</h2><p>对方水电费色弱威尔士地方</p>"
}))
```

```jade
html
  head
  body
    div!=content
```

### if...else 判断

```js
const jade=require('jade')

console.log(jade.renderFile('./views/13.jade', {pretty: true}))
```

```jade
html
  head
  body
    -var a=19
    if(a%2==0)
      div(style={background:'red'}) 偶数
    else
      div(style={background:'green'}) 奇数
```

### case when 

类似于 switch case

```js
const jade=require('jade')

console.log(jade.renderFile('./views/14.jade', {pretty: true}))
```

```jade
html
  head
  body
    -var a=1
    case a
      when 0
        div aaa
      when 1
        div bbb
      when 2
        div ccc
      default
        |不靠谱
```

前面是代码，后面也是代码，中间就不用加 - 了

## 完整代码

```js
const jade=require('jade')
const fs=require('fs')

var str=jade.renderFile('./views/index.jade', {pretty: true})

fs.writeFile('./build/index.html', str, function (err){
  if(err)
    console.log('编译失败')
  else
    console.log('成功')
})
```

```jade
doctype
html
  head
    meta(charset="utf-8")
    title jade测试页面
    style.
      div {width:100px;height:100px;background:#CCC;text-align:center;line-height:100px;float:left;margin:10px auto}
      div.last {clear:left}
  body
    -var a=0;
    while a<12
      if a%4==0 && a!=0
        div.last=a++
      else
        div=a++
```
