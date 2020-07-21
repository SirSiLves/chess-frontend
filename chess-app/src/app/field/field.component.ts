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

    const coordinateElements = document.getElementsByClassName("coordinate");

    for(let i = 0; i < coordinateElements.length; i++){
      let liItem = coordinateElements[i];

    }

    // for(let i = 1; i <= 8; i++){
    //         // document.getElementById(i + "_top").style.color = 'grey';
    //   // document.getElementById(i + "_bottom").style.color = 'grey';
    //   document.getElementById(i + "_left").style.color = 'grey';
    //   document.getElementById(i + "_right").style.color = 'grey';
    // }

  }


  markupDesignation(hoveredField) {
    const x = hoveredField['fieldDesignation'][0];
    const y = hoveredField['fieldDesignation'][1];

    const coordinateElements = document.getElementsByClassName("coordinateHovered");

    for(let i = 1; i <= coordinateElements.length; i++){
      let liItem = coordinateElements[i];
      let className = liItem.getAttribute("class");
      className = className.replace("coordinateHovered", "coordinate")
      liItem.setAttribute("class", className)
    }



    document.getElementById(x + "_top").setAttribute("class","coordinateHovered");
    document.getElementById(x + "_bottom").setAttribute("class","coordinateHovered");
    document.getElementById(y + "_left").setAttribute("class","coordinateHovered");
    document.getElementById(y + "_right").setAttribute("class","coordinateHovered");



    //TODO Markup field desgination on where your mouse is

  }

}


