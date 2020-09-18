import {Component, Input, OnInit} from '@angular/core';
import {HttpService} from "../services/http.service";
import {ToastrService} from "ngx-toastr";
import {MatrixService} from "../services/matrix.service";
import {MoveService} from "../services/move.service";
import {take} from "rxjs/operators";
import {Subscription} from "rxjs";


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {


  constructor(private httpService: HttpService,
              private toast: ToastrService,
              public moveService: MoveService) {
  }


  ngOnInit(): void {

  }

  handleBot(): void {
    this.moveService.botEnabled = !this.moveService.botEnabled
  }


  createGame(): void {
    this.moveService.botInfinityState = false;

    setTimeout(() => {
      if (!this.moveService.botIsMoving) {
        this.httpService.initializeGame().subscribe(responseInitialize => {
          this.moveService.refreshBoardEvent$.emit(true);
          this.toast.success(responseInitialize);
        });
      }
      else {
        this.createGame();
      }
    }, 100);
  }


}
