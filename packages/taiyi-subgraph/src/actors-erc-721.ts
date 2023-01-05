import { log } from '@graphprotocol/graph-ts';
import {
    ActorMinted,
    Transfer,
} from './types/Actors/Actors';
import { Actor } from './types/schema';
import { BIGINT_ONE, BIGINT_ZERO, ZERO_ADDRESS } from './utils/constants';
import { getGovernanceEntity, getOrCreateDelegate, getOrCreateAccount } from './utils/helpers';

export function handleActorMinted(event: ActorMinted): void {
    let actorId = event.params.actorId.toString();

    let actor = Actor.load(actorId);
    if (actor == null) {
        log.error('[handleActorMinted] Actor #{} not found. Hash: {}', [
            actorId,
            event.transaction.hash.toHex(),
        ]);
        return;
    }

    let ownerAddress = event.params.owner.toHex();
    let owner = getOrCreateAccount(ownerAddress);

    actor.owner = owner.id;
    actor.save();
}

let transferredActorId: string; // Use WebAssembly global due to lack of closure support
export function handleTransfer(event: Transfer): void {
    let fromHolder = getOrCreateAccount(event.params.from.toHexString());
    let toHolder = getOrCreateAccount(event.params.to.toHexString());
    transferredActorId = event.params.tokenId.toString();

    // fromHolder
    let fromHolderActors = fromHolder.actors; // Re-assignment required to update array
    fromHolder.actors = fromHolderActors.filter(n => n != transferredActorId);
    fromHolder.save();

    // toHolder
    let toHolderActors = toHolder.actors; // Re-assignment required to update array
    toHolderActors.push(event.params.tokenId.toString());
    toHolder.actors = toHolderActors;

    let actor = Actor.load(transferredActorId);
    if (actor == null) {
        actor = new Actor(transferredActorId);
        actor.born = false;
    }

    actor.owner = toHolder.id;
    actor.save();

    toHolder.save();
}
