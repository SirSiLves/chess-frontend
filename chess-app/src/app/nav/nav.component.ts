import {Component, Input, OnInit} from '@angular/core';
import {HttpService} from "../services/http.service";
import {ToastrService} from "ngx-toastr";
import {MatrixService} from "../services/matrix.service";
import {MoveService} from "../services/move.service";


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  //@Output() clickedEvent = new EventEmitter();

  constructor(private httpService: HttpService,
              private toast: ToastrService,
              public matrixService: MatrixService,
              public moveService: MoveService) {
  }

  ngOnInit(): void {

  }

  handleBot(): void {
    this.matrixService.botEnabled = !this.matrixService.botEnabled
  }


  createGame(): void {

    this.httpService.initializeGame().subscribe(responseInitialize => {

      this.httpService.getGamePicture().subscribe(responsePicture => {
        this.moveService.resetLastPlayed();

        this.matrixService.setMatrix(responsePicture.board.fieldMatrix);
        //console.log(responseInitialize);
        this.toast.success(responseInitialize);
      });
    });
  }


}
