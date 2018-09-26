import { Component, Input, OnInit } from "@angular/core";
import { player } from "../../common/models/player";

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})
export class GamesComponent implements OnInit {
  @Input() poules: Array<any> = [];

  matches: any = {};

  constructor() {}

  ngOnInit() {
    this.createScheme(this.poules);
  }

  createScheme(poules) {

  }

}
