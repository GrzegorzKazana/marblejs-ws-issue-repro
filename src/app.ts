import { matchEvent } from '@marblejs/core';
import { webSocketListener, WsEffect } from '@marblejs/websockets';
import { eventValidator$ } from '@marblejs/middleware-io';

import * as t from 'io-ts';
import { Subject, Observable } from 'rxjs';
import { exhaustMap, filter, finalize, ignoreElements, map, takeUntil, tap } from 'rxjs/operators';

type Message = { publisher: string; message: string };

class UserPoolPubSub {
    private readonly pubSub = new Subject<Message>();

    public join(id: string): Observable<Message> {
        this.publish(id, 'Hello there!');

        return this.pubSub.pipe(filter(({ publisher }) => publisher !== id));
    }

    public publish(publisher: string, message: string): void {
        this.pubSub.next({ publisher, message });
    }
}

const pool = new UserPoolPubSub();

const join$: WsEffect = (event$, { client: { id } }) => {
    const leave$ = event$.pipe(matchEvent('LEAVE'));

    return event$.pipe(
        matchEvent('JOIN'),
        exhaustMap(() =>
            pool.join(id).pipe(
                map(({ message }) => ({ type: 'RECEIVED', payload: message })),
                takeUntil(leave$),
            ),
        ),
        finalize(() => pool.publish(id, 'I was disconnected, sorry')),
    );
};

const send$: WsEffect = (event$, { client: { id } }) =>
    event$.pipe(
        matchEvent('POST'),
        eventValidator$(t.string),
        tap(({ payload }) => pool.publish(id, payload)),
        ignoreElements(),
    );

const effects = [join$, send$];

export default webSocketListener({ effects });
