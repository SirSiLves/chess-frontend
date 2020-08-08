import {Injectable, EventEmitter} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {HttpService} from "./http.service";
import {ToastrService} from "ngx-toastr";
import {MatrixService} from "./matrix.service";


@Injectable({
  providedIn: 'root'
})
export class MoveService {

  private sourceField$: BehaviorSubject<any>;
  private targetField$: BehaviorSubject<any>;

  public onClick: EventEmitter<number> = new EventEmitter<number>();
  private clickedCount: number;


  constructor(private httpService: HttpService, private toast: ToastrService, private matrixService: MatrixService) {
    this.sourceField$ = new BehaviorSubject<any>({ fieldDesignation: []});
    this.targetField$ = new BehaviorSubject<any>({ fieldDesignation: []});
    this.clickedCount = 0;
  }

  getClickedCount(){
    return this.clickedCount;
  }


  prepareMove(clickedField){

    this.clickedCount++;
    this.onClick.emit(this.clickedCount);


    if(this.clickedCount == 1 && clickedField.figure != null){
      this.sourceField$.next(clickedField);
    }
    else if(this.clickedCount >= 2){
      this.targetField$.next(clickedField);
      this.doMove();
    }

    // if(this.sourceField$.value.fieldDesignation.length == 0){
    //   this.sourceField$.next(clickedField);
    // }
    // else if (this.sourceField$.value.fieldDesignation != clickedField.fieldDesignation) {
    //   this.targetField$.next(clickedField);
    //
    //   this.doMove();
    // }
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
      else {
        this.toast.warning(validateResponse.text)
      }
    });

    this.clickedCount = 0;
  }

  reloadGamePicture(){
    this.httpService.getGamePicture().subscribe(responsePicture => {
      this.matrixService.setMatrix(responsePicture.board.fieldMatrix);
    });
  }


}
