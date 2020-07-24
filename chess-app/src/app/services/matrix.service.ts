import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MatrixService {

  private fieldMatrix = {};
  private coordinate = {
    x: ["a", "b", "c", "d", "e", "f", "g", "h"],
    y: ["1", "2", "3", "4", "5", "6", "7", "8"]
  };

  constructor() {
    this.buildMatrix();
  }

  buildMatrix() {
    let toggler = true;

    for (let i = 0; i < this.coordinate.x.length; i++) {
      let fieldRow = {};
      toggler = !toggler;

      for (let j = 0; j < this.coordinate.y.length; j++) {
        if(toggler){
          Object.assign(fieldRow, {[this.coordinate.y[j]]: {fieldColor: "BROWN"}})
        }
        else {
          Object.assign(fieldRow, {[this.coordinate.y[j]]: {fieldColor: "SANDYBROWN"}})
        }
        toggler = !toggler;
      }
      Object.assign(this.fieldMatrix, {[this.coordinate.x[i]]: fieldRow})
    }
  }


  getMatrix() {
    return this.fieldMatrix;
  }

  getCoordinate(){
    return this.coordinate;
  }
}
