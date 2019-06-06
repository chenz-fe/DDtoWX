# DDtoWX
最近接到一个工作任务，是把钉钉小程序转微信小程序...

对，居然还有这种操作，之前只听过微信小程序转支付宝小程序的，钉钉转微信是什么鬼😿

实际操作之后发现，并不是太复杂。nodeJS加vscode全局替换，很快就能改完。

## 1. 修改文件后缀名

钉钉小程序和支付宝小程序几乎没有差别，最主要的是支付宝小程序全局变量 `my`, 钉钉小程序对应为 `dd`。而钉钉小程序的文档不如支付宝小程序详细，所以看文档直接看支付宝小程序的就可以了。

现在开始把钉钉转微信啦！

首先第一步是把文件后缀名改了，axml改为wxml，wxss改为acss

这一步可以用JS脚本执行。


## 2. 修改文件内部引用文件的后缀名

依然是axml改为wxml，wxss改为acss，采取全局替换即可。


## 3. 修改文件中import路径

钉钉可以引用绝对路径，但是微信在wxml和js中只能引用相对路径，层级需要手动修改下。


## 4. API修改

左边是钉钉的，右边是对应的微信小程序的方法

`onTap`  ->  `bindtap`

`onBlur` -> `bindblur`

`dd.getStorageSync({key: 'score'}).data`  ->   `wx.getStorageSync('score')`

`dd.showToast({content: '请填写名称'})`  ->  `wx.showToast({title: '请填写名称',icon:'none'})`，如果不设置`icon:none`，会默认显示成功的图标

`dd.datePicker`  ->  微信里没有此方法

`a:`  -> ` wx:`

http请求头：`headers` ->  `header`

通过e.target获取的值，微信小程序会转成小写字母

例如： `e.target.dataset.recordId` -> `e.target.dataset.recordid`

当子组件需要调用父组件的某个方法时，钉钉小程序父组件可以将函数作为属性传递给子组件，由子组件直接调用；微信小程序目前只能通过父组件事件监听，子组件通过`triggerEvent`触发父组件的方法

`uploadFile` 钉钉和微信小程序参数定义有区别

持续更新中...