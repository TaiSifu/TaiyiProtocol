# @taiyi/dahuang-contracts

## 背景

[大荒（Dahuang）](../taiyi-contracts/contracts/ShejiTu.sol)是大荒的时间线，也是大荒世界的入口。

## 智能合约

### 大荒

| 合约| 描述| 地址|
| ------------------------------------- | -------------------------------------- |-------------------------------------- |
| [Dahuang](../taiyi-contracts/contracts/ShejiTu.sol) | “大荒”这个合约运行着一个处理事件的局域时间线。`角色（Actor）`可以在该时间线中进行出生、成长等基础事务。另外须弥也负责大荒的部分资源生产，通过构建一套稳定的资源系统为其他时间线提供经济动力。须弥中资源事件中获得的部分资金（例如能量、元素等等）被自动地存入太乙DAO的金库，这个金库由`太乙传人们`（太乙师傅令牌的拥有者）共同管理。| [0x5fF3BCEF393d2B604B8a1243D14b2101438EB205](https://goerli.arbiscan.io/address/address/0x5fF3BCEF393d2B604B8a1243D14b2101438EB205) |

### 世界基本通证
| 合约| 描述| 地址|
| ------------------------------------- | -------------------------------------- |-------------------------------------- |
| [金石](../taiyi-contracts/contracts/world/WorldFungible.sol)                | 这是太乙世界的ERC20通证合约，用于`金石`资源。该合约不能被升级或替换。`金石`在太乙世界中可以由特定的事件发行。| [0x5635435ceB595c1E987E22d92CfDAaA59a4020ea](https://goerli.arbiscan.io/address/address/0x5635435ceB595c1E987E22d92CfDAaA59a4020ea) |
| [食材](../taiyi-contracts/contracts/world/WorldFungible.sol)                | 这是太乙世界的ERC20通证合约，用于`食材`资源。该合约不能被升级或替换。`食材`在太乙世界中可以由特定的事件发行。| [0x73FcC64D0A7AD59aae52cB695E1AcB8aA8bc9c15](https://goerli.arbiscan.io/address/address/0x73FcC64D0A7AD59aae52cB695E1AcB8aA8bc9c15) |
| [木材](../taiyi-contracts/contracts/world/WorldFungible.sol)                | 这是太乙世界的ERC20通证合约，用于`木材`资源。该合约不能被升级或替换。`木材`在太乙世界中可以由特定的事件发行。| [0xd315c07307fd56Da5cec6A4f0D73b2470aD63E40](https://goerli.arbiscan.io/address/address/0xd315c07307fd56Da5cec6A4f0D73b2470aD63E40) |
| [织物](../taiyi-contracts/contracts/world/WorldFungible.sol)                | 这是太乙世界的ERC20通证合约，用于`织物`资源。该合约不能被升级或替换。`织物`在太乙世界中可以由特定的事件发行。| [0xea399aEE31A7e3e1507E46FDbcA5973c11B423dE](https://goerli.arbiscan.io/address/address/0xea399aEE31A7e3e1507E46FDbcA5973c11B423dE) |
| [药材](../taiyi-contracts/contracts/world/WorldFungible.sol)                | 这是太乙世界的ERC20通证合约，用于`药材`资源。该合约不能被升级或替换。`药材`在太乙世界中可以由特定的事件发行。| [0x2b852f1AcB75A826F7A48ba7A212d2FDD2a89EDf](https://goerli.arbiscan.io/address/address/0x2b852f1AcB75A826F7A48ba7A212d2FDD2a89EDf) |
| [威望](../taiyi-contracts/contracts/world/WorldNontransferableFungible.sol)  | 这是太乙世界的不可转移ERC20通证合约，用于`威望`资源。该合约不能被升级或替换。`威望`在太乙世界中可以由特定的事件发行。| [0x628D77547Bb0f214ABEc9b5d4cc3776F1EF8fda3](https://goerli.arbiscan.io/address/address/0x628D77547Bb0f214ABEc9b5d4cc3776F1EF8fda3) |

### 基本数据集
| 模块序号（数字为新扩展的模块） | 合约| 描述| 地址|
| ------------------------------------- | ------------------------------------- | -------------------------------------- |-------------------------------------- |
| WORLD_MODULE_EVENTS | [WorldEvents](./contracts/world/dataset/WorldEvents.sol) | 这是大荒世界的事件集合，除了用于事件处理器的定义，也用于记录角色身上发生的事件历史。| [0x980431525f8e09C082D4170A1F6E6508c49734C9](https://goerli.arbiscan.io/address/0x980431525f8e09C082D4170A1F6E6508c49734C9) |
| WORLD_MODULE_BORN_PLACES | [ActorBornPlaces](./contracts/world/dataset/ActorBornPlaces.sol) | 这是大荒世界角色的出身地点集合，用于记录角色出身在那个`区域`(Zone)。| [0x72Aabf8154a81C9D0e41b60a60168BEf4dAFBaF8](https://goerli.arbiscan.io/address/0x72Aabf8154a81C9D0e41b60a60168BEf4dAFBaF8) |
| WORLD_MODULE_RELATIONSHIP | [ActorRelationship](./contracts/world/dataset/ActorRelationship.sol) | 这是大荒世界角色和角色之间关系的数据，用于记录角色和另外一个角色是什么关系。| [0x983f348d6563050c0Ebebdd79A84403a7Ed66262](https://goerli.arbiscan.io/address/0x983f348d6563050c0Ebebdd79A84403a7Ed66262) |
| WORLD_MODULE_TALENTS | [ActorTalents](./contracts/world/dataset/ActorLocations.sol) | 这是大荒世界角色的天赋数据，用于记录角色拥有的天赋点。| [0x3597875a10A092AF10e218E419A5F8d9a11cbcA0](https://goerli.arbiscan.io/address/0x3597875a10A092AF10e218E419A5F8d9a11cbcA0) |
| WORLD_MODULE_BUILDINGS | [WorldBuildings](./contracts/world/dataset/WorldBuildings.sol) | 这是大荒世界建筑物数据，除了建筑物定义，也用于记录世界中的建筑物实体。| [0x9686854F200fa51ad4c09c04cd887E45fCAa569F](https://goerli.arbiscan.io/address/address/0x9686854F200fa51ad4c09c04cd887E45fCAa569F) |
| WORLD_MODULE_SEASONS | [WorldSeasons](./contracts/world/dataset/WorldSeasons.sol) | 这是大荒世界角色的出身时节集合，除了用于二十四节气的定义，也用于记录角色出身在哪个时节。| [0x7ad8953ea4bb366922dE46331fD3fb673743546e](https://goerli.arbiscan.io/address/address/0x7ad8953ea4bb366922dE46331fD3fb673743546e) |
| WORLD_MODULE_VILLAGES | [WorldVillages](./contracts/world/dataset/WorldVillages.sol) | 这是大荒世界的村落（太乙村）集合，记录了角色们自己创建的一些村落。| [0x232481BBCF26c45644eA040A1B939D6Ec1016DDc](https://goerli.arbiscan.io/address/address/0x232481BBCF26c45644eA040A1B939D6Ec1016DDc) |
| WORLD_MODULE_ZONE_BASE_RESOURCES | [WorldZoneBaseResources](./contracts/world/dataset/WorldZoneBaseResources.sol) | 这是大荒世界的区域中基础资源生长的记录数据，用于记录一个区域的基础资源的生成和可采集量。| [0xB4b1f8d51d2A0CbE8569A17e49984d07949aa077](https://goerli.arbiscan.io/address/address/0xB4b1f8d51d2A0CbE8569A17e49984d07949aa077) |
| 219 | [WorldDeadActors](./contracts/world/dataset/WorldDeadActors.sol) | 这是大荒世界的死亡角色记录数据。| [0x2fD2671e8CA03448A40205dDf36262d27e886B27](https://goerli.arbiscan.io/address/address/0x2fD2671e8CA03448A40205dDf36262d27e886B27) |
| 220 | [ActorsGender](./contracts/world/dataset/ActorsGender.sol) | 这是大荒世界的角色性别记录数据。| [0x498b5b9D8e0A0f6540FeE1ACed417559014D5ce5](https://goerli.arbiscan.io/address/address/0x498b5b9D8e0A0f6540FeE1ACed417559014D5ce5) |



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
