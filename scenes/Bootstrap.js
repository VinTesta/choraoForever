export default class Bootstrap extends Phaser.Scene {

  constructor() {
    super({ key: 'Bootstrap' });
  }

  preload() {
    this.load.image('background', 'assets/background.jpg');
    this.load.image('wave', 'assets/wave.png');
    this.load.image('chorao', 'assets/chorao_skate.png');
    this.load.image('guitarra', 'assets/guitarra.png');
    this.load.image('keyboard', 'assets/keyboard_png.png');
  }

  create() {
    this.scene.start('MainMenu');
  }
}