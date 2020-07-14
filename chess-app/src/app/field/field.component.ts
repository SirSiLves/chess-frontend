import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.scss']
})
export class FieldComponent implements OnInit  {

  @Input() field: Map<string, any>;
  fieldColor : string;

  constructor() {  }

  ngOnInit(): void {
    this.fieldColor = this.field['fieldColor']
    console.log(this.field)

    // console.log(Object.values(this.fieldRow))
  }
}



