import '@nomiclabs/hardhat-ethers';
import { task } from 'hardhat/config';
import { Wallet } from '@ethersproject/wallet';

task('accounts', 'Prints the list of accounts', async (_, { ethers }) => {
    const accounts = await ethers.getSigners();

    for (const account of accounts) {
        console.log(account.address);
    }
});

task('new-account', 'new account', async (_, { ethers }) => {
    var acc = Wallet.createRandom();    

    console.log(acc.address);
    console.log(acc.privateKey);
    console.log(acc.mnemonic.phrase);
});
