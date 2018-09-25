import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-match-type',
  templateUrl: './match-type.component.html',
  styleUrls: ['./match-type.component.css']
})
export class MatchTypeComponent implements OnInit {
  @Output() setType = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

}
