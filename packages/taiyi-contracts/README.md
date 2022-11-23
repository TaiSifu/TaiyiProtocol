# @taiyi/contracts

## 背景

    “太乙岛”是一个实验项目，该项目试图促进一个太乙虚拟世界链上社区的形成。为了社区能够创造出长期价值，“太乙岛”也构建了属于社区的资产金库。

[山河社稷图（ShejiTu）](./contracts/ShejiTu.sol)是太乙协议的全局时间线，也是太乙大千世界的入口。

[太乙师傅令牌（SifusToken）](./contracts/SifusToken.sol)是太乙岛管理者的凭证，这些凭证的拥有者称作“太乙传人”。在太乙世界中，当某位角色完成特殊成就后，社稷图中的相关事件会铸造太乙师傅令牌并赋予该角色，其拥有者可以获得该令牌并成为太乙传人。

[赏善罚恶令（TaiyiDAOExecutor）](./contracts/governance/TaiyiDAOExecutor.sol)是一种简单的由太乙师傅共同参加的投票执行系统，可以链上执行几乎一切太乙岛提案。

## 智能合约

### 太乙岛

| 合约| 描述| 地址|
| ------------------------------------- | -------------------------------------- |-------------------------------------- |
| [SifusToken](./contracts/SifusToken.sol)                        | 这是“太乙师傅令牌”的ERC721通证合约。该合约不能被升级或替换。除了标准ERC721通证的功能外，社区还要使用太乙师傅来锁定和替换周边合约，存储“治理合约”需要的验证数据，并控制新师傅的铸造和销毁。这个合约包含了两个主要角色 - `铸造者（minter）`和`拥有者（owner）`。在构造函数中，`铸造者`就被设定为“山河社稷图”合约（全局时间线）的地址，而合约所有权则被交予后面部署的太乙DAO合约。只有太乙世界中发生的特定事件通过社稷图来铸造并颁发师傅令牌。| [0x????](https://etherscan.io/address/0x????) |
| [SifusSeeder](./contracts/SifusSeeder.sol)                      | 这个合约被用来在师傅令牌的铸造过程中决定其显示属性。这个合约在未来是能够被替换的，因此可以升级属性的生成算法。当然，太乙DAO也可以锁定这个合约来避免未来更新。当前，师傅的属性由伪随机算法生成：`keccak256(abi.encodePacked(blockhash(block.number - 1), sifuId))`。因此，师傅属性的生成不是一个完全的随机过程，这些属性是能够根据预期区块中的铸造事件而被预测出来的。| [0x????](https://etherscan.io/address/0x????) |
| [SifusDescriptor](./contracts/SifusDescriptor.sol)              | 这个合约负责存储和渲染师傅令牌形象。令牌的'部件'以如下格式被存储进对应的字节数组中：`调色板序号，边界数据[顶(Y)，右(X)，底(Y)，左(X)]（共4字节），[像素数量（1字节），像素颜色序号（1字节）][]`。当SifusToken的接口`tokenURI`被调用时，师傅部件的数据从合约中读取出来并被转换为一系列的SVG矩形描述，以便在链上构造SVG图像。生成好的整个SVG图像，再被转为base64编码。最后，通证的URI是一个base64编码过的URI数据，它由JSON上下文直接构成，并包含了上述SVG图像。| [0x????](https://etherscan.io/address/0x????) |
| [TaiyiDAOExecutor](./contracts/governance/TaiyiDAOExecutor.sol) | 这个合约衍生自Compound项目的`Timelock`，它为太乙DAO运作一个带时间锁定的金库系统，同时它也是太乙岛提案的实际执行者，所以又称为“赏善罚恶令”。这个合约由太乙岛治理合约（`TaiyiDAOProxy`）控制。| [0x????](https://etherscan.io/address/0x????) |
| [TaiyiDAOProxy](./contracts/governance/TaiyiDAOProxy.sol)       | 这个合约衍生自Compound项目的`GovernorBravoDelegator`，它被用于治理提案的创建、投票和执行工作。| [0x????](https://etherscan.io/address/0x????) |
| [TaiyiDAOLogicV1](./contracts/governance/TaiyiDAOLogicV1.sol)   | 这个合约衍生自Compound项目的`GovernorBravoDelegate`，它被用于`TaiyiDAOProxy`合约的逻辑层实现。| [0x????](https://etherscan.io/address/0x????) |

### 山河社稷图

| 合约| 描述| 地址|
| ------------------------------------- | -------------------------------------- |-------------------------------------- |
| [ShejiTu](./contracts/ShejiTu.sol)          | “山河社稷图（全局时间线）”这个合约运行着一个处理基础事件的全局时间线。角色（Actor）在该时间线中进行出生、成长等基础事务。另外社稷图也负责太乙世界的部分资源生产，通过构建一套稳定的资源系统为其他时间线提供经济动力。社稷图中资源事件中获得的部分资金（例如金、木材、药材、石料等等）被自动百分之百地存入太乙DAO的金库，这个金库由太乙传人们（太乙师傅令牌的拥有者）共同管理。| [0x????](https://etherscan.io/address/0x????) |
| [Actors](./contracts/Actors.sol)                        | 这是“太乙角色”的ERC721通证合约。该合约不能被升级或替换。除了标准ERC721通证的功能外，“角色”是人们进入虚拟世界的唯一身份入口，任何人都可以从该合约铸造角色。世界通过一些特殊的角色来执行特殊操作，其中有些是由其他合约在部署时自己铸造并操作的。比如“噎明（YeMing）”通常就是由时间线级合约（例如山河社稷图）自主铸造。该合约第一个铸造的角色就是“盘古（PanGu）”，通过该角色才有权行使诸如注册世界模块、注册噎明身份等构建和设计世界的事务。当太乙岛开始正常运作后，盘古的所有权会被转移给太乙岛合约，由太乙岛去中心化地实施盘古设计世界的工作。太乙角色的铸造是无准入的自由铸造，需要支付一定的铸造费用（道理），铸造的价格采用[VRGDA](https://www.paradigm.xyz/2022/08/vrgda)发行模型调节。太乙角色计划100年内发行10亿位。| [0x????](https://etherscan.io/address/0x????) |
| [Daoli](./contracts/WorldFungible.sol)                | 这是太乙世界的ERC20通证合约，用于货币，名曰“道理”，简称“道”。该合约不能被升级或替换。在铸造角色时需要支付一定的道理作为铸造费用，这笔费用由合约自动打入太乙岛金库。道理在太乙世界中可以由特定的事件发行。| [0x????](https://etherscan.io/address/0x????) |
| [ActorNames](./contracts/world/ActorNames.sol)                | 这是太乙世界的ERC721通证合约，用于角色名称姓名的赋予。该合约不能被升级或替换。这些名称在太乙世界中被使用时，采用[隐式托管(Implicit Custody)](https://github.com/sunflower-land/contracts#off-chain-syncrhonisation)的方式参与世界逻辑。| [0x????](https://etherscan.io/address/0x????) |
| [ActorSocialIdentity](./contracts/world/ActorSocialIdentity.sol)                | 这是太乙世界的ERC721通证合约，用于角色的身份。该合约不能被升级或替换。太乙世界通过社会事件会赋予角色各种不同的身份，例如“太乙百子”、“商人”或者“乞丐”等等，这些身份是太乙世界中社会赋予的，不能私下创建、自由转移或者销毁，因此该合约按照[Soulbound Tokens(SBTs)](https://papers.ssrn.com/sol3/papers.cfm?abstract_id=4105763)思想设计| [0x????](https://etherscan.io/address/0x????) |
| [WorldItems](./contracts/world/WorldItems.sol)                | 这是太乙世界的ERC721通证合约，常用于表示太乙世界中的非同质化对象（NonfungibleItem），用于表示诸如物品、书籍、道具等事物。该合约不能被升级或替换。这些道具在太乙世界中被使用时，采用[隐式托管(Implicit Custody)](https://github.com/sunflower-land/contracts#off-chain-syncrhonisation)的方式参与世界逻辑。| [0x????](https://etherscan.io/address/0x????) |
| [WorldZones](./contracts/world/WorldZones.sol)                | 这是太乙世界的ERC721通证合约，用于表示太乙世界中的区域对象（Nonfungible），表示诸如地区、地理地点、子世界、太虚幻境等拓扑域。比如某个世界建设的150多个省市级区域，某角色建设的从村级单位到木工房等工作单位。该合约不能被升级或替换。这些区域在太乙世界中被使用时，采用[隐式托管(Implicit Custody)](https://github.com/sunflower-land/contracts#off-chain-syncrhonisation)的方式参与世界逻辑。| [0x????](https://etherscan.io/address/0x????) |
| [WorldEvents](./contracts/WorldEvents.sol)                | 这是太乙世界的事件集合，除了用于事件处理器的定义，也用于记录角色身上发生的事件历史。| [0x????](https://etherscan.io/address/0x????) |


## 开发

### 安装开发组件

```sh
yarn
```

### 编译typescript脚本、合约代码，并产生typechain封装类

```sh
yarn build
```

### 运行测试

```sh
yarn test
```

### 环境设置

把文件`.env.example`复制成`.env`，按需填写内容。

### 命令行

```sh
# compiling
npx hardhat compile

# deploying
npx hardhat run --network rinkeby scripts/deploy.js

# verifying on etherscan
npx hardhat verify --network rinkeby {DEPLOYED_ADDRESS}

# replace `rinkeby` with `mainnet` to productionize
```

### 测试链自动部署

每次main分支有新的提交，这些合约就会被自动部署到Rinkeby网络上。每次PR都使用账号`0x387d301d92AE0a87fD450975e8Aef66b72fBD718`，该账号的助记词是存储在GitHub Actions上的秘钥，在每次部署过程中被注入到环境变量`MNEMONIC`。_注意，在主网上使用这个助记词是不安全的_。
