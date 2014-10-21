
# JavaScirpt 高级程序设计学习笔记(3)

### object

ECMAScript 中的对象其实就是一组数据和功能的集合。对象可以通过`new`操作符后跟要创建的对象类型的名称来创建。而创建Obeject类型的实例并为其添加属性和（或）方法，就可以创建自定义对象。

和Java中的java.lang.object对象一样，Object 类型是所有它的实例的基础。亦即 Object类型所具有的任何属性和方法也同样存在于更具体的对象中。

Object的每个实例都具有下列属性：

- constructor: 保存这用于创建当前对象的函数；
- hasOwnProperty(propertyName)： 用于检查给定的属性在当前对象实例中（而不是在实例的原型中）是否存在，propertyName必须以字符串形式指定充当参数；
- isPrototypeOf(object): 用于检查传入的对象是否是传入对象的原型
- propertyIsEnumerable(propertyName):用于检查给定的属性是否能够使用for-in语句来枚举；
- toLocaleString(): 返回对象的字符串表示，该字符串与执行环境的地区对应；
- toString(): 返回对象的字符串表示；
- valueOf(): 返回对象的字符串、数值或布尔值表示，通常与toString() 返回相同。

### 位操作符

ECMAScirpt 中的所有数值都以IEEE-754 64位格式存储，但位操作符并不直接操作64的值。而是先将64位的值转换成32位的证书，然后执行操作，最后将结果转换回64位。对于开发人员来说，由于64位存储格式是透明的，因此整个过程就像是只存在32位的整数一样。

对于有符号的整数来说，32位中的前31位用于表示数值。第32位表示数值符号。负数同样以二进制码存储，但使用二进制补码。

位操作符有如下几种

- 按位非： `~`
- 按位与： `&`
- 按位或： `|`
- 按位异或： `^`
- 左移：`<<`
- 右移：`>>`
- 无符号左移：`<<<`
- 无符号右移：`>>>`


### 布尔操作符

#### 逻辑与
在有一个操作数不是布尔值的情况下，逻辑与操作就不一定返回布尔值，此时，它遵循下列规则：

- 若第一个操作数是对象，则返回第二个操作数；
- 若第二个操作数是对象，则只有在第一个操作数的求值结果为true 时才返回该对象；
- 若两个操作数都是对象，则返回第二个操作数；
- 若有一个操作数是null, 则返回null；
- 若有一个操作数是NaN, 则返回NaN；
- 若有一个操作数是undefined, 则返回undefined；

不能在逻辑与操作中使用未定义的值。

    var found = true；
    var result = (found && someUndefinedVariable)；//这里会发生错误
    alert (result)； //这一行不会执行

    var found = false；
    var result = (found && someUndefinedVariable)//不会发生错误
    alert (result)； // 执行("false")


#### 逻辑或
操作规则如下：

- 如果第一个操作是对象，则返回第一个操作数；
- 如果第一个操作数的求值结果为false, 则返回第二个操作数；
- 如果两个操作数都是对象，则返回第二个操作对象；
- 如果两个操作数都是null,则返回null；
- 如果两个操作数都是NaN,则返回NaN；
- 如果两个操作数都是undefined,则返回undefined；

我们可以使用逻辑或的短路行为来避免为变量赋null 或者 undefined 值，例如

    var myObject =  preferredObject || backupObject；

在这个例子中，myObject 将被赋予等号后面两个值中的一个。变量 preferredObject 中包含有限赋给变量myObject的值， 变量 backupObject 负责在preferredObject 中不包含有效值情况下提供后备值。

### 乘性操作符

#### 乘法
在处理特殊值的情况下，乘法操作符遵循下列特殊的规则：

- 若操作数是数值，执行常规的乘法计算，即如果两正数或两负数相乘结果是正数，而如果只有一个操作数有符号，那结果是负数，超过表示范围返回 Infinity或-Infinity；
- 若一操作数是 NaN, 结果为 NaN；
- 若Infinity与0相乘，结果为NaN；
- 若Infinity与非0相乘，则结果为Infinity或-Infinity；
- 若Infinity与Infinity相乘，则结果为Infinity；
- 若一操作数不是数值，则在后台调用Number() 转换，再根据上述规则计算。

