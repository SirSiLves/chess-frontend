import {Component, OnInit} from '@angular/core';
import {HttpService} from "../services/http.service";
import {ToastrService} from "ngx-toastr";
import {MatrixService} from "../services/matrix.service";


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  //@Output() clickedEvent = new EventEmitter();

  constructor(private httpService: HttpService, private toast: ToastrService, private matrixService: MatrixService) {
  }

  ngOnInit(): void {
  }

  createGame(): void {

    this.httpService.initializeGame().subscribe(responseInitialize => {

      this.httpService.getGamePicture().subscribe(responsePicture => {
        this.matrixService.setMatrix(responsePicture.board.fieldMatrix);
        //console.log(responseInitialize);
        this.toast.success(responseInitialize);
      });
    });
  }


}
