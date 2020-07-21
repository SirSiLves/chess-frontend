import {Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.scss']
})
export class FieldComponent implements OnInit {

  @Input() field: Map<string, any>;
  fieldColor: string;
  figure: Map<string, any>;

  constructor() {
  }

  ngOnInit(): void {
    this.fieldColor = this.field['fieldColor'];
    this.figure = this.field['figure'];
  }

  removeMarkupDesignation() {
    while(document.getElementsByClassName("coordinateHovered").length > 0){
      const coordinateElements = document.getElementsByClassName("coordinateHovered");
      for(let i = 0; i < coordinateElements.length; i++){
        coordinateElements.item(i).setAttribute("class", "coordinate");
      }
    }
  }


  markupDesignation(hoveredField) {
    this.removeMarkupDesignation();

    const x = hoveredField['fieldDesignation'][0];
    const y = hoveredField['fieldDesignation'][1];

    document.getElementById(x + "_top").setAttribute("class", "coordinateHovered");
    document.getElementById(x + "_bottom").setAttribute("class", "coordinateHovered");
    document.getElementById(y + "_left").setAttribute("class", "coordinateHovered");
    document.getElementById(y + "_right").setAttribute("class", "coordinateHovered");

  }

}


