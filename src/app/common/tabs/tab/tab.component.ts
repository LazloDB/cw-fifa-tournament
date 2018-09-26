import { Component, Input } from "@angular/core";
import { Tabs } from "../tabs.component";

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.css'],
})
export class Tab {
  @Input() tabTitle;

  active: boolean;

  constructor(tabs: Tabs) {
    tabs.addTab(this)
  }
}
