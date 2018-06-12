# 微信小程序实战篇

> 记录一些微信小程序开发遇到的问题和解决方案。

## iconfont

一个项目中免不了要有图标，但微信小程序不支持引入字体文件，需要通过工具将字体文件转成 base64 后直接写进样式文件，[参考文章](https://www.jianshu.com/p/221bebfae266)。

转 base 64 工具：https://transfonter.org/

## 双向绑定

微信小程序中的 data 并不是双向绑定的，如果想触发页面上的更新，需要用 setData 方法触发。

````js
this.setData({
    isActivedSearch: true
});
````

## 样式 class 的增删

也没有提供像 Vue 中动态 class 语法，需要在标签上直接写大括号语法

````html
<div class="item {{actived ? 'actived' : ''}}">
</div>
````

## 图片

微信小程序限制不超过 2M，有 2-3 张高清 banner 图就超过限制了，租用图片服务器是最直接的方式，但是我发现了一个更省钱的方式，将图片上传到公众号的素材管理中，可以直接使用先上图片。我猜图片存储是腾讯的基础设施，腾讯内部不同应用之间不会触发防盗链。

图片组件功能比较完善，支持 4 种缩放模式 3 中裁剪模式。比如我喜欢的 `aspectFit` 缩放模式：保持纵横比缩放图片，使图片的长边能完全显示出来。也就是说，可以完整地将图片显示出来。

## 固定比例

纯用样式实现固定比例是不可以的，比如我要画一个黄金比例的 textarea，需要借助 js 来计算，获取窗口宽度。

````js
wx.getSystemInfoSync().windowWidth
````

## 列表渲染和事件传值

给列表绑定事件的时候怎么获取当前项的数据呢，文档中并没有

WXML: 
````html
<article class="item" wx:for="{{dataList}}" wx:key="id">
  <image bindtap="toPage" data-id="{{item.id}}" src="{{item.url}}"/>
</article>
````
JS: 
````js
toPage(event) {
  const id = event.currentTarget.dataset.id;
  wx.navigateTo({
    url: '/pages/stager-detail/index?stagerId=' + id
  });
}
````

更多内容可以参见官方文档：https://developers.weixin.qq.com/miniprogram/dev/framework/view/wxml/event.html

## 自定义组件 - 弹框

微信小程序提供的弹框太简单，`wx.showModal` 的功能和浏览器自带的 `confirm`差不多，承载不了输入点击等交互逻辑，微信小程序的前端部分没有 npm 机制，只能自己封装组件，所以有必要封装一个自定义弹框。

先了解一下组件的相关内容，小程序的语法和 Vue 特别像，组件也和 Vue 比较像，所以组件和页面的逻辑基本一样，很庆幸小程序组件支持了 slot 特性，这让我们能做许多事情。下面我们将怎样一步步创建一个弹窗组件，如果你不想了解这部分内容那也没关系，直接跳过到下面的 API 部分直接查看用法。

### 创建组件

首先是新建目录，一般我们将组件放在 `components` 下，然后给这个组件起名叫 `dialog`，创建同名文件夹，如果你用的是小程序开发工具，直接在 `dialog` 文件夹上右击就可以看到创建组件的选项，点击后需要输入名称，我们直接输入 `index` 确定后就可以创建出 4 个文件：index.js、index.json、index.wxml、index.wxss。在 index.wxml 中写入内容：

````html
<article>
  dialog
</article>
````

一个组件已经创建完成了，我们这时可以将其引入到页面中查看效果。

怎么引入呢？首先需要在页面文件夹中添加一个 `index.json` 文件，在里面添加配置：

````json
{
  "usingComponents": {
    "dialog": "/components/dialog/index"
  }
}
````

然后在页面中就可以直接使用标签 `dialog` 将组件引入到页面中了，效果如下：

![图片](/articles/wx-action/img/component-1.png)

### 组件的 slot

然后我们来实现插入 slot 和组件与页面的事件交互两个功能，具体就是采用 slot 的方式放入一个按钮点击这个按钮让组件消失。

现在组件的 xwml 文件中插入 slot 标签：

````html
<article class="dialog">
    dialog
    <slot/>
</article>
````

然后是组件的显隐功能(也就是弹框的打开和关闭功能)，官方组件的显隐通过 hidden 属性来控制，并将其定为公共属性，尽量和官方组件保持一致，在 properties 中添加属性：

````js
properties: {
  // 是否展示
  hidden: {
    type: Boolean,
    value: true
  }
}
````
将组件更新到上面的 Dom 片段中
````html
<article class="dialog" wx:if="{{!hidden}}">
  dialog
  <slot/>
</article>
````

然后在业务页面中调用该组件：

````html
<button bindtap="openDialog">打开弹窗</button>
<dialog hidden="{{hidden}}" class="someone-page-dialog">
  <input placeholder="这里可以输入"/>
  <button bindtap="closeDialog">确定</button>
</dialog>
````

其中 isShowDialog 是业务页面中定义的数据， openDialog 和 closeDialog 是业务页面中定义的方法用来修改 isShowDialog 的值，如下面代码。class 是原生支持的，不需要自己开发。

````js
// 打开弹框
openDialog() {
  this.setData({
    hidden: false
  });
}
````

未打开弹框：

![图片](/articles/wx-action/img/component-2.png)

打开弹框：

![图片](/articles/wx-action/img/component-3.png)

**附注：**

默认情况下，一个组件的 wxml 中只能有一个 slot。需要使用多个 slot 时，可以在组件 js 中声明启用。

````js
Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  }
})
````

