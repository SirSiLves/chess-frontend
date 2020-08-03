import {Component, OnInit} from '@angular/core';
import {HttpService} from "../services/http.service";
import {ToastrService} from 'ngx-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatrixService} from "../services/matrix.service";
import {CoordinaterService} from "../services/coordinater.service";


@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  boardMatrix$: { column: any };
  coordinate: {
    x: string[]; y: string[]
  };

  constructor(private httpService: HttpService, private toast: ToastrService,
              private matrixService: MatrixService, public coordinaterService: CoordinaterService) {
  }

  ngOnInit() {
    this.coordinate = this.matrixService.getCoordinate();

    this.matrixService.getMatrix().subscribe(matrixData => {
      this.boardMatrix$ = matrixData;
    });

    //console.log(this.boardMatrix$);
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


