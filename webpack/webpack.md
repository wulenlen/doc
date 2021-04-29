# 浏览器端的模块化
## 存在的问题
- 模块化兼容性
- 加载文件过多，会产生效率问题
- 不能直接使用npm下载的包
- 开发时态和运行时态侧重点不一样

# webpack安装
- webpack,核心代码
- webpack-cli

# 配置文件
commonjs模块化，导出对象
## devtool 配置
### source map
浏览器发现有source map就请求，错误所在路径是根据source map


# 模块化兼容
无论是es module导入还是commonjs导入，webpack都会转化为对象
```js
export let a = 3
export default 3

// {
//     a: 3,
//     default: 3
// }
```

# 编译结果分析
防止变量污染，每个模块的代码放在对应的函数里，最后用立即执行函数。
放在eval里面方便调试，显示对应的错误所在的路径
```js

var modules = {
    '模块路径': function(module, exports, require)
}

(function (modules) {
    var moduleExports = {} //缓存模块导出结果
    // 运行一个模块，得到模块导出结果
    function require(moduleId) {
        if(moduleExports[moduleId]) {
            return moduleExports[moduleId]
        }
        var func = modules[moduleId]  // 得到该模块对应的函数
        var module = {
            exports: {}
        }

        func(module, module.exports, require) // 运行模块
        var result = module.exports       // 得到导出结果
        moduleExports[moduleId] = result
        return result
    }

    //执行入口模块
    require('./src/index.js')
})({
    '模块路径': function(module, exports, require)
})
```