import { Component, Input } from "@angular/core";
import { player } from "../../common/models/player";

@Component({
  selector: 'app-standings',
  templateUrl: './standings.component.html',
  styleUrls: ['./standings.component.css']
})
export class StandingsComponent {
  @Input() poules: Array<any> = [];

  constructor() {}


}
