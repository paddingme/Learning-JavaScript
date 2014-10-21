# JavaScirpt 的编程环境和模型

1. toFixed()方法可以把 Number 四舍五入为指定小数数位的数字。

    ```javascript
    NumberObject.toFixed(num)
    ```
    num 参数必需，范围为0-20,如果没有，默认为0。当 num 太小或太大时抛出异常 RangeError。0 ~ 20 之间的值不会引发该异常。有些实现支持更大范围或更小范围内的值。当调用该方法的对象不是 Number 时抛出 TypeError 异常。
2. 变量的作用域是指一个变量在程序中的哪些地方可以访问。JavaScript 中的变量作用域为函数作用域。这是指变量的值在定义该变量的函数内是可见的，并且定义在该函数内的嵌套函数也可以访问该变量。JavaScript 拥有的是函数作用域，即 JavaScript 没有块级作用域。
3. JavaScript 允许在定义变量时不使用关键字 var， 但这样做的后果是 定义的变量自动拥有了全局作用域，即使你是在一个函数内定义该变量，它也是全局变量。
4. 对象和面向对象编程

```javascript
    function Checking(amount) {
        this.balance = amount;
        this.deposit = deposit;
        this.withdraw = witdraw;
        this.toString = toString;
    }

    function deposit(amount) {
        this.balance += amount;
    }

    function withdraw(amount) {
        if (amount <= this.balance) {
            this.balance -= amount;
        }
        if (amount > this.balance) {
            print("Insufficient funds");
        }
    }

    function toString() {
        return "Balance: " + this.balance;
    }

    var account = new Checking(500);
    account.deposit(1000);
    print(account.toString()); //Balance:1500
    account.withdraw(750);
    print(account.toString());//Balance:750
    account.withdraw(800); //Insufficient funds
    print(account.toString());//Balance:750
```

> 第一章 JavaScript 的编程环境和模型 完