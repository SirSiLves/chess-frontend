import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-figure',
  templateUrl: './figure.component.html',
  styleUrls: ['./figure.component.scss']
})
export class FigureComponent implements OnInit {

  @Input() figure: Map<string, any>;
  figureType: string;
  figureColor: string;

  constructor() { }

  ngOnInit(): void {

    this.figureType = this.figure['figureType'];
    this.figureColor = this.figure['figureColor']

    // console.log(this.figure)

  }
}
