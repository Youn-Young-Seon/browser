'use strict';

import Field from "./filed.js";
import * as sound from './sound.js';

export const Itemtype = Object.freeze({
    carrot: 'carrot',
    bug: 'bug'
});

export const Reason = Object.freeze({
    win: 'win',
    lose: 'lose',
    cancel: 'cancel',
});

// Builder Pattern
export class GameBuilder{
    gameDuration(duration){
        this.gameDuration = duration;
        return this;
    }

    carrotCount(num){
        this.carrotCount = num;
        return this;
    }

    bugCount(num){
        this.bugCount = num;
        return this;
    }

    build(){
        return new Game(
            this.gameDuration,
            this.carrotCount,
            this.bugCount
        );
    }
}

class Game{
    constructor(gameDuration, carrotCount, bugCount){
        this.gameDuration = gameDuration;
        this.carrotCount = carrotCount;
        this.bugCount = bugCount;

        this.gameBtn = document.querySelector('.game__button');
        this.gameTimer = document.querySelector('.game__timer');
        this.gameScore = document.querySelector('.game__score');

        this.gameBtn.addEventListener('click', () => {
            if (this.started) {
              this.stop();
            } else {
              this.start();
            }
        });

        this.gameField = new Field(carrotCount, bugCount);
        this.gameField.setClickListener(this.onItemClick);

        this.started = false;
        this.score = 0;
        this.timer = undefined;
    }

    onItemClick = (item) => {
        if (!this.started) {
            return;
        }
        if (item === '.carrot') {
            this.score++;
            this.updateScoreBoard();
            if (this.score === this.carrotCount) {
                this.stop(Reason.win);
            }
        } else if (item === 'bug') {
            this.stop(Reason.lose);
        }
    }

    setGameStopListener(onGameStop){
        this.onGameStop = onGameStop;
    }
    
    start() {
        this.started = true;
        this.initGame();
        this.showStopButton();
        this.showTimerAndScore();
        this.startGameTimer();
        sound.playBackground();
      }
      
      stop(reason) {
        this.started = false;
        this.stopGameTimer();
        this.hideGameButton();
        sound.stopBackground();
        switch(reason){
            case Reason.cancel:
                sound.playAlert();
            break;
            case Reason.win:
                sound.playWin();
            break;
            case Reason.lose:
                sound.playBug();
            break;
            default:
                throw new Error('not valid reason');
        }
        this.onGameStop && this.onGameStop(reason);
      }

      finishGame(win) {
        this.started = false;
        this.hideGameButton();
        if (win) {
          sound.playWin();
        } else {
          sound.playBug();
        }
        this.stopGameTimer();
        sound.stopBackground();
        this.onGameStop && this.onGameStop(win ? Reason.win : Reason.lose);
      }   

      showStopButton() {
        const icon = this.gameBtn.querySelector('.fas');
        icon.classList.add('fa-stop');
        icon.classList.remove('fa-play');
        this.gameBtn.style.visibility = 'visible';
      }
      
      hideGameButton() {
        this.gameBtn.style.visibility = 'hidden';
      }
      
      showTimerAndScore() {
        this.gameTimer.style.visibility = 'visible';
        this.gameScore.style.visibility = 'visible';
      }
      
      startGameTimer() {
        let remainingTimeSec = this.gameDuration;
        this.updateTimerText(remainingTimeSec);
        this.timer = setInterval(() => {
          if (remainingTimeSec <= 0) {
            clearInterval(this.timer);
            this.finishGame(this.carrotCount === this.score ? Reason.win : Reason.lose);
            return;
          }
          this.updateTimerText(--remainingTimeSec);
        }, 1000);
      }
      
      stopGameTimer() {
        clearInterval(this.timer);
      }
      
      updateTimerText(time) {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        this.gameTimer.innerHTML = `${minutes}:${seconds}`;
      }
      
      initGame() {
        this.score = 0;
        this.gameScore.innerText = this.carrotCount;
        this.gameField.init();
      }
            
      updateScoreBoard() {
        this.gameScore.innerText = this.carrotCount - this.score;
      }   
}