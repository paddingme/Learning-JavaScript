# JavaScript语言精粹之第三章 对象

##上一章回顾以及一些废话##
首先谢谢芋头大大以及其他各位大大的鼓励。很多时候，在自己查找技术文章时，只是为了寻找一个答案，而答案之后的来由却从没有做过多考究，以至于我越来越觉得自己不会思考。这也是在这里开专栏的原因之一，认真去看一本书，写读书笔记，多问自己几个为什么。昨天的排版很烂，今天看了下markdown的语法和html5的一些语义化标签。所以弄到现在。好了，废话少说，温故知新先回顾下上一章语法的知识点。

上一章主要说了JavaScript的语法,先列出觉得重要的地方：

+ ===(严格相等运算符)首先计算其操作数的值，再进行比较，比较过程中无任何类型转换，JS的对象比较是引用比较非值比较，对象只和对象本身相等，和任何其他对象不等；
+ ==（相等运算符）null和undefined相等，其他不同的操作数比较时，有number转为number,有boolean也转为number,有string的转string再进行比较，看是否相等。对象互相不等，NaN互相不相等；
+ JS依赖于全局变量进行连接，所有编译单元的所有级别对象都被抛入全局对象的公共命名空间中。当var语句被用在函数的内部时，他定义了这个函数的私有变量；
+ false,null,undefined,空字符串”,数字0,数字NaN都为假，其余皆为真；
+ 函数调用引发函数的执行，函数调用运算符是跟随在函数名后面的一对圆括号。
+ type of 运算符产生的值有‘number’ ‘string’ ‘boolean’ ‘undefined’ ‘function’和’object’（注意都是小写）;而如果运算数是一个数组或null,结果是‘object’是不对的。

第六条中typeof(null)或typeof(array)(array为一数组)为什么结果是'object'不对呢，查了查书，是因为:

