import Bootstrap from './scenes/Bootstrap.js';
import Game from './scenes/Game.js';
import MainMenu from './scenes/MainMenu.js';
import { CeuAzul } from './scenes/lyrics.js';

for(let i = 0; i < CeuAzul.length; i++) {
  console.log(CeuAzul[i]);
}

const config = {
  type: Phaser.AUTO,
  width: 1920,
  height: 1080,
  parent: 'game-container',
  backgroundColor: '#000000',
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 },
      debug: false
    }
  },
  scene: [
    Bootstrap,
    MainMenu,
    Game
  ],
  pixelArt: false,
};

const game = new Phaser.Game(config);