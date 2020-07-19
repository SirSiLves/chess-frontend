import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-pawn',
  templateUrl: './pawn.component.html',
  styleUrls: ['./pawn.component.scss', '../figure.component.scss']
})
export class PawnComponent implements OnInit {

  @Input() figureColor: string;

  constructor() { }

  ngOnInit(): void {
  }

}
