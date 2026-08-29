---
title: "Harness engineering for coding agent users"
created: 2026-04-22
updated: 2026-08-25
source_url: "https://martinfowler.com/articles/harness-engineering.html"
draft: false
synced: true
---
## 总结
本篇文章围绕Context和Harness Engineering来阐述如何构建令Agent生成可靠代码的心智模型

## 核心观点

1. Harness在不同的语境下的含义不一样，对于Coding Agent来说，他本身就有了内置的一部分Harness环境了，比如prompt系统、工具调用、agnet编排等等，这些如果本身不做agent的话，离我们还是远一些。 我们需要关注的是外层的Harness环境，这是针对于我们特定的项目或者系统定制的一套约束。![2026-04-23 Harness engineering for coding agent users - 图01](https://raw.githubusercontent.com/rockychang7/image-storage/master/2026-04-23%20Harness%20engineering%20for%20coding%20agent%20users%20-%20%E5%9B%BE01.png)
2. 外层的harness的目标最关键的是有两个：从一开始就让Agent尽可能的做对；另一个就是就算有错误也尽可能地自己找到错误，人可以很少地进行干预。达到这两点基本上就是比较高质量的harness。这里作者给了一张目标交互图![2026-04-23 Harness engineering for coding agent users - 图02](https://raw.githubusercontent.com/rockychang7/image-storage/master/2026-04-23%20Harness%20engineering%20for%20coding%20agent%20users%20-%20%E5%9B%BE02.png)
3. 作者提出了Feedforward and Feedback两个概念来harness Agent,Feedforward是指在Agent执行之前先指定好Guide，让Agent遵守这个Guide的基础之上直接生成相对准确的结果。 Feedback是指在Agent执行完之后的后续约束，可以自动比如检查出某些错误。基于这种Signal告诉Agent去继续调整结果
4. 在Feedforward and Feedback的实现上，作者提出了有Computational vs Inferential两种类型的实现方式。简单来说Computational是确定性的方式，可以基于特殊的脚本、工具来测试、检查拼写错误等等。另一种是推理式的方式，这种效果优点是可以借助语义化的规定来让Agent做更多的事，但是带来了不确定性和效率低下并且产生的结果非常依赖大模型的能力。![2026-04-24 Harness engineering for coding agent users - 图03](https://raw.githubusercontent.com/rockychang7/image-storage/master/2026-04-24%20Harness%20engineering%20for%20coding%20agent%20users%20-%20%E5%9B%BE03.png)
5. Harness需要不断的进行调整，这种调整也可以借助AI来完成，比如经常犯的错误可以让AI进行沉淀记录下来防止以后再犯。或者是让AI来基于测试用例，基于观察到的抽象出规则等等动作来让Harness环境更加的可靠。
6. 如果要进一步提升质量，支持持续集成和发布的话。除了在Agent行动之前进行Guide的规约，在每一次代码生成完的节点都要进行比如code review、npx eslint等等一系列的检查、当前最后还需要根据实际情况human 进行review。特别还有一些特殊操作需要在集成之后进行操作，比如mutation testing、代码覆盖检查等等
   ![2026-04-24 Harness engineering for coding agent users - 图04](https://raw.githubusercontent.com/rockychang7/image-storage/master/2026-04-24%20Harness%20engineering%20for%20coding%20agent%20users%20-%20%E5%9B%BE04.png)
7. 做的更加极致一点，有些是需要进驻在后台的操作，对于项目的进行定时的清理，包括dead code检查、报错检查等等![2026-04-24 Harness engineering for coding agent users - 图05](https://raw.githubusercontent.com/rockychang7/image-storage/master/2026-04-24%20Harness%20engineering%20for%20coding%20agent%20users%20-%20%E5%9B%BE05.png)
8. 作者将Harness的类别分成了三种，分别是Maintainability harness 这类Harness主要负责代码的冗余检查，语法错误,测试用例，代码风格等等一系列需要时刻维护的约束，作者也说了可以使用工具或者借助Agent进行，并且作者强调这类约束生效的前提是本身需求已经清晰明了不然维护的再好也没啥用；Architecture fitness harness 这类约束是站在项目架构的方向来约束Agent是否符合性能要求、依赖是否合理、服务边界是否合理、日志监控是否足够、是否违反了架构规则等等；Behaviour harness是对Agent行为约束，作者用一个例子进行了说明：比如用户在feedforward的时候指定了功能模版，然后Agent基于这个模版进行测试用户编写最后基于期望的结果进行校验，作者指出当前的这种方式还不是最好的（过于信任AI)![2026-04-24 Harness engineering for coding agent users - 图06](https://raw.githubusercontent.com/rockychang7/image-storage/master/2026-04-24%20Harness%20engineering%20for%20coding%20agent%20users%20-%20%E5%9B%BE06.png)
9. 不同的项目构建Harness环境的成本不同，如果是一个全新的项目是比较容易的，如果是遗留的复杂项目则面临更多的挑战
10. 现在成熟的企业基本上都已经各自构建了一套基建，比如API如何构建，如果进行集成测试等这些已经存在标准，后面如果将这些标准转换成适合Agent使用的Harness template非常关键 ![2026-04-24 Harness engineering for coding agent users - 图07](https://raw.githubusercontent.com/rockychang7/image-storage/master/2026-04-24%20Harness%20engineering%20for%20coding%20agent%20users%20-%20%E5%9B%BE07.png)
11. Harness的构建并不是说一定要消除人的输入，更好地方式是让人的输入更加的对Agent有用

## 我的理解
1. 首先要理解作为coding agent的使用者，定制化Harness环境是针对我们的项目来约束的，这和coding agent本身内置的那套Harness环境还是有所区别的
2. 具体实现Harness的时候，对于如何实现Guide和Sensors需要好好进行设计，有选择的利用Computational的方式或者Inferential的方式来实现目标，特别注意Skills的设计
3. Harness的关键是两个方面：输入的内容尽量让Agent生成精确的结果，另一个就是在关键节点基于反馈机制让Agent修正自己的错误

## 疑问
1. 最大的疑问就是这套Harness的构建理论到实际落地的之间的鸿沟到底有多大，现在心里还没有数
2. 这里对于FeedForward和FeedBack具体实现没有进行详细阐述，还需要自己实践进行摸锁，所以我之前的那套机制需要进行大幅度的改动

## 候选知识点
