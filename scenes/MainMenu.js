const gameStates = {
  score: 0
}

export default class MainMenu extends Phaser.Scene {

  constructor() {
    super({ key: 'MainMenu' });
  }

  create() {

    this.add.image(
      this.renderer.width / 2, 
      this.renderer.height - 100, 
      'keyboard')
      .setOrigin(.5, 1);
    this.add.text(
      this.renderer.width / 2, 
      this.renderer.height / 4, 'Chorão Forever', { fontSize: '64px', fill: '#fff' })
      .setOrigin(.5, .5);
  
    this.add.text(
      this.renderer.width / 2, 
      this.renderer.height / 2, 'Clique em qualquer lugar para iniciar', { fontSize: '48px', fill: '#fff' })
      .setOrigin(.5, .5);

    this.input.on('pointerdown', () => { 
      this.scene.stop('MainMenu');
      this.scene.start('Game');
    });
  }
}