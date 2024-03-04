// Definindo os atributos do jogo
const gameAttributes = {
  score: 0
}

// Exportando a classe Game que estende a classe Scene do Phaser
export default class Game extends Phaser.Scene {
  // Definindo as propriedades da classe
  chorao;
  wave;
  movementKeys;
  speed = 300;

  // Construtor da classe
  constructor() {
    // Chamando o construtor da classe pai
    super({ key: 'Game' });
  }

  // Método create que é chamado quando a cena é criada
  create() {
    // Criando o background
    const background = this.add
      .image(this.renderer.width / 2, this.renderer.height / 2, 'background')
      .setOrigin(.5, .5);
    background.displayWidth = this.renderer.width;
    background.displayHeight = this.renderer.height;

    // Criando o texto do score
    gameAttributes.scoreText = this.add
      .text(this.renderer.width, 0, 'Score: 0', { fontSize: '64px', fill: '#000' })
      .setOrigin(1, 0);

    // Criando a onda
    this.wave = this.add
      .image(this.renderer.width / 2, this.renderer.height / 2, 'wave')
      .setOrigin(0, .2);
    
    this.wave.displayWidth = this.renderer.width;
    this.wave.displayHeight = this.renderer.height + 200;

    // Criando o personagem principal
    this.chorao = this.physics.add.sprite(this.renderer.width / 2, this.renderer.height / 2, 'chorao')
      .setOrigin(.5, .5)
      .setScale(.5);
    
    this.chorao.setCollideWorldBounds(true);  
    this.chorao.body.setSize(170, 420, true);

    // Definindo as teclas de movimento
    this.movementKeys = this.input.keyboard.addKeys(
    {
      UP:'W',
      LEFT: 'A',
      DOWN: 'S',
      RIGHT:'D',
      E: 'E',
      SPACE: 'SPACE'
    });

    // Criando o grupo de guitarras elétricas
    const eletricGuitars = this.physics.add.group();

    // Definindo a função que gera as guitarras
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

    // Criando o loop que gera as guitarras
    this.guitarGeneratorLoop = this.time.addEvent({
      delay: 500,
      callback: guitarGenerator,
      callbackScope: this,
      loop: true,
    });

    // Adicionando o colisor entre o personagem principal e as guitarras
    this.physics.add.collider(this.chorao, eletricGuitars, () => {
      this.guitarGeneratorLoop.destroy();
      this.physics.pause();

      // Adicionando o texto de Game Over
      this.add.text(
        this.renderer.width / 2, 
        this.renderer.height / 2, 
        'Game Over', 
        { fontSize: '64px', fill: '#000000' })
      .setOrigin(.5, .5);

      // Adicionando o texto de Click to restart
      this.add.text(
        this.renderer.width / 2, 
        this.renderer.height / 2 + 100, 
        'Click to restart', 
        { fontSize: '64px', fill: '#000000' })
      .setOrigin(.5, .5);

      // Adicionando o evento de clique para reiniciar o jogo
      this.input.on('pointerup', () => {
        gameAttributes.score = 0;
        this.scene.restart();
      });
    });
  }

  // Método update que é chamado a cada frame
  update() {
    this.chorao.setVelocity(0);
    this.speed = 300;

    // Aumentando a velocidade se a tecla SPACE estiver pressionada
    if(this.movementKeys.SPACE.isDown) this.speed = 600;

    // Verificando as teclas de movimento
    Promise.all([
      this.movementTriggers['UP'](this.movementKeys.UP.isDown),
      this.movementTriggers['DOWN'](this.movementKeys.DOWN.isDown),
      this.movementTriggers['LEFT'](this.movementKeys.LEFT.isDown),
      this.movementTriggers['RIGHT'](this.movementKeys.RIGHT.isDown)
    ])

    // Atualizando a posição da onda
    this.wave.setPosition(0, this.chorao.y);

    // Verificando se o score é maior ou igual a 200
    if(gameAttributes.score >= 200) {
      // Adicionando o texto de Você ganhou
      this.add.text(
        this.renderer.width / 2, 
        this.renderer.height / 2, 
        'Você ganhou', 
        { fontSize: '64px', fill: '#000000' })
      .setOrigin(.5, .5);

      // Parando o loop de geração de guitarras e pausando a física
      this.guitarGeneratorLoop.destroy();
      this.physics.pause();
      
      // Adicionando o evento de clique para ir para o menu principal
      this.input.on('pointerup', () => {
        gameAttributes.score = 0;
        this.scene.stop('Game');
        this.scene.start('MainMenu');
      });
    }
  }

  // Definindo os gatilhos de movimento
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