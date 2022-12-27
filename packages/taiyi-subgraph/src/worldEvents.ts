import { BigInt, log } from '@graphprotocol/graph-ts';
import {
    Born,
} from './types/WorldEvents/WorldEvents';
import { Actor } from './types/schema';
import { getEventEntity, getOrCreateAccount } from './utils/helpers';

export function handleBorn(event: Born): void {
    let actorId = event.params.actor.toString();

    let actor = Actor.load(actorId);
    if (actor == null) {
        log.error('[handleAgeEvent] Actor #{} not found. Hash: {}', [
            actorId,
            event.transaction.hash.toHex(),
        ]);
        return;
    }

    actor.born = true;
    actor.save();
}
