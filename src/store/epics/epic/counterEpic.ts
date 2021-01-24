import { ofType } from "redux-observable";
import { filter, tap } from "rxjs/operators";

export const increment = () => ({ type: 'INCREMENT_COUNTER' })

export const incrementIfOdd = () => ({ type: 'INCREMENT_IF_ODD' })


export const CounterEpic = (action$: any, state$: any) =>
    action$.pipe(
        ofType("INCREMENT_IF_ODD"),
        tap(() => console.log(state$)),
        filter(() => state$.counter % 2 === 0)
    )