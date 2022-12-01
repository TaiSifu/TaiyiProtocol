import fs from 'fs-extra';
import { utils } from 'ethers';
import { task, types } from 'hardhat/config';
import { getAddressBookShareFilePath } from '../utils/addressConfig';

async function getAddressBook(net: string): Promise<{ [index: string]: any }> {
    // @ts-ignore
    const sharedAddressPath = getAddressBookShareFilePath(net);
    return JSON.parse(fs.readFileSync(sharedAddressPath, { encoding: "ascii" }));
}

task('create-proposal', 'Create a governance proposal')
    .addOptionalParam('net', 'The network name', "hard", types.string)
    .addOptionalParam(
        'taiyiDAOProxy',
        'The `taiyiDAOProxy` contract address',
        '',
        types.string,
    )
    .setAction(async ({ net, taiyiDAOProxy }, { ethers }) => {
        if (taiyiDAOProxy == '')
            taiyiDAOProxy = (await getAddressBook(net)).TaiyiDAOLogicV1;

        const TaiyiDAOFactory = await ethers.getContractFactory('TaiyiDAOLogicV1');
        const TaiyiDAO = TaiyiDAOFactory.attach(taiyiDAOProxy);

        const [deployer] = await ethers.getSigners();
        const oneETH = utils.parseEther('1');

        const receipt = await (
            await TaiyiDAO.propose(
                [deployer.address],
                [oneETH],
                [''],
                ['0x'],
                '# Test Proposal\n## This is a **test**.',
            )
        ).wait();
        if (!receipt.events?.length) {
            throw new Error('Failed to create proposal');
        }
        console.log('Proposal created');
    });