#### 除法
除法的特殊计算规则如下：

- 若操作数是数值，执行常规的除法计算，即如果两正数或两负数相乘结果是正数，而如果只有一个操作数有符号，那结果是负数，超过表示范围返回 Infinity或-Infinity；
- 若一操作数是NaN,则结果是NaN；
- 若Infinity 被 Infinity 除，结果是NaN；
- 若0被0除，返回NaN；
- 若非0的有限数被0除，结果是 Infinity 或 -Infinity；
- 若 Infinity 被任何非0 除， 则结果是 Infinity 或 -Infinity。
- 若一操作数不是数值，则在后台调用Number() 转换，再根据上述规则计算。

### 加性操作符

#### 加法
如果两个操作符都是数值，则执行常规的加法计算，然后根据下列规则返回结果：

- 如果有一个操作数是 NaN，则结果是 NaN；
- 如果是 Infinity 加 Infinity，则结果是 Infinity；
- 如果是 -Infinity 加 -Infinity，则结果是 -Infinity；
- 如果是 Infinity 加 -Infinity，则结果是 NaN；
- 如果是 +0 加 +0 ，则结果是 +0；
- 如果是 -0 加 -0 ，则结果是 -0；
- 如果是 +0 加 -0 ，则结果是 +0；
如果有一个操作数是字符，则按照如下规则进行运算：
- 如果两个操作数都是字符串，则将第二个操作数与第一个操作数拼接起来；
- 如果只有一个操作数是字符串，则将另一个操作数转换为字符串，然后再将两个字符串拼接起来。
如果有一个操作数是对象、数值或者布尔值，则调用他们的 toString() 方法取得它们 相应的字符串，然后再根据前面的规则进行相加。对于 undefined 和 null 则分别调用 String() 并取得字符串 "undefined" 和 "null"。

#### 减法
加法的运算规则如下：

- 若两个数都是数值，则执行常规的算术减法并返回结果数值；
- 若有一个操作数是 NaN ，则返回 NaN ；
- 若 Infinity - Infinity ，则返回 NaN ；
- 若 Infinity - -Infinity ，则返回 NaN ；
- 若 -Infinity - Infinity ，则返回 -Infinity ；
- 若 +0 - +0 则返回 +0 ；
- 若 +0 - -0 则返回 -0 ；
- 若 -0 - -0 则返回 +0 ；
- 若一个操作数是字符串、布尔值、Null、Undifined，则先在后台调用 Nmuber() 将其转换为数值，再执行减法运算;
- 若有一个操作数是对象，则调用 valueOf() 将其转换为对象的数值，若没有 valueOf()，则调用 toString() 再继续减法运算。

### 关系操作符
关系操作符运算规则如下：

- 若两操作数都是数值，则执行数值比较；
- 若两个操作数都是字符串，则比较两个字符串相应的字符编码值；
- 若一个操作数是数值，则将两一个操作数转换为数值；
- 若一个操作数是对象，则调用这个对象的 valueOf() 方法，用得到的结果按照前面的规则进行比较，如果没有 valueOf() 方法，则调用 toString() 方法进行比较；
- 若一个操作数是布尔值，则将其转换为数值，再进行比较。

注意在进行字符串比较时，实际比较的是两个字符串中对应位置的每个字符的字符编码值。经过一番比较之后，再返回一个布尔值。记住大写字母的编码值全部小于小写字母的字符编码。

    var result = "Brick" < "alphabet"; //true
    var result = "Brick".toLowerCase() < "alphabet".toLowerCase(); //false
    var result = "23" < "3"; //true
    var result = "23" < 3://false
    var reslut = "a" < 3; //false "a"被转换为 NaN
    var result = NaN < 3; //false
    var result = NaN >= 3; //false

### 相等操作符
#### 相等操作符
这两个操作符都会先转换操作数（通常称为强制转型），然后再比较它们的相等性。

在转换不同的数据类型时，相等和不相等操作符遵循下列基本规则：

