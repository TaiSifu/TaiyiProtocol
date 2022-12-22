import { task } from 'hardhat/config';

type ContractName =
  | 'SifusDescriptor'
  | 'SifusSeeder'
  | 'SifusToken';

interface VerifyArgs {
  address: string;
  constructorArguments?: (string | number)[];
  libraries?: Record<string, string>;
}

const contracts: Record<ContractName, VerifyArgs> = {
  SifusDescriptor: {
    address: '0xe327d9348ceBb446B4Ce0484c4ea0A79a67fC809',
    // libraries: {
    //   MultiPartRLEToSVG: '0x0bbad8c947210ab6284699605ce2a61780958264',
    // },
  },
  SifusSeeder: {
    address: '0x760982Cb4b3df1E54EC8f2242A8306064d388499',
  },
  SifusToken: {
    address: '0x677dC162de74C4b2b517479aF8b3aA71DAD1a2E9',
    constructorArguments: [
      '0xFEC629c661Ad070bB0811Ec36F0720D6838033ce',
      '0xe327d9348ceBb446B4Ce0484c4ea0A79a67fC809',
      '0x760982Cb4b3df1E54EC8f2242A8306064d388499',
      '0xD013CFE7b0E99DD10c94dBDa8E8e5f4D9b832838',
    ],
  },
};

task('verify-etherscan', 'Verify the Solidity contracts on Etherscan').setAction(async (_, hre) => {
  for (const [name, args] of Object.entries(contracts)) {
    console.log(`verifying ${name}...`);
    try {
      await hre.run('verify:verify', {
        ...args,
      });
    } catch (e) {
      console.error(e);
    }
  }
});
