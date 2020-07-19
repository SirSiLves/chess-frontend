import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-king',
  templateUrl: './king.component.html',
  styleUrls: ['./king.component.scss', '../figure.component.scss']
})
export class KingComponent implements OnInit {

  @Input() figureColor: string;

  constructor() { }

  ngOnInit(): void {
  }

}
