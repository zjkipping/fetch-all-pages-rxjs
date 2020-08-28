import { of, Observable } from 'rxjs';
import { expand, takeWhile, tap, reduce } from 'rxjs/operators'

interface PagedResponse<T> {
  done: boolean;
  page: number;
  content: T[];
}

interface ResponseContent {
  id: number
}

makeCall(1).pipe(
  expand(val => makeCall(val.page + 1)),
  tap(val => console.log(val)),
  takeWhile(val => !val.done, true),
  reduce((acc: ResponseContent[], curr: PagedResponse<ResponseContent>) => [...acc, ...curr.content], [])
).subscribe(val => console.log('Done! ', val))

function makeCall(page: number): Observable<PagedResponse<ResponseContent>> {
  return of({
    done: page === 5,
    content: [
      {
        id: Math.floor(Math.random() * 10) + 1
      }
    ],
    page: page
  })
}
