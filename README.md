<br/>
<p align="center">
<a href="https://taiyi.world" target="_blank">
<img src="https://raw.githubusercontent.com/TaiSifu/TaiyiProtocol/main/docs/logo-taiyiprotocol-manwoman-s.png" width="256" alt="TaiyiProtocol logo">
</a>
</p>
<br/>

[![GitHub tag (latest SemVer)](https://img.shields.io/github/v/tag/TaiSifu/TaiyiProtocol?style=flat-square)](https://hub.docker.com/r/TaiSifu/TaiyiProtocol/tags)
[![GitHub license](https://img.shields.io/github/license/TaiSifu/TaiyiProtocol?style=flat-square)](https://github.com/TaiSifu/TaiyiProtocol/blob/main/LICENSE)
[![ContractsCI](https://img.shields.io/github/workflow/status/TaiSifu/TaiyiProtocol/ContractsCI?style=flat-square&label=ContractsCI)](https://github.com/TaiSifu/TaiyiProtocol/actions?query=workflow%3AContractsCI)
[![GitHub contributors](https://img.shields.io/github/contributors-anon/TaiSifu/TaiyiProtocol?style=flat-square)](https://github.com/TaiSifu/TaiyiProtocol/graphs/contributors)
[![GitHub commit activity](https://img.shields.io/github/commit-activity/y/TaiSifu/TaiyiProtocol?style=flat-square)](https://github.com/TaiSifu/TaiyiProtocol/commits/main)

# 太乙协议（TaiyiProtocol）

正如加密朋克（CryptoPunks）试图引导出一种数字社区和身份，“太乙协议”尝试引导出一种以神话和武侠为题材的虚拟身份，形成一个以古代中华神州为背景的架空世界虚拟社区和治理模式。

太乙协议是一套运行于区块链上的智能合约。通过和这个协议交互，参与者以此为基础构建出整个虚拟世界即太乙世界。

太乙世界自诞生之初，就是一个由不断扩展升级的系统。参与者将获得一种边玩边建设边开发的体验。

    太初有道，道法自然，众妙之门，玄之又玄。

## 贡献者

如果您对帮助太乙项目感兴趣，那我们很高兴你能加入进来。为了减少不必要的重复劳动，在您提供任何帮助之前，请先在[https://discord.gg/D2WPaCWF](https://discord.gg/D2WPaCWF)的`#developers`频道交流一下，这样您可以了解到已经有哪些现有的技术能为您所用。

## 博客
有一些思路和想法随时都记录在博客上，地址是[https://mirror.xyz/taiyidao.eth](https://mirror.xyz/taiyidao.eth)。

## 子项目

### 太乙资源
[太乙资源](packages/taiyi-assets)项目维护太乙岛和太乙世界衍生项目的PNG图像和各图像的行程压缩编码（run-length encoded）数据。

### 太乙机器人
[太乙机器人](packages/taiyi-bots)项目内含各种机器人服务。有些机器人实时监控太师傅令牌颁发状态的改变情况，有些监控太乙角色的铸造生成，并自动在Twitter和Discord上通知大家。人们也可以通过机器人用来和各种太乙世界活动交互。

### 太乙合约
[太乙合约](packages/taiyi-contracts)是一套赋能太乙DAO的智能合约，以Solidity语言编写。

太乙岛（TaiyiDAO）一个创建虚拟世界的集体组织，它由一群来自加密世界的爱好者经营。太乙岛是建立在太乙协议之上的治理系统，负责对太乙协议进行管理、修正、升级和扩展。由于建设太乙世界需要的资源存放在太乙岛账房/金库中，太乙岛众人也要负责对金库进行管理和日常开支。

太乙世界可以衍生出各种物理定律以及事实。很多现象都无法用现实世界的物理定律加以推演，因此太乙之道在现实世界不得实证和应用，但在太乙宇宙中，这些定律却皆可实现。太乙角色（NFT）默认为一种[Loot](https://www.lootproject.com/)式叙事渲染，也可以切换到各种扩展信息的渲染，比如一种传说中的符文图案。

### 大荒世界
[大荒合约](packages/dahuang-contracts)是一套扩展太乙世界的智能合约示例，以Solidity语言编写。

### 大荒机器人
[大荒机器人](packages/dahuang-bots)项目内含各种机器人服务。有些机器人实时监控大荒世界状态的改变情况，并自动在Twitter和Discord上通知大家。人们也可以通过机器人用来和各种太乙世界活动交互。

### 须弥世界
[须弥合约](packages/xumi-contracts)是一套扩展太乙世界的智能合约示例，以Solidity语言编写。

### 太乙开发套件
[太乙开发套件](packages/taiyi-sdk)对外提供了太乙岛和太乙世界相关合约的链上地址，合约ABIs，以及一系列用于图像编码和SVG创建的工具。

### 太乙图索引
[太乙图索引（subgraph）](packages/taiyi-subgraph)，为了从太乙师傅颁发历史和太乙世界发展历史中获取复杂关系数据，太乙图索引项目包含了部署在The Graph上面的Subgraph清单。

### 太乙世界网页端
[太乙世界网页端](packages/taiyi-webapp)项目是一系列通过[taiyi.world](https://taiyi.world)访问的前端，这些前端和太乙各合约交互。技术上这些应用不是太乙岛和太乙世界的必要条件，都是开源且可以自己本地运行的。

首个网页应用即太乙世界（taiyi.world）本身，是一个由太乙协议描述的可持续性虚拟世界规则的交互前端。太乙世界可以有各种不同类型的前端与之交互，可以是叙事性修真事件型UI、MMORPG游戏型UI和Discord机器人等等。

另一个网页应用是赏善罚恶令，这是一种简单的由太乙师傅共同参加的投票系统，可以链上执行几乎一切提案。

## 太乙词汇对照

| 词根| 例子| 范畴|
| ------------------------------------- | -------------------------------------- |-------------------------------------- |
|taiyi|Taiyi，太乙，Taiyi Protocol|Metaverse顶层范畴|
|DAO|TaiyiDao，TaiyiDAO，太乙岛|组织范畴|
|sifu|Sifu，SIFU，Taiyi Sifu，师傅，太乙师傅|基础Token范畴|
|actor|Taiyi Actor，太乙传人，太乙角色|基础Token范畴|
|world|Taiyi World，太乙世界，山河社稷图，破碎世界，子域|具体的某个虚拟世界范畴|


## 一些简单命令行

### 安装相关组件

```sh
lerna bootstrap
yarn
```

### 构建所有项目

```sh
yarn build
```

### 运行 Linter

```sh
yarn lint
```

### 运行 Prettier

```sh
yarn format
```
