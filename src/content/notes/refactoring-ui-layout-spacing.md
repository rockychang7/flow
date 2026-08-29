---
title: "Refactoring UI - Layout and spacing"
topic: "refactoring-ui"
created: 2024-10-11
updated: 2026-08-25
source_url: "https://www.refactoringui.com/"
draft: false
synced: true
---
本篇主要介绍ui设计中如何更好地设计布局(layout)让页面更加的清晰明了，特别是如何利用好间距来组织好布局。

下面是几个主要的点：

## 1. Start with too much white space
这里作者强调使用尽量多的空白来使设计更加的简洁，举例说明下这个效果：
  ![2024-10-11 Refactoring UI - Layout and spacing - 图01](https://raw.githubusercontent.com/rockychang7/image-storage/master/2024-10-11%20Refactoring%20UI%20-%20Layout%20and%20spacing%20-%20%E5%9B%BE01.jpg)
  ![2024-10-11 Refactoring UI - Layout and spacing - 图02](https://raw.githubusercontent.com/rockychang7/image-storage/master/2024-10-11%20Refactoring%20UI%20-%20Layout%20and%20spacing%20-%20%E5%9B%BE02.jpg)
这样做看起来页面确实没有那么紧凑了，观感舒适。

接下来作者强调了如何使用空白来达到这种效果，最好的方式是一开始就给比较多的空白然后再进行调整，而不是一开始很紧凑再慢慢加空白。效果如下：

- 不推荐的做法：
  ![2024-10-11 Refactoring UI - Layout and spacing - 图03](https://raw.githubusercontent.com/rockychang7/image-storage/master/2024-10-11%20Refactoring%20UI%20-%20Layout%20and%20spacing%20-%20%E5%9B%BE03.jpg)
- 推荐做法：
  ![2024-10-11 Refactoring UI - Layout and spacing - 图04](https://raw.githubusercontent.com/rockychang7/image-storage/master/2024-10-11%20Refactoring%20UI%20-%20Layout%20and%20spacing%20-%20%E5%9B%BE04.jpg)
  ![2024-10-11 Refactoring UI - Layout and spacing - 图05](https://raw.githubusercontent.com/rockychang7/image-storage/master/2024-10-11%20Refactoring%20UI%20-%20Layout%20and%20spacing%20-%20%E5%9B%BE05.jpg)
> [!info]
> 实际开发中，先给比较多的空白往往是合理的，最终的效果在全局呈现上会更加的适配。

但是上面这种做法也不是绝对的，对于数据密集展示的dashboard类型的系统，也没有必要特意的增加空白，这种情况尽量然数据展示在同一屏幕更加的重要，举例如下：
  ![2024-10-11 Refactoring UI - Layout and spacing - 图06](https://raw.githubusercontent.com/rockychang7/image-storage/master/2024-10-11%20Refactoring%20UI%20-%20Layout%20and%20spacing%20-%20%E5%9B%BE06.jpg)
## 2. Establish a spacing and sizing system
这个概念已经在[全局设计篇章](/notes/refactoring-ui-overview)中阐述过，这里作者详细阐述如何构建spacing and sizing system。

首先，如果不建立这个系统，用随意数字的spacing增加了决定的成本和页面的混乱：
  ![2024-10-11 Refactoring UI - Layout and spacing - 图07](https://raw.githubusercontent.com/rockychang7/image-storage/master/2024-10-11%20Refactoring%20UI%20-%20Layout%20and%20spacing%20-%20%E5%9B%BE07.jpg)
所以我们需要提前建立spacing and sizing system,建立之前我们需要有个概念：
建立这个系统不是简单的按固定的数字加减改变sizing,因为针对越小的数字，差距百分比越大，如果针对越大的数字，这个增长率越小。比如12px到16px是33%的增长率，16px到20px是20%的增长率
  ![2024-10-11 Refactoring UI - Layout and spacing - 图08](https://raw.githubusercontent.com/rockychang7/image-storage/master/2024-10-11%20Refactoring%20UI%20-%20Layout%20and%20spacing%20-%20%E5%9B%BE08.jpg)
  
  ![2024-10-11 Refactoring UI - Layout and spacing - 图09](https://raw.githubusercontent.com/rockychang7/image-storage/master/2024-10-11%20Refactoring%20UI%20-%20Layout%20and%20spacing%20-%20%E5%9B%BE09.jpg)
基于上面的条件，建立这个系统需要选取一个合适的标准值比如16px，然后一个合适的scale比如0.25，最终效果如下：
  ![2024-10-11 Refactoring UI - Layout and spacing - 图10](https://raw.githubusercontent.com/rockychang7/image-storage/master/2024-10-11%20Refactoring%20UI%20-%20Layout%20and%20spacing%20-%20%E5%9B%BE10.jpg)
> [!tip]
> tailwindcss使用的更加通用和灵活的spacing系统，可以基于这套系统实现上面所说的间距系统。实际开发中tailwindcss的这套默认的已经够用了

有了这套系统之后，就可以进行高效地运用，效果如下：
  ![2024-10-11 Refactoring UI - Layout and spacing - 图11](https://raw.githubusercontent.com/rockychang7/image-storage/master/2024-10-11%20Refactoring%20UI%20-%20Layout%20and%20spacing%20-%20%E5%9B%BE11.jpg)
  
## 3. You don’t have to fill the whole screen

这个概念也非常有用，设计ui的时候不需要占满所有的屏幕，设计到元素自身合适的大下即可。

反面的例子:
  ![2024-10-11 Refactoring UI - Layout and spacing - 图12](https://raw.githubusercontent.com/rockychang7/image-storage/master/2024-10-11%20Refactoring%20UI%20-%20Layout%20and%20spacing%20-%20%E5%9B%BE12.jpg)
调整后的效果：
  ![2024-10-11 Refactoring UI - Layout and spacing - 图13](https://raw.githubusercontent.com/rockychang7/image-storage/master/2024-10-11%20Refactoring%20UI%20-%20Layout%20and%20spacing%20-%20%E5%9B%BE13.jpg)
对于单个组件或者元素也需要这样设计，比如login：
  ![2024-10-11 Refactoring UI - Layout and spacing - 图14](https://raw.githubusercontent.com/rockychang7/image-storage/master/2024-10-11%20Refactoring%20UI%20-%20Layout%20and%20spacing%20-%20%E5%9B%BE14.jpg)
如果设计上有困难的话，推荐可以考虑先在小屏幕上进行设计，设计完之后再开发web端的页面：
  ![2024-10-11 Refactoring UI - Layout and spacing - 图15](https://raw.githubusercontent.com/rockychang7/image-storage/master/2024-10-11%20Refactoring%20UI%20-%20Layout%20and%20spacing%20-%20%E5%9B%BE15.jpg)
  ![2024-10-11 Refactoring UI - Layout and spacing - 图16](https://raw.githubusercontent.com/rockychang7/image-storage/master/2024-10-11%20Refactoring%20UI%20-%20Layout%20and%20spacing%20-%20%E5%9B%BE16.jpg)
如果设计的时候一列表现的在页面不是特别好，可以考虑拆分成多列进行展示：
  ![2024-10-11 Refactoring UI - Layout and spacing - 图17](https://raw.githubusercontent.com/rockychang7/image-storage/master/2024-10-11%20Refactoring%20UI%20-%20Layout%20and%20spacing%20-%20%E5%9B%BE17.jpg)
  ![2024-10-11 Refactoring UI - Layout and spacing - 图18](https://raw.githubusercontent.com/rockychang7/image-storage/master/2024-10-11%20Refactoring%20UI%20-%20Layout%20and%20spacing%20-%20%E5%9B%BE18.jpg)
## 4. Grids are overrated
这个点是说我们在设计ui布局的时候，不是所有的元素都要遵循占用多少grids的方式去排版（这种布局方式对应可以使用css中的flex,grid布局去实现）。 因为这种方式为导致某些元素在调整整体页面大小的时候表现的非常糟糕。

以sidebar为示例：
  ![2024-10-11 Refactoring UI - Layout and spacing - 图19](https://raw.githubusercontent.com/rockychang7/image-storage/master/2024-10-11%20Refactoring%20UI%20-%20Layout%20and%20spacing%20-%20%E5%9B%BE19.jpg)
  
  
  ![2024-10-11 Refactoring UI - Layout and spacing - 图20](https://raw.githubusercontent.com/rockychang7/image-storage/master/2024-10-11%20Refactoring%20UI%20-%20Layout%20and%20spacing%20-%20%E5%9B%BE20.jpg)
   ![2024-10-11 Refactoring UI - Layout and spacing - 图21](https://raw.githubusercontent.com/rockychang7/image-storage/master/2024-10-11%20Refactoring%20UI%20-%20Layout%20and%20spacing%20-%20%E5%9B%BE21.jpg)
   可以看到如果以百分比的方式控制宽度，sidebar在某些宽度下表现的不是那么适配。所以好的做法是固定好sidebar的宽度：
   ![2024-10-11 Refactoring UI - Layout and spacing - 图22](https://raw.githubusercontent.com/rockychang7/image-storage/master/2024-10-11%20Refactoring%20UI%20-%20Layout%20and%20spacing%20-%20%E5%9B%BE22.jpg)

对于组件也是一样的原理：
  ![2024-10-11 Refactoring UI - Layout and spacing - 图23](https://raw.githubusercontent.com/rockychang7/image-storage/master/2024-10-11%20Refactoring%20UI%20-%20Layout%20and%20spacing%20-%20%E5%9B%BE23.jpg)
  

   > [!important] 注意
> 实际设计中需要控制好元素的宽度，不是所有内容都需要fluid的特性

## 5. Relative sizing doesn’t scale
这个点是说相对的尺寸大小不是完全按照比例进行扩展，需要根据实际情况来调整。

这里用字体的相对大小举例：
  ![2024-10-11 Refactoring UI - Layout and spacing - 图24](https://raw.githubusercontent.com/rockychang7/image-storage/master/2024-10-11%20Refactoring%20UI%20-%20Layout%20and%20spacing%20-%20%E5%9B%BE24.jpg)
  ![2024-10-11 Refactoring UI - Layout and spacing - 图25](https://raw.githubusercontent.com/rockychang7/image-storage/master/2024-10-11%20Refactoring%20UI%20-%20Layout%20and%20spacing%20-%20%E5%9B%BE25.jpg)
  ![2024-10-11 Refactoring UI - Layout and spacing - 图26](https://raw.githubusercontent.com/rockychang7/image-storage/master/2024-10-11%20Refactoring%20UI%20-%20Layout%20and%20spacing%20-%20%E5%9B%BE26.jpg)
可以看出这里如果使用相对大小的字体，在手机端的head title会显得特别大，针对这种情况我们需要手动调整他的大小到合适的位置。

### 元素的相对大小
同理，对于元素的内容，也不能单存使用比例进行调整：
  ![2024-10-11 Refactoring UI - Layout and spacing - 图27](https://raw.githubusercontent.com/rockychang7/image-storage/master/2024-10-11%20Refactoring%20UI%20-%20Layout%20and%20spacing%20-%20%E5%9B%BE27.jpg)
  ![2024-10-11 Refactoring UI - Layout and spacing - 图28](https://raw.githubusercontent.com/rockychang7/image-storage/master/2024-10-11%20Refactoring%20UI%20-%20Layout%20and%20spacing%20-%20%E5%9B%BE28.jpg)
如图可以看到，如果单纯按scale进行扩展，Button的大小明显不协调，手动调整对应的padding后看起来合适很多。

## 6. Avoid ambiguous spacing
这个点是说，在元素块与块之间没有确切的标识的情况下，用更加明显的建立来区分不同元素。

如果有明显的divider是这样的：
 ![2024-10-11 Refactoring UI - Layout and spacing - 图29](https://raw.githubusercontent.com/rockychang7/image-storage/master/2024-10-11%20Refactoring%20UI%20-%20Layout%20and%20spacing%20-%20%E5%9B%BE29.jpg)
 如果没有的话，乱使用spacing会造成歧义：
   ![2024-10-11 Refactoring UI - Layout and spacing - 图30](https://raw.githubusercontent.com/rockychang7/image-storage/master/2024-10-11%20Refactoring%20UI%20-%20Layout%20and%20spacing%20-%20%E5%9B%BE30.jpg)
 调整后如下：
   ![2024-10-11 Refactoring UI - Layout and spacing - 图31](https://raw.githubusercontent.com/rockychang7/image-storage/master/2024-10-11%20Refactoring%20UI%20-%20Layout%20and%20spacing%20-%20%E5%9B%BE31.jpg)
类似的问题和修复方式如下：
  ![2024-10-11 Refactoring UI - Layout and spacing - 图32](https://raw.githubusercontent.com/rockychang7/image-storage/master/2024-10-11%20Refactoring%20UI%20-%20Layout%20and%20spacing%20-%20%E5%9B%BE32.jpg)
  ![2024-10-11 Refactoring UI - Layout and spacing - 图33](https://raw.githubusercontent.com/rockychang7/image-storage/master/2024-10-11%20Refactoring%20UI%20-%20Layout%20and%20spacing%20-%20%E5%9B%BE33.jpg)
同样在水平方向也要控制好间距：
  ![2024-10-11 Refactoring UI - Layout and spacing - 图34](https://raw.githubusercontent.com/rockychang7/image-storage/master/2024-10-11%20Refactoring%20UI%20-%20Layout%20and%20spacing%20-%20%E5%9B%BE34.jpg)

## 总结
这篇笔记重点探讨了间距与布局之间的关系，以及如何通过合理控制间距来优化页面布局。针对如何让页面的布局显得好看合理至关重要。

首先，需要建立一个间距系统（spacing system），并尽量保持足够的空白感（whitespace）。同时，要合理控制元素在页面中是使用动态宽度还是固定宽度，以达到理想的布局效果。

通过有效地利用间距，可以更好地组织不同元素之间的关系，使页面结构更为清晰。此外，相对大小在布局中虽然有助于自适应设计，但在某些情况下可能需要手动调整，以达到更佳的视觉效果和一致性。
