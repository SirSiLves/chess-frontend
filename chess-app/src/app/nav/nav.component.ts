import {Component, OnInit, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  @Output() clickedEvent = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  // handleClick(event: Event) {
  //   console.log('Click!', event)
  // }

  createGameClicked() {
    this.clickedEvent.emit();
  }

}
