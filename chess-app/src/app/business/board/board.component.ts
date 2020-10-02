import {Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {MatrixService} from "../../services/matrix.service";
import {CoordinaterService} from "../../services/coordinater.service";
import {MoveService} from "../../services/move.service";
import {HttpService} from "../../services/http.service";
import {Subscription} from "rxjs";
import {take} from "rxjs/operators";
import {GameHandlerService} from "../../services/game-handler.service";


@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  @Output() possibleFieldsEvent$: EventEmitter<any> = new EventEmitter<any>();

  private matrixSubscription: Subscription;
  private clickCount: number = 0;
  private sourceField: any;
  private targetField: any;

  public boardMatrix$: any //{ column: any };
  public coordinate: {
    x: string[]; y: string[]
  };

  constructor(private toast: ToastrService,
              private matrixService: MatrixService,
              public coordinaterService: CoordinaterService,
              private httpService: HttpService,
              private moveService: MoveService,
              private gameHandlerService: GameHandlerService) {
  }


  ngOnInit() {
    this.coordinate = this.matrixService.getCoordinate();

    this.matrixSubscription = this.matrixService.fieldMatrix$.subscribe(matrixData => {
      this.boardMatrix$ = matrixData;
      this.resetMarkup();
    });

    // this.gameHandlerService.refreshBoardEvent$.emit(true);
  }

  ngOnDestroy() {
    this.matrixSubscription.unsubscribe();
  }

  onFieldClick(clickedField) {
    if(!this.gameHandlerService.isGameEnded){
      this.clickCount++;

      if (this.clickCount == 1 && clickedField.figure != null) {
        this.emitPossibleFields(clickedField);
        this.sourceField = clickedField;
      } else if (this.clickCount == 2) {
        this.targetField = clickedField;
        // this.moveService.doMove(this.sourceField, this.targetField);
        this.resetMarkup();
      } else {
        this.resetMarkup();
      }
    }
  }

  emitPossibleFields(clickedSourceField) {
    const clickedFieldObj = {
      sourceField: clickedSourceField.fieldDesignation,
    }

    this.httpService.retrieveValidFields(clickedFieldObj).pipe(take(1)).subscribe(responsePossibleFields => {
      this.possibleFieldsEvent$.emit(responsePossibleFields);
    });
  }

  resetMarkup(): void {
    this.clickCount = 0;
    this.possibleFieldsEvent$.emit(null);
  }



}



