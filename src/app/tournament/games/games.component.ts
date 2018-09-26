import { Component, Input } from "@angular/core";

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})
export class GamesComponent {
  @Input() poules: Array<any> = [];

  constructor() {}


}
