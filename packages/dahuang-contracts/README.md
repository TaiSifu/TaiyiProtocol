# @taiyi/dahuang-contracts

## 背景

[大荒（Dahuang）](../taiyi-contracts/contracts/ShejiTu.sol)是大荒的时间线，也是大荒世界的入口。

## 智能合约

### 须弥域

| 合约| 描述| 地址|
| ------------------------------------- | -------------------------------------- |-------------------------------------- |
| [大荒（Dahuang）](../taiyi-contracts/contracts/ShejiTu.sol) | “大荒”这个合约运行着一个处理事件的局域时间线。`角色（Actor）`可以在该时间线中进行出生、成长等基础事务。另外须弥也负责大荒的部分资源生产，通过构建一套稳定的资源系统为其他时间线提供经济动力。须弥中资源事件中获得的部分资金（例如能量、元素等等）被自动地存入太乙DAO的金库，这个金库由`太乙传人们`（太乙师傅令牌的拥有者）共同管理。| [0x????](https://etherscan.io/address/0x????) |

### 世界基本通证
| 合约| 描述| 地址|
| ------------------------------------- | -------------------------------------- |-------------------------------------- |
| [金石](../taiyi-contracts/contracts/world/WorldFungible.sol)                | 这是太乙世界的ERC20通证合约，用于`金石`资源。该合约不能被升级或替换。`金石`在太乙世界中可以由特定的事件发行。| [0x????](https://etherscan.io/address/0x????) |
| [食材](../taiyi-contracts/contracts/world/WorldFungible.sol)                | 这是太乙世界的ERC20通证合约，用于`食材`资源。该合约不能被升级或替换。`食材`在太乙世界中可以由特定的事件发行。| [0x????](https://etherscan.io/address/0x????) |
| [木材](../taiyi-contracts/contracts/world/WorldFungible.sol)                | 这是太乙世界的ERC20通证合约，用于`木材`资源。该合约不能被升级或替换。`木材`在太乙世界中可以由特定的事件发行。| [0x????](https://etherscan.io/address/0x????) |
| [织物](../taiyi-contracts/contracts/world/WorldFungible.sol)                | 这是太乙世界的ERC20通证合约，用于`织物`资源。该合约不能被升级或替换。`织物`在太乙世界中可以由特定的事件发行。| [0x????](https://etherscan.io/address/0x????) |
| [药材](../taiyi-contracts/contracts/world/WorldFungible.sol)                | 这是太乙世界的ERC20通证合约，用于`药材`资源。该合约不能被升级或替换。`药材`在太乙世界中可以由特定的事件发行。| [0x????](https://etherscan.io/address/0x????) |
| [威望](../taiyi-contracts/contracts/world/WorldNontransferableFungible.sol)  | 这是太乙世界的不可转移ERC20通证合约，用于`威望`资源。该合约不能被升级或替换。`威望`在太乙世界中可以由特定的事件发行。| [0x????](https://etherscan.io/address/0x????) |

### 基本数据集
| 合约| 描述| 地址|
| ------------------------------------- | -------------------------------------- |-------------------------------------- |
| [WorldBuildings](./contracts/world/dataset/WorldBuildings.sol) | 这是大荒世界建筑物数据，除了建筑物定义，也用于记录世界中的建筑物实体。| [0x????](https://etherscan.io/address/0x????) |
| [WorldSeasons](./contracts/world/dataset/WorldSeasons.sol) | 这是大荒世界角色的出身时节集合，除了用于二十四节气的定义，也用于记录角色出身在哪个时节。| [0x????](https://etherscan.io/address/0x????) |
| [WorldVillages](./contracts/world/dataset/WorldVillages.sol) | 这是大荒世界的村落（太乙村）集合，记录了角色们自己创建的一些村落。| [0x????](https://etherscan.io/address/0x????) |
| [WorldZoneBaseResources](./contracts/world/dataset/WorldZoneBaseResources.sol) | 这是大荒世界的区域中基础资源生长的记录数据，用于记录一个区域的基础资源的生成和可采集量。| [0x????](https://etherscan.io/address/0x????) |


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
