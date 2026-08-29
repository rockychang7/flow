---
title: "Refactoring UI - Uncategorized"
topic: "refactoring-ui"
created: 2024-10-16
updated: 2026-08-25
source_url: "https://www.refactoringui.com/"
draft: false
synced: true
---
本篇笔记用来记录未分类的一些设计最佳实现，但是这些tips可以让页面更加的富有设计感。

## 1. Supercharge the defaults
这个点是说为了让元素的更加具备设计感，未必要添加额外的元素。增强一些默认元素的表现形式也可以达到这个效果，示例如下：
![2024-10-16 Refactoring UI - Uncategorized - 图01](https://raw.githubusercontent.com/rockychang7/image-storage/master/2024-10-16%20Refactoring%20UI%20-%20Uncategorized%20-%20%E5%9B%BE01.jpg)
![2024-10-16 Refactoring UI - Uncategorized - 图02](https://raw.githubusercontent.com/rockychang7/image-storage/master/2024-10-16%20Refactoring%20UI%20-%20Uncategorized%20-%20%E5%9B%BE02.jpg)
![2024-10-16 Refactoring UI - Uncategorized - 图03](https://raw.githubusercontent.com/rockychang7/image-storage/master/2024-10-16%20Refactoring%20UI%20-%20Uncategorized%20-%20%E5%9B%BE03.jpg)
![2024-10-16 Refactoring UI - Uncategorized - 图04](https://raw.githubusercontent.com/rockychang7/image-storage/master/2024-10-16%20Refactoring%20UI%20-%20Uncategorized%20-%20%E5%9B%BE04.jpg)
![2024-10-16 Refactoring UI - Uncategorized - 图05](https://raw.githubusercontent.com/rockychang7/image-storage/master/2024-10-16%20Refactoring%20UI%20-%20Uncategorized%20-%20%E5%9B%BE05.jpg)
## 2. Add color with accent borders
这个点是说给元素一个border形式的强调色可以非常简单有效地增强设计感：
![2024-10-16 Refactoring UI - Uncategorized - 图06](https://raw.githubusercontent.com/rockychang7/image-storage/master/2024-10-16%20Refactoring%20UI%20-%20Uncategorized%20-%20%E5%9B%BE06.jpg)
![2024-10-16 Refactoring UI - Uncategorized - 图07](https://raw.githubusercontent.com/rockychang7/image-storage/master/2024-10-16%20Refactoring%20UI%20-%20Uncategorized%20-%20%E5%9B%BE07.jpg)
![2024-10-16 Refactoring UI - Uncategorized - 图08](https://raw.githubusercontent.com/rockychang7/image-storage/master/2024-10-16%20Refactoring%20UI%20-%20Uncategorized%20-%20%E5%9B%BE08.jpg)
![2024-10-16 Refactoring UI - Uncategorized - 图09](https://raw.githubusercontent.com/rockychang7/image-storage/master/2024-10-16%20Refactoring%20UI%20-%20Uncategorized%20-%20%E5%9B%BE09.jpg)
 ![2024-10-16 Refactoring UI - Uncategorized - 图10](https://raw.githubusercontent.com/rockychang7/image-storage/master/2024-10-16%20Refactoring%20UI%20-%20Uncategorized%20-%20%E5%9B%BE10.jpg)
## 3. Decorate your backgrounds
这个点阐述可以通过修饰背景色来增强设计感：

**第一种：修改背景色**
![2024-10-16 Refactoring UI - Uncategorized - 图11](https://raw.githubusercontent.com/rockychang7/image-storage/master/2024-10-16%20Refactoring%20UI%20-%20Uncategorized%20-%20%E5%9B%BE11.jpg)
可以看到第二种从视觉上明显更加的好看，不过我感觉也未必一定要这么做，根据实际设计决定是否采纳。
类似的，比如landing page种的不同section也可以添加不同颜色：
![2024-10-16 Refactoring UI - Uncategorized - 图12](https://raw.githubusercontent.com/rockychang7/image-storage/master/2024-10-16%20Refactoring%20UI%20-%20Uncategorized%20-%20%E5%9B%BE12.jpg)
如果想要背景色更加的生动，也可以考虑使用渐变色：
![2024-10-16 Refactoring UI - Uncategorized - 图13](https://raw.githubusercontent.com/rockychang7/image-storage/master/2024-10-16%20Refactoring%20UI%20-%20Uncategorized%20-%20%E5%9B%BE13.jpg)
**第二种：使用重复的图案背景修饰**
![2024-10-16 Refactoring UI - Uncategorized - 图14](https://raw.githubusercontent.com/rockychang7/image-storage/master/2024-10-16%20Refactoring%20UI%20-%20Uncategorized%20-%20%E5%9B%BE14.jpg)
![2024-10-16 Refactoring UI - Uncategorized - 图15](https://raw.githubusercontent.com/rockychang7/image-storage/master/2024-10-16%20Refactoring%20UI%20-%20Uncategorized%20-%20%E5%9B%BE15.jpg)
可以看到上面的ui都使用了一些重复的图案作为背景色，这种方式在实际ui开发中非常简单实用，需要注意图片的对比度，不能影响别的元素的可读性

**第三种：使用简单的图片或者插画作为背景修饰**
![2024-10-16 Refactoring UI - Uncategorized - 图16](https://raw.githubusercontent.com/rockychang7/image-storage/master/2024-10-16%20Refactoring%20UI%20-%20Uncategorized%20-%20%E5%9B%BE16.jpg)

![2024-10-16 Refactoring UI - Uncategorized - 图17](https://raw.githubusercontent.com/rockychang7/image-storage/master/2024-10-16%20Refactoring%20UI%20-%20Uncategorized%20-%20%E5%9B%BE17.jpg)
![2024-10-16 Refactoring UI - Uncategorized - 图18](https://raw.githubusercontent.com/rockychang7/image-storage/master/2024-10-16%20Refactoring%20UI%20-%20Uncategorized%20-%20%E5%9B%BE18.jpg)
这种方式其实可使用重复图片类似的原理，页面这样子确实看起来更加生动，确实值得借鉴

## 4. Don’t overlook empty states
这个点阐述了不要忽视空数据状态下的页面设计，这个场景的页面设计对于用户还是很重要的，初始化状态下很容易出现。

一般来说有数据的情况下我们都会进行设计：
![2024-10-16 Refactoring UI - Uncategorized - 图19](https://raw.githubusercontent.com/rockychang7/image-storage/master/2024-10-16%20Refactoring%20UI%20-%20Uncategorized%20-%20%E5%9B%BE19.jpg)
如果没有数据，也许默认展示是这样子：
![2024-10-16 Refactoring UI - Uncategorized - 图20](https://raw.githubusercontent.com/rockychang7/image-storage/master/2024-10-16%20Refactoring%20UI%20-%20Uncategorized%20-%20%E5%9B%BE20.jpg)
很显然，用户第一眼看到会感觉有点突兀，解决方式如下：
![2024-10-16 Refactoring UI - Uncategorized - 图21](https://raw.githubusercontent.com/rockychang7/image-storage/master/2024-10-16%20Refactoring%20UI%20-%20Uncategorized%20-%20%E5%9B%BE21.jpg)

给Empty State的页面增加一些元素和交互会是不错的设计方式。

如果对于管理系统那种默认很多过滤条件的页面，空状态的页面可以单独进行设计：
![2024-10-16 Refactoring UI - Uncategorized - 图22](https://raw.githubusercontent.com/rockychang7/image-storage/master/2024-10-16%20Refactoring%20UI%20-%20Uncategorized%20-%20%E5%9B%BE22.jpg)
## 5. Use fewer borders
这个点是说现实实际中应该尽量较少border的使用，一个不好的设计如下：
![2024-10-16 Refactoring UI - Uncategorized - 图23](https://raw.githubusercontent.com/rockychang7/image-storage/master/2024-10-16%20Refactoring%20UI%20-%20Uncategorized%20-%20%E5%9B%BE23.jpg)

下面进行改造：
1. 去除最外围的border，使用box shadow让组件达到相同的效果并且不分散用户的注意力
   ![2024-10-16 Refactoring UI - Uncategorized - 图24](https://raw.githubusercontent.com/rockychang7/image-storage/master/2024-10-16%20Refactoring%20UI%20-%20Uncategorized%20-%20%E5%9B%BE24.jpg)
2. 使用不同的背景色来代替border区分不同的元素：
   ![2024-10-16 Refactoring UI - Uncategorized - 图25](https://raw.githubusercontent.com/rockychang7/image-storage/master/2024-10-16%20Refactoring%20UI%20-%20Uncategorized%20-%20%E5%9B%BE25.jpg)
3. 增加元素之间间距，去除原有的border
   ![2024-10-16 Refactoring UI - Uncategorized - 图26](https://raw.githubusercontent.com/rockychang7/image-storage/master/2024-10-16%20Refactoring%20UI%20-%20Uncategorized%20-%20%E5%9B%BE26.jpg)
最终效果相比于原版明显更加的具有设计感，非常的清晰明了。实际设计可以借鉴这种方式来优化ui。

## 6. Think outside the box
这个点是阐述我们需要打破传统思维，设计有时候可以更加的随心所欲一点：

比如Dropmenu不是只能包含List列表，我们可以存放任何我们想要的东西：
![2024-10-16 Refactoring UI - Uncategorized - 图27](https://raw.githubusercontent.com/rockychang7/image-storage/master/2024-10-16%20Refactoring%20UI%20-%20Uncategorized%20-%20%E5%9B%BE27.jpg)

![2024-10-16 Refactoring UI - Uncategorized - 图28](https://raw.githubusercontent.com/rockychang7/image-storage/master/2024-10-16%20Refactoring%20UI%20-%20Uncategorized%20-%20%E5%9B%BE28.jpg)
又比如表格我们也可以打破固定的单列数据展示：
![2024-10-16 Refactoring UI - Uncategorized - 图29](https://raw.githubusercontent.com/rockychang7/image-storage/master/2024-10-16%20Refactoring%20UI%20-%20Uncategorized%20-%20%E5%9B%BE29.jpg)
![2024-10-16 Refactoring UI - Uncategorized - 图30](https://raw.githubusercontent.com/rockychang7/image-storage/master/2024-10-16%20Refactoring%20UI%20-%20Uncategorized%20-%20%E5%9B%BE30.jpg)
![2024-10-16 Refactoring UI - Uncategorized - 图31](https://raw.githubusercontent.com/rockychang7/image-storage/master/2024-10-16%20Refactoring%20UI%20-%20Uncategorized%20-%20%E5%9B%BE31.jpg)

单选框我们也不是一定要遵循默认的样式：
![2024-10-16 Refactoring UI - Uncategorized - 图32](https://raw.githubusercontent.com/rockychang7/image-storage/master/2024-10-16%20Refactoring%20UI%20-%20Uncategorized%20-%20%E5%9B%BE32.jpg)
![2024-10-16 Refactoring UI - Uncategorized - 图33](https://raw.githubusercontent.com/rockychang7/image-storage/master/2024-10-16%20Refactoring%20UI%20-%20Uncategorized%20-%20%E5%9B%BE33.jpg)


## 总结
本篇笔记，通过一些特殊的视角阐述了如何优化我们的设计，让他看起来更加富有设计感。主要是在说如何打破常规的设计思维，使用一些特殊的技巧来优化我们的ui。这篇对于我们实际中优化ui页面还是非常具有借鉴意义。
