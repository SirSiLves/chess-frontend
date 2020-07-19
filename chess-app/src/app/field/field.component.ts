import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.scss']
})
export class FieldComponent implements OnInit  {

  @Input() field: Map<string, any>;
  fieldColor : string;
  figure: Map<string, any>;

  constructor() {  }

  ngOnInit(): void {
    this.fieldColor = this.field['fieldColor'];
    this.figure = this.field['figure'];
  }


  markupDesignation(hoveredField){
    const x = hoveredField['fieldDesignation'][0];
    const y = hoveredField['fieldDesignation'][1];

    //TODO Markup field desgination on where your mouse is

  }

}


