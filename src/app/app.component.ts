import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  gameLaunched = false;

  casesSize = 12;
  cases : boolean [];

  scoreUpperLimit = 100;
  scoreLowerLimit = 0;
  scoreUpperStep = 10;
  scoreLowerStep = 20;
  scoreDefault = 5;
  scoreCurrent = 5;
  
  victory : string;

  constructor() {
    this.initGame();
  }

  launchGame() {
    if (this.gameLaunched === false) {
      this.initGame();

      this.scoreCurrent = this.scoreDefault;
      this.gameLaunched = true;

      setTimeout(() => this.gameLoop(), 1000);
    }
  }
  
  initGame() {
    this.cases = new Array(this.casesSize).fill(false);
    this.gameLaunched = false;
  }

  clickCase(caseValue, indexCase) {
    if (caseValue) {
      this.scoreCurrent += this.scoreUpperStep;
      this.cases[indexCase] = false;
    } else {
      this.scoreCurrent -= this.scoreLowerStep;
    }
  }
  
  gameLoop() {
    this.checkGameRun();
    if (this.gameLaunched) {
      this.cases[this.generateRandomNumber(0, this.casesSize-1)] = true;
      this.cases[this.generateRandomNumber(0, this.casesSize-1)] = false;

      this.scoreCurrent -= 1;

      setTimeout(() => this.gameLoop(), 500);
    } else {
      this.initGame();
    }
  }

  checkGameRun() {
    if (this.scoreCurrent >= this.scoreUpperLimit) {
      this.victory = "GAGNÉ :) :) :)";
      this.gameLaunched = false;
    } else if (this.scoreCurrent <= this.scoreLowerLimit) {
      this.victory = "PERDU :( :( :(";
      this.gameLaunched = false;
    }
  }

  generateRandomNumber(min, max)
  {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  getColor(caseValue : boolean) {
    return caseValue ? 'green' : 'red';
  }
}
