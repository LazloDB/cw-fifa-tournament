import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-poules',
  templateUrl: './poules.component.html',
  styleUrls: ['./poules.component.css']
})
export class PoulesComponent {
  @Input() poules: Array<any>;

  constructor() { }

}
