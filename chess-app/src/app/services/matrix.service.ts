import {Injectable, EventEmitter} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class MatrixService {

  public readonly fieldMatrix$: BehaviorSubject<IMatrix>;
  // private readonly coordinate$: {
  //   x: string[]; y: string[];
  // };
  private readonly coordinate$: BehaviorSubject<IMatrix['coordinate']>;

  constructor() {
    this.fieldMatrix$ = new BehaviorSubject<any>({
      a: {}, b: {}, c: {}, d: {},
      e: {}, f: {}, g: {}, h: {}
    });
    this.coordinate$ = new BehaviorSubject<any>({
      x: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'],
      y: ['8', '7', '6', '5', '4', '3', '2', '1']
    });

    this.preBuildMatrix();
  }


  preBuildMatrix() {
    let toggler = true;

    for (let i = 0; i < this.coordinate$.getValue().x.length; i++) {
      let fieldRow = {};
      toggler = !toggler;

      for (let j = 0; j < this.coordinate$.getValue().y.length; j++) {
        let field = {}
        if (toggler) {

          Object.assign(field, {fieldColor: "SANDYBROWN"});
          Object.assign(field, {fieldDesignation: [this.coordinate$.getValue().x[i], this.coordinate$.getValue().y[j]]});

          Object.assign(fieldRow, {[this.coordinate$.getValue().y[j]]: field});

        } else {

          Object.assign(field, {fieldColor: "BROWN"});
          Object.assign(field, {fieldDesignation: [this.coordinate$.getValue().x[i], this.coordinate$.getValue().y[j]]});

          Object.assign(fieldRow, {[this.coordinate$.getValue().y[j]]: field});

        }
        toggler = !toggler;
      }
      Object.assign(this.fieldMatrix$.value, {[this.coordinate$.getValue().x[i]]: fieldRow});
    }
  }

  setMatrix(boardMatrix): void {
    this.coordinate$.next({
      x: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'],
      y: ['1', '2', '3', '4', '5', '6', '7', '8']
    });

    this.fieldMatrix$.next(boardMatrix);
  }

  setReverseMatrix(boardMatrix): void {
    let reversedMatrix = {};

    for (let i = 0; i < Object.keys(boardMatrix).length; i++) {
      let rowDescription = Object.keys(boardMatrix)[i];
      let row = boardMatrix[rowDescription];
      let rowMap = {};
      let end = 8;

      for (let j = 1; j <= Object.keys(row).length; j++) {

        if (row[end].fieldColor === 'BROWN') {
          row[end].fieldColor = 'SANDYBROWN'
        } else {
          row[end].fieldColor = 'BROWN'
        }

        Object.assign(rowMap, {[j]: row[end]});
        Object.assign(reversedMatrix, {[rowDescription]: rowMap});
        end--;
      }
    }

    this.coordinate$.next({
      x: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'],
      y: ['8', '7', '6', '5', '4', '3', '2', '1']
    });

    boardMatrix = reversedMatrix;
    this.fieldMatrix$.next(boardMatrix);
  }

  getCoordinate() {
    return this.coordinate$;
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
