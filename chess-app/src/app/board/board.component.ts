import {Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {MatrixService} from "../services/matrix.service";
import {CoordinaterService} from "../services/coordinater.service";
import {MoveService} from "../services/move.service";
import {HttpService} from "../services/http.service";
import {BehaviorSubject, Subject, Subscription} from "rxjs";


@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  @Output() possibleFieldsEvent$: EventEmitter<any> = new EventEmitter<any>();

  private clickCount: number = 0;
  private sourceField: any;
  private targetField: any;

  public boardMatrix$: { column: any };
  public coordinate: {
    x: string[]; y: string[]
  };

  constructor(private toast: ToastrService,
              private matrixService: MatrixService,
              public coordinaterService: CoordinaterService,
              private httpService: HttpService,
              private moveService: MoveService) {
  }


  ngOnInit() {
    this.coordinate = this.matrixService.getCoordinate();

    this.matrixService.getMatrix().subscribe(matrixData => {
      this.boardMatrix$ = matrixData;
      this.resetMarkup();
    });

    this.moveService.preLoadGamePicture();
  }

  ngOnDestroy() {
  }

  onFieldClick(clickedField) {
    this.clickCount++;

    if (this.clickCount == 1 && clickedField.figure != null) {
      this.emitPossibleFields(clickedField);
      this.sourceField = clickedField;
    } else if (this.clickCount == 2) {
      this.targetField = clickedField;
      this.moveService.doMove(this.sourceField, this.targetField);
      this.resetMarkup();
    } else {
      this.resetMarkup();
    }
  }

  emitPossibleFields(clickedSourceField) {
    const clickedFieldObj = {
      sourceField: clickedSourceField.fieldDesignation,
    }

    this.httpService.retrieveValidFields(clickedFieldObj).subscribe(responsePossibleFields => {
      this.possibleFieldsEvent$.emit(responsePossibleFields);
    });
  }


  resetMarkup(): void {
    this.clickCount = 0;
    this.possibleFieldsEvent$.emit(null);
  }



}

// ngOnInit(): void {
//   this._http.createGame().subscribe(data => {
//     this.loadGame();
//
//     //TODO erro handling
//
//     // https://www.npmjs.com/package/ngx-toastr
//     this.toast.success(data, '', {
//       timeOut: 3000,
//       progressBar: true,
//       progressAnimation: "decreasing",
//       closeButton: true
//     });
//   });
// }

// public loadGame() {
//
//   this._http.getGamePicture().subscribe(data => {
//
//     console.log("SOURCE: ");
//     console.log(data);
//
//     console.log("DEBUG: ");
//     this.fieldMatrix = data.board.fieldMatrix;
//
//     // let fieldMatrix = data.board.fieldMatrix;
//     //
//     // for (let key in fieldMatrix) {
//     //   if (fieldMatrix.hasOwnProperty(key)) {
//     //     this.fieldRow.push(fieldMatrix[key])
//     //     // console.log(key + " -> " + fieldMatrix[key]);
//     //     console.log(key);
//     //   }
//     // }
//
//     // console.log(Object.values(this.fieldRow))
//
//     // console.log(this.fieldMatrix['b'])
//
//   });
// }


// export interface Matrix {
//   board: Board;
// }
//
// export interface Board {
//   // fieldMatrix: { a: any, b:any }
//   fieldMatrix: any;
//   figureArrayList: any[];
// }


