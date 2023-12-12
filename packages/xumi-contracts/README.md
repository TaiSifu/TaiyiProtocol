# @taiyi/xumi-contracts

## 背景

[须弥（Xumi）](../taiyi-contracts/contracts/ShejiTu.sol)是须弥域的时间线，也是须弥域世界的入口。

## 智能合约

### 须弥域

| 合约| 描述| 地址|
| ------------------------------------- | -------------------------------------- |-------------------------------------- |
| [Xumi](../taiyi-contracts/contracts/ShejiTu.sol)          | “须弥”这个合约实例化一个处理事件的局域时间线。`角色（Actor）`可以在该时间线中进行出生、成长等基础事务。另外须弥也负责须弥域的部分资源生产，通过构建一套稳定的资源系统为其他时间线提供经济动力。须弥中资源事件中获得的部分资金（例如能量、元素等等）被自动地存入太乙DAO的金库，这个金库由`太乙传人们`（太乙师傅令牌的拥有者）共同管理。| [0x????](https://etherscan.io/address/0x????) |

### 世界基本通证
| 合约| 描述| 地址|
| ------------------------------------- | -------------------------------------- |-------------------------------------- |
| [能量](./contracts/world/WorldFungible.sol)                | 这是须弥域的ERC20通证合约，用于`能量`资源。该合约不能被升级或替换。`能量`在太乙世界中可以由特定的事件发行。| [0x????](https://etherscan.io/address/0x????) |
| [氢元素（H）](./contracts/world/WorldFungible.sol)                | 这是须弥域的ERC20通证合约，用于`氢元素`资源。该合约不能被升级或替换。`氢元素`在太乙世界中可以由特定的事件发行。| [0x????](https://etherscan.io/address/0x????) |

### 基本数据集
| 合约| 描述| 地址|
| ------------------------------------- | -------------------------------------- |-------------------------------------- |


## 开发

### 安装开发组件

```sh
pnpm
```

### 编译typescript脚本、合约代码，并产生typechain封装类

```sh
pnpm build
```

### 运行测试

```sh
pnpm test
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
