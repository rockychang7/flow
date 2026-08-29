---
title: "Refactoring UI - Designing text"
topic: "refactoring-ui"
created: 2024-10-12
updated: 2026-08-25
source_url: "https://www.refactoringui.com/"
draft: false
synced: true
---
这篇笔记记录refactoringui中关于文本如何设计和处理的最佳实践

## 1. Establish a type scale
这个点同样在[全局设计篇章](/notes/refactoring-ui-overview)已经提及过，建立字体的规范化体系也必不可少
  ![2024-10-12 Refactoring UI - Designing text - 图01](https://raw.githubusercontent.com/rockychang7/image-storage/master/2024-10-12%20Refactoring%20UI%20-%20Designing%20text%20-%20%E5%9B%BE01.jpg)

> [!tip] 提示
> tailwindcss中对于字体也建立了非常好的体系，可以直接使用。 需要注意的是，font size不要使用em作为单位，这种相对于父元素font的大小的相对单位会导致字体大小的混乱不一致

建立了字体体系之后，可以在开发的时候方便使用：
  ![2024-10-12 Refactoring UI - Designing text - 图02](https://raw.githubusercontent.com/rockychang7/image-storage/master/2024-10-12%20Refactoring%20UI%20-%20Designing%20text%20-%20%E5%9B%BE02.jpg)
## 2. Use good fonts
这里作者阐述了我们再设计ui的时候应该如何选择字体。

首先，为了保证基本的可用性，我们可以设置一系列的兜底字体进行渲染，比如tailwindcss就是这么做的：

| tailwind class | properties                                                                                                                         |
| -------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `font-sans`    | `font-family: ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";` |
| `font-serif`   | `font-family: ui-serif, Georgia, Cambria, "Times New Roman", Times, serif;`                                                        |
| `font-mono`    | `font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;`                 |

至于如何选择合适的字体，有如下几个条件可以作为参考：

1. 忽略font weight少于5中的字体，从设计上来说他们肯定没那么细腻
   ![2024-10-12 Refactoring UI - Designing text - 图03](https://raw.githubusercontent.com/rockychang7/image-storage/master/2024-10-12%20Refactoring%20UI%20-%20Designing%20text%20-%20%E5%9B%BE03.jpg)
2. 优化字体的可读性，针对headlines使用更小的x-height和更小的字间距比较合适，针对正常内容使用更大的x-height和更大的字间距，比较合适。遵循这个规则不要混用比如小的x-height和大的字间距。
   ![2024-10-12 Refactoring UI - Designing text - 图04](https://raw.githubusercontent.com/rockychang7/image-storage/master/2024-10-12%20Refactoring%20UI%20-%20Designing%20text%20-%20%E5%9B%BE04.jpg)
3. 借鉴优秀网站或者流行的字体，化为己用
   ![2024-10-12 Refactoring UI - Designing text - 图05](https://raw.githubusercontent.com/rockychang7/image-storage/master/2024-10-12%20Refactoring%20UI%20-%20Designing%20text%20-%20%E5%9B%BE05.jpg)
> [!important] 注意
> 当然，最重要的是慢慢培养自己的感觉，知道使用什么字体适合自己的网站

## 3. Keep your line length in check
这个点强调行的长度如何设置更加合适，过长和多短的行长度都不适合阅读
![2024-10-12 Refactoring UI - Designing text - 图06](https://raw.githubusercontent.com/rockychang7/image-storage/master/2024-10-12%20Refactoring%20UI%20-%20Designing%20text%20-%20%E5%9B%BE06.jpg)
每行45到75个字符（中文的话20-40个字）比较合适：
  ![2024-10-12 Refactoring UI - Designing text - 图07](https://raw.githubusercontent.com/rockychang7/image-storage/master/2024-10-12%20Refactoring%20UI%20-%20Designing%20text%20-%20%E5%9B%BE07.jpg)
  
处理更宽的内容可以考虑限制内容最长宽度达到平衡：
  ![2024-10-12 Refactoring UI - Designing text - 图08](https://raw.githubusercontent.com/rockychang7/image-storage/master/2024-10-12%20Refactoring%20UI%20-%20Designing%20text%20-%20%E5%9B%BE08.jpg)
  ![2024-10-12 Refactoring UI - Designing text - 图09](https://raw.githubusercontent.com/rockychang7/image-storage/master/2024-10-12%20Refactoring%20UI%20-%20Designing%20text%20-%20%E5%9B%BE09.jpg)
  
## 4. Baseline, not center
这个点也很实用，基于baseline对齐可以让视觉上元素看起来更加整齐,首先看下基于baseline对齐的效果：
  ![2024-10-12 Refactoring UI - Designing text - 图10](https://raw.githubusercontent.com/rockychang7/image-storage/master/2024-10-12%20Refactoring%20UI%20-%20Designing%20text%20-%20%E5%9B%BE10.jpg)
具体场景示例：
  ![2024-10-12 Refactoring UI - Designing text - 图11](https://raw.githubusercontent.com/rockychang7/image-storage/master/2024-10-12%20Refactoring%20UI%20-%20Designing%20text%20-%20%E5%9B%BE11.jpg)
  ![2024-10-12 Refactoring UI - Designing text - 图12](https://raw.githubusercontent.com/rockychang7/image-storage/master/2024-10-12%20Refactoring%20UI%20-%20Designing%20text%20-%20%E5%9B%BE12.jpg)
  ![2024-10-12 Refactoring UI - Designing text - 图13](https://raw.githubusercontent.com/rockychang7/image-storage/master/2024-10-12%20Refactoring%20UI%20-%20Designing%20text%20-%20%E5%9B%BE13.jpg)
## 5. Line-height is proportional
这个点展示如何设置合适的行高，具体方式如下：

**基于line length进行调整**：如果line length比较短，那么line height相应设置小一点，反之line height设置的相对大一点
  ![2024-10-12 Refactoring UI - Designing text - 图14](https://raw.githubusercontent.com/rockychang7/image-storage/master/2024-10-12%20Refactoring%20UI%20-%20Designing%20text%20-%20%E5%9B%BE14.jpg)
  ![2024-10-12 Refactoring UI - Designing text - 图15](https://raw.githubusercontent.com/rockychang7/image-storage/master/2024-10-12%20Refactoring%20UI%20-%20Designing%20text%20-%20%E5%9B%BE15.jpg)
**基于字体大小进行调整**： 如果字体比较大，line height相对小一点，反之相对大一点：
  ![2024-10-12 Refactoring UI - Designing text - 图16](https://raw.githubusercontent.com/rockychang7/image-storage/master/2024-10-12%20Refactoring%20UI%20-%20Designing%20text%20-%20%E5%9B%BE16.jpg)
   ![2024-10-12 Refactoring UI - Designing text - 图17](https://raw.githubusercontent.com/rockychang7/image-storage/master/2024-10-12%20Refactoring%20UI%20-%20Designing%20text%20-%20%E5%9B%BE17.jpg)
   
## 6. Not every link needs a color
这个点说明了对于链接文本应该怎么进行设计

**针对文本内的链接，需要使用underline和color进行标识：**
  ![2024-10-12 Refactoring UI - Designing text - 图18](https://raw.githubusercontent.com/rockychang7/image-storage/master/2024-10-12%20Refactoring%20UI%20-%20Designing%20text%20-%20%E5%9B%BE18.jpg)
**针对大量链接的元素**：比如Card中的link,使用不同weight和color标识即可,或者通过hover加underline的方式去展示：
  ![2024-10-12 Refactoring UI - Designing text - 图19](https://raw.githubusercontent.com/rockychang7/image-storage/master/2024-10-12%20Refactoring%20UI%20-%20Designing%20text%20-%20%E5%9B%BE19.jpg)
  ![2024-10-12 Refactoring UI - Designing text - 图20](https://raw.githubusercontent.com/rockychang7/image-storage/master/2024-10-12%20Refactoring%20UI%20-%20Designing%20text%20-%20%E5%9B%BE20.jpg)
  ![2024-10-12 Refactoring UI - Designing text - 图21](https://raw.githubusercontent.com/rockychang7/image-storage/master/2024-10-12%20Refactoring%20UI%20-%20Designing%20text%20-%20%E5%9B%BE21.jpg)
## 7. Align with readability in mind
这个点阐述如何对齐文本保持可读性

像中英文，一般左对齐可读性比较高：
  ![2024-10-12 Refactoring UI - Designing text - 图22](https://raw.githubusercontent.com/rockychang7/image-storage/master/2024-10-12%20Refactoring%20UI%20-%20Designing%20text%20-%20%E5%9B%BE22.jpg)
对于短的headline，居中比较合适，长headline还是左对齐合适：
  ![2024-10-12 Refactoring UI - Designing text - 图23](https://raw.githubusercontent.com/rockychang7/image-storage/master/2024-10-12%20Refactoring%20UI%20-%20Designing%20text%20-%20%E5%9B%BE23.jpg)
  ![2024-10-12 Refactoring UI - Designing text - 图24](https://raw.githubusercontent.com/rockychang7/image-storage/master/2024-10-12%20Refactoring%20UI%20-%20Designing%20text%20-%20%E5%9B%BE24.jpg)
  
如果是长短headline混合则需要考虑修改长的那个，精简它和其他保持一致：
  ![2024-10-12 Refactoring UI - Designing text - 图25](https://raw.githubusercontent.com/rockychang7/image-storage/master/2024-10-12%20Refactoring%20UI%20-%20Designing%20text%20-%20%E5%9B%BE25.jpg)
如果是数字的话，遵循右对齐的方式比较好：
  ![2024-10-12 Refactoring UI - Designing text - 图26](https://raw.githubusercontent.com/rockychang7/image-storage/master/2024-10-12%20Refactoring%20UI%20-%20Designing%20text%20-%20%E5%9B%BE26.jpg)
使用连接符对齐文字：如果没有连接符，文字的间距会显得不太合理。效果如下：
  ![2024-10-12 Refactoring UI - Designing text - 图27](https://raw.githubusercontent.com/rockychang7/image-storage/master/2024-10-12%20Refactoring%20UI%20-%20Designing%20text%20-%20%E5%9B%BE27.jpg)
  ![2024-10-12 Refactoring UI - Designing text - 图28](https://raw.githubusercontent.com/rockychang7/image-storage/master/2024-10-12%20Refactoring%20UI%20-%20Designing%20text%20-%20%E5%9B%BE28.jpg)
## 8. Use letter-spacing effectively
这个点作为阐述了如何合理地使用字间距，不同字间距效果如下：
  ![2024-10-12 Refactoring UI - Designing text - 图29](https://raw.githubusercontent.com/rockychang7/image-storage/master/2024-10-12%20Refactoring%20UI%20-%20Designing%20text%20-%20%E5%9B%BE29.jpg)
一般来说用于headline的字体，字间距往往比较小。用于正文的字体字间距往往比较大： 
  ![2024-10-12 Refactoring UI - Designing text - 图30](https://raw.githubusercontent.com/rockychang7/image-storage/master/2024-10-12%20Refactoring%20UI%20-%20Designing%20text%20-%20%E5%9B%BE30.jpg)
如果想要Open Sans用于headline，可以适当减小字间距，效果如下：
  ![2024-10-12 Refactoring UI - Designing text - 图31](https://raw.githubusercontent.com/rockychang7/image-storage/master/2024-10-12%20Refactoring%20UI%20-%20Designing%20text%20-%20%E5%9B%BE31.jpg)
> [!caution] 小心
> 不要讲用于headline的字体增加字间距用户正文，这类字体在小尺寸下往往效果比较差

最后需要提到的是全大写字母的字间距如何实际，首先需要了解对于小写字母，由于不同的字母，ascender,x-height,basline,descender不一样因此区分度比较高一点：
  ![2024-10-12 Refactoring UI - Designing text - 图32](https://raw.githubusercontent.com/rockychang7/image-storage/master/2024-10-12%20Refactoring%20UI%20-%20Designing%20text%20-%20%E5%9B%BE32.jpg)
但是全大写字母的所有高度都相等，所以设计相对大一点的字间距会更加清晰:
  ![2024-10-12 Refactoring UI - Designing text - 图33](https://raw.githubusercontent.com/rockychang7/image-storage/master/2024-10-12%20Refactoring%20UI%20-%20Designing%20text%20-%20%E5%9B%BE33.jpg)
## 总结
本篇笔记记录了如何设计字体系统，并且给自己的项目选择合适的字体。其次介绍了如何控制Line length,文本对齐方式以及Line height等文本元素让文本的可读性更高更合理。自己在真实开发页面文本的时候，可以多参考上面所说的最佳实践。
