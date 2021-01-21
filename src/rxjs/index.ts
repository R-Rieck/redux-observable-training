import { interval, of, NEVER, EMPTY, throwError, from, Subject, BehaviorSubject, fromEvent, timer } from "rxjs";
import { bufferCount, catchError, concatMap, debounce, delay, filter, map, mergeAll, mergeMap, pairwise, reduce, scan, take, takeLast, takeUntil, takeWhile, tap, zip, zipAll } from "rxjs/operators";
import { ajax } from 'rxjs/ajax'
import { pipeFromArray } from "rxjs/internal/util/pipe";

const OneToTenArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
const displayObserver = {
    next: (e: any) => console.log("next: ", e),
    error: (err: any) => null,
    complete: () => console.log('completed'),
}

export const basicBlockBuilding = () => {
    const observer = {
        next: (x: any) => console.log(x),
        error: (err: Error) =>
            console.error("Observer got an error: " + err.message),
        complete: () => console.log("Observer got a complete notification"),
    };
    const subscription = interval(500)
        .pipe(
            filter((e) => e < 10),
            take(3)
        )
        .subscribe(observer);
}

export const ofValue = () => {
    of(...[1, 2, 3, 4, 5, 6, 7, 8, 9])
        .subscribe((value: any) => console.log(value))
}

export const nonProductionValues = () => {
    const stream$ = of(1, 2, 3)
    const never$ = NEVER
    const empty$ = EMPTY
    const throwError$ = throwError(new Error("something went wrong"))

    const observer = {
        next: (e: any) => console.log(e),
        error: (e: Error) => console.log(e.message),
        complete: () => console.log("all done")
    }
    console.log('____________Stream_________________')
    stream$.subscribe(observer)
    console.log('____________NEVER__________________')
    never$.subscribe(observer)
    console.log('____________EMPTY__________________')
    empty$.subscribe(observer);
    console.log('____________THROWERROR_____________')
    throwError$.subscribe(observer)

}


export const foreachAsLoop = () => {
    of(1, 2, 3, 4, 5).pipe(tap(e => console.log('TAP:', e))).forEach(result => console.log(result))
}

export const fromValue = () => {
    from([1, 2, 3]).subscribe((e) => console.log(e))
}

export const ajaxRequest = () => {
    ajax.getJSON("https://api.chucknorris.io/jokes/random").subscribe((e: any) => console.log(e.value))
}

export const subjectAsObservable = () => {
    const sub = new BehaviorSubject("start")

    sub.next("hello")
    sub.next("world")
    sub.subscribe((e: any) => console.log(e)); //move this line to see different results
}

export const tapOperator = () => {
    of(1, 2, 3, 4, 5).pipe(
        tap((e: any) => console.log('previous datate', e)),
        filter((e: any) => e <= 3),
        tap((e: any) => console.log('after filter', e))
    )
        .subscribe()
}

export const filterOperator = () => {
    console.log("Input: ", OneToTenArray)
    from(OneToTenArray)
        .pipe(filter(x => x <= 5))
        .subscribe(displayObserver)
}

export const takeOperators = () => {
    console.log("Input: ", OneToTenArray)

    console.log("TAKE 3")
    from(OneToTenArray)
        .pipe(take(3))
        .subscribe(displayObserver)

    console.log("TAKELAST 3")
    from(OneToTenArray)
        .pipe(takeLast(3))
        .subscribe(displayObserver)

    console.log("TAKEWHILE < 5")
    from(OneToTenArray)
        .pipe(takeWhile(x => x < 5))
        .subscribe(displayObserver)

    console.log("TAKEUNTIL > 3")
    const cancelEvent = fromEvent<KeyboardEvent>(document, "keyup").pipe(
        tap(a => console.log(a)),
        filter(a => a.key === "Enter")
    )
    interval(500)
        .pipe(takeUntil(cancelEvent))
        .subscribe(displayObserver)
}

export const scanAndReduceOperator = () => {
    console.log("_________________scan____________________");
    from(OneToTenArray).pipe(
        tap((e: any) => console.log(e)),
        scan((prev, next) => prev + next),
    )
        .subscribe(displayObserver)
    console.log("_________________reduce__________________");
    from(OneToTenArray).pipe(
        tap((e: any) => console.log(e)),
        reduce((prev, next) => prev + next),
    )
        .subscribe(displayObserver)
}

export const pairwiseOperator = () => {
    from(OneToTenArray)
        .pipe(
            pairwise(),
        )
        .subscribe(displayObserver)
}

export const mapConcatMapSwitchMapOperator = () => {
    from(OneToTenArray).pipe(
        concatMap(v => of(v).pipe(delay(1000))),
        map(el => el + 10),
    ).subscribe(displayObserver)


    // from(OneToTenArray)
    //     .pipe(
    //         mergeMap()
    //     )
    //     .subscribe()
}