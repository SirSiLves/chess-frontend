import {Component, OnInit, Input, EventEmitter} from '@angular/core';
import {CoordinaterService} from "../services/coordinater.service";
import {MoveService} from "../services/move.service";
import {take} from "rxjs/operators";
import {BehaviorSubject, Subject, Subscription} from "rxjs";

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

  //TODO OUTPUT / INPUT auf BOARD

  // possibleFields$: Subscription;
  // removeMarkup$: Subscription;
  // lastBotMove$: Subscription;

  constructor(public coordinaterService: CoordinaterService,
              public moveService: MoveService) {
    this.isClicked$ = false;
  }

  ngOnInit(): void {
    this.figure = this.field['figure'];
    this.backGround$ = this.field['fieldColor'];

    // this.possibleFields$ = this.moveService.possibleFields$.subscribe(moveResponse => {
    //   this.markupPossibleField(moveResponse);
    // });

    // this.removeMarkup$ = this.moveService.removeMarkup$.subscribe(state => {
    //   if (state) {
    //     //removes all markups
    //     // this.markupLastMove();
    //   }
    // });

    // this.lastBotMove$ = this.moveService..subscribe(botResponse => {
    //   this.lastBotMove$ = new BehaviorSubject(botResponse);
    //   this.markupLastMove();
    // });

  }

  ngOnDestroy(): void {
    // this.possibleFields$.unsubscribe();
    // this.lastBotMove$.unsubscribe();
    // this.removeMarkup$.unsubscribe();
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


  markupPossibleField(possibleFields): void {
    for (let i = 0; i < possibleFields.length; i++) {
      let field = possibleFields[i].fieldDesignation;

      if (field[0] === this.field['fieldDesignation'][0] && field[1] === this.field['fieldDesignation'][1]) {
        this.backGround$ = this.field['fieldColor'] + ' possibleMove';
      }
    }
  }


  markupLastMove(): void {

    const sourceField = this.moveService.lastBotSourceField;
    const targetField = this.moveService.lastBotTargetField;

    if (sourceField != null && sourceField[0] === this.field['fieldDesignation'][0]
      && sourceField[1] === this.field['fieldDesignation'][1]) {
      this.backGround$ = this.field['fieldColor'] + ' lastMoveSource';
    } else if (targetField != null && targetField[0] === this.field['fieldDesignation'][0]
      && targetField[1] === this.field['fieldDesignation'][1]) {
      this.backGround$ = this.field['fieldColor'] + ' lastMoveTarget';
    } else {
      // this.backGround$ = this.field['fieldColor'];
    }

  }

}


