import { log } from '@graphprotocol/graph-ts';
import {
    DelegateChanged,
    DelegateVotesChanged,
    SifuCreated,
    Transfer,
} from './types/SifusToken/SifusToken';
import { Sifu, Seed } from './types/schema';
import { BIGINT_ONE, BIGINT_ZERO, ZERO_ADDRESS } from './utils/constants';
import { getGovernanceEntity, getOrCreateDelegate, getOrCreateAccount } from './utils/helpers';

export function handleSifuCreated(event: SifuCreated): void {
    let sifuId = event.params.sifu.toString();

    let seed = new Seed(sifuId);
    seed.background = event.params.seed.background;
    seed.part1 = event.params.seed.part1;
    seed.part2 = event.params.seed.part2;
    seed.part3 = event.params.seed.part3;
    seed.part4 = event.params.seed.part4;
    seed.save();

    let sifu = Sifu.load(sifuId);
    if (sifu == null) {
        log.error('[handleSifuCreated] Sifu #{} not found. Hash: {}', [
            sifuId,
            event.transaction.hash.toHex(),
        ]);
        return;
    }

    sifu.seed = seed.id;
    sifu.save();
}

let accountSifus: string[] = []; // Use WebAssembly global due to lack of closure support
export function handleDelegateChanged(event: DelegateChanged): void {
    let tokenHolder = getOrCreateAccount(event.params.delegator.toHexString());
    let previousDelegate = getOrCreateDelegate(event.params.fromDelegate.toHexString());
    let newDelegate = getOrCreateDelegate(event.params.toDelegate.toHexString());
    accountSifus = tokenHolder.sifus;

    tokenHolder.delegate = newDelegate.id;
    tokenHolder.save();

    previousDelegate.tokenHoldersRepresentedAmount = previousDelegate.tokenHoldersRepresentedAmount - 1;
    let previousSifusRepresented = previousDelegate.sifusRepresented; // Re-assignment required to update array
    previousDelegate.sifusRepresented = previousSifusRepresented.filter(
        n => !accountSifus.includes(n),
    );
    newDelegate.tokenHoldersRepresentedAmount = newDelegate.tokenHoldersRepresentedAmount + 1;
    let newSifusRepresented = newDelegate.sifusRepresented; // Re-assignment required to update array
    for (let i = 0; i < accountSifus.length; i++) {
        newSifusRepresented.push(accountSifus[i]);
    }
    newDelegate.sifusRepresented = newSifusRepresented;
    previousDelegate.save();
    newDelegate.save();
}

export function handleDelegateVotesChanged(event: DelegateVotesChanged): void {
    let governance = getGovernanceEntity();
    let delegate = getOrCreateDelegate(event.params.delegate.toHexString());
    let votesDifference = event.params.newBalance - event.params.previousBalance;

    delegate.delegatedVotesRaw = event.params.newBalance;
    delegate.delegatedVotes = event.params.newBalance;
    delegate.save();

    if (event.params.previousBalance == BIGINT_ZERO && event.params.newBalance > BIGINT_ZERO) {
        governance.currentDelegates = governance.currentDelegates + BIGINT_ONE;
    }
    if (event.params.newBalance == BIGINT_ZERO) {
        governance.currentDelegates = governance.currentDelegates - BIGINT_ONE;
    }
    governance.delegatedVotesRaw = governance.delegatedVotesRaw + votesDifference;
    governance.delegatedVotes = governance.delegatedVotesRaw;
    governance.save();
}

