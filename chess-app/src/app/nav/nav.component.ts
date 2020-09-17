import {Component, Input, OnInit} from '@angular/core';
import {HttpService} from "../services/http.service";
import {ToastrService} from "ngx-toastr";
import {MatrixService} from "../services/matrix.service";
import {MoveService} from "../services/move.service";
import {take} from "rxjs/operators";


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {


  constructor(private httpService: HttpService,
              private toast: ToastrService,
              public matrixService: MatrixService,
              public moveService: MoveService) {
  }

  ngOnInit(): void {

  }

  handleBot(): void {
    this.moveService.botEnabled = !this.moveService.botEnabled
  }


  createGame(): void {
    this.moveService.runningGame = false;

    this.httpService.initializeGame().pipe(take(1)).subscribe(responseInitialize => {
      this.httpService.getGamePicture().pipe(take(1)).subscribe(responsePicture => {
        //reset history subscription

        // this.moveService.lastMoveFields$.next(undefined);

        //overwrite field matrix
        this.matrixService.setMatrix(responsePicture.board.fieldMatrix);
        this.toast.success(responseInitialize);
      });
    });

  }



}