### 父子组件数据交互原理

在组件自定义 API 方面可以完全照抄 wx.showModal，连文档都省得写了，直接给个链接: https://developers.weixin.qq.com/miniprogram/dev/api/api-react.html#wxshowmodalobject

在动手写代码之前需要讲清楚组件属性的交互原则，主要是三条，下面通过实际的例子来说明：

一、父组件可以通过 setData 修改子组件的属性；

````html
<!-- 父组件/业务页面 中  -->
<dialog hidden="{{!isShowDialog}}" class="index-dialog">
  <input placeholder="这里可以输入"/>
</dialog>
<!-- 组件中 -->
<article class="dialog" wx:if="{{!hidden}}">
  <slot/>
</article>
````

父组件可以通过下面代码开打开弹框

````js
this.setData({
  isShowDialog: true
});
````

二、子组件可以修改自己的属性，并且修改后不会影响父组；

````html
<!-- 组件中 -->
<article class="dialog" wx:if="{{!hidden}}">
  <button bindtap="close">关闭弹框</button>
  <slot/>
</article>
````
````js
// 组件中
methods: {
  close() {
    this.setData({
      hidden: true
    });
  }
}
````

组件总可以通过改变属性 hidden 来关闭弹框，但是父组件中的 hidden 并不会随着修改。这一点也有别于 Vue，Vue 是不容许组件修改对外属性的。

三、父组件再次自己的数据，子组件让然可以相应。

上面例子中子组件的 hidden 是 true 父组件的 hidden 是 false，但如果父组件执行

````js
this.setData({
  hidden: false
});
````

依然可以打开弹框，这一点也有别于 Vue，Vue 中如果值在赋值前和赋值后一样，那么不会产生影响，但在小程序中父组件修改数据是会影响子组件的。

有了上面的知识储备终于可以实现我们的组件了，

### 父子组件数据交互实现

上面显隐的控制基本已完成这里不赘述，加上标题和按钮，样式要和原生保持一致，我们依然以 wx.showModal 作为参考：

首先是 js:

````js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 标题 【必填字段】
    title: {
      type: String,
      value: '提示'
    },
    // 是否展示
    hidden: {
      type: Boolean,
      value: true
    },
    showCancel: {
      type: Boolean,
      value: true
    },
    cancelText: {
      type: String,
      value: '取消'
    },
    cancelColor: {
      type: String,
      value: '#000000'
    },
    showConfirm: {
      type: Boolean,
      value: true
    },
    confirmText: {
      type: String,
      value: '确定'
    },
    confirmColor: {
      type: String,
      value: '#3CC51F'
    },
    success: {
      type: Function,
      value: () => {}
    },
    fail: {
      type: Function,
      value: () => {}
    },
    complete: {
      type: Function,
      value: () => {}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    close() {
      this.setData({
        hidden: true
      });
    },
    // 取消按钮事件
    cancel() {
      this.fail();
      this.complete();
      this.close();
    },
    // 确认按钮事件
    confirm() {
      if (this.success() === false) {
        return;
      }

      this.complete();
      this.close();
    }
  }
});
````

