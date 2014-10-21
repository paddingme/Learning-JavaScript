## JavaScript 中对数组的定义

数组的标准定义是：
>一个存储元素的线性集合（collection）,元素可以通过索引来任意存取，索引通常是数字，用来计算元素之间存储位置的偏移量。

JavaScript 中的数组是一种特殊的对象，用来表示偏移量的索引是该对象的属性，索引可能是整数。然而，这些数字索引在内部被转换为字符串类型，这是因为JavaScript 对象中的属性名必须是字符串。

JavaScript 中的数组，严格来说应该称作对象，是特殊的 JavaScript 对象，在内部被归类为数组。由于 Array 在 JavaScript 中被当作对象， 因此它有许多属性和方法可以在编程使用。

## 使用数组

### 创建数组

    var numbers = [];//[]操作符声明了一个空的数组，长度为0。

    var numbers = new Array();//与上等价

    var numbers = [1,2,3,4,5];

    var numbers = new Array(1,2,3,4,5);//构造函数传入初始值

    var numbers = new Array(5); //只传入一个参数，用来指定数组的长度

    var objects = [1,"Joe",true, null];//在 JavaScript 里数组中的元素不必是同一种数据类型。

推荐使用`[]`操作符创建数组，这种方式效率更高。

### 由字符串生成数组
`split()` 方法用于把一个字符串分割成字符串数组。

    str.split([separator][, limit])

<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split>

### 对数组的整体性操作

当把一个数组赋给另外一个数组时，只是为被赋值的数组增加了一个新的引用。当你通过原引用修改了数组的值，另外一个引用也会感知这个变化（浅复制）。而深复制是指将原数组中的每一个元素都复制一份到新数组中。

## 存取函数

### indexOf()
`indexOf()` 用来查找进来的参数在目标数组中是否存在。如果目标数组包含该参数，就返回该元素在数组中的索引；如果不包含，就返回-1。如果数组中包含多个相同的元素，`indexOf()` 函数总是返回第一个与参数相同的元素的索引。类似，`lastIndexOf()`，该函数返回相同元素中最后一个元素的索引，如果没找到相同元素，则返回-1。

### 数组的字符串表示
`join()` 和 `toString()` 方法都返回一个包含数组所有元素的字符串，各元素之间用逗号分开。当直接对一个数组使用 `print()` 函数时，系统会自动调用数那个数组的`tostring()`方法。

### 由已有数组创建新数组

- `concat()` 方法可以合并多个数组创建一个新数，`concat()` 方法发起者是一个数组，参数是另一个数组。作为参数的数组，其中的所有元素都被连接到调用 concat() 方法的数组后面；
- `splice()` 方法截取一个数组的子集创建一个新数组；`splice()` 方法从现有数组里截取一个新数组，该方法的第一个参数是截取的起始索引，第二个参数是截取的长度。

```javascript
    var myFish = ['angel', 'clown', 'mandarin', 'surgeon'];
    // removes 0 elements from index 2, and inserts 'drum'
    var removed = myFish.splice(2, 0, 'drum');
    // myFish is ['angel', 'clown', 'drum', 'mandarin', 'surgeon']
    // removed is [], no elements removed

    // removes 1 element from index 3
    removed = myFish.splice(3, 1);
    // myFish is ['angel', 'clown', 'drum', 'surgeon']
    // removed is ['mandarin']

    // removes 1 element from index 2, and inserts 'trumpet'
    removed = myFish.splice(2, 1, 'trumpet');
    // myFish is ['angel', 'clown', 'trumpet', 'surgeon']
    // removed is ['drum']

    // removes 2 elements from index 0, and inserts 'parrot', 'anemone' and 'blue'
    removed = myFish.splice(0, 2, 'parrot', 'anemone', 'blue');
    // myFish is ['parrot', 'anemone', 'blue', 'trumpet', 'surgeon']
    // removed is ['angel', 'clown']

    // removes 2 elements from index 3
    removed = myFish.splice(3, Number.MAX_VALUE);
    // myFish is ['parrot', 'anemone', 'blue']
    // removed is ['trumpet', 'surgeon']
```