- 如果有一个操作数是布尔值，则在比较相等性先将其转换为数值——false 为0, true 为1；
- 如果一个操作数是字符串，另一个操作数是数值，在比较相等性先将字符串转换为数值；
- 若一个操作数是对象，另一个不是，则调用 valueOf() 用得到的基本类型值按照前面的规则进行比较。这两个操作符在进行比较时要遵循下列
规则：
  * null 和 underfined 是相等的；
  * 要比较相等性之前，不能将 null 和 undefined 转换成其他任何值；
  * 若一操作数是 NaN ，相等操作符返回 false ,即使两个操作符都是 NaN ，相等操作符也是返回 false 的；
  * 若两个操作数都是对象， 则比较它们是不是同一对象，若两操作数都指向同一对象，则相等操作符返回 true。

 |表达式|值|
 |-----------------|---------------|
 |null == undefined|           true|
 |"NaN" == NaN     |           false|
 |NaN == NaN|          flase|
 |5 == NaN         |           false|
 |false == 0|           true|
 |true == 1|           true|
 |true == 2|           false|
 |undefined == 0 |           false|
 |null == 0 |           false|
 |"5" == 5 |           true|

至于全等和不全等，相对于相等和不相等的区别就是未经类型转换判断相等与否

    null == undefined //true
    null === undefined //false

由于相等和不相等操作符存在类型转换问题，而为了保持代码中数据类型的完整性，推荐使用全等和不全等操作符。


### 逗号操作符
使用逗号操作符可以在一条语句中执行多个操作，初次之外也可以用于赋值。逗号操作符总会返回表达式中的最后一项。

### for-in 语句
for-in　语句是一种精确的迭代语句，可以用来枚举对象的属性。

    for (property in expression) statement

ECMAScript 对象的属性没有顺序。因此，通过 for-in 循环输出的属性名的顺序是不可预测的。具体来讲，所有属性都会被返回一次，但返回的先后次序可能会因浏览器而异。若表示要迭代的对象的变量值为 null 或者 undefined ，for-in 语句会抛出错误。ECMAScript5 更正此行为，对于此种情况不抛出错误而是不再执行循环体。所以建议使用 for-in 循环前，先检测确认对象是不是 null  或者 undefined。

### break 和 continue
break 和 continue 语句运行在循环中用于精确的控制代码的执行。 其中， break 语句会立即退出循环，强制继续执行循环后面的语句。而 continue 语句虽然也是立即退出循环，但退出循环后从循环的顶部继续执行。

### switch 语句
switch 语句在比较值时，使用全等操作符，不会产生类型转换。

### 函数
函数会在执行 return 语句之后停止并立即退出。return 语句也不可以不带有任何返回值，在这种情况下，函数在停止执行后将返回 underfined 值。这种用法一般用在需要提前停止函数执行而又不需要返回值的情况下。

### 理解参数
ECMAScript 不介意传进函数的参数是多少个，也不在乎传进来的参数是什么数据类型。
ECMAScript 中的参数在内部时用一个数组来表示的额。函数接收的始终是这个数组，而不关心数组中包含哪些参数（如果有参数的额话）。实际上，函数体内通过arguments 对象来访问这个参数数组，从而获取传递给函数的每一个参数。通过访问 arguments 对象的 length 属性可以获知有多少个参数传递给了函数。没有传递至的命令参数将自动被赋予 undefined 值。 ECMAScript 中的所有参数传递的都是值，不可能通过引用传递参数。

### 没有重载
如果在 ECMAScript 中定义了两个名字相同的函数，则该名字只属于后定义的函数。


## 小结

- ECMASript 中基本数据类型包括 Underfined Null Number String Boolean
- 无需指定函数的返回值，因为任何 ECMAScript 函数都尅在任何时候返回任何值
- 未指定返回值的函数返回的是一个特殊的 undefined 值
- ECMAScript 中没有函数签名的概念，因为其函数参数是以一个包含零或多个值的数组的形式传递的，
- 可以想ECMAScript 函数传递任意数量的参数，并且可以通过 arguments 对象来访问这些参数
- 由于不存在函数签名的特性，ECMAScript 函数不能重载。











