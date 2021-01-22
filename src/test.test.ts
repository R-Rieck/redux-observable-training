import { } from 'jest'
import { map, reduce } from 'rxjs/operators'
import { customOperator } from './rxjs'
import {} from 'rxjs-marbles/jest'

test("isOdd test ", (done) => {
    customOperator().pipe(
        reduce((p: any ,n: number) => [...p, n], []) 
    ).subscribe(
        element => {
            expect(element).toEqual([2, 4, 6, 8, 10])
            done();
        }
    )
})