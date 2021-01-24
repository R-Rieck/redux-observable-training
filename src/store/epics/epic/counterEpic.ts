import { ofType } from "redux-observable";
import { filter, map, tap } from "rxjs/operators";

export const incrementIfOdd = { type: 'INCREMENT_IF_ODD' }
export const incrementWithValueX = (value: number) => ({ type: 'INCREMENT_COUNTER_WITH_X', payload: value })


export const increment = { type: 'INCREMENT_COUNTER' }
export const incrementBy = (value: number) => ({ type: 'INCREMENT_BY', payload: value })


export const counterEpic = (action$: any, state$: any) => {
    return action$.pipe(
        ofType('INCREMENT_IF_ODD'),
        filter(() => state$.value.counter % 2 === 0),
        map(() => increment)
    )

    // return action$.pipe(
    //     ofType('INCREMENT_COUNTER_WITH_X'),
    //     map((val: number) => incrementBy(val))
    // )
}