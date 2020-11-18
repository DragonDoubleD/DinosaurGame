import { Scene } from 'phaser';

class GameOverScene extends Scene {
  private score: number;

  constructor() {
    super({ key: 'GameOverScene' });
    this.score = 0;
  }

  init(data): void {
    this.score = data.score;
  }

  preload(): void {
    this.load.image("titlepic", "assets/img/welcomeScreen1.png");
    this.load.image("playGameAgain", "assets/buttons/playAgain.png");
  }

  create(): void {
    //Add background and set properties
    this.add
      .tileSprite(
        0,
        0,
        this.textures.get('titlepic').getSourceImage().width,
        this.textures.get('titlepic').getSourceImage().height,
        'titlepic'
      )
      .setOrigin(0, 0)
      .setScale(this.game.canvas.height / this.textures.get('titlepic').getSourceImage().height);

    //Add text and set properties
    var text = this.add.text(this.game.canvas.height * 0.35, this.game.canvas.width * 0.2, `score: ${this.score}`,
      {
        fontFamily: 'Arial, Helvetica, sans-serif',
        fontSize: '100px',
        color: 'white',
        backgroundColor: '#762B8F',
        stroke: 'black',
        strokeThickness: '2',
        fixedHeight: '100',
        fixedWidth: '420',
      });

    //Add button
    const btnPlayAgain = this.add.sprite(this.game.canvas.height * 0.65, this.game.canvas.width * 0.5, "playGameAgain");
    btnPlayAgain.setInteractive();
    btnPlayAgain.on('pointerdown', () => this.clickButton());
  }

  //Add function to start the gameScene again when button is clicked
  clickButton() {
    this.scene.start('GameScene');
  }
}

export default GameOverScene;
