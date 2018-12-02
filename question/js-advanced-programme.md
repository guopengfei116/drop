# js模拟实现代码片段

## 实现一个简易的Vue

代码结构

```js
class Vue {
    // 数据初始化
    constructor(){}
    
    // 数据代理
    proxyData(){}

    // 劫持监听所有数据
    obsrver(){}

    // 解析dom
    compile(){}

    // 解析dom中的插值表达式
    compileText(){}
}

class Watcher {
    constructor(){}

    // 更新视图
    update(){}
}
```

构造器

```js
class Vue {
    constructor(options = {}) {
        this.$el = document.querySelector(options.el);
        let data = this.data = options.data;

        // 将数据代理到实例身上
        Object.keys(data).forEach(k => this.proxyData(k));

        this.methods = options.methods;
        this.watcherTask = {};
        this.observer(data);
        this.compile(this.$el);
    }
}
```

数据代理

```js
class Vue {
    proxyData(key) {
        let that = this;
        Object.defineProperty(that, key, {
            configurable: false;
            enumerable: true,
            get() {
                return that.data[key];
            },
            set(newVal) {
                that.data[key] = newVal;
            }
        })
    }
}
```

数据劫持

```js
class Vue {
    observer(data) {
        let that = this;
        Object.keys(data).forEach(k => {
            let value = data[k];
            Obect.defineProperty(data, k, {
                configurable: false;
                enumerable: true,
                get() {
                    return value;
                }
                set(newValue) {
                    if(newValue !== value) {
                        value = newValue;
                        
                        // 数据变化时更新视图
                        that.watcherTask[k].forEach(task => task.update()); 
                    }
                }
            })
        })
    }
}
```

编译解析dom

```js
class Vue {
    compile(el) {
        
    }
}
```
