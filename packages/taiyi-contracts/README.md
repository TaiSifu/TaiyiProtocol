# @taiyi/contracts

## 背景

    “太乙岛”是一个实验项目，该项目试图促进一个太乙虚拟世界链上社区的形成。为了社区能够创造出长期价值，“太乙岛”也构建了属于社区的资产金库。

[山河社稷图（ShejiTu）](./contracts/ShejiTu.sol)是太乙协议的全局时间线，也是太乙大千世界的入口。

[太乙师傅令牌（SifusToken）](./contracts/SifusToken.sol)是太乙岛管理者的凭证，这些凭证的拥有者称作“太乙传人”。在太乙世界中，当某位角色完成特殊成就后，社稷图中的相关事件会铸造太乙师傅令牌并赋予该角色，其拥有者可以获得该令牌并成为太乙传人。

## 智能合约

| 合约| 描述| 地址|
| ------------------------------------- | -------------------------------------- |-------------------------------------- |
| [SifusToken](./contracts/SifusToken.sol)                        | 这是“太乙师傅令牌”的ERC721通证合约。该合约不能被升级或替换。除了标准ERC721通证的功能外，社区还要使用太乙师傅来锁定和替换周边合约，存储“治理合约”需要的验证数据，并控制新师傅的铸造和销毁。这个合约包含了两个主要角色 - `铸造者（minter）`和`拥有者（owner）`。在构造函数中，`铸造者`就被设定为“山河社稷图”合约（全局时间线）的地址，而合约所有权则被交予后面部署的太乙DAO合约。只有太乙世界中发生的特定事件通过社稷图来铸造并颁发师傅令牌。| [0x????](https://etherscan.io/address/0x????) |
| [SifusSeeder](./contracts/SifusSeeder.sol)                      | 这个合约被用来在师傅令牌的铸造过程中决定其显示属性。这个合约在未来是能够被替换的，因此可以升级属性的生成算法。当然，太乙DAO也可以锁定这个合约来避免未来更新。当前，师傅的属性由伪随机算法生成：`keccak256(abi.encodePacked(blockhash(block.number - 1), sifuId))`。因此，师傅属性的生成不是一个完全的随机过程，这些属性是能够根据预期区块中的铸造事件而被预测出来的。| [0x????](https://etherscan.io/address/0x????) |
| [SifusDescriptor](./contracts/SifusDescriptor.sol)              | 这个合约负责存储和渲染师傅令牌形象。令牌的'部件'以如下格式被存储进对应的字节数组中：`调色板序号，边界数据[顶(Y)，右(X)，底(Y)，左(X)]（共4字节），[像素数量（1字节），像素颜色序号（1字节）][]`。当SifusToken的接口`tokenURI`被调用时，师傅部件的数据从合约中读取出来并被转换为一系列的SVG矩形描述，以便在链上构造SVG图像。生成好的整个SVG图像，再被转为base64编码。最后，通证的URI是一个base64编码过的URI数据，它由JSON上下文直接构成，并包含了上述SVG图像。| [0x????](https://etherscan.io/address/0x????) |
| [ShejiTu](./contracts/ShejiTu.sol)          | “山河社稷图（全局时间线）”这个合约运行着一个处理基础事件的全局时间线。角色（Actor）在该时间线中进行出生、成长等基础事务。另外社稷图也负责太乙世界的资源生产，通过构建一套稳定的资源系统为其他时间线提供经济动力。社稷图中资源事件中获得的部分资金（例如金、木材、药材、石料等等）被自动百分之百地存入太乙DAO的金库，这个金库由太乙传人们（太乙师傅令牌的拥有者）共同管理。| [0x????](https://etherscan.io/address/0x????) |
| [Actors](./contracts/world/Actors.sol)                        | 这是“太乙角色”的ERC721通证合约。该合约不能被升级或替换。除了标准ERC721通证的功能外，“角色”是人们进入虚拟世界的唯一身份入口，任何人都可以从该合约铸造角色。世界通过一些特殊的角色来执行特殊操作，其中有些是由其他合约在部署时自己铸造并操作的。比如“噎明（YeMing）”通常就是由时间线级合约（例如山河社稷图）自主铸造。又比如第一个铸造的角色就是“盘古（PanGu）”，通过该角色才有权行使诸如注册世界模块、注册噎明身份等等。太乙角色的铸造是无准入的自由铸造，需要支付一定的铸造费用（道子），铸造的价格采用VRGDA发行模型调节。太乙角色计划100年内发行10亿位。| [0x????](https://etherscan.io/address/0x????) |
| [Daozi](./contracts/world/assets/Fungible.sol)                | 这是太乙世界的ERC20通证合约，用于货币，名曰“道子”，简称“道”。该合约不能被升级或替换。在铸造角色时需要支付一定的道子作为铸造费用，这笔费用由合约自动打入太乙岛金库。道子在太乙世界中可以由特定的事件发行。| [0x????](https://etherscan.io/address/0x????) |

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
