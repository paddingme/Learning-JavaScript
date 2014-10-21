# typeof 和 instanceOf的区别

##关于typeof##
`typeof`一元运算符，用来返回操作数类型的**字符串**。

`typeof`几乎不可能得到它们想要的结果。`typeof`只有一个实际应用场景，就是**用来检测一个对象是否已经定义或者是否已经赋值**。而这个应用却不是来检查对象的类型。

Value            |   Class   |   Type
---|------|---
"foo"             |  String   |  string
new String("foo") |  String   |  object
1.2                | Number   |  number
new Number(1.2)   |  Number   |  object
true               | Boolean  |  boolean
new Boolean(true)  | Boolean  |  object
new Date()        |  Date    |   object
new Error()        | Error   |   object
[1,2,3]            | Array   |   object
new Array(1, 2, 3) | Array   |   object
new Function("")   | Function |  function
/abc/g             | RegExp   |  object (function in Nitro/V8)
new RegExp("meow") | RegExp   |  object (function in Nitro/V8)
{}                 | Object  |   object
new Object()       | Object  |   object


上面表格中，Type 一列表示 typeof 操作符的运算结果。可以看到，这个值在大多数情况下都返回 "object"。

Class 一列表示对象的内部属性 [[Class]] 的值。

JavaScript 标准文档中定义: [[Class]] 的值只可能是下面字符串中的一个： Arguments, Array, Boolean, Date, Error, Function, JSON, Math, Number, Object, RegExp, String.
为了获取对象的 [[Class]]，我们需要使用定义在 Object.prototype 上的方法 toString。

对象的类定义

JavaScript 标准文档只给出了一种获取 [[Class]] 值的方法，那就是使用 Object.prototype.toString。

```
function is(type, obj) {
    var clas = Object.prototype.toString.call(obj).slice(8, -1);
    return obj !== undefined && obj !== null && clas === type;
}

is('String', 'test'); // true
is('String', new String('test')); // true

```
上面例子中，Object.prototype.toString 方法被调用，this 被设置为了需要获取 [[Class]] 值的对象。

译者注：Object.prototype.toString 返回一种标准格式字符串，所以上例可以通过 slice 截取指定位置的字符串，如下所示：

```
Object.prototype.toString.call([])    // "[object Array]"
Object.prototype.toString.call({})    // "[object Object]"
Object.prototype.toString.call(2)    // "[object Number]"
```
译者注：这种变化可以从 IE8 和 Firefox 4 中看出区别，如下所示：

```
// IE8
Object.prototype.toString.call(null)    // "[object Object]"
Object.prototype.toString.call(undefined)    // "[object Object]"

// Firefox 4
Object.prototype.toString.call(null)    // "[object Null]"
Object.prototype.toString.call(undefined)    // "[object Undefined]"
```
测试为定义变量

```
typeof foo !== 'undefined'

```
上面代码会检测 foo 是否已经定义；如果没有定义而直接使用会导致 ReferenceError 的异常。 这是 typeof 唯一有用的地方。

结论

为了检测一个对象的类型，强烈推荐使用 Object.prototype.toString 方法； 因为这是唯一一个可依赖的方式。正如上面表格所示，typeof 的一些返回值在标准文档中并未定义， 因此不同的引擎实现可能不同。

除非为了检测一个变量是否已经定义，我们应尽量避免使用 typeof 操作符。

x|typeof x
---|---
undefined|"undefined"
true 或false|"boolean"
任意数字或者NaN|"number"
任意字符串|"string"
函数对象(在ECMA-262术语中,指的是实现了[[Call]] 的对象)|"function"
任意内置对象（非函数）|"object"  
数组|"obeject"
null|"object" 
宿主对象(JS引擎内置对象,而不是DOM或者其他提供的)|由编译器各自实现的字符串，但不是"undefined","number","boolean","number","string"。 
正则表达式|各浏览器表现不一

如果想将null和对象区分开，则必须针对特殊值显式检测。如：`my_value===null`。对于宿主对象来说，typeof有可能并不返回‘object’,而返回字符串。但实际上客户端js中的大多数宿主对象都是‘object’类型。对于所有内置可执行对象进行typeof运算都将返回“function”。

