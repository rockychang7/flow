---
title: "Refactoring UI - Hierarchy is everything"
topic: "refactoring-ui"
created: 2024-10-10
updated: 2026-08-25
order: 1
source_url: "https://www.refactoringui.com/"
draft: false
synced: true
---
本篇记录和思考refactoringui中阐述的hierarchy(层级)在ui设计中的重要性

问题：为了让页面中的元素更加的具有设计感，简单增加样式是达不到这个效果的，如果所有的元素具有相同的层级反而可能会使页面更加混乱。
解决：为了让不同元素更加有设计感的最有用的方式就是搞清楚不同元素之间在同一个页面应该具有不同层级，重要的元素需要让用户一眼看到，不那么重要的元素正常显示就行。下面两张图展示了所有元素相同的层级和不同层级展示出的不同效果：
![2024-10-10 Refactoring UI - Hierarchy is everything - 图01](https://raw.githubusercontent.com/rockychang7/image-storage/master/2024-10-10%20Refactoring%20UI%20-%20Hierarchy%20is%20everything%20-%20%E5%9B%BE01.jpg)
![2024-10-10 Refactoring UI - Hierarchy is everything - 图02](https://raw.githubusercontent.com/rockychang7/image-storage/master/2024-10-10%20Refactoring%20UI%20-%20Hierarchy%20is%20everything%20-%20%E5%9B%BE02.jpg)
让元素显示不同层级的具体方式(也是个人设计开发的时候能够还发出精美ui的基础)
## 1. Size isn’t everything
这个点是说不要单纯的使用字体的大小来控制元素的hierarchy。这个也好理解，单纯使用大小虽然能突出元素，但是页面的整体协调性可能会变差。好的做法是配合**font weight**，**font color**等样式共同控制元素的层级：

- 单纯使用font-size效果：
  ![2024-10-10 Refactoring UI - Hierarchy is everything - 图03](https://raw.githubusercontent.com/rockychang7/image-storage/master/2024-10-10%20Refactoring%20UI%20-%20Hierarchy%20is%20everything%20-%20%E5%9B%BE03.jpg)

- font-size配合font-weight效果：
  ![2024-10-10 Refactoring UI - Hierarchy is everything - 图04](https://raw.githubusercontent.com/rockychang7/image-storage/master/2024-10-10%20Refactoring%20UI%20-%20Hierarchy%20is%20everything%20-%20%E5%9B%BE04.jpg)
- font-size配合font-color效果:
  ![2024-10-10 Refactoring UI - Hierarchy is everything - 图05](https://raw.githubusercontent.com/rockychang7/image-storage/master/2024-10-10%20Refactoring%20UI%20-%20Hierarchy%20is%20everything%20-%20%E5%9B%BE05.jpg)
- 综合使用效果：
  ![2024-10-10 Refactoring UI - Hierarchy is everything - 图06](https://raw.githubusercontent.com/rockychang7/image-storage/master/2024-10-10%20Refactoring%20UI%20-%20Hierarchy%20is%20everything%20-%20%E5%9B%BE06.jpg)

> [!tip] 注意事项
> 实际开发设计中，normal weight一般使用400-500，不要使用400以下的weight,因为可读性差，如果400还是太重，可以考虑使用lighter color或者更小的font size来淡化元素。同理针对heavier weight一般使用600-700，不然就用color，size等来强化元素

## 2. Don’t use grey text on colored backgrounds
这条是说不要在彩色背景下使用灰色字体来淡化元素，这样会让字体看起来不清晰，如图所示：
![2024-10-10 Refactoring UI - Hierarchy is everything - 图07](https://raw.githubusercontent.com/rockychang7/image-storage/master/2024-10-10%20Refactoring%20UI%20-%20Hierarchy%20is%20everything%20-%20%E5%9B%BE07.jpg)
比较好的做法是使用和背景颜色相同的颜色，但是使用饱和度和亮度不这么显眼的数值来淡化，效果如下：
![2024-10-10 Refactoring UI - Hierarchy is everything - 图08](https://raw.githubusercontent.com/rockychang7/image-storage/master/2024-10-10%20Refactoring%20UI%20-%20Hierarchy%20is%20everything%20-%20%E5%9B%BE08.jpg)
## 3. Emphasize by de-emphasizing
如果对于某个元素在页面中已经足够突出，可以通过淡化附近的元素来达到突出当前元素的效果：
![2024-10-10 Refactoring UI - Hierarchy is everything - 图09](https://raw.githubusercontent.com/rockychang7/image-storage/master/2024-10-10%20Refactoring%20UI%20-%20Hierarchy%20is%20everything%20-%20%E5%9B%BE09.jpg)
![2024-10-10 Refactoring UI - Hierarchy is everything - 图10](https://raw.githubusercontent.com/rockychang7/image-storage/master/2024-10-10%20Refactoring%20UI%20-%20Hierarchy%20is%20everything%20-%20%E5%9B%BE10.jpg)
![2024-10-10 Refactoring UI - Hierarchy is everything - 图11](https://raw.githubusercontent.com/rockychang7/image-storage/master/2024-10-10%20Refactoring%20UI%20-%20Hierarchy%20is%20everything%20-%20%E5%9B%BE11.jpg)
## 4. Labels are a last resort

在展示数据的时候不要急着用标签增加元素的层级，明显的数据比如名字，工作等完全不用label来说明。
![2024-10-10 Refactoring UI - Hierarchy is everything - 图12](https://raw.githubusercontent.com/rockychang7/image-storage/master/2024-10-10%20Refactoring%20UI%20-%20Hierarchy%20is%20everything%20-%20%E5%9B%BE12.jpg)
![2024-10-10 Refactoring UI - Hierarchy is everything - 图13](https://raw.githubusercontent.com/rockychang7/image-storage/master/2024-10-10%20Refactoring%20UI%20-%20Hierarchy%20is%20everything%20-%20%E5%9B%BE13.jpg)

如果需要使用标签也可以换一种方式，让它和数据组合使用：
![2024-10-10 Refactoring UI - Hierarchy is everything - 图14](https://raw.githubusercontent.com/rockychang7/image-storage/master/2024-10-10%20Refactoring%20UI%20-%20Hierarchy%20is%20everything%20-%20%E5%9B%BE14.jpg)
![2024-10-10 Refactoring UI - Hierarchy is everything - 图15](https://raw.githubusercontent.com/rockychang7/image-storage/master/2024-10-10%20Refactoring%20UI%20-%20Hierarchy%20is%20everything%20-%20%E5%9B%BE15.jpg)

在像比如dashboard中也许需要指定label，但是也可以通过强化数据来淡化标签，因为数据是最重要的，标签是次要的起到补充说明的作用：

![2024-10-10 Refactoring UI - Hierarchy is everything - 图16](https://raw.githubusercontent.com/rockychang7/image-storage/master/2024-10-10%20Refactoring%20UI%20-%20Hierarchy%20is%20everything%20-%20%E5%9B%BE16.jpg)

除非有些特殊场景，比如手机参数场景，需要用标签并且加深他的显示,这种场景下数据也是重要的不要过度淡化：
![2024-10-10 Refactoring UI - Hierarchy is everything - 图17](https://raw.githubusercontent.com/rockychang7/image-storage/master/2024-10-10%20Refactoring%20UI%20-%20Hierarchy%20is%20everything%20-%20%E5%9B%BE17.jpg)


## 5. Separate visual hierarchy from document hierarchy
这点是在说不要将html doc中的标签比如h1,h2等标签的语义强行运用到视觉层次中去，这样可能并不都适合：

![2024-10-10 Refactoring UI - Hierarchy is everything - 图18](https://raw.githubusercontent.com/rockychang7/image-storage/master/2024-10-10%20Refactoring%20UI%20-%20Hierarchy%20is%20everything%20-%20%E5%9B%BE18.jpg)
这里Manage Account用的是h1标签默认是24px，但是很显然放在这里比较大，它不是合适的视觉层次，因此这种情况我们要主动调整h1的大小：
![2024-10-10 Refactoring UI - Hierarchy is everything - 图19](https://raw.githubusercontent.com/rockychang7/image-storage/master/2024-10-10%20Refactoring%20UI%20-%20Hierarchy%20is%20everything%20-%20%E5%9B%BE19.jpg)

结论：不要然特定的标签影响我们添加样式，标签只作为语义该怎么添加样式还是怎么添加

## 6. Balance weight and contrast
这条是说在特定的场景下如何通过粗细和对比度之间的互补来实现元素的不同hierarchy。

场景1（使用对比度来补偿粗细）：使用icon进行设计的时候，由于icon特别是solid样式的默认都会占用非常多的surface area(默认weight就是很大)，这样子就不能通过改变weight来淡化元素。比较好的方式就是较少icon和背景的对比度来实现类似的效果，前后效果如下：
![2024-10-10 Refactoring UI - Hierarchy is everything - 图20](https://raw.githubusercontent.com/rockychang7/image-storage/master/2024-10-10%20Refactoring%20UI%20-%20Hierarchy%20is%20everything%20-%20%E5%9B%BE20.jpg)
![2024-10-10 Refactoring UI - Hierarchy is everything - 图21](https://raw.githubusercontent.com/rockychang7/image-storage/master/2024-10-10%20Refactoring%20UI%20-%20Hierarchy%20is%20everything%20-%20%E5%9B%BE21.jpg)

> [!tip] 最佳实践
> 这种做法适用于任何有不同weight的元素，但是weight不好修改，就可以修改从对比度达到类似的效果

场景2（使用粗细来补偿对比度）： 和场景1类似，使用weight来给低对比度的元素一点强调也是一种非常有用的方式，比如针对border元素，如果调整好对比度后但是元素显示的比较不明显，那么可以适当增加一点粗细来改善这个效果：
![2024-10-10 Refactoring UI - Hierarchy is everything - 图22](https://raw.githubusercontent.com/rockychang7/image-storage/master/2024-10-10%20Refactoring%20UI%20-%20Hierarchy%20is%20everything%20-%20%E5%9B%BE22.jpg)
![2024-10-10 Refactoring UI - Hierarchy is everything - 图23](https://raw.githubusercontent.com/rockychang7/image-storage/master/2024-10-10%20Refactoring%20UI%20-%20Hierarchy%20is%20everything%20-%20%E5%9B%BE23.jpg)
## 7. Semantics are secondary
这个点是说在设计actions的时候，应该首先考虑的是不同actions之间的层级，其次再考虑每个actions的语义。如果只考虑语义的化，页面会变得busy和混乱：

![2024-10-10 Refactoring UI - Hierarchy is everything - 图24](https://raw.githubusercontent.com/rockychang7/image-storage/master/2024-10-10%20Refactoring%20UI%20-%20Hierarchy%20is%20everything%20-%20%E5%9B%BE24.jpg)
正确的做法：每个页面基本上应该只包含一个最重要的action,以及一些secondary actions，可能还会有一些更不常用的tertiary actions。这些action的具体设计如下：
- **Primary actions**: 需要非常明显（solid,high contrast background)
- **Secondary actions**:没必要非常明显(outline，弱对比度的背景颜色)
- **Tertiary actions**: 能被发现但是不应该引人注目（Links等形式出现即可）
因此最后正确的设计如下：
![2024-10-10 Refactoring UI - Hierarchy is everything - 图25](https://raw.githubusercontent.com/rockychang7/image-storage/master/2024-10-10%20Refactoring%20UI%20-%20Hierarchy%20is%20everything%20-%20%E5%9B%BE25.jpg)
如果遵循上面的规则，不同color scheme下action的设计参考：
![2024-10-10 Refactoring UI - Hierarchy is everything - 图26](https://raw.githubusercontent.com/rockychang7/image-storage/master/2024-10-10%20Refactoring%20UI%20-%20Hierarchy%20is%20everything%20-%20%E5%9B%BE26.jpg)
### Destructive actions
针对破坏性的actions设计，也不是说一定要是big,red,solid形式的设计，还是需要根据actions在页面中的层级来决定应该如何设计：
![2024-10-10 Refactoring UI - Hierarchy is everything - 图27](https://raw.githubusercontent.com/rockychang7/image-storage/master/2024-10-10%20Refactoring%20UI%20-%20Hierarchy%20is%20everything%20-%20%E5%9B%BE27.jpg)
并且最佳实现这种actions应该搭配confirm step来执行最终的action,在confirm modal下，使用primary action来表示这个动作：
![2024-10-10 Refactoring UI - Hierarchy is everything - 图28](https://raw.githubusercontent.com/rockychang7/image-storage/master/2024-10-10%20Refactoring%20UI%20-%20Hierarchy%20is%20everything%20-%20%E5%9B%BE28.jpg)
## 总结
本篇笔记介绍了hierarchy在ui设计中的关键作用，以及具体介绍了通过字体大小，字体粗细，颜色以及不同的策略等来塑造元素合适的层级。这个概念我觉得非常重要，为什么平常自己开发ui总感觉很难看，对于层级的概念不敏感是一个很重要的因素。
