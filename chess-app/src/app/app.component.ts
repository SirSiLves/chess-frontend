import {Component, ViewChild} from '@angular/core';
import {BoardComponent} from "./board/board.component";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'chess-app';

  // @ViewChild('appBoard') appBoard: BoardComponent;

  constructor() {
    // this.appBoard.loadGame()
  }

}
