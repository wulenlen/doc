# ie在中文输入法下，解决输入英文触发回车事件。长按enter无效
## compositionstart和compositionend
中文输入法下，会触发compositionstart
```
<input @compositionstart="onIptStart"  @compositionend="onIptEnd" />

onIptStart(e) {
    this.enterFlag = false
}

onIptEnd(e) {
    setTimeout(() => {
        this.enterFlag = true
    }, 100)
}

通过enterFlag标记中文输入是否结束，enter事件会在compositionend事件之后触发，因此需要一个延迟
```
# elementui 点击确定再进行表单校验
```
<el-input :validate-event="false"></el-input>
去掉rule里面的trigger
```
