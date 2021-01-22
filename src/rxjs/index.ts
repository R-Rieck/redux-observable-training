import { interval, of, NEVER, EMPTY, throwError, from, Subject, BehaviorSubject, fromEvent, timer, observable, Observable, range } from "rxjs";
import { bufferCount, catchError, concatMap, debounce, delay, filter, map, mergeAll, mergeMap, pairwise, reduce, scan, switchAll, switchMap, take, takeLast, takeUntil, takeWhile, tap, zipAll, startWith, retry, retryWhen } from "rxjs/operators";
import { ajax } from 'rxjs/ajax'
import { pipeFromArray } from "rxjs/internal/util/pipe";
import { createModifiersFromModifierFlags } from "typescript";
import { networkInterfaces } from "os";
import { act } from "react-dom/test-utils";

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
    //print value each x seconds
    // from(OneToTenArray).pipe(
    //     concatMap(v => of(v).pipe(delay(1000))),
    //     map(el => el + 10),
    // ).subscribe(displayObserver)

    //inner Observer => use for api calls and stuff like that
    const innerObs = (data: any) => {
        return of(data).pipe(
            delay(1000)
        )
    }

    //Ein einfaches map erfordert zwei subscriber da der innerobs ein observable zurücksendet
    from(OneToTenArray).pipe(
        map(element => innerObs(element))
    ).subscribe((outerObsVal) => outerObsVal.subscribe((innerObsVal) => console.log(innerObsVal)))

    //Erspart ein zweites Subscribe und merged alle observer zusammen
    from(OneToTenArray).pipe(
        map(element => innerObs(element)),
        mergeAll()
    ).subscribe((val) => console.log('mergeAll:', val))

    //mergemap erspart das map und merge all und führt alle inner observer aus
    from(OneToTenArray).pipe(
        mergeMap(element => innerObs(element))
    ).subscribe((val) => console.log('mergeMap:', val))

    //gibt nur den letzten observer zurück und cancelt alle anderen
    from(OneToTenArray).pipe(
        map(element => innerObs(element)),
        switchAll()
    ).subscribe((val) => console.log('switchAll:', val))

    //switchMap cancelt alle anderen InnerObs und executed nur den letzten
    from(OneToTenArray).pipe(
        switchMap(element => innerObs(element))
    ).subscribe((val) => console.log('switchmap:', val))

    //concatMap wartet auf den vorherigen innerObs bevor er weiter macht
    from(OneToTenArray).pipe(
        concatMap(elemet => innerObs(elemet))
    ).subscribe((val) => console.log('concat:', val))
}


const activeFilter = new BehaviorSubject("none")

export const filterExmapleOfSwitchMap = (filter: string) => {
    activeFilter.next(filter)

    const getData = (data: any) => {
        return of(data).pipe(
            delay(3000)
        )
    }

    activeFilter.pipe(
        switchMap((element: any) => getData(element))
    ).subscribe(displayObserver)
}

export const startWithOperator = () => {
    from(OneToTenArray).pipe(
        concatMap(val => interval(2000).pipe(
            startWith("Starting"),
            map(el => el)
        ))
    ).subscribe(displayObserver)
}

export const filterByOdd = () => filter((num: number) => num % 2 === 0)

export const customOperator = () => {
    return from(OneToTenArray).pipe(
        filterByOdd()
    ).subscribe(displayObserver)
}

export const errorHandling = () => {
    of(1).pipe(
        mergeMap(val => throwError(new Error("Something went wrong" + val)).pipe(
            catchError((err: Error) => of(err.message))
        )),
        tap(console.log)
    ).subscribe(displayObserver)
}

export const RequestWithRetryAndRetryWhen = () => {
    of(1).pipe(
        concatMap(() => ajax.getJSON("sshttps://api.chucknorris.io/jokes/random").pipe(
            retry(2)
        ))
    ).subscribe(displayObserver)

    of(1).pipe(
        concatMap(() => ajax.getJSON("sshttps://api.chucknorris.io/jokes/random").pipe(
            retryWhen((x: any) => interval(2000).pipe(tap(console.log), take(2)))
        ))
    ).subscribe(displayObserver)
}