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

  // //TODO: auch mit service lösen
  // removeMarkupDesignation() {
  //   while(document.getElementsByClassName("coordinateHovered").length > 0){
  //     const coordinateElements = document.getElementsByClassName("coordinateHovered");
  //     for(let i = 0; i < coordinateElements.length; i++){
  //       coordinateElements.item(i).setAttribute("class", "coordinate");
  //     }
  //   }
  // }
  //
  // //TODO: auch mit service lösen
  // //https://stackoverflow.com/questions/54413298/correct-way-to-do-dom-manipulation-in-angular-2/54420818#54420818
  // markupDesignation(hoveredField) {
  //   this.removeMarkupDesignation();
  //
  //   const x = hoveredField['fieldDesignation'][0];
  //   const y = hoveredField['fieldDesignation'][1];
  //
  //   document.getElementById(x + "_top").setAttribute("class", "coordinateHovered");
  //   document.getElementById(x + "_bottom").setAttribute("class", "coordinateHovered");
  //   document.getElementById(y + "_left").setAttribute("class", "coordinateHovered");
  //   document.getElementById(y + "_right").setAttribute("class", "coordinateHovered");
  //
  // }

}


