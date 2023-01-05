/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { HardhatUserConfig } from 'hardhat/config';
import dotenv from 'dotenv';
import '@nomiclabs/hardhat-waffle';
import '@nomiclabs/hardhat-etherscan';
import '@float-capital/solidity-coverage';
import 'hardhat-typechain';
import 'hardhat-abi-exporter';
import "hardhat-change-network";
import '@openzeppelin/hardhat-upgrades';
import 'hardhat-gas-reporter';
// import '@matterlabs/hardhat-zksync-deploy';
// import '@matterlabs/hardhat-zksync-solc';
import './tasks';

dotenv.config();

const config: HardhatUserConfig = {
  solidity: {
    version: '0.8.6',
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  // zksolc: {
  //   version: "1.2.1",
  //   compilerSource: "binary",
  //   settings: {},
  // },
  networks: {
    mainnet: {
      url: `https://mainnet.infura.io/v3/${process.env.INFURA_PROJECT_ID}`,
      accounts: [process.env.WALLET_PRIVATE_KEY!].filter(Boolean),
    },
    rinkeby: {
      url: `https://rinkeby.infura.io/v3/${process.env.INFURA_PROJECT_ID}`,
      accounts: process.env.MNEMONIC
        ? { mnemonic: process.env.MNEMONIC }
        : [process.env.WALLET_PRIVATE_KEY!].filter(Boolean),
    },
    scrolll2: {
      url: `https://prealpha.scroll.io/l2`,
      accounts: [process.env.WALLET_PRIVATE_KEY!].filter(Boolean),
    },
    polygonzkevm: {
      url: `https://rpc.public.zkevm-test.net`,
      chainId: 1422,
      accounts: [process.env.WALLET_PRIVATE_KEY!].filter(Boolean),
    },
    arbitrumGoerli: {
      url: `https://goerli-rollup.arbitrum.io/rpc`,
      chainId: 421613,
      accounts: [process.env.WALLET_PRIVATE_KEY!].filter(Boolean),
    },
    // zksync2test: {
    //   url: `https://zksync2-testnet.zksync.dev`,
    //   ethNetwork: "goerli", // Can also be the RPC URL of the network (e.g. `https://goerli.infura.io/v3/<API_KEY>`)
    //   zksync: true,
    //   accounts: [process.env.WALLET_PRIVATE_KEY!].filter(Boolean),
    // },
    hardhat: {
      initialBaseFeePerGas: 0,
    },
    hard: {
      initialBaseFeePerGas: 0,
      url: `http://127.0.0.1:8545`
    },
  },
  etherscan: {
    apiKey: {
      polygonzkevm: process.env.ETHERSCAN_API_KEY as string, //just fake key
      arbitrumGoerli: process.env.ETHERSCAN_API_KEY as string //from https://arbiscan.io/
    },
    customChains: [
      {
        network: "polygonzkevm",
        chainId: 1422,
        urls: {
          apiURL: "https://explorer.public.zkevm-test.net/api",
          browserURL: "https://explorer.public.zkevm-test.net/"
        }
      },
      // {
      //   network: "arbitrumGoerli",
      //   chainId: 421613,
      //   urls: {
      //     apiURL: "https://api-goerli.arbiscan.io/",
      //     browserURL: "https://goerli.arbiscan.io"
      //   }
      // },
    ]  
  },
  abiExporter: {
    path: './abi',
    runOnCompile: true,
    clear: true,
  },
  gasReporter: {
    enabled: (process.env.REPORT_GAS == "1") ? true : false, //开启时，网络受限的情况下会导致测试启动非常慢！
    currency: 'USD',
    gasPrice: 50,
    src: 'contracts',
    coinmarketcap: '7643dfc7-a58f-46af-8314-2db32bdd18ba',
  },
  mocha: {
    timeout: 120_000,
  },
};
export default config;
