艾玛，昨天的 [【JavaScript】【学习心得】学习 JavaScript 第三天](http://www.imooc.com/wenda/detail/235873)被运营同学推荐置顶了，并且推荐编辑器支持 markdown 语法也注意到了，imooc 超棒的。好的，咱们继续学习 JavaScript 吧。

先回顾下昨天学的知识吧，主要学习了常用的几个 DOM 操作方法：

- `document.getElementById(id)`；
- `document.getElementsByTagName(tag)`；
- `document.getElementsByClassName(class)`,注意旧的浏览器不支持，需要重写；
- `object.getAttribute(attribute)`
- `object.setAttribute(attribute,value)`

好了今天咱们学习《第四章  案例研究： JavaScript 图片库》 来动起手来，咱们一起来写一个简单的 JavaScript 图片库，至于细节方面大家可以翻下下仔细研读下，我就不搬运了，我怕作者来打我。

好了，我们首先来掌握下我们需要知道的知识点：

1. 事件处理函数(event handler)的作用是：在特定事件发生时调用特定的 JavaScript 代码。

2. 如何禁止点击事件之后，链接继续跳转。

 ```
 <a href="images/codercat.jpg"  onclick="showPic(this);return false;">codercat</a>
 ```

3. `childNodes`  属性返回包含被选节点的子节点的 NodeList。
如果选定的节点没有子节点，则该属性返回不包含节点的 NodeList。文档里几乎每一样东西都是一个节点，甚至连空格和换行符都会被解释为节点，而它们也全部包含在 `childNodes` 属性所返回的数组当中。

4. `nodeType` 属性可返回节点的节点类型。  
 `nodeType` 属性总共有 12 种可能值，但其中仅有 3 种具有使用价值：
 - 元素节点的 `nodeType` 属性值为 1；
 - 属性节点的 `nodeType` 属性值为 2；
 - 文本节点的 `nodeType` 属性值为 3；

5. `nodeValue` 属性可设置或返回某节点的值，根据其类型。

 ```
 <p id="decription">请选择一张图片</p>
 ```

 `document.getElementById('decription').nodevalue` 为空，其文本内容应该是第一个字节点。

 应该是 `document.getElementById('decription').childNodes[0].nodevalue`

 6. `firstChild` 属性返回被选节点的第一个子节点。`lastChild` 属性返回被选节点的最后一个子节点。
如果它们选定的节点没有子节点，则该属性返回 NULL。

好的 我们来看下代码结构：

```
<!DOCTYPE html>
<html lang="zh-cmn-Hans">
<head>
    <meta charset="UTF-8">
    <title>1-4 案例研究： JavaScript 图片库</title>
    <style>
        body {
           margin: 1em 10%;
           color: #333;
           background-color: #ccc;
           font-family: "Helvetica","Arial",serif;
        }
        h1 {
            color: #333;
            background-color: rgba(0, 0, 0, 0);
        }
        a {
            color: #c60;
            background-color: rgba(0, 0, 0, 0);
            font-weight: bold;
            text-decoration: none;
        }
        ul {
            padding: 0;
        }
        li {
            float: left;
            padding: 1em;
            list-style-type: none;
        }
        img {
            display: block;
            clear: both;
            width: 424px;
            height: 424px;
            border: 1px solid #ccc;
        }
    </style>

</head>

<body>
    <h1>Snapshots</h1>
    <ul>
        <li><a href="images/codercat.jpg"  title="This is codercat.jpg." onclick="showPic(this);return false;">codercat</a></li>
        <li><a href="images/inspectocat.jpg" title="This is inspectocat.jpg." onclick="showPic(this);return false;">inspectocat</a></li>
        <li><a href="images/maxtocat.gif" title="This is maxtocat.gif." onclick="showPic(this);return false;">maxtocat</a></li>
        <li><a href="images/yaktocat.png" title="This is yaktocat.png." onclick="showPic(this);return false;">yaktocat</a></li>
        <li><a href="images/octobiwan.jpg" title="This isoctobiwan.jpg." onclick="showPic(this);return false;">octobiwan</a></li>
    </ul>

    <img id="placeholder"  src="images/codercat.jpg" alt="">

    <p id="decription">请选择一张图片</p>

    <script>
        function showPic(whichpic){
            var source = whichpic.getAttribute('href');
            var placeholder = document.getElementById('placeholder');
            placeholder.setAttribute('src',source);
            //placeholder.src = source;
            var text = whichpic.getAttribute('title');
            var decription = document.getElementById('decription');
            decription.firstChild.nodeValue = text;
        }
    </script>

</body>
</html>
```
你掌握了吗，自己敲出来看看。 是不是很棒哦，哦 对了，这里的图片我选的很萌很萌的 github　的那些猫。 
### DEMO 地址:[codepen](http://codepen.io/paddingme/pen/qCuDo) 或者[1-4.html](https://github.com/paddingme/Learning-JavaScript/blob/master/Demo/1-4.html) 

