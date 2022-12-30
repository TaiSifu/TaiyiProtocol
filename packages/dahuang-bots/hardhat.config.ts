import '@nomiclabs/hardhat-waffle';
import '@typechain/hardhat';
import "hardhat-change-network";
import {HardhatUserConfig, NetworkUserConfig} from 'hardhat/types';
//import 'hardhat-deploy';

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
      accounts: [
        '0x986ad5a63c8fbb38fe3fcfa27948bb05828584b14a491cc7e411a606832eba22', //0xed09032D79125258147D703c5223816Dee5EEcDE
        '0x413f7eb19448c124059f7361b56c5e956630ff53155d468001390faaece29384' //0xFEC629c661Ad070bB0811Ec36F0720D6838033ce
      ]
    },
    hard: {
      initialBaseFeePerGas: 0,
      url: `http://127.0.0.1:8545`
    },
  }
};

export default config;
