import {Component, OnInit, Input} from '@angular/core';
import {CoordinaterService} from "../services/coordinater.service";
import {MoveService} from "../services/move.service";

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

  constructor(public coordinaterService: CoordinaterService, private moveService: MoveService) {
  }

  ngOnInit(): void {
    this.fieldColor = this.field['fieldColor'];
    this.figure = this.field['figure'];
  }

  clickedFieldForMove(clickedField) {
    this.moveService.prepareMove(clickedField)
  }

}


