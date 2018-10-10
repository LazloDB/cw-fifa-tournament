import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-poules',
  templateUrl: './poules.component.html',
  styleUrls: ['./poules.component.css']
})
export class PoulesComponent {
  @Input() poules: Array<any>;
  @Output() finish = new EventEmitter();

  constructor() { }

  handleGames(e) {
    this.finish.emit();
  }
}
