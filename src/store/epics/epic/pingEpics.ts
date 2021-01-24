import {  delay, filter, map } from "rxjs/operators"

export const Ping = { type: "PING", payload: true };
export const Pong = { type: "PONG", payload: false };

export const PingSwitchEpic = (action$: any) => {
    return action$.pipe(
        filter((action: any) => action.type == Ping.type),
        delay(4000),
        map(() => Pong)
    )
}