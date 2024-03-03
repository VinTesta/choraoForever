// Define um objeto para armazenar o estado do jogo
const gameStates = {
  // Inicializa a pontuação do jogo como 0
  score: 0
}

// Exporta a classe MainMenu que estende a classe Scene do Phaser
export default class MainMenu extends Phaser.Scene {

  // Construtor da classe
  constructor() {
    // Chama o construtor da classe pai com a chave 'MainMenu'
    super({ key: 'MainMenu' });
  }

  // Método create que é chamado quando a cena é criada
  create() {
    // Adiciona uma imagem de um teclado no fundo da cena
    this.add.image(
      this.renderer.width / 2, 
      this.renderer.height - 100, 
      'keyboard')
      .setOrigin(.5, 1);

    // Adiciona um texto no topo da cena
    this.add.text(
      this.renderer.width / 2, 
      this.renderer.height / 4, 'Chorão Forever', { fontSize: '64px', fill: '#fff' })
      .setOrigin(.5, .5);
  
    // Adiciona um texto no meio da cena
    this.add.text(
      this.renderer.width / 2, 
      this.renderer.height / 2, 'Clique em qualquer lugar para iniciar', { fontSize: '48px', fill: '#fff' })
      .setOrigin(.5, .5);

    // Adiciona um evento de clique na cena
    this.input.on('pointerdown', () => { 
      // Para a cena atual
      this.scene.stop('MainMenu');
      // Inicia a cena do jogo
      this.scene.start('Game');
    });
  }
}