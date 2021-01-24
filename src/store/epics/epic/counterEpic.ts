import { combineEpics, ofType } from "redux-observable";
import { filter, map, tap } from "rxjs/operators";

//public actions
export const incrementIfOdd = { type: 'INCREMENT_IF_ODD' }
export const incrementWithValueX = (value: number) => ({ type: 'INCREMENT_COUNTER_WITH_X', payload: value })

//private actions for dispatching in here
const increment = { type: 'INCREMENT_COUNTER' }
const incrementBy = (value: number) => ({ type: 'INCREMENT_BY', payload: value })


const incrementIfOddEpic = (action$: any, state$: any) => action$.pipe(
    ofType('INCREMENT_IF_ODD'),
    filter(() => state$.value.counter % 2 === 0),
    map(() => increment)
)

const incrementByXEpic = (action$: any) => action$.pipe(
    ofType('INCREMENT_COUNTER_WITH_X'),
    map((num: number) => incrementBy(num))
)

export default combineEpics(incrementIfOddEpic, incrementByXEpic)