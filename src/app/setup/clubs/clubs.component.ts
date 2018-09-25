import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-clubs',
  templateUrl: './clubs.component.html',
  styleUrls: ['./clubs.component.css']
})
export class ClubsComponent implements OnInit {
  clubs: Array<string> = [];
  clubName: string = "";


  constructor() { }

  ngOnInit() {
  }

  addClub(): void {
    if (this.clubs.indexOf(this.clubName) < 0 && this.clubName.trim() !== '') {
      this.clubs.push(this.clubName);
    }

    this.clubName = '';
  }

  remove(person: string): void {
    this.clubs = this.clubs.filter((v) => v !== person);
  }

  addTopTeams() {
    this.clubs = ['Arsenal', 'Atletico Madrid', 'Barcelona', 'Bayern München', 'Chelsea', 'Juventus', 'Liverpool', 'Manchester City', 'Manchester United', 'PSG'];
  }

}
