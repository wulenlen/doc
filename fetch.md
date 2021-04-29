# 与XMLHttpRequest的差异
- 使用promise
- 采用模块化设计，api分散在多个对象（Response 对象、Request 对象、Headers 对象）
- 通过数据流（Stream 对象）处理数据，可以分块读取，有利于提高网站性能表现

# fetch api
```js
fetch('https://api.github.com/users/ruanyf')
  .then(response => response.json())
  .then(json => console.log(json))
  .catch(err => console.log('Request Failed', err)); 
```
## fetch方法第二个参数，配置项
```js
{
  method: "GET",
  headers: {
    "Content-Type": "text/plain;charset=UTF-8"
  },
  body: undefined,  // 请求参数
  referrer: "about:client",  // 设置请求的referer标头
  referrerPolicy: "no-referrer-when-downgrade",
  mode: "cors", 
  credentials: "same-origin",
  cache: "default",
  redirect: "follow",
  integrity: "",     // 属性指定一个哈希值，用于检查 HTTP 回应传回的数据是否等于这个预先设定的哈希值。是否被篡改
  keepalive: false,  // 属性用于页面卸载时，告诉浏览器在后台保持连接，继续发送数据。boolean
  signal: undefined  // 指定一个 AbortSignal 实例, 用于取消请求
}
```
- cache 属性指定如何处理缓存。可能的取值如下：
   - default：默认值，先在缓存里面寻找匹配的请求。
   - no-store：直接请求远程服务器，并且不更新缓存。
   - reload：直接请求远程服务器，并且更新缓存。
   - no-cache：将服务器资源跟本地缓存进行比较，有新的版本才使用服务器资源，否则使用缓存。
   - force-cache：缓存优先，只有不存在缓存的情况下，才请求远程服务器。
   - only-if-cached：只检查缓存，如果缓存里面不存在，将返回504错误。
- mode 属性指定请求的模式。可能的取值如下：
   - cors：默认值，允许跨域请求。
   - same-origin：只允许同源请求。
   - no-cors：请求方法只限于 GET、POST 和 HEAD，并且只能使用有限的几个简单标头，不能添加跨域的复杂标头，相当于提交表单所能发出的请求。
- credentials 属性指定是否发送 Cookie。可能的取值如下：
   - same-origin：默认值，同源请求时发送 Cookie，跨域请求时不发送。
   - include：不管同源请求，还是跨域请求，一律发送 Cookie。
   - omit：一律不发送。
- referrerPolicy属性用于设定Referer标头的规则。可能的取值如下：
   - no-referrer-when-downgrade：默认值，总是发送Referer标头，除非从 HTTPS 页面请求 HTTP 资源时不发送。
   - no-referrer：不发送Referer标头。
   - origin：Referer标头只包含域名，不包含完整的路径。
   - origin-when-cross-origin：同源请求Referer标头包含完整的路径，跨域请求只包含域名。
   - same-origin：跨域请求不发送Referer，同源请求发送。
   - strict-origin：Referer标头只包含域名，HTTPS 页面请求 HTTP 资源时不发送Referer标头。
   - strict-origin-when-cross-origin：同源请求时Referer标头包含完整路径，跨域请求时只包含域名，HTTPS 页面请求 HTTP 资源时不发送该标头。
   - unsafe-url：不管什么情况，总是发送Referer标头。

## response 读取内容
- response.text()：得到文本字符串。
- response.json()：得到 JSON 对象。
- response.blob()：得到二进制 Blob 对象。用于获取二进制文件。
- response.formData()：得到 FormData 表单对象。
- response.arrayBuffer()：得到二进制 ArrayBuffer 对象。主要用于获取流媒体文件。

Stream 对象只能读取一次，读取完就没了。这意味着，五个读取方法，只能使用一个，否则会报错。
```js
let text =  await response.text();
let json =  await response.json();  // 报错
```
使用response.clone()方法，创建Response对象的副本，可以实现多次读取。

### 分块读取
- Response.body.getReader()

```js
const response = await fetch('flower.jpg');
const reader = response.body.getReader();

while(true) {
  const {done, value} = await reader.read();

  if (done) {
    break;
  }

  console.log(`Received ${value.length} bytes`)
}
```
done属性是一个布尔值，用来判断有没有读完；
value属性是一个 arrayBuffer 数组，表示内容块的内容，
value.length属性是当前块的大小。

## 取消fetch请求
```js
let controller = new AbortController();
let signal = controller.signal;

fetch(url, {
  signal: controller.signal
});

signal.addEventListener('abort',
  () => console.log('abort!')
);

controller.abort(); // 取消

console.log(signal.aborted); // true
```

[参考文章](http://www.ruanyifeng.com/blog/2020/12/fetch-tutorial.html)

