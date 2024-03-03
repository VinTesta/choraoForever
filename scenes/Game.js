const gameAttributes = {
  score: 0
}

export default class Game extends Phaser.Scene {
  chorao;
  wave;
  movementKeys;
  speed = 300;

  constructor() {
    super({ key: 'Game' });
  }

  create() {
    const background = this.add
      .image(this.renderer.width / 2, this.renderer.height / 2, 'background')
      .setOrigin(.5, .5);
    background.displayWidth = this.renderer.width;
    background.displayHeight = this.renderer.height;

    gameAttributes.scoreText = this.add
      .text(this.renderer.width, 0, 'Score: 0', { fontSize: '64px', fill: '#000' })
      .setOrigin(1, 0);

    this.wave = this.add
      .image(this.renderer.width / 2, this.renderer.height / 2, 'wave')
      .setOrigin(0, .2);
    
    this.wave.displayWidth = this.renderer.width;
    this.wave.displayHeight = this.renderer.height + 200;

    this.chorao = this.physics.add.sprite(this.renderer.width / 2, this.renderer.height / 2, 'chorao')
      .setOrigin(.5, .5)
      .setScale(.5);
    
    this.chorao.setCollideWorldBounds(true);  
    this.chorao.body.setSize(170, 420, true);

    this.movementKeys = this.input.keyboard.addKeys(
    {
      UP:'W',
      LEFT: 'A',
      DOWN: 'S',
      RIGHT:'D',
      E: 'E',
      SPACE: 'SPACE'
    });

    const eletricGuitars = this.physics.add.group();

    const guitarGenerator = () => {
      const guitar = eletricGuitars.create(this.renderer.width - 100, Math.random() * 1080, 'guitarra');
      guitar.body.onWorldBounds = true;
      guitar.body.setCollideWorldBounds(true);
      guitar
        .setScale(.1)
        .setVelocityX(-300);
        
      guitar.body.world.on('worldbounds', function(body) {
        if (body.gameObject === this) {
          gameAttributes.score += 10;
          gameAttributes.scoreText.setText(`Score: ${gameAttributes.score}`);
          this.destroy();
        }
      }, guitar);
    }

    this.guitarGeneratorLoop = this.time.addEvent({
      delay: 500,
      callback: guitarGenerator,
      callbackScope: this,
      loop: true,
    });

    this.physics.add.collider(this.chorao, eletricGuitars, () => {
      this.guitarGeneratorLoop.destroy();
      this.physics.pause();

      this.add.text(
        this.renderer.width / 2, 
        this.renderer.height / 2, 
        'Game Over', 
        { fontSize: '64px', fill: '#000000' })
      .setOrigin(.5, .5);

      this.add.text(
        this.renderer.width / 2, 
        this.renderer.height / 2 + 100, 
        'Click to restart', 
        { fontSize: '64px', fill: '#000000' })
      .setOrigin(.5, .5);

      this.input.on('pointerup', () => {
        gameAttributes.score = 0;
        this.scene.restart();
      });
    });
  }

  update() {
    this.chorao.setVelocity(0);
    this.speed = 300;

    if(this.movementKeys.SPACE.isDown) this.speed = 600;

    Promise.all([
      this.movementTriggers['UP'](this.movementKeys.UP.isDown),
      this.movementTriggers['DOWN'](this.movementKeys.DOWN.isDown),
      this.movementTriggers['LEFT'](this.movementKeys.LEFT.isDown),
      this.movementTriggers['RIGHT'](this.movementKeys.RIGHT.isDown)
    ])

    this.wave.setPosition(0, this.chorao.y);

    if(gameAttributes.score >= 200) {
      this.add.text(
        this.renderer.width / 2, 
        this.renderer.height / 2, 
        'Você ganhou', 
        { fontSize: '64px', fill: '#000000' })
      .setOrigin(.5, .5);

      this.guitarGeneratorLoop.destroy();
      this.physics.pause();
      
      this.input.on('pointerup', () => {
        this.scene.stop('Game');
        this.scene.start('MainMenu');
      });
    }
  }

  movementTriggers = {
    UP: (move) => {
      if(!move) return;
      this.chorao.setVelocityY(- this.speed);
    },
    DOWN: (move) => {
      if(!move) return;
      this.chorao.setVelocityY(this.speed)
    },
    LEFT: (move) => {
      if(!move) return;
      this.chorao.setVelocityX(- this.speed);
    },
    RIGHT: (move) => {
      if(!move) return;
      this.chorao.setVelocityX(this.speed);
    }
  };
}