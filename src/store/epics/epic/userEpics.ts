import { ofType } from "redux-observable";
import { EMPTY } from "rxjs";
import { ajax } from "rxjs/ajax";
import { catchError, map, switchMap, tap } from "rxjs/operators";

export const AddUser = (username: string) => ({
    type: "ADD_USER",
    payload: username,
});

export const AddUserFullfield = (payload: any) => ({
    type: "ADD_USER_FULLFIELD",
    payload
})

export const AddUserEpic = (action$: any) => {
    return action$.pipe(
        ofType("ADD_USER"),
        tap(console.log),
        switchMap((user: any) => ajax.getJSON("https://api.github.com/search/users?q=" + user.payload).pipe(
            tap(el => console.log(el)),
            catchError(err => EMPTY),
            map(el => AddUserFullfield(el))
        ))
    )
}
