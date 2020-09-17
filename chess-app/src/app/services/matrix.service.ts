import {Injectable, EventEmitter} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";



@Injectable({
  providedIn: 'root'
})
export class MatrixService {

  public readonly fieldMatrix$: BehaviorSubject<IMatrix>;
  private readonly coordinate: {
    x: string[]; y: string[];
  };

  constructor() {
    this.fieldMatrix$ = new BehaviorSubject<any>({
      a: {}, b: {}, c: {}, d: {},
      e: {}, f: {}, g: {}, h: {}
    });
    this.coordinate = {
      x: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'],
      y: ['1', '2', '3', '4', '5', '6', '7', '8']
    };

    this.preBuildMatrix();
  }


  preBuildMatrix() {
    let toggler = true;

    for (let i = 0; i < this.coordinate.x.length; i++) {
      let fieldRow = {};
      toggler = !toggler;

      for (let j = 0; j < this.coordinate.y.length; j++) {
        let field = {}
        if (toggler) {

          Object.assign(field, {fieldColor: "BROWN"});
          Object.assign(field, {fieldDesignation: [this.coordinate.x[i], this.coordinate.y[j]]});

          Object.assign(fieldRow, {[this.coordinate.y[j]]: field});

        } else {

          Object.assign(field, {fieldColor: "SANDYBROWN"});
          Object.assign(field, {fieldDesignation: [this.coordinate.x[i], this.coordinate.y[j]]});

          Object.assign(fieldRow, {[this.coordinate.y[j]]: field});

        }
        toggler = !toggler;
      }
      Object.assign(this.fieldMatrix$.value, {[this.coordinate.x[i]]: fieldRow});
    }
  }

  setMatrix(boardMatrix): void {
    this.fieldMatrix$.next(boardMatrix);
  }

  // getMatrix(): Observable<any> {
  //   return this.fieldMatrix$;
  // }

  getCoordinate() {
    return this.coordinate;
  }
}

export interface IMatrix {
  board: {
    fieldMatrix: {
      a: any, b: any, c: any, d: any
      e: any, f: any, g: any, h: any
    }
  }
  coordinate: {
    x: string[], y: string[]
  };
}
