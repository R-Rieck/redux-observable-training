import { delay, filter, map } from "rxjs/operators"
import { Ping, Pong } from "../actions/index"

export const PingSwitchEpic = (action$: any) => {
    return action$.pipe(
        filter((action: any) => action.type == Ping.type),
        delay(4000),
        map(() => Pong)
    )
}
