import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-rook',
  templateUrl: './rook.component.html',
  styleUrls: ['./rook.component.scss', '../figure.component.scss']
})
export class RookComponent implements OnInit {

  @Input() figureColor: string;

  constructor() { }

  ngOnInit(): void {
  }

}
