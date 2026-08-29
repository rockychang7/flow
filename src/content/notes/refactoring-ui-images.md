---
title: "Refactoring UI - Working with images"
topic: "refactoring-ui"
created: 2024-10-15
updated: 2026-08-25
source_url: "https://www.refactoringui.com/"
draft: false
synced: true
---
本篇笔记记录在实际ui设计中应该如何更好地处理images

## 1. Text needs consistent contrast
这个点阐述在图片上的文字需要拥有一致性的对比度：
![2024-10-15 Refactoring UI - Working with images - 图01](https://raw.githubusercontent.com/rockychang7/image-storage/master/2024-10-15%20Refactoring%20UI%20-%20Working%20with%20images%20-%20%E5%9B%BE01.jpg)
![2024-10-15 Refactoring UI - Working with images - 图02](https://raw.githubusercontent.com/rockychang7/image-storage/master/2024-10-15%20Refactoring%20UI%20-%20Working%20with%20images%20-%20%E5%9B%BE02.jpg)
可以看到这张图片上的文字由于图片上人物白色衣服导致文字变得不清晰，单纯修改文字的颜色并不能完全适应背景的颜色多样性。解决方式：

**添加一个背景颜色（覆盖层）**,比如下面这张图片增加一个暗色的背景，这样白色的文字就很清晰：
![2024-10-15 Refactoring UI - Working with images - 图03](https://raw.githubusercontent.com/rockychang7/image-storage/master/2024-10-15%20Refactoring%20UI%20-%20Working%20with%20images%20-%20%E5%9B%BE03.jpg)

**降低图片的对比度**:下面这张图片通过亮度改变了和文字的对比度
![2024-10-15 Refactoring UI - Working with images - 图04](https://raw.githubusercontent.com/rockychang7/image-storage/master/2024-10-15%20Refactoring%20UI%20-%20Working%20with%20images%20-%20%E5%9B%BE04.jpg)
**给图片一个特定的颜色**:为了配置文字更好的显示，搭配一个对比度更高颜色
![2024-10-15 Refactoring UI - Working with images - 图05](https://raw.githubusercontent.com/rockychang7/image-storage/master/2024-10-15%20Refactoring%20UI%20-%20Working%20with%20images%20-%20%E5%9B%BE05.jpg)
**增加一个text shadow**:给文字一个阴影，让它悬浮于图片也可以解决这个问题
![2024-10-15 Refactoring UI - Working with images - 图06](https://raw.githubusercontent.com/rockychang7/image-storage/master/2024-10-15%20Refactoring%20UI%20-%20Working%20with%20images%20-%20%E5%9B%BE06.jpg)

## 2. Everything has an intended size

### 关于图标的设计
这个点说的是每个图片的大小都是有特定目的的，不要随意修改图片的大小

![2024-10-15 Refactoring UI - Working with images - 图07](https://raw.githubusercontent.com/rockychang7/image-storage/master/2024-10-15%20Refactoring%20UI%20-%20Working%20with%20images%20-%20%E5%9B%BE07.jpg)
可以看到图片放大后明显失真了，同样就算是svg，随意的放大也会让比如icon看起来不专业,这个可以理解一般icon的大小和形态都是特意设计的随便改变肯定不太合适。
![2024-10-15 Refactoring UI - Working with images - 图08](https://raw.githubusercontent.com/rockychang7/image-storage/master/2024-10-15%20Refactoring%20UI%20-%20Working%20with%20images%20-%20%E5%9B%BE08.jpg)

那下面这种场景的运用也不太合理：
![2024-10-15 Refactoring UI - Working with images - 图09](https://raw.githubusercontent.com/rockychang7/image-storage/master/2024-10-15%20Refactoring%20UI%20-%20Working%20with%20images%20-%20%E5%9B%BE09.jpg)
**解决方案**：可以给icon添加一个有背景颜色的shape
![2024-10-15 Refactoring UI - Working with images - 图10](https://raw.githubusercontent.com/rockychang7/image-storage/master/2024-10-15%20Refactoring%20UI%20-%20Working%20with%20images%20-%20%E5%9B%BE10.jpg)
![2024-10-15 Refactoring UI - Working with images - 图11](https://raw.githubusercontent.com/rockychang7/image-storage/master/2024-10-15%20Refactoring%20UI%20-%20Working%20with%20images%20-%20%E5%9B%BE11.jpg)
**注意**:对于icons，随意的缩小原有大小也是不合理的，因为缩小之后没有合理的空闲展示原本的所有信息：
![2024-10-15 Refactoring UI - Working with images - 图12](https://raw.githubusercontent.com/rockychang7/image-storage/master/2024-10-15%20Refactoring%20UI%20-%20Working%20with%20images%20-%20%E5%9B%BE12.jpg)
好的做法是针对小尺寸重新设计icon:
![2024-10-15 Refactoring UI - Working with images - 图13](https://raw.githubusercontent.com/rockychang7/image-storage/master/2024-10-15%20Refactoring%20UI%20-%20Working%20with%20images%20-%20%E5%9B%BE13.jpg)
### 关于截图的设计
首选不要使用缩小的全屏截图作为展示，信息会变得不清楚：
![2024-10-15 Refactoring UI - Working with images - 图14](https://raw.githubusercontent.com/rockychang7/image-storage/master/2024-10-15%20Refactoring%20UI%20-%20Working%20with%20images%20-%20%E5%9B%BE14.jpg)
好的做法可以是：
**使用更小屏幕上的截屏**：
![2024-10-15 Refactoring UI - Working with images - 图15](https://raw.githubusercontent.com/rockychang7/image-storage/master/2024-10-15%20Refactoring%20UI%20-%20Working%20with%20images%20-%20%E5%9B%BE15.jpg)
**使用局部截屏**：
![2024-10-15 Refactoring UI - Working with images - 图16](https://raw.githubusercontent.com/rockychang7/image-storage/master/2024-10-15%20Refactoring%20UI%20-%20Working%20with%20images%20-%20%E5%9B%BE16.jpg)
**使用简单版本的全屏截图**：移除一些细节和文本
![2024-10-15 Refactoring UI - Working with images - 图17](https://raw.githubusercontent.com/rockychang7/image-storage/master/2024-10-15%20Refactoring%20UI%20-%20Working%20with%20images%20-%20%E5%9B%BE17.jpg)
## 3. Beware user-uploaded content
这个点主要阐述如果更好地处理用户上传的图片内容

首先，控制好图片的形状和大小的一致性，下面可以看下两种不同的处理方式:
![2024-10-15 Refactoring UI - Working with images - 图18](https://raw.githubusercontent.com/rockychang7/image-storage/master/2024-10-15%20Refactoring%20UI%20-%20Working%20with%20images%20-%20%E5%9B%BE18.jpg)
![2024-10-15 Refactoring UI - Working with images - 图19](https://raw.githubusercontent.com/rockychang7/image-storage/master/2024-10-15%20Refactoring%20UI%20-%20Working%20with%20images%20-%20%E5%9B%BE19.jpg)
可以看到加以限制之后页面看起来更加的一致和整洁，具体做法原理：
![2024-10-15 Refactoring UI - Working with images - 图20](https://raw.githubusercontent.com/rockychang7/image-storage/master/2024-10-15%20Refactoring%20UI%20-%20Working%20with%20images%20-%20%E5%9B%BE20.jpg)

还有一种常见的场景，比如用户上传的头像但是背景色和整体背景色类似，会导致头像和背景混合在一起：
![2024-10-15 Refactoring UI - Working with images - 图21](https://raw.githubusercontent.com/rockychang7/image-storage/master/2024-10-15%20Refactoring%20UI%20-%20Working%20with%20images%20-%20%E5%9B%BE21.jpg)

**解决方式**：可以给头像一个内陷的阴影解决这个问题（注意：给一个border虽然也能解决这个问题，但是影响了整体设计的美观）
![2024-10-15 Refactoring UI - Working with images - 图22](https://raw.githubusercontent.com/rockychang7/image-storage/master/2024-10-15%20Refactoring%20UI%20-%20Working%20with%20images%20-%20%E5%9B%BE22.jpg)
使用半透明的阴影也是一个不错的选择：
![2024-10-15 Refactoring UI - Working with images - 图23](https://raw.githubusercontent.com/rockychang7/image-storage/master/2024-10-15%20Refactoring%20UI%20-%20Working%20with%20images%20-%20%E5%9B%BE23.jpg)

## 总结
本篇笔记着墨于图片相关的设计，针对如何处理图片与文字的显示，如何处理图片以及如何处理用户上传的图片阐述了最佳实践。具体ui设计的时候，涉及到图片可以过来进行参考。
