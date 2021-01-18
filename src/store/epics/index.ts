import { delay, filter, map, mapTo } from "rxjs/operators"
import { StartPingSwitch, Ping, Pong } from "../actions/index"

export const PingSwitchEpic = (action$: any) => {
    return action$.pipe(
        filter((action: any) => action.type == StartPingSwitch.type),
        delay(2000),
        mapTo(Ping),
    )
}
