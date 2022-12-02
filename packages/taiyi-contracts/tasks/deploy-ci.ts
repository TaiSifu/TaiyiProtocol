import fs from 'fs';
import { task } from 'hardhat/config';

task('deploy-ci', '快速部署太乙合约 (automated by CI)')
    .setAction(async ({ taisifu }, { ethers, run }) => {
        const [deployer] = await ethers.getSigners();
        const contracts = await run('deploy', {});

        if (!fs.existsSync('logs')) {
            fs.mkdirSync('logs');
        }
        fs.writeFileSync(
            'logs/deploy.json',
            JSON.stringify({
                contractAddresses: {
                    SifusDescriptor: contracts.SifusDescriptor.address,
                    SifusSeeder: contracts.SifusSeeder.address,
                    SifusToken: contracts.SifusToken.address,
                },
                gitHub: {
                    // Get the commit sha when running in CI
                    sha: process.env.GITHUB_SHA,
                },
            }),
            { flag: 'w' },
        );
    });
