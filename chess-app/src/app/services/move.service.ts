import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class MoveService {

  sourceField$: BehaviorSubject<any>;
  targetField$: BehaviorSubject<any>;

  constructor() {
    this.sourceField$ = new BehaviorSubject<any>({ fieldDesignation: []});
    this.targetField$ = new BehaviorSubject<any>({ fieldDesignation: []});
  }


  doMove(){

    console.log(this.sourceField$);
    console.log(this.targetField$);

    this.sourceField$ = null;
    this.targetField$ = null;

  }


  setMove(sourceField, targetField){
    this.sourceField$.next(sourceField);
    this.targetField$.next(targetField);
  }




}
