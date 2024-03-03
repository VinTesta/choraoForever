import Bootstrap from './scenes/Bootstrap.js';
import Game from './scenes/Game.js';
import MainMenu from './scenes/MainMenu.js';
import { CeuAzul } from './scenes/lyrics.js';

// Loop que percorre o array da música Céu Azul
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
    // Define o modo de escala do jogo para ajustar automaticamente o tamanho do jogo para caber na tela
    mode: Phaser.Scale.FIT,
    // Centraliza automaticamente o jogo na tela
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
  // Define as configurações de física do jogo
  physics: {
    default: "arcade",
    arcade: {
      // Define a gravidade no eixo y como 0
      gravity: { y: 0 },
      debug: false
    }
  },
  scene: [
    // Cena de inicialização
    Bootstrap,
    // Cena do menu principal
    MainMenu,
    // Cena do jogo
    Game
  ],
  // Desativa o modo de arte em pixel
  pixelArt: false,
};

// Cria uma nova instância do jogo com a configuração definida
const game = new Phaser.Game(config);