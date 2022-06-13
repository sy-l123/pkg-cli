# pkg_cli

### 基本须知

pkg cli 是一个基于 node.js 进行快速打包的完整系统，提供：

- 提供可根据配置`依赖包版本`来实现生产打包的项目脚手架
- 无感知，用户正常 `开发`与`打包`，不具备破坏性

### 使用

> tip node 版本要求
>
> pkg cli 需要 [Node.js](https://nodejs.org/) v12.22 或更高版本 (推荐 v12 以上)。你可以使用 [n](https://github.com/tj/n)，[nvm](https://github.com/creationix/nvm) 或 [nvm-windows](https://github.com/coreybutler/nvm-windows) 在同一台电脑中管理多个 Node 版本。

```node
npm install -g @pkg/cli

cd /project/file

znt build
```

### 问题出发点

当前微前端框架，element-plus存在版本不对齐的情况

> 因为npm特殊的版本管理机制
> 
> 比较常见的场景就是某一个应用频繁迭代，其他应用迭代相对缓存，就会出现高低版本共存，从而出现不对齐
> 
> 相关 [package版本管理](https://www.jianshu.com/p/2f57db973149) 可自行点击查看

### 打包原理

因为 node 作为弱语言类型的脚本语言，因此可以动态的修改依赖所属关系，通过动态分析`依赖版本`，根据远程配置文件，可实现动态打包，不影响原有项目结构
