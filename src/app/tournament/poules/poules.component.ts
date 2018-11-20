import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-poules',
  templateUrl: './poules.component.html',
  styleUrls: ['./poules.component.css']
})
export class PoulesComponent {
  @Input() poules: Array<any>;

  koPlayers: Array<any> = [];

  constructor() { }

  finishPoules(x: any) {
    console.log(x);
    if (this.poules.length == 2) {
      let isShort: boolean = (this.poules[0].length == 3 && this.poules[1].length == 3);

      this.poules.forEach((v) => {
        this.koPlayers.push(v[0].name);
        if (!isShort) this.koPlayers.push(v[1].name);
      });
    }
  }
}