## 可变数组

### 为数组添加元素

- `push()`方法会将一个元素添加到数组末尾，也可以使用数组的length属性为数组添加元素，但`push()`方法看起来更直观。
- `unshift()` 方法可以将元素添加在数组的开头，也可以通过一次调用，为数组添加多个元素。

### 从数组中删除元素

- `pop()` 方法可以删除数组末尾的元素。
- `shift()` 方法可以删除数组的第一个元素。

`pop()`和`shift()`都将返回删除的元素。

### 从数组中间位置添加和删除元素
`splice()`方法可以为数组添加元素，需提供如下参数：
- 起始索引（亦即你希望添加元素的地方）；
- 需要删除的元素个数（添加元素时该参数设为0）；
- 想要添加数组的元素。

### 为数组排序

- `reverse()`方法将数组中元素的数学怒进行翻转；
- `sort()` 会对数组按照字典顺序进行排序。

使用`sort()`对数字排序，需要传入一个大小比较函数：

```javascript
    function compare(num1,num2) {
        return num1 - num2;
    }
    var nums = [3,1,2,100,4,200];
    nums.sort(compare);
    print(nums);
```


## 迭代器方法
### 不生成新数组的迭代器方法

- `forEach()` 该方法接受一个函数使用参数，对数组中的每个元素使用该函数。
- `every()` 该方法接受一个返回值为布尔类型的函数，对数组中得每个元素使用该函数，如果对于所有的元素，该函数都返回 true, 则该方法返回 true。
- `some()` 该方法也接受一个返回值为布尔类型的函数，只要有一个元素使得该函数返回true，该方法就返回 true。
- `reduce()` 该方法接受一个函数，返回一个值。该方法会从一个累加值开始，不断对累加值和数组中的后续元素调用该函数，直到数组中的最后一个元素，最后返回得到的累加值；也可以用来将数组中的元素连接成一个长的字符串。

```javascript
    function concat(accumulatedString,item) {
        return accumulatedString+item;
    }

    var words = ["the ", "quick ", "brown ", "fox "];
    var sentence = words.reduce(concat);
    print(sentence);
```

`reduceRight()` 和 `reduce()` 一样，不过它是从右到左执行。

### 生成新数组的迭代器方法

- `map()` 和`forEach()`相似，对数组中的每个元素使用某个函数，区别在于返回一个新的数组，该数组的元素是对原有元素应用某个函数得到的结果。
- `filter()` 和 `every()` 类似，传入一个返回值为布尔类型的函数，不同的是当对数组中红所有元素应用该函数时，结果均为 true 时， 该方法不返回 true，二十返回一个新数组，该数组包含应用该函数后结果为true 的元素。

```javascript
    function passing(num) {
        return num >= 60;
    }

    var grades = [];
    for (var i = 0; i < 20; ++i) {
        grades[i] = Math.floor(Math.random() * 101);
    }
    var passGrades = grades.filter(passing);
    print("All grades: ");
    print(grades);
    print("Passing grades: ");
    print(passGrades);
```

```javascript
    function afterc(str) {
        if(str.indexOf("cie") > -1) {
            return true;
        }
        return false;
    }

    var words = ["recieve","device","percieve","deceit","concieve"];
    var misspelled = words.filter(afterc);
    print(misspelled);
```


## 二维数组和多维数组

### 创建二维数组

```javascript
    Array.matrix = function(numrows,numcols,initial) {
        var arr = [];
        for (var i = 0; i < numrows; ++i) {
            var columns = []; 
            for (var j = 0; j < numcols; ++j) {
                columns[j] = initial;
            }
        arr[i] = columns;
        }
        return arr;
    }
```



>第二章 数组 完