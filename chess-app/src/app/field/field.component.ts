import {Component, OnInit, Input} from '@angular/core';
import {CoordinaterService} from "../services/coordinater.service";
import {MoveService} from "../services/move.service";
import {take} from "rxjs/operators";

@Component({
  selector: 'app-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.scss']
})
export class FieldComponent implements OnInit {

  //TODO field declaration
  @Input() field: Map<string, any>;
  fieldColor: string;
  figure: Map<string, any>;
  isClicked$: boolean;
  moveEvent$: any;
  backGround: string;

  constructor(public coordinaterService: CoordinaterService, public moveService: MoveService) {
    this.isClicked$ = false;
  }

  ngOnInit(): void {
    this.figure = this.field['figure'];
    this.markupField();
    // console.log(this.field['fieldDesignation'])
  }

  clickedFieldForMove(clickedField): void {

    if ((clickedField.figure != null || this.moveService.getClickedCount() > 0) && this.isClicked$ == false) {
      this.moveEvent$ = this.moveService.onClick$
        .pipe(take(2))
        .subscribe(event => {
          if (event == 1) {
            this.isClicked$ = true;
          } else {
            this.isClicked$ = false;
            this.moveEvent$.unsubscribe();
          }
        });

      this.moveService.prepareMove(clickedField);
    }
  }

  markupField() {
    if (this.moveService.lastBotSourceField != null
      && this.moveService.lastBotSourceField[0] === this.field['fieldDesignation'][0]
      && this.moveService.lastBotSourceField[1] === this.field['fieldDesignation'][1]) {

      this.backGround = 'lastMoveSource';
    }
    else if(this.moveService.lastBotTargetField != null
      && this.moveService.lastBotTargetField[0] === this.field['fieldDesignation'][0]
      && this.moveService.lastBotTargetField[1] === this.field['fieldDesignation'][1]){

      this.backGround = 'lastMoveTarget';
    }
    else {
      this.backGround = this.field['fieldColor'];
    }
  }

}


