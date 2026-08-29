---
title: "Refactoring UI - Creating depth"
topic: "refactoring-ui"
created: 2024-10-14
updated: 2026-08-25
source_url: "https://www.refactoringui.com/"
draft: false
synced: true
---
本篇笔记阐述在实际ui中应该如何创建depth,以及在不同场景如何创建合适的depth

## 1. Emulate a light source
这个点通过了解depth产生的原理开始，阐述在web开发中如何模拟类似的效果。

首先，depth的产生和光源是有关系的，凸起的地方获取光更多，反之显得更加凹陷，利用这个原理就可以在web中模拟实现这个效果：
![2024-10-14 Refactoring UI - Creating depth - 图01](https://raw.githubusercontent.com/rockychang7/image-storage/master/2024-10-14%20Refactoring%20UI%20-%20Creating%20depth%20-%20%E5%9B%BE01.jpg)
![2024-10-14 Refactoring UI - Creating depth - 图02](https://raw.githubusercontent.com/rockychang7/image-storage/master/2024-10-14%20Refactoring%20UI%20-%20Creating%20depth%20-%20%E5%9B%BE02.jpg)

![2024-10-14 Refactoring UI - Creating depth - 图03](https://raw.githubusercontent.com/rockychang7/image-storage/master/2024-10-14%20Refactoring%20UI%20-%20Creating%20depth%20-%20%E5%9B%BE03.jpg)
![2024-10-14 Refactoring UI - Creating depth - 图04](https://raw.githubusercontent.com/rockychang7/image-storage/master/2024-10-14%20Refactoring%20UI%20-%20Creating%20depth%20-%20%E5%9B%BE04.jpg)
上面的实际效果图可以感受到凸起和凹陷生成的原因，接下来web页面中实现下：

实现方法结合shadow或者border可以模拟出类似的效果：
![2024-10-14 Refactoring UI - Creating depth - 图05](https://raw.githubusercontent.com/rockychang7/image-storage/master/2024-10-14%20Refactoring%20UI%20-%20Creating%20depth%20-%20%E5%9B%BE05.jpg)


![2024-10-14 Refactoring UI - Creating depth - 图06](https://raw.githubusercontent.com/rockychang7/image-storage/master/2024-10-14%20Refactoring%20UI%20-%20Creating%20depth%20-%20%E5%9B%BE06.jpg)
![2024-10-14 Refactoring UI - Creating depth - 图07](https://raw.githubusercontent.com/rockychang7/image-storage/master/2024-10-14%20Refactoring%20UI%20-%20Creating%20depth%20-%20%E5%9B%BE07.jpg)
可以看到，通过给Button上边界增加一个半透明的内嵌阴影和下边界增加一个黑色的阴影就可以模拟出具有depth的效果

同样的如果想要构建一个凹陷的效果，下面的边应该是光源最多最亮的，所以给他一个亮色的阴影而上面的边应该是光源最少的，给他一个内嵌的暗色的阴影：
![2024-10-14 Refactoring UI - Creating depth - 图08](https://raw.githubusercontent.com/rockychang7/image-storage/master/2024-10-14%20Refactoring%20UI%20-%20Creating%20depth%20-%20%E5%9B%BE08.jpg)
![2024-10-14 Refactoring UI - Creating depth - 图09](https://raw.githubusercontent.com/rockychang7/image-storage/master/2024-10-14%20Refactoring%20UI%20-%20Creating%20depth%20-%20%E5%9B%BE09.jpg)
![2024-10-14 Refactoring UI - Creating depth - 图10](https://raw.githubusercontent.com/rockychang7/image-storage/master/2024-10-14%20Refactoring%20UI%20-%20Creating%20depth%20-%20%E5%9B%BE10.jpg)
记住这个原理即可，想要创建depth就非常容易了，类似的例子如下：
![2024-10-14 Refactoring UI - Creating depth - 图11](https://raw.githubusercontent.com/rockychang7/image-storage/master/2024-10-14%20Refactoring%20UI%20-%20Creating%20depth%20-%20%E5%9B%BE11.jpg)

> [!caution] 注意
> 不要随意的创建depth，会让页面显得混乱，针对合适的元素适当使用即可

## 2. Use shadows to convey elevation
这个点详细解释如何用shadow来表示梯度

首选提一下之前一直说的[建立设计系统](/notes/refactoring-ui-overview),针对shadow也需要提前建立好梯度系统：
![2024-10-14 Refactoring UI - Creating depth - 图12](https://raw.githubusercontent.com/rockychang7/image-storage/master/2024-10-14%20Refactoring%20UI%20-%20Creating%20depth%20-%20%E5%9B%BE12.jpg)
![2024-10-14 Refactoring UI - Creating depth - 图13](https://raw.githubusercontent.com/rockychang7/image-storage/master/2024-10-14%20Refactoring%20UI%20-%20Creating%20depth%20-%20%E5%9B%BE13.jpg)
可以看到，阴影大的显得更加突出,所以使用：
**小阴影**让元素微微突出但不过于吸引人眼球：
![2024-10-14 Refactoring UI - Creating depth - 图14](https://raw.githubusercontent.com/rockychang7/image-storage/master/2024-10-14%20Refactoring%20UI%20-%20Creating%20depth%20-%20%E5%9B%BE14.jpg)
**中等阴影**可以用于Dropmenus等需要更加突出一点的组件元素：
![2024-10-14 Refactoring UI - Creating depth - 图15](https://raw.githubusercontent.com/rockychang7/image-storage/master/2024-10-14%20Refactoring%20UI%20-%20Creating%20depth%20-%20%E5%9B%BE15.jpg)
**大阴影**则可以用于modal dialogs等需要完全吸引人的一些元素：
![2024-10-14 Refactoring UI - Creating depth - 图16](https://raw.githubusercontent.com/rockychang7/image-storage/master/2024-10-14%20Refactoring%20UI%20-%20Creating%20depth%20-%20%E5%9B%BE16.jpg)

可以将交互和shadow结合使用，这点还是对页面更加有设计感很好用：
![2024-10-14 Refactoring UI - Creating depth - 图17](https://raw.githubusercontent.com/rockychang7/image-storage/master/2024-10-14%20Refactoring%20UI%20-%20Creating%20depth%20-%20%E5%9B%BE17.jpg)
这里当用户点击或者Drag的时候，将该条item添加一个适当的阴影就会感觉到交互感。类似的如果点击Button的时候取消他的Shadow，也会增加交互的感觉：
![2024-10-14 Refactoring UI - Creating depth - 图18](https://raw.githubusercontent.com/rockychang7/image-storage/master/2024-10-14%20Refactoring%20UI%20-%20Creating%20depth%20-%20%E5%9B%BE18.jpg)
## 3. Shadows can have two parts
这个点详细阐述css中shadows的多种用法，首先看一个效果：
![2024-10-14 Refactoring UI - Creating depth - 图19](https://raw.githubusercontent.com/rockychang7/image-storage/master/2024-10-14%20Refactoring%20UI%20-%20Creating%20depth%20-%20%E5%9B%BE19.jpg)
可以看到上面的阴影效果非常不错，它是使用两种不同阴影的叠加效果生成，至于为什么要这样用，其实也是模拟了现实中不同的角度的阴影效果：
![2024-10-14 Refactoring UI - Creating depth - 图20](https://raw.githubusercontent.com/rockychang7/image-storage/master/2024-10-14%20Refactoring%20UI%20-%20Creating%20depth%20-%20%E5%9B%BE20.jpg)
![2024-10-14 Refactoring UI - Creating depth - 图21](https://raw.githubusercontent.com/rockychang7/image-storage/master/2024-10-14%20Refactoring%20UI%20-%20Creating%20depth%20-%20%E5%9B%BE21.jpg)
**第一种阴影**看起来更大更柔和，有一个比较大的垂直偏移以及一个更大的blur radius。它模拟直接光源在物体后面投射的阴影。
**第二种阴影**看起来更小更暗，垂直距离也比较小以及一个更小的blur radius。它模拟了物体下方的阴影区域，该区域环境光也难以到达。
> [!tip] 小技巧
> 组合使用这两种阴影可以模拟出现实的这种效果，既有大阴影的效果又在靠近元素的边上有暗色的紧凑的阴影。

![2024-10-14 Refactoring UI - Creating depth - 图22](https://raw.githubusercontent.com/rockychang7/image-storage/master/2024-10-14%20Refactoring%20UI%20-%20Creating%20depth%20-%20%E5%9B%BE22.jpg)
如果实战中要给自己的元素创建这种效果，需要遵循显示的规则：如果物体越远离表面那么他的阴影会慢慢消失，所以创建效果如下(如果非常远离表面的话，那么紧凑的阴影效果就应该彻底消失)：
![2024-10-14 Refactoring UI - Creating depth - 图23](https://raw.githubusercontent.com/rockychang7/image-storage/master/2024-10-14%20Refactoring%20UI%20-%20Creating%20depth%20-%20%E5%9B%BE23.jpg)


## 4. Even flat designs can have depth
这个点阐述不依靠shadow或者border，单纯的平面设计也可以创建depth,这个给现实设计带来了不同的角度，也非常有用。
![2024-10-14 Refactoring UI - Creating depth - 图24](https://raw.githubusercontent.com/rockychang7/image-storage/master/2024-10-14%20Refactoring%20UI%20-%20Creating%20depth%20-%20%E5%9B%BE24.jpg)
正常的平面设计如上图，如果想要通过别的方式创建depth,可以基于如下方式：
**通过颜色创建depth**:更亮的颜色可以让元素表现的更加突出，而更暗的颜色会让元素表现的更加凹陷：
![2024-10-14 Refactoring UI - Creating depth - 图25](https://raw.githubusercontent.com/rockychang7/image-storage/master/2024-10-14%20Refactoring%20UI%20-%20Creating%20depth%20-%20%E5%9B%BE25.jpg)
通过不带任何blur radius，只有些许vertical offset的shadow实现depth，这种方式可以最小限度的不破坏平面设计原有的样子：
![2024-10-14 Refactoring UI - Creating depth - 图26](https://raw.githubusercontent.com/rockychang7/image-storage/master/2024-10-14%20Refactoring%20UI%20-%20Creating%20depth%20-%20%E5%9B%BE26.jpg)
## 5. Overlap elements to create layers
这个点阐述如何通过元素之间的覆盖来创建多层关系，这个也属于创建depth的一种补充，实践可以考虑使用

典型的实现如下：
![2024-10-14 Refactoring UI - Creating depth - 图27](https://raw.githubusercontent.com/rockychang7/image-storage/master/2024-10-14%20Refactoring%20UI%20-%20Creating%20depth%20-%20%E5%9B%BE27.jpg)
可以看到搜索框元素从一开始的在同一个背景色上修改到横跨两个不同背景色的元素，看起来就像悬浮在页面之上。

类似的让元素的高度超过父元素可以实现这种效果：
![2024-10-14 Refactoring UI - Creating depth - 图28](https://raw.githubusercontent.com/rockychang7/image-storage/master/2024-10-14%20Refactoring%20UI%20-%20Creating%20depth%20-%20%E5%9B%BE28.jpg)
针对小元素也可以使用类似的方式实现这种效果，比如轮播图的左右按钮：
![2024-10-14 Refactoring UI - Creating depth - 图29](https://raw.githubusercontent.com/rockychang7/image-storage/master/2024-10-14%20Refactoring%20UI%20-%20Creating%20depth%20-%20%E5%9B%BE29.jpg)
需要注意一种特殊场景，如果用这种方式在图片之间实现这种效果，可以会看起来不清晰，解决方式是给上层图片增加一个看不见的gap:
![2024-10-14 Refactoring UI - Creating depth - 图30](https://raw.githubusercontent.com/rockychang7/image-storage/master/2024-10-14%20Refactoring%20UI%20-%20Creating%20depth%20-%20%E5%9B%BE30.jpg)
![2024-10-14 Refactoring UI - Creating depth - 图31](https://raw.githubusercontent.com/rockychang7/image-storage/master/2024-10-14%20Refactoring%20UI%20-%20Creating%20depth%20-%20%E5%9B%BE31.jpg)
## 6. 总结
本篇笔记介绍了ui设计中实现depth的原理，并且介绍了应该如何创建depth系统以及如何在不同场景使用不同程度的depth.最后，介绍了使用非shadow方式创建depth的不同视角。实际的ui设计中可以借鉴本篇笔记来设计对应的depth。