```
// Numbers
typeof 37 === 'number';
typeof 3.14 === 'number';
typeof Math.LN2 === 'number';
typeof Infinity === 'number';
typeof NaN === 'number'; // 尽管NaN是"Not-A-Number"的缩写,意思是"不是一个数字"
typeof Number(1) === 'number'; // 不要这样使用!

// Strings
typeof "" === 'string';
typeof "bla" === 'string';
typeof (typeof 1) === 'string'; // typeof返回的肯定是一个字符串
typeof String("abc") === 'string'; // 不要这样使用!

// Booleans
typeof true === 'boolean';
typeof false === 'boolean';
typeof Boolean(true) === 'boolean'; // 不要这样使用!

// Undefined
typeof undefined === 'undefined';
typeof blabla === 'undefined'; // 一个未定义的变量,或者一个定义了却未赋初值的变量

// Objects
typeof {a:1} === 'object';
typeof [1, 2, 4] === 'object'; 
// 使用Array.isArray或者Object.prototype.toString.call方法
//可以分辨出一个数组和真实的对象
typeof new Date() === 'object';

typeof new Boolean(true) === 'object' // 令人困惑.不要这样使用
typeof new Number(1) === 'object' // 令人困惑.不要这样使用
typeof new String("abc") === 'object';  // 令人困惑.不要这样使用
// Functions
typeof function(){} === 'function';
typeof Math.sin === 'function';

```






<br>
<br>
<br>





##关于instanceof##

instanceof 左操作数是一个类，右操作数是标识对象的类。如果左侧的对象是右侧类的实例，则返回true.而js中对象的类是通过初始化它们的构造函数来定义的。即instanceof的右操作数应当是一个函数。所有的对象都是object的实例。如果左操作数不是对象，则返回false,如果右操作数不是函数，则抛出typeError。 


instanceof 运算符是用来测试一个对象是否在其原型链原型构造函数的属性。其语法是`object instanceof constructor`

instanceof 操作符用来比较两个操作数的构造函数。只有在比较自定义的对象时才有意义。 如果用来比较内置类型，将会和 typeof 操作符 一样用处不大。

比较自定义对象

```
function Foo() {}
function Bar() {}
Bar.prototype = new Foo();

new Bar() instanceof Bar; // true
new Bar() instanceof Foo; // true

// 如果仅仅设置 Bar.prototype 为函数 Foo 本身，而不是 Foo 构造函数的一个实例
Bar.prototype = Foo;
new Bar() instanceof Foo; // false

```
instanceof 比较内置类型

```
new String('foo') instanceof String; // true
new String('foo') instanceof Object; // true

'foo' instanceof String; // false
'foo' instanceof Object; // false

```

有一点需要注意，instanceof 用来比较属于不同 JavaScript 上下文的对象（比如，浏览器中不同的文档结构）时将会出错， 因为它们的构造函数不会是同一个对象。

结论:instanceof 操作符应该仅仅用来比较来自同一个 JavaScript 上下文的自定义对象。 正如 typeof 操作符一样，任何其它的用法都应该是避免的。


```
function C(){} // defining a constructor
function D(){} // defining another constructor

var o = new C();
o instanceof C; // true, because: Object.getPrototypeOf(o) === C.prototype
o instanceof D; // false, because D.prototype is nowhere in o's prototype chain
o instanceof Object; // true, because:
C.prototype instanceof Object // true

C.prototype = {};
var o2 = new C();
o2 instanceof C; // true
o instanceof C; // false, because C.prototype is nowhere in o's prototype chain anymore

D.prototype = new C(); // use inheritance
var o3 = new D();
o3 instanceof D; // true
o3 instanceof C; // true

```

```
var myString = new String();
var myDate = new Date();

myString instanceof String; // returns true
myString instanceof Object; // returns true
myString instanceof Date;   // returns false

myDate instanceof Date;     // returns true
myDate instanceof Object;   // returns true
myDate instanceof String;   // returns false
```

```
function Car(make, model, year) {
  this.make = make;
  this.model = model;
  this.year = year;
}
var mycar = new Car("Honda", "Accord", 1998);
var a = mycar instanceof Car;    // returns true
var b = mycar instanceof Object; // returns true
```

----

































引用资料：

1. [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/instanceof](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/instanceof)
2. [http://bonsaiden.github.io/JavaScript-Garden/zh/#types.instanceof](http://bonsaiden.github.io/JavaScript-Garden/zh/#types.instanceof)
3. [https://developer.mozilla.org/zh-CN/docs/JavaScript/Reference/Operators/typeof](https://developer.mozilla.org/zh-CN/docs/JavaScript/Reference/Operators/typeof)