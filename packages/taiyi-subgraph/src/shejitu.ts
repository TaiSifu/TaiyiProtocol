import { Address, BigInt, dataSource, log } from '@graphprotocol/graph-ts';
import {
    AgeEvent,
    BranchEvent,
    ActiveEvent,
} from './types/ShejiTu/ShejiTu';
import {
    WorldEvents
} from './types/WorldEvents/WorldEvents';
import { Actor, Sifu, Grow, Active, Event } from './types/schema';
import { getEventEntity, getOrCreateAccount } from './utils/helpers';

export function handleAgeEvent(event: AgeEvent): void {
    let actorId = event.params.actor.toString();
    let actor = Actor.load(actorId);
    if (actor == null) {
        log.error('[handleAgeEvent] Actor #{} not found. Hash: {}', [
            actorId,
            event.transaction.hash.toHex(),
        ]);
        return;
    }

    // let accountAddress = event.transaction.from.toHex();
    // let account = getOrCreateAccount(accountAddress);

    let grown = new Grow(event.transaction.hash.toHex());
    grown.actor = actorId;
    grown.age = event.params.age;
    grown.txIndex = event.transaction.index;
    grown.blockNumber = event.block.number;
    grown.blockTimestamp = event.block.timestamp;
    
    let evt = getEventEntity();
    evt.actor = grown.actor;
    evt.age = grown.age;
    evt.evtId = event.params.eventId;
    evt.save();
    grown.events = [evt.id];

    grown.save();
}

export function handleBranchEvent(event: BranchEvent): void {
    let actorId = event.params.actor.toString();
    let actor = Actor.load(actorId);
    if (actor == null) {
        log.error('[handleBranchEvent] Actor #{} not found. Hash: {}', [
            actorId,
            event.transaction.hash.toHex(),
        ]);
        return;
    }

    let grown = Grow.load(event.transaction.hash.toHex());
    if (grown == null) {
        let active = Active.load(event.transaction.hash.toHex());
        if (active == null) {
            log.error('[handleBranchEvent] Grow or Active not found. Hash: {}', [
            event.transaction.hash.toHex(),
            ]);
            return;
        }
        else {
            let evt = getEventEntity();
            evt.actor = active.actor;
            evt.age = active.age;
            evt.evtId = event.params.eventId;
            evt.save();
            let evts = active.events;
            evts.push(evt.id);
        
            active.save();        
        }
    }
    else {
        let evt = getEventEntity();
        evt.actor = grown.actor;
        evt.age = grown.age;
        evt.evtId = event.params.eventId;
        evt.save();
        let evts = grown.events;
        evts.push(evt.id);
    
        grown.save();    
    }
}

export function handleActiveEvent(event: ActiveEvent): void {
    let actorId = event.params.actor.toString();
    let actor = Actor.load(actorId);
    if (actor == null) {
        log.error('[handleActiveEvent] Actor #{} not found. Hash: {}', [
            actorId,
            event.transaction.hash.toHex(),
        ]);
        return;
    }

    // let accountAddress = event.transaction.from.toHex();
    // let account = getOrCreateAccount(accountAddress);

    let active = new Active(event.transaction.hash.toHex());
    active.actor = actorId;
    active.age = event.params.age;
    active.txIndex = event.transaction.index;
    active.blockNumber = event.block.number;
    active.blockTimestamp = event.block.timestamp;
    
    let evt = getEventEntity();
    evt.actor = active.actor;
    evt.age = active.age;
    evt.evtId = event.params.eventId;
    evt.save();
    active.events = [evt.id];

    active.save();
}
