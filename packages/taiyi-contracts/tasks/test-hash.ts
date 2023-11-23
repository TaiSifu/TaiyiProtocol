//yarn task:test-hash
import { task } from 'hardhat/config';
import { toUtf8Bytes } from 'ethers/lib/utils';
import sha3 from "js-sha3";
import { BigNumber } from 'ethers';

task('test-hash', 'do some test on hash')
    .setAction(async (args, { ethers }) => {        
        //let k = sha3.shake_128("0123456789", 64);
        let k = sha3.keccak_256(toUtf8Bytes("0123456789"));
        //console.log('0x'+k);
        let m = BigNumber.from('0x'+k);
        //console.log(m.toString());
        let r = m.mod(BigNumber.from(1e10));
        // console.log(r.toHexString());
        // console.log(r.toString());

        //let target = BigNumber.from("0x666666");
        let target = BigNumber.from("0x666");
        let pi : string = "04d6e99fa5a46bc0";
        let n = 0;
        do {
            //pi = Math.floor(Math.random() * 1e18).toString(16).padStart(16, '0');
            k = sha3.keccak_256(pi);
            m = BigNumber.from('0x'+k);
            r = m.mod(BigNumber.from(2).pow(12));
            n++;
        } while(!r.eq(target));
        console.log(pi.toString(), n, m.toHexString());
    });
