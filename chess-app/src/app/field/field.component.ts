import {Component, OnInit, Input, EventEmitter, Output} from '@angular/core';
import {CoordinaterService} from "../services/coordinater.service";
import {MoveService} from "../services/move.service";
import {take} from "rxjs/operators";
import {BehaviorSubject, Subject, Subscription} from "rxjs";
import {BoardComponent} from "../board/board.component";

@Component({
  selector: 'app-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.scss']
})
export class FieldComponent implements OnInit {

  //TODO field declaration
  @Input() field: Map<string, any>;
  @Input() possibleFieldsEvent$: EventEmitter<any>;
  @Output() clickOnFieldEvent$: EventEmitter<any> = new EventEmitter<any>();

  private lastMoveFieldsSubscription: Subscription;
  private possibleFieldsSubscription: Subscription;

  public figure: Map<string, any>;
  public backGround: string;


  constructor(public coordinaterService: CoordinaterService,
              public moveService: MoveService) {
  }

  ngOnInit(): void {
    this.figure = this.field['figure'];
    this.backGround = this.field['fieldColor']

    this.possibleFieldsSubscription = this.possibleFieldsEvent$.subscribe(possibleFields => {
      this.markupPossibleField(possibleFields);
    });

    this.lastMoveFieldsSubscription = this.moveService.lastMoveFields$.subscribe(lastMovesResponse => {
      if (lastMovesResponse != undefined) this.markupLastMoveField(lastMovesResponse);
    });

  }

  ngOnDestroy(): void {
    this.possibleFieldsSubscription.unsubscribe();
    this.lastMoveFieldsSubscription.unsubscribe();
  }


  onClick(currentField) {
    this.clickOnFieldEvent$.emit(currentField);
  }

  markupPossibleField(possibleFields): void {
    let isPossibleField: boolean = false;
    if (possibleFields != null) {
      for (let i = 0; i < possibleFields.length; i++) {
        let field = possibleFields[i].fieldDesignation;

        if (field[0] === this.field['fieldDesignation'][0] && field[1] === this.field['fieldDesignation'][1]) {
          this.backGround = this.field['fieldColor'] + ' possibleMove';
          isPossibleField = true;
        }
      }
    }
    if (!isPossibleField)
      if(!(this.backGround.includes('lastMoveSource') || this.backGround.includes('lastMoveTarget'))){
        this.backGround = this.field['fieldColor'];
      }
  }

  markupLastMoveField(lastMoveFields): void {
    const sourceField = lastMoveFields.sourceField.fieldDesignation;
    const targetField = lastMoveFields.targetField.fieldDesignation;

    if (sourceField != null && sourceField[0] === this.field['fieldDesignation'][0]
      && sourceField[1] === this.field['fieldDesignation'][1]) {
      this.backGround = 'lastMoveSource';
    } else if (targetField != null && targetField[0] === this.field['fieldDesignation'][0]
      && targetField[1] === this.field['fieldDesignation'][1]) {
      this.backGround = this.field['fieldColor'] + ' lastMoveTarget';
    } else {
      this.backGround = this.field['fieldColor'];
    }
  }

}


