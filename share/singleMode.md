# 单例模式
- 单例对象的类只能允许一个实例存在。这意味着第二次使用同一个类创建实例时，应该得到与第一次所创建的实例完全相同的实例。
- 在es5之前没有类，只有对象。当创建一个新对象时，实际上没有其他对象会与其相同，因此新对象已经是一个单例了。
- 实现单例模式，先判断实例是否存在，存在则返回，不存在则创建
## 使用new操作符实现
### 利用静态属性保存实例
```js
function Single() {
    if(typeof Single.instance === 'object') {
        return Single.instance
    }

    Single.instance = this
}
```

### 利用闭包
```js
var Single = (function() {
    var instance = null;

    function Single(name) {
        this.name = name;
    }
    
    return function(name){
        if (instance) {
            return instance;
        }
        
        instance = new Single(name); 
    };
})();
```
## 使用静态方法实现
```js
class Single {
    constructor(name) {
        this.name = name;
        this.instance = null;
    }
    static getInstance(name) {
        if(!this.instance) {
            this.instance = new Single(name);
        }
        return this.instance;
    }
}
var oA = Single.getInstance('hi');
```
上述方法有一个缺点，可以通过new操作符创建实例，下面我们用ts来规避这一缺点
```js
class Single {
  // 静态属性保存实例
  private static instance: Single;
  public name: string = '';

  // 私有构造函数，阻止被实例化
  private constructor(name: string) {
    this.name = name;
  }

  public getName() {
    return this.name;
  }

  // 获取单例的接口
  public static getInstance(name: string): Single {
    if (Single.instance === undefined) {
      Single.instance = new Single(name);
    }
    return Single.instance;
  }
}
```
### 封装一个创建单例模式的方法
```js
function getInstance<T>(Cls: new (...args: any[]) => T) {
  let instance: T;
  return function(...args: any[]) {
    if (instance === undefined) {
      instance = new Cls(...args);
    }
    return instance;
  };
}
```
## 优点
- 划分独立命名空间，避免全局变量污染
- 代码逻辑集中，业务高度内聚
- 只创建一个实例，减少对象频繁创建、销毁的消耗
## 缺点
- 对 OOP 特性的支持不友好（单例模式内部自己创建实例，外部无法通过new来实例化，无法继承扩展）
- 对代码的可测试性不友好（由于单例模式属硬编码的方式，会导致内部的接口、数据或依赖都无法很好模拟）



# 外观模式
外观模式是一种简单的模式，封装接口，提供对外调用的接口。使用者只需要和外观对象打交道，不需要关心更深的代码逻辑。
## 例子
封装一个本地存储类
```js
class localDb {
    private storage: Storage;
    private keys = new Set<string>();

    constructor(storageType: 'sessionStorage' | 'localStorage' = 'localStorage') {
        this.storage = window[storageType]
    }

    /**
     * 按key存贮数据value到localStorage
     * @param {String} key   存贮数据的唯一标识
     * @param {String, Object} value 所要存贮的数据
     */
    set(key: string, value: any) {
        value = typeof value === 'object' ? JSON.stringify(value) : value

        if(!this.has(key)) {
            this.keys.add(key)
        }

        this.storage.setItem(key, value)
    }

    /**
     * 通过key从localStorage获取数据
     * @param  {String} key  获取数据的可以标识
     * @return {String, Object}  返回空，字符串或者对象
     */
    get(key: string): string {
        let str = this.storage.getItem(key)

        try {
            return JSON.parse(str)
        }catch(e) {
            return str
        }
    }
    
    /**
     * 删除某一项
     * @param key 键名
     */
    delete(key: string) {
        if(this.has(key)) {
            this.keys.delete(key)
            this.storage.removeItem(key)
        }
    }

    /**
     * 清空localStorage
     */
    clear() {
        this.keys.forEach(item => {
            this.storage.removeItem(item)
        })
        this.keys.clear()
    }

    /**
     * key是否存在
     * @param key 键名
     */
    has(key: string) {
        return this.keys.has(key)
    }
}
```
## 优点
- 外观模式通过封装接口，对外提供统一的接口，从而降低代码耦合度，提高了灵活性；
## 缺点
- 外观类的接口修改对于程序的影响较大

# 代理模式
一个对象充当另一个对象的接口，对该对象的访问进行保护。es6中的proxy就是一种代理模式。

## 虚拟代理
把一些开销很大的对象，延迟到真正需要它的时候才去创建。
### 用虚拟代理实现图片预加载
在图片被真正加载好之前，页面中显示 loading 图占位
```js
var myImage = (function () {
  var imgNode = document.createElement('img')
  document.body.appendChild(imgNode)

  return {
    setImgSrc: function (src) {
      imgNode.src = src
    },
  }
})()

var proxyImg = (function () {
  var image = new Image()
  image.onload = function () {
    myImage.setImgSrc(this.src)
  }

  return {
    setImgSrc: function (src) {
      myImage.setImgSrc('https://xxxx.com/loading.jpg')
      image.src = src
    },
  }
})()

proxyImg.setImgSrc('https://xxxx.com/xxx.jpg')
```
上面的代码通过 proxyImg 间接地访问 myImage。proxyImg 控制了用户对 myImage 的访问，并在次此过程中添加了一些额外的操作。

## 缓存代理
为一些开销大的运算结果提供暂时的存储，在下次运算时，如果传递进来的参数跟之前一致，则可以直接返回前面存储的运算结果。

### 使用缓存代理实现计算
```js
function mult(...args) {
  console.log('新一次的计算')

  return args.reduce((prev, ele) => {
    return prev *= ele
  }, 1)
}

var proxyMult = (function () {
  var cache = {}
  return function (...args) {

    if (cache.hasOwnProperty(args)) {
      return cache[args]
    }
    return (cache[args] = mult.apply(this, args))
  }
})()

proxyMult(2, 3, 4) // 新一次的计算
proxyMult(2, 3, 4)
```

## 优点
- 可拦截和监听外部对本体对象的访问
- 复杂运算前可以进行校验或资源管理
- 依托代理，可额外添加扩展功能，而不修改本体对象，符合 “开发-封闭原则”

## 缺点
- 额外代理对象的创建，增加部分内存开销