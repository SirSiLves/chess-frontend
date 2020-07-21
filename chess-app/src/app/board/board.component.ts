import {Component, OnInit} from '@angular/core';
import {HttpService} from "../http.service";
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  fieldMatrix: IBoard;
  coordinate = {
    x: ["a", "b", "c", "d", "e", "f", "g", "h"],
    y: ["1", "2", "3", "4", "5", "6", "7", "8"]
  };

  constructor(public _http: HttpService, private toast: ToastrService) {
  }

  ngOnInit(): void {
    this._http.createGame().subscribe(data => {
      this.loadGame();

      //TODO erro handling

      // https://www.npmjs.com/package/ngx-toastr
      this.toast.success(data, '', {
        timeOut: 3000,
        progressBar: true,
        progressAnimation: "decreasing",
        closeButton: true
      });


    });



  }

  loadGame() {

    this._http.getGamePicture().subscribe(data => {

      console.log("SOURCE: ");
      console.log(data);

      console.log("DEBUG: ");
      this.fieldMatrix = data.board.fieldMatrix;

      // let fieldMatrix = data.board.fieldMatrix;
      //
      // for (let key in fieldMatrix) {
      //   if (fieldMatrix.hasOwnProperty(key)) {
      //     this.fieldRow.push(fieldMatrix[key])
      //     // console.log(key + " -> " + fieldMatrix[key]);
      //     console.log(key);
      //   }
      // }

      // console.log(Object.values(this.fieldRow))

      // console.log(this.fieldMatrix['b'])

    });
  }

}

export interface IBoard {
  board: any;
  // fieldMatrix: any;
}

