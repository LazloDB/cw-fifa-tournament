import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-knock-outs',
  templateUrl: './knock-outs.component.html',
  styleUrls: ['./knock-outs.component.css']
})
export class KnockOutsComponent implements OnInit {
  @Input() players: Array<any>;

  constructor() { }

  ngOnInit() {
    console.log(this.players);
  }
}
