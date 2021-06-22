'use strict';

import Popup from "./popup.js";
import {GameBuilder, Reason } from "./game.js";


const gameFinishBanner = new Popup();
const game = new GameBuilder()
.gameDuration(5)
.carrotCount(3)
.bugCount(3)
.build();

game.setGameStopListener((reason) => {
  let message;
  switch(reason){
    case Reason.cancel:
      message = 'Replay';
      sound.playAlert();
      break;
    case Reason.win :
      message = 'You Won';
      sound.playWin();
      break;
    case Reason.lose :
      message = 'You Lost';
      sound.playBug();
      break;
    default : throw new Error('not valid reason');
  }
  gameFinishBanner.showWithText(message);
});

gameFinishBanner.setClickListener(() => {
  game.start();
});




