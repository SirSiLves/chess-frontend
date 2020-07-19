import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-bishop',
  templateUrl: './bishop.component.html',
  styleUrls: ['./bishop.component.scss', '../figure.component.scss']
})
export class BishopComponent implements OnInit {

  @Input() figureColor: string;

  constructor() { }

  ngOnInit(): void {
  }

}
