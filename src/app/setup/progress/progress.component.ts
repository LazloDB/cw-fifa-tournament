import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css']
})
export class ProgressComponent implements OnInit {
  @Input() stage: number = 0;
  @Input() playerCount: number = 0;
  @Output() setStage = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  handleEmit(stage) {
    if (stage !== 0 && this.playerCount > 2) {
          this.setStage.emit(stage);
    } else {
      this.setStage.emit(0);
    }
  }

}
