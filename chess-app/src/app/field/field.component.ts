import {Component, OnInit, Input, EventEmitter} from '@angular/core';
import {CoordinaterService} from "../services/coordinater.service";
import {MoveService} from "../services/move.service";
import {take} from "rxjs/operators";
import {BehaviorSubject, Subject} from "rxjs";

@Component({
  selector: 'app-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.scss']
})
export class FieldComponent implements OnInit {

  //TODO field declaration
  @Input() field: Map<string, any>;
  figure: Map<string, any>;
  isClicked$: boolean;
  moveEvent$: any;
  backGround$: string;


  constructor(public coordinaterService: CoordinaterService,
              public moveService: MoveService) {
    this.isClicked$ = false;
  }

  ngOnInit(): void {
    this.figure = this.field['figure'];
    this.backGround$ = this.field['fieldColor'];

    this.markupLastMove();
    this.markupPossibleField();
  }


  clickedFieldForMove(clickedField): void {
    if ((clickedField.figure != null || this.moveService.clickedCount > 0) && this.isClicked$ == false) {
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

  markupPossibleField(): void {
    this.moveService.possibleFields.subscribe(fields => {
      for (let i = 0; i < fields.length; i++) {
        let field = fields[i].fieldDesignation;

        if (field[0] === this.field['fieldDesignation'][0] && field[1] === this.field['fieldDesignation'][1]) {
          this.backGround$ = 'possibleMove';
        }
      }
    });
  }


  markupLastMove(): void {
    this.moveService.lastBotSourceField.subscribe(sourceField => {
      if (sourceField != null
        && sourceField[0] === this.field['fieldDesignation'][0]
        && sourceField[1] === this.field['fieldDesignation'][1]) {

        this.backGround$ = 'lastMoveSource';
      }
    }).unsubscribe();

    this.moveService.lastBotTargetField.subscribe(targetField => {
      if (targetField != null
        && targetField[0] === this.field['fieldDesignation'][0]
        && targetField[1] === this.field['fieldDesignation'][1]) {

        this.backGround$ = 'lastMoveTarget';
      }
    }).unsubscribe();

  }

}


