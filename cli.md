# 基本流程

1. 初始化package.json
2. 添加bin属性`bin:{mycli: ./index.js}`，可以让设置的 mycli 成为一个可执行命令,执行index.js文件
3. 编写index.js,在第一行加入`#!/usr/bin/env node`,表明是node可执行文件
4. 全局安装`npm install -g`

# cli命令
- commander.js：完整的 node.js 命令行解决方案。我们可以利用它，快速的编写我们的命令行，自定义化操作。
- Inquirer.js：是常规交互式命令行用户接口的集合，提供给 Node.js 一个方便嵌入，漂亮的命令行接口。我们可以用来快速进行交互式命令行的编写。


## commander
声明program变量，使用方法
- option 定义命令选项， `option('短选项, 长选项 <参数>', '简介', '默认参数值')`
- opts 获取已定义的选项

### 设置子命令
`command('子命令 <参数>')`

## Inquirer交互式命令
```js
{
    type: 'list', //prompt类型，可选类型：input, number, confirm, list, rawlist, expand, checkbox, password, editor
    name: 'template',
    message: '请选择你想要生成的模板？',
    choices: templates,   //选择项
    default: templates[0] //默认选中项
}
```
