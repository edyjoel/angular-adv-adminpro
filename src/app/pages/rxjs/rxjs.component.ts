import { Component, OnDestroy } from '@angular/core';
import {
  Observable,
  Subscription,
  filter,
  interval,
  map,
  retry,
  take,
} from 'rxjs';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styleUrls: ['./rxjs.component.css'],
})
export class RxjsComponent implements OnDestroy {
  public intervalSubs: Subscription | undefined;

  constructor() {
    // this.retornaObservable()
    //   .pipe(retry(2))
    //   .subscribe(
    //     (value) => console.log('next', value),
    //     (error) => console.warn('error', error),
    //     () => console.info('completed')
    //   );

    this.intervalSubs = this.retornaIntervalo().subscribe(console.log);
  }
  ngOnDestroy(): void {
    this.intervalSubs?.unsubscribe();
  }

  retornaIntervalo(): Observable<number> {
    const intervalo$ = interval(500).pipe(
      map((value) => value + 1),
      filter((value) => value % 2 === 0),
      take(10)
    );

    return intervalo$;
  }

  retornaObservable(): Observable<number> {
    let count = 0;
    const obs$ = new Observable<number>((observer) => {
      const intervalo = setInterval(() => {
        console.log('tick');
        count++;
        observer.next(count);

        if (count === 3) {
          clearInterval(intervalo);
          observer.complete();
        }

        if (count === 2) {
          // clearInterval(intervalo);
          observer.error('Auxilio!');
        }
      }, 1000);
    });

    return obs$;
  }
}
