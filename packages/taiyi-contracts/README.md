# @taiyi/contracts

## 背景

    “太乙岛”是一个实验项目，该项目试图促进一个太乙虚拟世界链上社区的形成。为了社区能够创造出长期价值，“太乙岛”也构建了属于社区的资产金库。

[山河社稷图（ShejiTu）](./contracts/ShejiTu.sol)是太乙协议的全局时间线，也是太乙大千世界的入口。


## 智能合约

| 合约| 描述| 地址|
| ------------------------------------- | -------------------------------------- |-------------------------------------- |
| [SifusToken](./contracts/SifusToken.sol)                        | 这是“太乙师傅令牌”的ERC721通证合约。不像太乙的其他合约，该合约不能被升级或替换。除了标准ERC721通证的功能外，社区还要使用太乙师傅来锁定和替换周边合约，存储“治理合约”需要的验证数据，并控制新师傅的铸造和销毁。这个合约包含了两个主要角色 - `铸造者（minter）`和`拥有者（owner）`。在构造函数中，`铸造者`就被设定为“山河社稷图”合约（全局时间线）的地址，而合约所有权则被交予后面部署的太乙DAO合约。| [0x????](https://etherscan.io/address/0x????) |
| [SifusSeeder](./contracts/SifusSeeder.sol)                      | 这个合约被用来在师傅令牌的铸造过程中决定其显示属性。这个合约在未来是能够被替换的，因此可以升级属性的生成算法。当然，太乙DAO也可以锁定这个合约来避免未来更新。当前，师傅的属性由伪随机算法生成：`keccak256(abi.encodePacked(blockhash(block.number - 1), sifuId))`。因此，师傅属性的生成不是一个完全的随机过程，这些属性是能够根据预期区块中的铸造事件而被预测出来的。| [0x????](https://etherscan.io/address/0x????) |
| [SifusDescriptor](./contracts/SifusDescriptor.sol)              | 这个合约负责存储和渲染师傅令牌形象。令牌的'部件'以如下格式被存储进对应的字节数组中：`调色板序号，边界数据[顶(Y)，右(X)，底(Y)，左(X)]（共4字节），[像素数量（1字节），像素颜色序号（1字节）][]`。当SifusToken的接口`tokenURI`被调用时，师傅部件的数据从合约中读取出来并被转换为一系列的SVG矩形描述，以便在链上构造SVG图像。生成好的整个SVG图像，再被转为base64编码。最后，通证的URI是一个base64编码过的URI数据，它由JSON上下文直接构成，并包含了上述SVG图像。| [0x????](https://etherscan.io/address/0x????) |

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
