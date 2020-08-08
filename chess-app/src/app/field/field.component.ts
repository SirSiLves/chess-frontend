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

  constructor(public coordinaterService: CoordinaterService, private moveService: MoveService) {
    this.isClicked$ = false;
  }

  ngOnInit(): void {
    this.fieldColor = this.field['fieldColor'];
    this.figure = this.field['figure'];
  }

  clickedFieldForMove(clickedField): void {

    if((clickedField.figure != null || this.moveService.getClickedCount() > 0) && this.isClicked$ == false ){
      this.moveEvent$ = this.moveService.onClick
        .pipe(take(2))
        .subscribe(event => {
          if(event == 1){
            this.isClicked$ = true;
          }
          else{
            this.isClicked$ = false;
            this.moveEvent$.unsubscribe();
          }
        });

      this.moveService.prepareMove(clickedField);
    }
  }

}


