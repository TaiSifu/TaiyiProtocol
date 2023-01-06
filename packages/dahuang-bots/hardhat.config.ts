import '@nomiclabs/hardhat-waffle';
import '@nomiclabs/hardhat-ethers'
import '@typechain/hardhat';
import "hardhat-change-network";
import {HardhatUserConfig, NetworkUserConfig} from 'hardhat/types';
import './tasks';

// You have to export an object to set up your config
// This object can have the following optional entries:
// defaultNetwork, networks, solc, and paths.
// Go to https://buidler.dev/config/ to learn more
const config: HardhatUserConfig = {
  solidity: {
    compilers: [
      {
        version: '0.8.6',
        settings: {
          // You should disable the optimizer when debugging
          // https://hardhat.org/hardhat-network/#solidity-optimizer-support
          optimizer: {
            enabled: true,
            runs: 200
          },
        },
      },
    ],
  },
  networks: {
    hardhat: {
      mining: {
        auto: true,
        interval: 3000
      }
    },    
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
    polygonzkevm: {
      url: `https://rpc.public.zkevm-test.net`,
      chainId: 1422,
      accounts: [process.env.WALLET_PRIVATE_KEY!].filter(Boolean),
    },
    arbitrumGoerli: {
      url: `https://arbitrum-goerli.infura.io/v3/31fb185b55a74a46adb9be33ee696820`,
      chainId: 421613,
      accounts: [process.env.WALLET_PRIVATE_KEY!].filter(Boolean),
    },
    hard: {
      initialBaseFeePerGas: 0,
      url: `http://127.0.0.1:8545`
    },
  }
};

export default config;
