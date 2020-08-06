import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {HttpService} from "./http.service";
import {ToastrService} from "ngx-toastr";
import {MatrixService} from "./matrix.service";


@Injectable({
  providedIn: 'root'
})
export class MoveService {

  sourceField$: BehaviorSubject<any>;
  targetField$: BehaviorSubject<any>;

  constructor(private httpService: HttpService, private toast: ToastrService, private matrixService: MatrixService) {
    this.sourceField$ = new BehaviorSubject<any>({ fieldDesignation: []});
    this.targetField$ = new BehaviorSubject<any>({ fieldDesignation: []});
  }


  prepareMove(clickedField){

    if(this.sourceField$.value.fieldDesignation.length == 0){
      this.sourceField$.next(clickedField);
    }
    else if (this.sourceField$.value.fieldDesignation != clickedField.fieldDesignation) {
      this.targetField$.next(clickedField);

      this.doMove();
    }
  }


  doMove(){

    const moveObj = {
      sourceField : this.sourceField$.value.fieldDesignation,
      targetField : this.targetField$.value.fieldDesignation
    }

    this.httpService.validateMove(moveObj).subscribe(validateResponse => {

      if(validateResponse.state){
        this.reloadGamePicture();
      }
    });

    this.resetBinding();
  }

  resetBinding(){
    this.sourceField$ = new BehaviorSubject<any>({ fieldDesignation: []});
    this.targetField$ = new BehaviorSubject<any>({ fieldDesignation: []});
  }

  reloadGamePicture(){
    this.httpService.getGamePicture().subscribe(responsePicture => {
      this.matrixService.setMatrix(responsePicture.board.fieldMatrix);
    });
  }


}
