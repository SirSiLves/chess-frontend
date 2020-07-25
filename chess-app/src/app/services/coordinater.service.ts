import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CoordinaterService {

  constructor() {
  }

  removeMarkupDesignation() {
    while (document.getElementsByClassName("coordinateHovered").length > 0) {
      const coordinateElements = document.getElementsByClassName("coordinateHovered");
      for (let i = 0; i < coordinateElements.length; i++) {
        coordinateElements.item(i).setAttribute("class", "coordinate");
      }
    }
  }

  //https://stackoverflow.com/questions/54413298/correct-way-to-do-dom-manipulation-in-angular-2/54420818#54420818
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
