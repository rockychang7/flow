---
title: "Refactoring UI - 全书阅读笔记"
topic: "refactoring-ui"
created: 2024-10-10
updated: 2026-08-25
order: 0
source_url: "https://www.refactoringui.com/"
draft: false
synced: true
---
这篇记录refactoring ui关于从头开始进行ui设计的全局上的一些要点
## 1. Start with a feature, not a layout（以功能为中心而非布局开始设计）
当设计一个app或者网站的时候，不要首先想着如何布局（比如导航栏，侧边栏，Logo等放在哪里），而是应该先注重于具体的功能设计，当功能设计完成后，才有内容安排具体的布局, 我个人有过这种感觉，如下图想了若干种布局方式，但是实际的功能却还没有考虑，导致最后的频繁改动
![2024-10-10 Refactoring UI - 全书阅读笔记 - 图01](https://raw.githubusercontent.com/rockychang7/image-storage/master/2024-10-10%20Refactoring%20UI%20-%20%E5%85%A8%E4%B9%A6%E9%98%85%E8%AF%BB%E7%AC%94%E8%AE%B0%20-%20%E5%9B%BE01.jpg)

具体做法：比如设计一个landing page,应该确认landing page有啥具体的功能。比如需要对项目有一个完整介绍（hero section），那么先对这个section进行设计。当主要的功能设计完成之后再考虑如何布局

案例：比如设计一个航班查询系统，我应该关注的功能应该是如何设计好搜索航班的表单
![2024-10-10 Refactoring UI - 全书阅读笔记 - 图02](https://raw.githubusercontent.com/rockychang7/image-storage/master/2024-10-10%20Refactoring%20UI%20-%20%E5%85%A8%E4%B9%A6%E9%98%85%E8%AF%BB%E7%AC%94%E8%AE%B0%20-%20%E5%9B%BE02.jpg)
在此基础之上，我才会考虑如何布局整个页面，比如最终效果如下：
![2024-10-10 Refactoring UI - 全书阅读笔记 - 图03](https://raw.githubusercontent.com/rockychang7/image-storage/master/2024-10-10%20Refactoring%20UI%20-%20%E5%85%A8%E4%B9%A6%E9%98%85%E8%AF%BB%E7%AC%94%E8%AE%B0%20-%20%E5%9B%BE03.jpg)
## 2. Detail comes later（稍后再考虑细节）
对于如何开始设计功能，最简单的方式是通过草图先粗糙地画出来。将主要的功能，以及这些功能如何摆放都先大致的描述出来。
![2024-10-10 Refactoring UI - 全书阅读笔记 - 图04](https://raw.githubusercontent.com/rockychang7/image-storage/master/2024-10-10%20Refactoring%20UI%20-%20%E5%85%A8%E4%B9%A6%E9%98%85%E8%AF%BB%E7%AC%94%E8%AE%B0%20-%20%E5%9B%BE04.jpg)

在具体实现ui的时候，可以先不考虑color，通过spacing,contrast,size等先设计好重要的元素层次，最后通过颜色去增强效果

先通过灰色模式进行设计
![2024-10-10 Refactoring UI - 全书阅读笔记 - 图05](https://raw.githubusercontent.com/rockychang7/image-storage/master/2024-10-10%20Refactoring%20UI%20-%20%E5%85%A8%E4%B9%A6%E9%98%85%E8%AF%BB%E7%AC%94%E8%AE%B0%20-%20%E5%9B%BE05.jpg)
最后颜色进行增强
![2024-10-10 Refactoring UI - 全书阅读笔记 - 图06](https://raw.githubusercontent.com/rockychang7/image-storage/master/2024-10-10%20Refactoring%20UI%20-%20%E5%85%A8%E4%B9%A6%E9%98%85%E8%AF%BB%E7%AC%94%E8%AE%B0%20-%20%E5%9B%BE06.jpg)

最后，不用一次性设计好所有功能。在设计项目功能的时候，抱着悲观的态度去设计，尽量保持功能的简洁。因为如果设计太多的功能，往往会因为太过于复杂而难以实现。因此尽快设计mvp版本，先完成最重要。基于实现的版本，再去迭代新的功能。

## 3. Choose a personality(选取一种个性)
每一种设计都应该有一种个性，对于银行网站应该表现的更加专业，对于社区应用又应该是有趣好玩。如何决定你应用的特性取决于Font,Color,Border radius,Language等因素。当然，可以通过借鉴类似分类的网站来选取对应的特性

### Font（字体选择）
不同类型的字体给人的感觉各不相同
- serif typeface： 给人经典优雅的感觉 ![2024-10-10 Refactoring UI - 全书阅读笔记 - 图07](https://raw.githubusercontent.com/rockychang7/image-storage/master/2024-10-10%20Refactoring%20UI%20-%20%E5%85%A8%E4%B9%A6%E9%98%85%E8%AF%BB%E7%AC%94%E8%AE%B0%20-%20%E5%9B%BE07.jpg)
-  rounded sans serif： 给人有趣的感觉 ![2024-10-10 Refactoring UI - 全书阅读笔记 - 图08](https://raw.githubusercontent.com/rockychang7/image-storage/master/2024-10-10%20Refactoring%20UI%20-%20%E5%85%A8%E4%B9%A6%E9%98%85%E8%AF%BB%E7%AC%94%E8%AE%B0%20-%20%E5%9B%BE08.jpg)
- sans serif： 给人中性的感觉 ![2024-10-10 Refactoring UI - 全书阅读笔记 - 图09](https://raw.githubusercontent.com/rockychang7/image-storage/master/2024-10-10%20Refactoring%20UI%20-%20%E5%85%A8%E4%B9%A6%E9%98%85%E8%AF%BB%E7%AC%94%E8%AE%B0%20-%20%E5%9B%BE09.jpg)
### Color（颜色选择)
往往不同的颜色，给人的感觉都是各不相同（这和心理学也有关），开发应用的时候，可以结合你自己的感觉设计不同的颜色: 
- 蓝色：往往是安全，熟悉的  ![2024-10-10 Refactoring UI - 全书阅读笔记 - 图10](https://raw.githubusercontent.com/rockychang7/image-storage/master/2024-10-10%20Refactoring%20UI%20-%20%E5%85%A8%E4%B9%A6%E9%98%85%E8%AF%BB%E7%AC%94%E8%AE%B0%20-%20%E5%9B%BE10.jpg)
- 金色：往往是昂贵，复杂的 ![2024-10-10 Refactoring UI - 全书阅读笔记 - 图11](https://raw.githubusercontent.com/rockychang7/image-storage/master/2024-10-10%20Refactoring%20UI%20-%20%E5%85%A8%E4%B9%A6%E9%98%85%E8%AF%BB%E7%AC%94%E8%AE%B0%20-%20%E5%9B%BE11.jpg)
- 粉色：往往是有趣，不那么严肃的 ![2024-10-10 Refactoring UI - 全书阅读笔记 - 图12](https://raw.githubusercontent.com/rockychang7/image-storage/master/2024-10-10%20Refactoring%20UI%20-%20%E5%85%A8%E4%B9%A6%E9%98%85%E8%AF%BB%E7%AC%94%E8%AE%B0%20-%20%E5%9B%BE12.jpg)
### Border radius
角弧度对于个性也有很大影响 
- 小弧度的角度：往往是中性的 ![2024-10-10 Refactoring UI - 全书阅读笔记 - 图13](https://raw.githubusercontent.com/rockychang7/image-storage/master/2024-10-10%20Refactoring%20UI%20-%20%E5%85%A8%E4%B9%A6%E9%98%85%E8%AF%BB%E7%AC%94%E8%AE%B0%20-%20%E5%9B%BE13.jpg)
- 大弧度的角度：往往是有趣的，不严肃的 ![2024-10-10 Refactoring UI - 全书阅读笔记 - 图14](https://raw.githubusercontent.com/rockychang7/image-storage/master/2024-10-10%20Refactoring%20UI%20-%20%E5%85%A8%E4%B9%A6%E9%98%85%E8%AF%BB%E7%AC%94%E8%AE%B0%20-%20%E5%9B%BE14.jpg)
- 没有角度：往往是严肃正规的 ![2024-10-10 Refactoring UI - 全书阅读笔记 - 图15](https://raw.githubusercontent.com/rockychang7/image-storage/master/2024-10-10%20Refactoring%20UI%20-%20%E5%85%A8%E4%B9%A6%E9%98%85%E8%AF%BB%E7%AC%94%E8%AE%B0%20-%20%E5%9B%BE15.jpg)
### Language（语言)
不同的语言给人的感觉也大不相同 
- 正式化的语言：往往是官方和专业的感觉 
- 俏皮的语言：往往是有趣和不严肃的感觉


## 4. Limit your choices (限制你的选择)

如果设计过程中没有一个规范化的系统，每次设计决定都需要随意选择合适的颜色，字体大小等，那么会陷入选择困难，因为可能适合的选择会有很多。最佳做法是预先定制好比如颜色系统，字体大小系统等。这样，就可以在更少的正确选项中快速选择最合适的值。具体的可以系统化的元素有：
- Font size
- Font weight
- Line height
- Color
- Margin
- Padding
- Width
- Height
- Box shadows
- Border radius
- Border width
- Opacity
- ...

> 这种系统化的思想和tailwindcss的设计不谋而合（事实也是一个作者)，设计可以使用tailwindcss开发同时进行，tailwindcss对于上面常用的元素都进行预定义，可以很方便的使用


## 5. 详细学习
至此，关于如何开始设计进行了全局上的介绍，今后在开始设计的时候可以参考本手册。关于具体的设计细节在后面的篇章中会进行详细的介绍：
- [Refactoring UI - Hierarchy is everything](/notes/refactoring-ui-hierarchy)
- [Refactoring UI - Layout and spacing](/notes/refactoring-ui-layout-spacing)
- [Refactoring UI - Designing text](/notes/refactoring-ui-text)
- [Refactoring UI - Working with color](/notes/refactoring-ui-color)
- [Refactoring UI - Creating depth](/notes/refactoring-ui-depth)
- [Refactoring UI - Working with images](/notes/refactoring-ui-images)
- [Refactoring UI - Uncategorized](/notes/refactoring-ui-misc-tips)

## 6. 进阶
上面的最佳实践对于我们写出不错的页面非常具有借鉴意义，但是如果想要有些突破，可以在此基础之上尽量尝试一些打破常规的设计，示例：

1. 使用和背景完全不同的颜色
   ![2024-10-10 Refactoring UI - 全书阅读笔记 - 图16](https://raw.githubusercontent.com/rockychang7/image-storage/master/2024-10-10%20Refactoring%20UI%20-%20%E5%85%A8%E4%B9%A6%E9%98%85%E8%AF%BB%E7%AC%94%E8%AE%B0%20-%20%E5%9B%BE16.jpg)
2. 将Button放于input text之内： 
   ![2024-10-10 Refactoring UI - 全书阅读笔记 - 图17](https://raw.githubusercontent.com/rockychang7/image-storage/master/2024-10-10%20Refactoring%20UI%20-%20%E5%85%A8%E4%B9%A6%E9%98%85%E8%AF%BB%E7%AC%94%E8%AE%B0%20-%20%E5%9B%BE17.jpg)
3. 一个headline使用两种颜色:
   ![2024-10-10 Refactoring UI - 全书阅读笔记 - 图18](https://raw.githubusercontent.com/rockychang7/image-storage/master/2024-10-10%20Refactoring%20UI%20-%20%E5%85%A8%E4%B9%A6%E9%98%85%E8%AF%BB%E7%AC%94%E8%AE%B0%20-%20%E5%9B%BE18.jpg)
还有一个重要的点，是不断对自己设计的页面进行重构来优化到理想的程度：
![2024-10-10 Refactoring UI - 全书阅读笔记 - 图19](https://raw.githubusercontent.com/rockychang7/image-storage/master/2024-10-10%20Refactoring%20UI%20-%20%E5%85%A8%E4%B9%A6%E9%98%85%E8%AF%BB%E7%AC%94%E8%AE%B0%20-%20%E5%9B%BE19.jpg)

## 总结
refactoring ui从全局上介绍ui设计应该如何开始，然后从细节上比如**层级**、**布局和间距**、**文本设计**、**颜色设计**、**创建depth**、**处理图片**以及额外的一些最佳实践详细说明了具体的ui元素应该如何设计才更加优雅。这对于实际前端ui开发非常具有借鉴意义，后面真实ui开发中需要复习和实践这些重要的点


## 额外资源
refactoring ui还提供了一些额外的资源助力你的设计。**这部分资源在有需要的时候会进行参考**：
- Video-lessons(视频细节补充)
- componet-gallery（组件灵感）
- Color palettes（预置调色板)
- Font Recommendations(字体建议)
- Custom Illustrated Icons（预制作icons）
