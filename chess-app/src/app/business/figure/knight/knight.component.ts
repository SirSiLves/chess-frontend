import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-knight',
  templateUrl: './knight.component.html',
  styleUrls: ['./knight.component.scss', '../figure.component.scss']
})
export class KnightComponent implements OnInit {

  @Input() figureColor: string;

  constructor() { }

  ngOnInit(): void {
  }

}
