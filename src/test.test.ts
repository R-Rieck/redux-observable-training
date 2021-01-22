import { reduce } from 'rxjs/operators'
import { customOperator, filterByOdd } from './rxjs'
import { marbles } from 'rxjs-marbles/jest'

test("isOdd test ", (done) => {
    customOperator().pipe(
        reduce((p: any, n: number) => [...p, n], [])
    ).subscribe(
        element => {
            expect(element).toEqual([2, 4, 6, 8, 10])
            done();
        }
    )
})

test("isOdd test with marbles", marbles(context => {
    const numberObj = { a: 1, b: 2, c: 3, d: 4, e: 5, f: 6, g: 7, h: 8, i: 9, j: 10 }
    const numbers = context.cold('-a-b-c-d-e-f-g-h-i-j--|', numberObj)
    const isOdd = "---a---b---c---d---e--|"
    const expectedIsOdd = { a: 2, b: 4, c: 6, d: 8, e: 10 }

    const filtered = numbers.pipe(filterByOdd())

    context.expect(filtered).toBeObservable(isOdd, expectedIsOdd)
}))