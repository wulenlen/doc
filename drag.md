# 拖拽
HTML5的拖放API功能直接实现拖放操作，而且拖放的范围已经超出浏览器的边界，HTML5提供的文件api支持拖拽多个文件并上传。
- 为页面元素提供了拖放特性;
- 为光标增加了拖放事件;
- 提供了用于存储拖放数据的DataTransfer对象;

**draggable**特性用于定义元素是否允许用户拖放：提供了三个值true,false,auto

## 拖放事件
[被拖拽元素A] --> [目标元素B] 
- 开始拖拽时触发的事件，事件的作用对象是A-dragstart事件
- 拖放过程中触发的事件，事件的作用对象是A-drag事件
- 在A进入B的范围内时触发，事件的作用对象是B-dragenter元素
- 在A正在B的范围内移动时触发，事件的作用对象是B-dragover元素
- 在A离开B的范围时触发，事件的作用对象是B-dragleave元素
- 在A被拖放到B中时触发，事件的作用对象是B-drop元素
- 在拖放操作结束时触发，事件的作用对象是A-dragend事件

# 拖拽数据存放
在html5中提供了DataTransfer对象，用来支持拖拽数据的存储。实现拖放的过程中数据交换。
## DataTransfer对象属性
- dropEffect属性：用来设置或获取拖拽操作的类型和要显示的光标类型。如果该操作的效果与起初设置的effectAllowed效果不符，则拖拽操作失败。可以设置修改，包含值可为：none, copy, link, move
- effectAllowed属性：用来设置或获取数据传送操作可应用于操作对象的源元素，指定值：none, copy, copyLink, copyMove, link, linkMove, move, all 和 uninitialized
- type属性：获取在dragstart事件出发时为元素存储数据的格式，如果是外部文件的拖拽，则返回Files。
- files属性：获取存储在DataTransfer对象中的正在拖放的文件列表FileList，可以使用数组的方式去遍历。
## DataTransfer对象方法
- setData()方法：向内存中的DataTransfer对象添加指定格式的数据：`setData([sDataFormat],[data])`
- getData()方法：从内存的DataTransfer对象中获取数据: `getData([sDataFormat])`
- setDragImage()方法：设置拖放时跟随光标移动的图片: `setDragImage([imgElement],[x],[y])`
- addElement()方法：添加一起跟随拖放的元素，如果想让某个元素跟随被拖动元素一起被拖放，则使用此方法: `addElement([element])`
