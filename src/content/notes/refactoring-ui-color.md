---
title: "Refactoring UI - Working with color"
topic: "refactoring-ui"
created: 2024-10-13
updated: 2026-08-25
source_url: "https://www.refactoringui.com/"
draft: false
synced: true
---
本篇笔记记录在ui设计中使用颜色的一些最佳实践，在实际开发设计color的时候可以参考这篇笔记。

## 1. Ditch hex for HSL
在设计color之前，一些前提概念需要进行了解。首先，在web浏览器中，表示颜色的方式有**HEX**,**RGB**,**HSL**,**OKLCH**。下面首先使用**HEX**和**HSL**来进行展示:
  ![2024-10-13 Refactoring UI - Working with color - 图01](https://raw.githubusercontent.com/rockychang7/image-storage/master/2024-10-13%20Refactoring%20UI%20-%20Working%20with%20color%20-%20%E5%9B%BE01.jpg)
  ![2024-10-13 Refactoring UI - Working with color - 图02](https://raw.githubusercontent.com/rockychang7/image-storage/master/2024-10-13%20Refactoring%20UI%20-%20Working%20with%20color%20-%20%E5%9B%BE02.jpg)
接下来，解释下这几个表示颜色的方式的原理：
- **RGB**: RGB通过混合**红色 (Red)**、**绿色 (Green)** 和**蓝色 (Blue)** 三种基本颜色来创建各种颜色。每种颜色的强度可以从 0 到 255 之间变化（共 256 级），这些不同强度的组合可以生成大量的颜色。
- **HEX**：HEX是基于 **RGB（红、绿、蓝)** 颜色模型，将颜色表示为 16 进制（十六进制）数。HEX和RGB之间可以相互转换
- **HSL**: HSL是基于**色相 (Hue)**、**饱和度 (Saturation)** 和**亮度 (Lightness)**来表示不同的颜色
- **OKLCH**:OKLCH基于**色相 (Hue)**、**饱和度 (Chroma)** 和 **亮度 (Lightness)** 生成颜色。这个特性还比较新，暂时不用。它旨在提供更直观和一致的颜色感知，特别是在处理设计和图形时。
### hsl详细介绍
综合考虑下来，在设计color的时候，使用**HSL**这种方式来定义颜色。下面详细介绍下HSL定义和使用方式：
- HSL通过**Hue**来确定使用的基准色。所以通过Hue我们大概也能判断两个hsl是否使用相同的基准色。
  ![2024-10-13 Refactoring UI - Working with color - 图03](https://raw.githubusercontent.com/rockychang7/image-storage/master/2024-10-13%20Refactoring%20UI%20-%20Working%20with%20color%20-%20%E5%9B%BE03.jpg)

- HSL通过**Saturation(饱和度)** 来决定颜色的鲜艳和生动程度
  ![2024-10-13 Refactoring UI - Working with color - 图04](https://raw.githubusercontent.com/rockychang7/image-storage/master/2024-10-13%20Refactoring%20UI%20-%20Working%20with%20color%20-%20%E5%9B%BE04.jpg)
  如果**Saturation**是0，改变Hue的值也是没有用的：
  ![2024-10-13 Refactoring UI - Working with color - 图05](https://raw.githubusercontent.com/rockychang7/image-storage/master/2024-10-13%20Refactoring%20UI%20-%20Working%20with%20color%20-%20%E5%9B%BE05.jpg)
- HSL通过**Lightness(亮度)** 控制颜色更加地接近黑色或者白色:
  ![2024-10-13 Refactoring UI - Working with color - 图06](https://raw.githubusercontent.com/rockychang7/image-storage/master/2024-10-13%20Refactoring%20UI%20-%20Working%20with%20color%20-%20%E5%9B%BE06.jpg)

对于HSL的使用和定义到这里讲解结束，实践中推荐使用这种方式

## 2. You need more colors than you think
这个点阐述了实际的设计中应该使用哪些类型的颜色，以及我们应该如何创建这些类型的颜色

首先看一下我们使用任意的color palette来创建一个ui页面：
  ![2024-10-13 Refactoring UI - Working with color - 图07](https://raw.githubusercontent.com/rockychang7/image-storage/master/2024-10-13%20Refactoring%20UI%20-%20Working%20with%20color%20-%20%E5%9B%BE07.jpg)
  ![2024-10-13 Refactoring UI - Working with color - 图08](https://raw.githubusercontent.com/rockychang7/image-storage/master/2024-10-13%20Refactoring%20UI%20-%20Working%20with%20color%20-%20%E5%9B%BE08.jpg)
个人的感觉是页面的颜色太过混乱和不协调，看起来非常不舒服。正常的设计应该如下：
  ![2024-10-13 Refactoring UI - Working with color - 图09](https://raw.githubusercontent.com/rockychang7/image-storage/master/2024-10-13%20Refactoring%20UI%20-%20Working%20with%20color%20-%20%E5%9B%BE09.jpg)
在设计color的时候，主要分为如下几类颜色：
- **Primary color(s)**: **Primary color**是网站中可以代表整体样貌的颜色(品牌颜色)，往往只有一种（少数也可能两种） 。它主要运用于网站的**primary actions,active navigation elements**等交互性的元素中：
  ![2024-10-13 Refactoring UI - Working with color - 图10](https://raw.githubusercontent.com/rockychang7/image-storage/master/2024-10-13%20Refactoring%20UI%20-%20Working%20with%20color%20-%20%E5%9B%BE10.jpg)
- **Greys**：灰色是页面中大部分内容的颜色，比如text(文字),backgrounds(背景),panels(表盘)，form controls(表单元素)，效果示例:
  ![2024-10-13 Refactoring UI - Working with color - 图11](https://raw.githubusercontent.com/rockychang7/image-storage/master/2024-10-13%20Refactoring%20UI%20-%20Working%20with%20color%20-%20%E5%9B%BE11.jpg)
- **Accent colors**：Accent colors是网站上用于强调某些不同功能或者特性的**强调色**，往往用于**推送某个功能**，**强调某个破坏性行为**等元素，效果示例如下：
  ![2024-10-13 Refactoring UI - Working with color - 图12](https://raw.githubusercontent.com/rockychang7/image-storage/master/2024-10-13%20Refactoring%20UI%20-%20Working%20with%20color%20-%20%E5%9B%BE12.jpg)
  ![2024-10-13 Refactoring UI - Working with color - 图13](https://raw.githubusercontent.com/rockychang7/image-storage/master/2024-10-13%20Refactoring%20UI%20-%20Working%20with%20color%20-%20%E5%9B%BE13.jpg)
  ![2024-10-13 Refactoring UI - Working with color - 图14](https://raw.githubusercontent.com/rockychang7/image-storage/master/2024-10-13%20Refactoring%20UI%20-%20Working%20with%20color%20-%20%E5%9B%BE14.jpg)
  ![2024-10-13 Refactoring UI - Working with color - 图15](https://raw.githubusercontent.com/rockychang7/image-storage/master/2024-10-13%20Refactoring%20UI%20-%20Working%20with%20color%20-%20%E5%9B%BE15.jpg)
> [!summary] 总结
> 这里就能知道，每个网站都应该包括三种类型的颜色分别用于不同功能的元素

## 3. Define your shades up front
上面知道了我们应该用什么类型的颜色，但是对于每一个类型的颜色需要明白另一条规则 ：针对稍微复杂的页面，对于每一个颜色需要5-10中色调。下面就介绍应该如何创建这些色调。

总体的效果图如下:
  ![2024-10-13 Refactoring UI - Working with color - 图16](https://raw.githubusercontent.com/rockychang7/image-storage/master/2024-10-13%20Refactoring%20UI%20-%20Working%20with%20color%20-%20%E5%9B%BE16.jpg)
shades具体创建步骤：
- 首选需要选择一个**base color**: 这个颜色不能太亮或者太暗，一般对于primary color或者accent color，如果button的表现形式比较好就算合格: 
  ![2024-10-13 Refactoring UI - Working with color - 图17](https://raw.githubusercontent.com/rockychang7/image-storage/master/2024-10-13%20Refactoring%20UI%20-%20Working%20with%20color%20-%20%E5%9B%BE17.jpg)
 - 然后需要找到颜色的边界值，比如darkest颜色需要运用于text,lightest颜色需要运用于元素的背景色，可以看下效果图：
   ![2024-10-13 Refactoring UI - Working with color - 图18](https://raw.githubusercontent.com/rockychang7/image-storage/master/2024-10-13%20Refactoring%20UI%20-%20Working%20with%20color%20-%20%E5%9B%BE18.jpg)
   找到这两个颜色后，填充到对应的位置并且可以标识好对应的数字,然后依次调整进行填充即可（具体如何调整下面会详细说明）:
   ![2024-10-13 Refactoring UI - Working with color - 图19](https://raw.githubusercontent.com/rockychang7/image-storage/master/2024-10-13%20Refactoring%20UI%20-%20Working%20with%20color%20-%20%E5%9B%BE19.jpg)
   ![2024-10-13 Refactoring UI - Working with color - 图20](https://raw.githubusercontent.com/rockychang7/image-storage/master/2024-10-13%20Refactoring%20UI%20-%20Working%20with%20color%20-%20%E5%9B%BE20.jpg)
   ![2024-10-13 Refactoring UI - Working with color - 图21](https://raw.githubusercontent.com/rockychang7/image-storage/master/2024-10-13%20Refactoring%20UI%20-%20Working%20with%20color%20-%20%E5%9B%BE21.jpg)
   需要说明的是针对**grey colors**,shades创建原理也类似，需要首先找到darkest color用于**项目文本**，lightest color用于项目**背景色**,然后依次对颜色进行填充：
   ![2024-10-13 Refactoring UI - Working with color - 图22](https://raw.githubusercontent.com/rockychang7/image-storage/master/2024-10-13%20Refactoring%20UI%20-%20Working%20with%20color%20-%20%E5%9B%BE22.jpg)
## 4. Don’t let lightness kill your saturation
这里阐述下针对上面的shades进行选取颜色的最佳实践。

**第一个点**：当lightness越来越大或者越来越小的时候，Saturation的影响力会越来越小，这会导致越靠近两极的颜色会有被冲出的感觉。为了解决这个问题，当离lightness 50%越来越远的时候，需要依次增加Saturation的值，效果如下：
![2024-10-13 Refactoring UI - Working with color - 图23](https://raw.githubusercontent.com/rockychang7/image-storage/master/2024-10-13%20Refactoring%20UI%20-%20Working%20with%20color%20-%20%E5%9B%BE23.jpg)
![2024-10-13 Refactoring UI - Working with color - 图24](https://raw.githubusercontent.com/rockychang7/image-storage/master/2024-10-13%20Refactoring%20UI%20-%20Working%20with%20color%20-%20%E5%9B%BE24.jpg)

**第二个点**：如果上面这种情况出现本身Saturation已经比较大不好改的时候，可以利用不同颜色的感官亮度来处理。
首先有个概念：不同颜色看起来亮度就是不一样的,比如下面的黄色和亮色，很明显黄色看起来更亮：
![2024-10-13 Refactoring UI - Working with color - 图25](https://raw.githubusercontent.com/rockychang7/image-storage/master/2024-10-13%20Refactoring%20UI%20-%20Working%20with%20color%20-%20%E5%9B%BE25.jpg)

![2024-10-13 Refactoring UI - Working with color - 图26](https://raw.githubusercontent.com/rockychang7/image-storage/master/2024-10-13%20Refactoring%20UI%20-%20Working%20with%20color%20-%20%E5%9B%BE26.jpg)
针对不同颜色具体的感官亮度可以通过下面的公式计算：
![2024-10-13 Refactoring UI - Working with color - 图27](https://raw.githubusercontent.com/rockychang7/image-storage/master/2024-10-13%20Refactoring%20UI%20-%20Working%20with%20color%20-%20%E5%9B%BE27.jpg)
下面列出一些颜色的感官亮度趋势：
![2024-10-13 Refactoring UI - Working with color - 图28](https://raw.githubusercontent.com/rockychang7/image-storage/master/2024-10-13%20Refactoring%20UI%20-%20Working%20with%20color%20-%20%E5%9B%BE28.jpg)
可以总结下：三个高峰值分别是yellow（黄色）,cyan（青色）, and magenta（品红），三个**低谷值**分别是red（红）, green（绿）, and blue（蓝）。

**shades具体创建**：
**做法1**：针对统一hue，单纯调整lightness控制亮度。
![2024-10-13 Refactoring UI - Working with color - 图29](https://raw.githubusercontent.com/rockychang7/image-storage/master/2024-10-13%20Refactoring%20UI%20-%20Working%20with%20color%20-%20%E5%9B%BE29.jpg)
![2024-10-13 Refactoring UI - Working with color - 图30](https://raw.githubusercontent.com/rockychang7/image-storage/master/2024-10-13%20Refactoring%20UI%20-%20Working%20with%20color%20-%20%E5%9B%BE30.jpg)
**做法2**：这样子设置就像上面说的，颜色会更接近dark或者white。还可以通过调整hue的值更接近上面所说的**高峰值（ 60°,180°, or 300°）**，同样可以增加亮度，或者更加接近**低估值（0°,120°, or 240°）**，同样可以降低亮度。
![2024-10-13 Refactoring UI - Working with color - 图31](https://raw.githubusercontent.com/rockychang7/image-storage/master/2024-10-13%20Refactoring%20UI%20-%20Working%20with%20color%20-%20%E5%9B%BE31.jpg)
![2024-10-13 Refactoring UI - Working with color - 图32](https://raw.githubusercontent.com/rockychang7/image-storage/master/2024-10-13%20Refactoring%20UI%20-%20Working%20with%20color%20-%20%E5%9B%BE32.jpg)
![2024-10-13 Refactoring UI - Working with color - 图33](https://raw.githubusercontent.com/rockychang7/image-storage/master/2024-10-13%20Refactoring%20UI%20-%20Working%20with%20color%20-%20%E5%9B%BE33.jpg)
> [!caution] 注意
> hue的调整不要超过20-30度，不然会偏离当前的颜色

**做法3**：这种做法是组合使用做法1和做法2，效果如下：
![2024-10-13 Refactoring UI - Working with color - 图34](https://raw.githubusercontent.com/rockychang7/image-storage/master/2024-10-13%20Refactoring%20UI%20-%20Working%20with%20color%20-%20%E5%9B%BE34.jpg)

> [!tip] 最佳实践
> 实际ui开发中，如果要设置color palette,可以综合调整lightness和hue以及Saturation。可以适当调整hue来改变亮度值，调整Saturation让颜色更加生动，当然也可以通过lightness调整颜色亮度，综合使用上面的做法达到自己觉得最合理的效果

## 5. Greys don’t have to be grey
这个点属于对于greys这个颜色设置的补充说明，针对greys的配置有一些特殊的点如下：

首选看下真正的grey color：它的饱和度是0%，本质上不包含任何颜色
![2024-10-13 Refactoring UI - Working with color - 图35](https://raw.githubusercontent.com/rockychang7/image-storage/master/2024-10-13%20Refactoring%20UI%20-%20Working%20with%20color%20-%20%E5%9B%BE35.jpg)
但是在实际ui设计中，很多情况不会使用纯正的灰色。常用的做法是会给greys添加一些饱和度看起来更加的warm或者cool:

![2024-10-13 Refactoring UI - Working with color - 图36](https://raw.githubusercontent.com/rockychang7/image-storage/master/2024-10-13%20Refactoring%20UI%20-%20Working%20with%20color%20-%20%E5%9B%BE36.jpg)

这个其实是通过色温来改变ui的观感，如果想要灰色看起来更加的冷色调，那么让他更加靠近一点blue color，如果想让他看起来更加暖色调，那么让他更加靠近一点yellow or orange color：
![2024-10-13 Refactoring UI - Working with color - 图37](https://raw.githubusercontent.com/rockychang7/image-storage/master/2024-10-13%20Refactoring%20UI%20-%20Working%20with%20color%20-%20%E5%9B%BE37.jpg)
![2024-10-13 Refactoring UI - Working with color - 图38](https://raw.githubusercontent.com/rockychang7/image-storage/master/2024-10-13%20Refactoring%20UI%20-%20Working%20with%20color%20-%20%E5%9B%BE38.jpg)
> [!tip] 小技巧
> 为了保持色温的一致性，相比于lightess更加靠近50%的颜色，针对darker或者lighter的颜色需要适当的提高他的饱和度。并且如果想要强烈改变原色的灰色调，那么饱和度调整力度更加大一点，如果只是想细微调整页面的观感，适当调整饱和度即可


## 6. Accessible doesn’t have to mean ugly
这个点属于技巧点，阐述颜色和accessibility如何保持设计上的平衡

比如根据 Web Content Accessibility Guidelines (WCAG) 推荐的normal text(under 18px)的字体应该至少有`4.5：1`的对比度， Larger text也应该至少有`3：1`的对比度：
![2024-10-13 Refactoring UI - Working with color - 图39](https://raw.githubusercontent.com/rockychang7/image-storage/master/2024-10-13%20Refactoring%20UI%20-%20Working%20with%20color%20-%20%E5%9B%BE39.jpg)
![2024-10-13 Refactoring UI - Working with color - 图40](https://raw.githubusercontent.com/rockychang7/image-storage/master/2024-10-13%20Refactoring%20UI%20-%20Working%20with%20color%20-%20%E5%9B%BE40.jpg)
上面的对比度的知识了解下，接下来看下如何设计color之间的合适对比度：

**场景1**:
首先看下不合理的一个效果：
![2024-10-13 Refactoring UI - Working with color - 图41](https://raw.githubusercontent.com/rockychang7/image-storage/master/2024-10-13%20Refactoring%20UI%20-%20Working%20with%20color%20-%20%E5%9B%BE41.jpg)
明显看起来不清楚,调整下将背景色的饱和度调高：
![2024-10-13 Refactoring UI - Working with color - 图42](https://raw.githubusercontent.com/rockychang7/image-storage/master/2024-10-13%20Refactoring%20UI%20-%20Working%20with%20color%20-%20%E5%9B%BE42.jpg)
解决了对比度的问题，但是在上面这个情况下，如果我不想要status太过抓人眼球也是不合理的，可以换种思路，调整text的颜色，变为更加dark的color就解决了这个问题：
![2024-10-13 Refactoring UI - Working with color - 图43](https://raw.githubusercontent.com/rockychang7/image-storage/master/2024-10-13%20Refactoring%20UI%20-%20Working%20with%20color%20-%20%E5%9B%BE43.jpg)
> [!tip] 小技巧
> 如果想要改变contrast，不一定要改变背景颜色，元素的颜色也可以修改来配合背景色。

**场景2**：
典型的如果在一个组件元素上，背景是primary color，如果单纯地使用secondary color（更亮的颜色）用于text,文字看起来并不会非常清楚。比较好的做法是修改hue的值，让他偏向一个更亮的颜色但是也非white色：
!![2024-10-13 Refactoring UI - Working with color - 图44](https://raw.githubusercontent.com/rockychang7/image-storage/master/2024-10-13%20Refactoring%20UI%20-%20Working%20with%20color%20-%20%E5%9B%BE44.jpg)
![2024-10-13 Refactoring UI - Working with color - 图45](https://raw.githubusercontent.com/rockychang7/image-storage/master/2024-10-13%20Refactoring%20UI%20-%20Working%20with%20color%20-%20%E5%9B%BE45.jpg)

这两个场景还是很实用的，我们在考虑对比度的时候可以进行运用。如果对于颜色的Contrast不确定，可以参考[Color Contrast Checker](https://coolors.co/contrast-checker/5e7ea2-1f2c39)[WebAIM: Contrast Checker](https://webaim.org/resources/contrastchecker/)

## 7. Don’t rely on color alone
这个点是说不要把信息的传递只依赖于颜色，这个还是好理解的，比如针对盲人等颜色就并不适用。

![2024-10-13 Refactoring UI - Working with color - 图46](https://raw.githubusercontent.com/rockychang7/image-storage/master/2024-10-13%20Refactoring%20UI%20-%20Working%20with%20color%20-%20%E5%9B%BE46.jpg)
![2024-10-13 Refactoring UI - Working with color - 图47](https://raw.githubusercontent.com/rockychang7/image-storage/master/2024-10-13%20Refactoring%20UI%20-%20Working%20with%20color%20-%20%E5%9B%BE47.jpg)

最佳实践是配合图标或者颜色深浅等信息共同传递信息：
![2024-10-13 Refactoring UI - Working with color - 图48](https://raw.githubusercontent.com/rockychang7/image-storage/master/2024-10-13%20Refactoring%20UI%20-%20Working%20with%20color%20-%20%E5%9B%BE48.jpg)

![2024-10-13 Refactoring UI - Working with color - 图49](https://raw.githubusercontent.com/rockychang7/image-storage/master/2024-10-13%20Refactoring%20UI%20-%20Working%20with%20color%20-%20%E5%9B%BE49.jpg)
这个和之前说的[不要单纯依靠size强调](/notes/refactoring-ui-hierarchy)可以配合使用

## 总结
本篇笔记围绕color的概念，描述了color表示的方式，ui设计中color的类型以及如何根据这些类型创建对应的color palette，最后阐述了color实际使用的一些最佳实践，对于实际项目中color的选取和使用非常有用。
