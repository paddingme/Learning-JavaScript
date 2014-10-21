
# JavaScript高级程序设计学习笔记(1)

### JavaScript 简介
JavaScript 的兴起，主要目的是处理以前由服务器端语言负责的一些输入验证操作，如今，JavaScript 已不再局限于简单的数据验证，而是具备了与浏览器窗口及其内容等几乎所有方面交互的能力。今天JavaScript 已经成为一门功能全面的编程语言，能够处理复杂的计算和交互，拥有了 **闭包**、**匿名函数**、甚至 **元编程**等特性。

一个完整的JavaScript 实现通常有三部分组成：

- 核心(ECMAScript)，由ECMA-262 定义，提供核心语言功能；
- 文档浏览器模型(DOM)，提供访问和操作网页内容的方法和接口；
- 浏览器对象模型(BOM)，提供与浏览器交互的方法和接口。
我们常见的Web 浏览器只是ECMAScript实现可能的 *宿主环境*之一。而Web 浏览器对DOM的支持，对于IE来说，IE5.5 支持DOM1 级。在随后的IE6、IE7中没有引入新的DOM 功能，知道IE8 才对以前DOM实现中的bug 进行修复。

### 在HTML 中使用JavaScript
HTML4.01为`<script>`定义了6个属性(废弃的这里不再给出)：

- async: 可选，表示应该立即下载脚本，但不应妨碍页面中得去他操作；
- defer: 可选，表示脚本可以延迟到文档完全被解析和显示之后再执行，只对外部脚本有效；
- src: 可选，外部脚本文件；
-  type: 可选，表示编写代码使用的脚本语言的内容类型（MIME），通常为 text/javascript ,默认也为 text/javascript。

使用`<javascript>`元素有两种方式:

* 直接在页面嵌入 JavaScript 代码；
* 包含外部 JavaScript 文件。

包含在`<script>`元素内部的JavaScript 代码将从上至下依次解释。在解释器 `<script>` 元素内部的所有的代码求值完毕以前，页面中的其余内容将不会被浏览器加载或显示。

在使用`<script>`嵌入 Javascript 代码时，记住不要再代码的任何地方出现 `"</script>"`字符串，浏览器会认为这是结束的`</script>`标签。

无论如何包含代码，只要不存在`defer`或者`async`属性，浏览器都会按照`<script>`元素所在页面中出现的先后顺序对它们依次进行解析。

`defer`属性只适用于外部脚本文件，现实中，延迟脚本并不一定会按照顺序进行(第一个延迟脚本先于第二个延迟脚本执行)，也不一定会在 DOMContentLoaded 事件触发前执行，因为最好只包含一个延迟脚本。

异步脚本同样只适用于外部脚本文件，并告诉浏览器立即下载文件，异步脚本并不保证按照它们的先后顺序执行。 异步脚本一定会在页面的load 事件前执行，但可能会在 DOMContentLoaded 事件触发之前或之后执行。

    <!DOCTYPE html>
    <html lang="zh-cn">
    <head>
        <meta charset="UTF-8">
        <title>Document</title>
        <script type="text/javascript" defer="defer" src="example.js"></script>
        <script type="text/javascript" async src="example.js"></script>
    </head>
    <body>
        <noscript>
         <p>本页面需要浏览器支持 JavaScript!</p>
        </noscript>
    </body>
    </html>

适用外部脚本文件通常会有如下优点：

- 易于维护
- 可缓存
- 适应未来(不需要hack)
