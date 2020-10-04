import {Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {MatrixService} from "../../services/matrix.service";
import {CoordinaterService} from "../../services/coordinater.service";
import {MoveService} from "../../services/move.service";
import {HttpService} from "../../services/http.service";
import {BehaviorSubject, Subject, Subscription} from "rxjs";
import {take} from "rxjs/operators";
import {GameHandlerService} from "../../services/game-handler.service";


@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  @Output() possibleFieldsEvent$: EventEmitter<any> = new EventEmitter<any>();
  private possibleFields: any;


  private matrixSubscription: Subscription;
  private clickCount: number = 0;
  private sourceField: any;
  private targetField: any;

  public boardMatrix$: any //{ column: any };
  public coordinate$: BehaviorSubject<any>;

  constructor(private toast: ToastrService,
              private matrixService: MatrixService,
              public coordinaterService: CoordinaterService,
              private httpService: HttpService,
              private moveService: MoveService,
              private gameHandlerService: GameHandlerService) {
  }


  ngOnInit() {
    this.coordinate$ = this.matrixService.getCoordinate();

    this.matrixSubscription = this.matrixService.fieldMatrix$.subscribe(matrixData => {
      this.boardMatrix$ = matrixData;
      this.resetMarkup();
    });
  }

  ngOnDestroy() {
    this.matrixSubscription.unsubscribe();
  }


  onFieldClick(clickedField) {

    if (!this.gameHandlerService.isGameEnded$.getValue() == true) {
      this.clickCount++;

      if (this.clickCount == 1 && clickedField.figure != null) {

        this.emitPossibleFields(clickedField);

        this.sourceField = clickedField;
      } else if (this.clickCount == 2 && this.isPossibleMove(clickedField)) {
        this.targetField = clickedField;
        this.moveService.doMove(this.sourceField, this.targetField);

        // this.resetMarkup();
      } else {
        this.resetMarkup();
      }
    }
  }

  emitPossibleFields(clickedSourceField): void {
    const clickedFieldObj = {
      sourceField: clickedSourceField.fieldDesignation,
    }

    this.httpService.retrieveValidFields(clickedFieldObj).pipe(take(1)).subscribe(responsePossibleFields => {
      this.possibleFieldsEvent$.emit(responsePossibleFields);
      this.possibleFields = responsePossibleFields;

      if(responsePossibleFields.length == 0) this.clickCount = 0;
    });
  }

  resetMarkup(): void {
    this.clickCount = 0;
    this.possibleFieldsEvent$.emit(null);
  }

  isPossibleMove(clickedTargetField): boolean {
    for (let i = 0; i < this.possibleFields.length; i++) {
      let field = this.possibleFields[i].fieldDesignation;

      if (field[0] === clickedTargetField.fieldDesignation[0] && field[1] === clickedTargetField.fieldDesignation[1]) {
        return true;
      }
    }

    return false;
  }


}