然后是 wxml：

````html
<section class="mask" wx:if="{{!hidden}}"></section>
<article class="dialog" wx:if="{{!hidden}}">
  <header class="dialog-title">{{title}}</header>
  <section class="dialog-body">
    <slot/>
  </section>
  <footer class="dialog-bottom-btns" wx:if="{{showCancel||showConfirm}}">
    <button plain="true"
            wx:if="{{showCancel}}"
            class="btn cancel-btn"
            style="color: {{cancelColor}}"
            bindtap="cancel">取消</button>
    <button plain="true"
            wx:if="{{showConfirm}}"
            class="btn confirm-btn"
            style="color: {{confirmColor}}"
            bindtap="confirm">确定</button>
  </footer>
</article>
````

最后是 wxss

````CSS
.mask {  
  width: 100%;  
  height: 100%;  
  position: fixed;  
  top: 0;  
  left: 0;  
  z-index: 100;  
  background: #000;  
  opacity: 0.5;  
  overflow: hidden;  
}

.dialog {
  width: 650rpx;
  overflow: hidden;
  position: fixed;
  top: 50%;
  left: 0;
  z-index: 101;
  background: #FAFAFA;
  margin: -150px 50rpx 0 50rpx;
  border-radius: 3px;
}

.dialog .dialog-title {
  display: block;
  text-align: center;
  font-size: 18px;
  line-height: 4em;
  font-weight: 600;
}

.dialog .dialog-body {
  text-align: center;
  /* background: #333; */
}

.dialog .dialog-bottom-btns {
  display: flex;
  border-top: 1rpx solid #dddbde;
}

.dialog .dialog-bottom-btns .cancel-btn,
.dialog .dialog-bottom-btns .confirm-btn {
  flex: 1;
  border: none;
  border-radius: 0;
}

/* 第二个按钮左边框 */
.dialog .dialog-bottom-btns .btn:nth-child(2n) {
   border-left: 1rpx solid #dddbde; 
}
````

## 运营数据

小程序发出去总要区统计一些东西，来验证自己的产品思路对不对，从而做出调整。常规的统计微信天然支持，比如页面的到达停留市场离开等。对于用户信息不一定要获取真实的用户名，微信提供了脱敏的 openid 来标识用户。

对于个性化的需求，比如要记录搜索按钮的使用，需要用到自定义分析，

## 业务上的注意点

如果有社交属性，需要有公司实体，个人版的小程序是无法通过审核的。

> 你好，贵方小程序涉及提供交友服务，交友属个人主体小程序未开放类目，建议申请企业主体小程序。

上面是做一款“过来人”小程序是通过个人申请的反馈，这款小程序主打的功能是如果你想了解一件事情，找一个这方面有经验的人来咨询了解一下，这可能就是微信说的“交友服务”。后来找了个公司实体的公众号，花了 300RMB 做了认证才审核通过的。

第一次审核需要的时间稍微久一些，官网说是一周，我们是实际用了 2 天。之后更新小程序过审就比较快了，大概 2-6 小时。审核通过后需要发布小程序，发布后大概半小时才能看到更新。

## 坑

### textarea-placeholder

textarea 如果设置了行高就可能出现占位文字和输入文字不在一行的问题，试图通过布局样式解决，发现textarea 的 placeholder 的布局样式设置不起作用，包括 position、padding、margin 还有 line-height，从架构设计的角度看不可设置也能理解，但是行高只作用于输入文字却不作用于占位文字就不应该了，目测是微信小程序的 bug。

最好的解决方案是不设置行高，如果非要设置行高那就需要通过事件监听用 js 切换样式了。

## 参考

[微信小程序官方文档 - 自定义组件](https://developers.weixin.qq.com/miniprogram/dev/framework/custom-component/wxml-wxss.html)

[博客 - 微信小程序之自定义模态弹窗](https://blog.csdn.net/michael_ouyang/article/details/62430905)