let transferredSifuId: string; // Use WebAssembly global due to lack of closure support
export function handleTransfer(event: Transfer): void {
    let fromHolder = getOrCreateAccount(event.params.from.toHexString());
    let toHolder = getOrCreateAccount(event.params.to.toHexString());
    let governance = getGovernanceEntity();
    transferredSifuId = event.params.tokenId.toString();

    // fromHolder
    if (event.params.from.toHexString() == ZERO_ADDRESS) {
        governance.totalTokenHolders = governance.totalTokenHolders + BIGINT_ONE;
        governance.save();
    } else {
        let fromHolderPreviousBalance = fromHolder.tokenBalanceRaw;
        fromHolder.tokenBalanceRaw = fromHolder.tokenBalanceRaw - BIGINT_ONE;
        fromHolder.tokenBalance = fromHolder.tokenBalanceRaw;
        let fromHolderSifus = fromHolder.sifus; // Re-assignment required to update array
        fromHolder.sifus = fromHolderSifus.filter(n => n != transferredSifuId);

        if (fromHolder.delegate != null) {
            let fromHolderDelegate = getOrCreateDelegate(fromHolder.delegate);
            let fromHolderSifusRepresented = fromHolderDelegate.sifusRepresented; // Re-assignment required to update array
            fromHolderDelegate.sifusRepresented = fromHolderSifusRepresented.filter(
                n => n != transferredSifuId,
            );
            fromHolderDelegate.save();
        }

        if (fromHolder.tokenBalanceRaw < BIGINT_ZERO) {
            log.error('Negative balance on holder {} with balance {}', [
                fromHolder.id,
                fromHolder.tokenBalanceRaw.toString(),
            ]);
        }

        if (fromHolder.tokenBalanceRaw == BIGINT_ZERO && fromHolderPreviousBalance > BIGINT_ZERO) {
            governance.currentTokenHolders = governance.currentTokenHolders - BIGINT_ONE;
            governance.save();

            fromHolder.delegate = null;
        } else if (
            fromHolder.tokenBalanceRaw > BIGINT_ZERO &&
            fromHolderPreviousBalance == BIGINT_ZERO
        ) {
            governance.currentTokenHolders = governance.currentTokenHolders + BIGINT_ONE;
            governance.save();
        }

        fromHolder.save();
    }

    // toHolder
    if (event.params.to.toHexString() == ZERO_ADDRESS) {
        governance.totalTokenHolders = governance.totalTokenHolders - BIGINT_ONE;
        governance.save();
    }

    let toHolderDelegate = getOrCreateDelegate(toHolder.id);
    let toHolderSifusRepresented = toHolderDelegate.sifusRepresented; // Re-assignment required to update array
    toHolderSifusRepresented.push(transferredSifuId);
    toHolderDelegate.sifusRepresented = toHolderSifusRepresented;
    toHolderDelegate.save();

    let toHolderPreviousBalance = toHolder.tokenBalanceRaw;
    toHolder.tokenBalanceRaw = toHolder.tokenBalanceRaw + BIGINT_ONE;
    toHolder.tokenBalance = toHolder.tokenBalanceRaw;
    toHolder.totalTokensHeldRaw = toHolder.totalTokensHeldRaw + BIGINT_ONE;
    toHolder.totalTokensHeld = toHolder.totalTokensHeldRaw;
    let toHolderSifus = toHolder.sifus; // Re-assignment required to update array
    toHolderSifus.push(event.params.tokenId.toString());
    toHolder.sifus = toHolderSifus;

    if (toHolder.tokenBalanceRaw == BIGINT_ZERO && toHolderPreviousBalance > BIGINT_ZERO) {
        governance.currentTokenHolders = governance.currentTokenHolders - BIGINT_ONE;
        governance.save();
    } else if (toHolder.tokenBalanceRaw > BIGINT_ZERO && toHolderPreviousBalance == BIGINT_ZERO) {
        governance.currentTokenHolders = governance.currentTokenHolders + BIGINT_ONE;
        governance.save();

        toHolder.delegate = toHolder.id;
    }

    let sifu = Sifu.load(transferredSifuId);
    if (sifu == null) {
        sifu = new Sifu(transferredSifuId);
    }

    sifu.owner = toHolder.id;
    sifu.save();

    toHolder.save();
}