1.JavaScript本身对于数组和对象的区别很混乱，在区别数组和对象上没有一个很好的机制。typeof运算符报告数组的类型为‘object’没什么意义，可通过自定义is_array来判断是否为数组。
2.typeof(null)很糟糕返回的不是null，我们知道JavaScript中有六种数据类型，分别为String,Number,Boolean,Null,Undefined,Object,(另外有些人把Function也作为一种数据类型，这里存在争议，有兴趣的同学可以参考<a src="http://blog.csdn.net/aimingoo/article/details/6634977">《再谈JavaScript的数据类型问题》</a>)进一步理解。更好的检测null的方式应为my_value===null. 那么typeof如何区分对象和null呢，因为null值为假，所有对象值为真，所以可以有：
  		    <pre><code>if(my_value&&typeof my_value==='object'){//my_value是一个对象或数组。}</code></pre>

好的，下面进入第三章对象的学习。

---  
	
## 第三章  对象 ##
JavaScript中简单类型包括数字、字符串、布尔值、null值和undefined，其他所有的值都为对象（数组是对象，函数是对象，正则表达式是对象，对象当然也是对象）。String,Number,Boolean“貌似”对象，因为他们它们有自己的方法，但他们是不可变的。JavaScript中对象是可变的键控组合（keyed collections）（这句话如何理解？）。对象是属性的容器，其中每个属性都拥有名字和数值，属性的名字可是包括空字符串在内的任意字符串，而属性值可是除undefined值之外的任意值。JavaScript中的对象是无类别（class-free）的。即其对新属性的名字和值无约束。对象适合收集和管理数据。对象可以包含其他对象，所以他们可以容易地表示成树形或图形结构。JavaScript包括一个原型链特性，允许对象继承另一个对象的属性，正确的地使用它能减少对象初始化的时间和内存消耗。（后面讨论）
###3.1  对象字变量###
对象字面量提供了一种非常方便地创建新对象值的表示法。一个对象字面量就是包围在一对花括号中的零或多个“名/值”.对象字面量可出现在任何允许表达式出现的地方。
<pre><code>var empty_object={};
  				var stooge={
  				"first-name"="Chouchou",//(注意这里是逗号)
  				"last-name="Shouchouchou"//(注意这里没符号！)
                                  }</code></pre>
属性名可以是包括空字符串在内的任何字符串。在对象字面量中，如果属性名是一个合法的JavaScript标识符且不是保留字，并不强制要求用引号括住属性名。所以用引号括住“fisrt-name”是必须的（因为含‘-’这个属性名不是合法的JS标识符，见上一章标识符定义“标示符有一个字母开头，其后可加一个或多个字母、数字或下划线，不允许使用保留字。”），而是否括住first_name才是可选的了。逗号用来分隔多个“名/值”对(原来JSON数据的渊源在这里)。

属性的值可以从包括另一个对象字面量在内的任意表达式中获得。对象是可嵌套的。
<pre><code>var flight={
  airline="mh",
  number=370,
  departure：{
    IATA:"KL"，
    time:"2014-03-08 00:25",
    city:"Kuala Lumpu"
  },
  arrival:{
    IATA:"CN"，
    time:"future",
    city:"Beijing"
  }
};
</code></pre>
  		
###3.2   检索###
要检索对象中包含的值，可以采用在[]后缀中括住一个字符串表达式的方式。若字符串是一个常数且他是一个合法的JavaScript标识符而非保留字,那么也可以用.表示法代替，优先使用.表示法，因为更紧凑可读性更好。
<pre><code>stooge["first-name"] //Chouchou
flight.departure.city //"Kuala Lumpu"
</code></pre>
若检索一个并不存在的成员元素的值，则返回undefined。
  

||运算符可以用来填充默认值
<pre><code>var status=flight.status||"unkown";
</code></pre>
  				
尝试检索一个undefined值将会导致TypeError异常。可通过&&避免错误。
<pre><code>flight.equipment//undefined
flight.equipment.model//throw "TypeError"
flight.equipment&&flight.equipment.model//undefined
</code></pre>
  
###3.3   更新###
对象中的值可以通过复制语句来更新，若属性名已经存在于对象中，那么该属性的值被替换，如果对象之前并未拥有这个属性名，则该属性会被扩充到该对象中。
###3.4   引用###
对象通过引用来传递。它们永远不会被拷贝。
<pre><code>var x=chouchou;
x.nickname='huang';
var nick=chouchou.nickname;
//因为x和chouchou是指向同一个对象的引用，所以nick也为'huang'
var a={},b={},c={};
//a,b,c每个都引用不同的空对象。
a=b=c={};
//a,b,c都引用同一个空对象。
</code></pre>
###3.5    原型（prototype）###
每一个对象都连接到一个原型对象，并且它可以从中继承，所有通过对象字面量创建的对象都连接到Object.prototype这个JavaScript的标准对象。
当创建一个新对象时，可选择某个对象作为它的原型。这个给Object增加一个beget方法，beget方法创建一个使用原对象作为其原型的新对象。(不是很明白，留坑)
<pre><code>if(typeof Object.beget !== 'function') {
	Object.beget =function (o) {
			var F=function () {};
			F.prototype=o;
			return new F(); 
	}
}
var another_chouchou=Object.beget(chouchou);
</code></pre>

原型连接在更新是不起作用的，当我们对某个对象做出改变时，不会触及到该对象的原型。原型连接只有在检索值时才被用到，如果我们尝试去获取对象的某个属性值，且该对象没有此属性名，则JavaScript试着从原型对象中获取属性值。如果那个原型对象也没有该属性，则从它的原型中寻找，依次类推，直到终点Object.prototype。如果想要的属性完全不在原型链中则返回undefined。这个过程称为<strong>委托</strong>
		
原型关系是一种动态的关系。若我们添加一个新的属性到原型中，则该属性会立即对所有基于该原型创建的对象可见。
<pre><code>chouchou.profession="front-end develoer";
another_chouchou.profession;//"frond-end developer"
</code></pre>
###3.6    反射###
检查对象并确定有什么属性很容易，只要试着去检索该属性并验证所取得的值。可用typeof，但是原型链中的任何属性也会产生一个值，例如
<pre><code>typeof flight.toString //'function'
typeof flight.constructor //'function'
</code></pre>
有两个方法去除这些不必要的属性。
1.让你的程序检查并剔除函数值。一般来说，做反射的目标是数据。因此你应该意识到一些值可能会是函数。
2.hasOwnProperty方法，如果对象拥有独立属性返回true，hasOwnProperty不会检查原型链。
		
###3.7    枚举###
for in 语句可用来遍历一个对象中所有的属性名。该枚举过程将会列出所有的属性，包括函数和你可能不关心原型链中的属性。所以我们需要过滤，常用的过滤器是hasOwnProperty以及typeof来排除函数。属性名出现顺序不确定，要以确定的顺序应创建一个数组，在其中以正确的顺序包含属性名。
<pre><code>var i;
var properties=['fistr-name','middle-name','last-name''profession'];
for(i = 0; i < properties.length;i +=1 ){
  document.writeln(properties[i]+':'+another.chouchou[propertites[i]]);
}
</code></pre>
###3.8    删除###
delete运算符可以用来删除对象的属性。它不会触及原型链中的任何对象。删除对象的属性可能让来自原型链中的属性浮现出来。
<pre><code>another.chouchou.nickname //'me'
delete another.chouchou.nickname;
another.chouchou.nickname // 'huang'
</code></pre>
###3.9     减少全局变量污染###
JavaScript可以很随意的定义哪些可保存所有应用资源的全局变量。但全局变量减弱了程序的灵活性，应予以避免。最小化使用全局变量的方法是在你的应用中只创建一个全局变量。
<pre><code>var MYAPP={};</code></pre>
该变量此时编程了你的应用的容器。
<pre><code>MYAPP.chouchou={"first-name":"Chouchou","last-name":"Shouchouchou"};
MYAPP.flight={airline="mh",number=370,
    departure：{
      IATA:"KL"，
      time:"2014-03-08 00:25",
      city:"Kuala Lumpu"
    },
    arrival:{
      IATA:"CN"，
      time:"future",
      city:"Beijing"
    }
};
</code></pre>

只有把多个全局变量都整理在一个名称空间下，你讲显著降低与其他应用程序，组件或类库之间产生糟糕的相互影响的可能性。下一章将介绍闭包来有效减少全局污染。</p>
<hr>

今天学习了对象中的一些重要性质，如原型、反射、减少全局污染，留下这些坑明晚展开讨论。

感谢阅读，如果文中有不对的地方欢迎指出，另文中一些我不懂的或者留下的坑也欢迎大家赐教=。= 