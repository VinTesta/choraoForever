// Exporta a classe Bootstrap que estende a classe Scene do Phaser
export default class Bootstrap extends Phaser.Scene {

  // Construtor da classe
  constructor() {
    // Chama o construtor da classe pai com a chave 'Bootstrap'
    super({ key: 'Bootstrap' });
  }

  // Método preload que é chamado antes da cena ser criada
  preload() {
    // Carrega a imagem do fundo
    this.load.image('background', 'assets/background.jpg');
    // Carrega a imagem da onda
    this.load.image('wave', 'assets/wave.png');
    // Carrega a imagem do chorão
    this.load.image('chorao', 'assets/chorao_skate.png');
    // Carrega a imagem da guitarra
    this.load.image('guitarra', 'assets/guitarra.png');
    // Carrega a imagem do teclado
    this.load.image('keyboard', 'assets/keyboard_png.png');
    // Carrega o áudio 'dia_de_luta'
    this.load.audio('dia_de_luta', ['assets/dias_de_luta.mp3']);
  }

  // Método create que é chamado quando a cena é criada
  create() {
    // Inicia a cena 'MainMenu'
    this.scene.start('MainMenu');
  }
}