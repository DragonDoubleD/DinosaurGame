import { Scene } from 'phaser';
import { createCharacterAnims } from '../../anims/CharacterAnims';
import Fliege from '../../enemies/Fliege'

/*
* @author Darina Berent
* I used Typescript and Phaser3 to realize this project
* To create the parallax scrolling background I watched a video on youtube (https://www.youtube.com/watch?v=Y3C5HliTDwM)
*/

//Create parallax scrolling background
const createAligned = (scene, count, texture, scrollFactor) => {
  let x = 0
  for (let i = 0; i < count; ++i) {
    const mountain = scene.add.image(x, scene.scale.height, texture)
      .setOrigin(0, 0.8)
      .setScrollFactor(scrollFactor)

    x += mountain.width
  }
}

class GameScene extends Scene {
  private platforms?: Phaser.Physics.Arcade.StaticGroup
  private dinosaur?: Phaser.Physics.Arcade.Sprite
  private cursors?: Phaser.Types.Input.Keyboard.CursorKeys
  private fruitCollection?: Phaser.Physics.Arcade.Group
  private newFlyGroup?: Phaser.Physics.Arcade.Group
  private camera?: Phaser.Cameras.Controls.SmoothedKeyControl
  private scoreText?: Phaser.GameObjects.Text
  private movingPlatforms?: any //Phaser.Physics.Arcade.Image
  private movingPlatforms1?: any
  private movingPlatforms2?: any
  private movingPlatforms3?: any
  private movingPlatforms4?: any
  private movingPlatforms5?: any
  private movingPlatforms6?: any
  private jumpCount = 0
  private score: number
  private destination?: Phaser.Physics.Arcade.Sprite

  constructor() {
    super({ key: 'GameScene' });
  }

  preload(): void {
    this.load.image("ground", "assets/img/ground.png");
    this.load.spritesheet("dinosaur", "assets/dinoSpritesheet/dinoAnims1.png", { frameWidth: 443, frameHeight: 400 });
    this.load.image("fruit", "assets/img/fruit.png");
    this.load.image("clouds", "assets/img/clouds.png");
    this.load.image("ground", "assets/img/ground.png");
    this.load.image("mountin", "assets/img/mountin.png");
    this.load.image("sky", "assets/img/sky.png");
    this.load.image("newground", "assets/img/platformGround.png");
    this.load.image("runningGround", "assets/img/runningGround.png");
    this.load.image('destination', "assets/img/goal.png");
    this.load.image('enemyFly', "assets/enemies/enemy.png");
  }

  create(): void {

    //Parallax scrolling background
    const width = this.scale.width;
    const height = this.scale.height;

    this.add.image(width * 0.5, height * 0.5, 'sky')
      .setScrollFactor(0);

    this.add.image(0, 100, 'clouds')
      .setOrigin(0, 0.3)
      .setScrollFactor(0);

    createAligned(this, 3, 'mountin', 0.25)
    createAligned(this, 3, 'ground', 0.5)

    this.score = 0;

    this.physics.world.setBounds(0, 0, 1155 * 10, 765);

    //Create dinosaur character
    this.dinosaur = this.physics.add.sprite(100, 100, 'dinosaur');
    this.dinosaur.setScale(0.3);
    this.dinosaur.setBounce(0.5);
    this.dinosaur.setCollideWorldBounds(true);
    this.dinosaur.enableBody(true, 100, 600, true, true);

    //Create flyGroup
    this.newFlyGroup = this.physics.add.group({
      classType: Fliege,
      createCallback: (go) => {
        const FliegeBewegen = go as Fliege
        FliegeBewegen.body.onCollide = true;
      }
    })

    //Position flies
    this.newFlyGroup.get(1000, 500, 'enemyFly').setScale(0.2);
    this.newFlyGroup.get(1700, 200, 'enemyFly').setScale(0.2);
    this.newFlyGroup.get(2500, 300, 'enemyFly').setScale(0.2);
    this.newFlyGroup.get(2800, 500, 'enemyFly').setScale(0.2);
    this.newFlyGroup.get(3550, 300, 'enemyFly').setScale(0.2);
    this.newFlyGroup.get(4000, 300, 'enemyFly').setScale(0.2);
    this.newFlyGroup.get(4700, 430, 'enemyFly').setScale(0.2);
    this.newFlyGroup.get(5200, 300, 'enemyFly').setScale(0.2);
    this.newFlyGroup.get(5950, 300, 'enemyFly').setScale(0.2);
    this.newFlyGroup.get(6500, 550, 'enemyFly').setScale(0.2);
    this.newFlyGroup.get(7100, 250, 'enemyFly').setScale(0.2);
    this.newFlyGroup.get(7500, 350, 'enemyFly').setScale(0.2);
    this.newFlyGroup.get(8100, 250, 'enemyFly').setScale(0.2);
    this.newFlyGroup.get(8850, 300, 'enemyFly').setScale(0.2);

    //Create and place destination
    this.destination = this.physics.add.sprite(10050, 650, 'destination');
    this.destination.setScale(0.3);
    this.destination.setCollideWorldBounds(true);
    this.destination.refreshBody();

    //Create dinosaur anims
    createCharacterAnims(this.anims)

    //Create and place platforms
    this.platforms = this.physics.add.staticGroup()
    this.platforms.create(0, 760, 'runningGround').setScale(1155, 0.2).refreshBody();
    this.platforms.create(500, 650, 'newground').setScale(0.5).refreshBody();
    this.platforms.create(820, 550, 'newground').setScale(0.5).refreshBody();
    this.platforms.create(1640, 630, 'newground').setScale(0.5).refreshBody();
    this.platforms.create(1950, 250, 'newground').setScale(0.5).refreshBody();
    this.platforms.create(2150, 450, 'newground').setScale(0.5).refreshBody();
    this.platforms.create(2700, 500, 'newground').setScale(0.5).refreshBody();
    this.platforms.create(3000, 250, 'newground').setScale(0.5).refreshBody();
    this.platforms.create(3300, 350, 'newground').setScale(0.5).refreshBody();
    this.platforms.create(4830, 250, 'newground').setScale(0.5).refreshBody();
    this.platforms.create(5190, 400, 'newground').setScale(0.5).refreshBody();
    this.platforms.create(5410, 590, 'newground').setScale(0.5).refreshBody();
    this.platforms.create(5550, 250, 'newground').setScale(0.5).refreshBody();
    this.platforms.create(5800, 590, 'newground').setScale(0.5).refreshBody();
    this.platforms.create(7100, 250, 'newground').setScale(0.5).refreshBody();
    this.platforms.create(7300, 550, 'newground').setScale(0.5).refreshBody();
    this.platforms.create(7650, 550, 'newground').setScale(0.5).refreshBody();
    this.platforms.create(8050, 450, 'newground').setScale(0.5).refreshBody();
    this.platforms.create(8450, 350, 'newground').setScale(0.5).refreshBody();
    this.platforms.create(8850, 250, 'newground').setScale(0.5).refreshBody();
    this.platforms.create(9200, 350, 'newground').setScale(0.5).refreshBody();
    this.platforms.create(9600, 450, 'newground').setScale(0.5).refreshBody();
    this.platforms.create(10220, 650, 'newground').setScale(0.5).refreshBody().setVisible(false);

    //Create and place moving platforms (horizontal movement)
    this.movingPlatforms = this.physics.add.image(1300, 320, 'newground').setScale(0.5);
    this.movingPlatforms1 = this.physics.add.image(1150, 450, 'newground').setScale(0.5);
    this.movingPlatforms2 = this.physics.add.image(3750, 500, 'newground').setScale(0.5);
    this.movingPlatforms3 = this.physics.add.image(3900, 500, 'newground').setScale(0.5);
    this.movingPlatforms4 = this.physics.add.image(4150, 350, 'newground').setScale(0.5);
    this.movingPlatforms5 = this.physics.add.image(6100, 350, 'newground').setScale(0.5);
    this.movingPlatforms6 = this.physics.add.image(6300, 350, 'newground').setScale(0.5);

    //settings for moving platforms
    this.movingPlatforms.setImmovable(true);
    this.movingPlatforms.body.allowGravity = false;
    this.movingPlatforms.setVelocityX(30);
    this.movingPlatforms1.setImmovable(true);
    this.movingPlatforms1.body.allowGravity = false;
    this.movingPlatforms1.setVelocityX(30);
    this.movingPlatforms2.setImmovable(true);
    this.movingPlatforms2.body.allowGravity = false;
    this.movingPlatforms2.setVelocityX(30);
    this.movingPlatforms3.setImmovable(true);
    this.movingPlatforms3.body.allowGravity = false;
    this.movingPlatforms3.setVelocityX(30);
    this.movingPlatforms4.setImmovable(true);
    this.movingPlatforms4.body.allowGravity = false;
    this.movingPlatforms4.setVelocityX(30);
    this.movingPlatforms5.setImmovable(true);
    this.movingPlatforms5.body.allowGravity = false;
    this.movingPlatforms5.setVelocityX(30);
    this.movingPlatforms6.setImmovable(true);
    this.movingPlatforms6.body.allowGravity = false;
    this.movingPlatforms6.setVelocityX(30);

    // Create fruitCollection to collect
    this.fruitCollection = this.physics.add.group({
      key: 'fruit',
      repeat: 60,
      setXY: { x: 200, y: 0, stepX: 150 }
    });

    //Create properties for fruitCollection
    this.fruitCollection.children.iterate(function (c) {
      const child = c as Phaser.Physics.Arcade.Image
      child.setBounceY(Phaser.Math.FloatBetween(0.2, 0.5));
      child.setScale(0.1);
      child.setCollideWorldBounds(true);
    });

    //Add collider
    //Dinosaur collider
    this.physics.add.collider(this.dinosaur, this.platforms)
    this.physics.add.collider(this.dinosaur, this.movingPlatforms);
    this.physics.add.collider(this.dinosaur, this.movingPlatforms1);
    this.physics.add.collider(this.dinosaur, this.movingPlatforms2);
    this.physics.add.collider(this.dinosaur, this.movingPlatforms3);
    this.physics.add.collider(this.dinosaur, this.movingPlatforms4);
    this.physics.add.collider(this.dinosaur, this.movingPlatforms5);
    this.physics.add.collider(this.dinosaur, this.movingPlatforms6);
    //FruitCollection collider
    this.physics.add.collider(this.fruitCollection, this.platforms);
    this.physics.add.collider(this.fruitCollection, this.movingPlatforms);
    this.physics.add.collider(this.fruitCollection, this.movingPlatforms1);
    this.physics.add.collider(this.fruitCollection, this.movingPlatforms2);
    this.physics.add.collider(this.fruitCollection, this.movingPlatforms3);
    this.physics.add.collider(this.fruitCollection, this.movingPlatforms4);
    this.physics.add.collider(this.fruitCollection, this.movingPlatforms5);
    this.physics.add.collider(this.fruitCollection, this.movingPlatforms6);
    //Destination collider
    this.physics.add.collider(this.platforms, this.destination);
    this.physics.add.collider(this.dinosaur, this.destination);
    //FlyGroup collider
    this.physics.add.collider(this.newFlyGroup, this.dinosaur);
    this.physics.add.collider(this.newFlyGroup, this.platforms);
    this.physics.add.collider(this.newFlyGroup, this.movingPlatforms);
    this.physics.add.collider(this.newFlyGroup, this.movingPlatforms1);
    this.physics.add.collider(this.newFlyGroup, this.movingPlatforms2);
    this.physics.add.collider(this.newFlyGroup, this.movingPlatforms3);
    this.physics.add.collider(this.newFlyGroup, this.movingPlatforms4);
    this.physics.add.collider(this.newFlyGroup, this.movingPlatforms5);
    this.physics.add.collider(this.newFlyGroup, this.movingPlatforms6);

    //Add overlap and functions
    this.physics.add.overlap(this.dinosaur, this.newFlyGroup, startGame, processCallback, this);

    //If the dinosaur and fly collide the game starts from the beginning
    function startGame(this: any, dinosaur, roteFliegeGruppe) {
      this.scene.start('GameScene')
      this.score = 0;
    }

    function processCallback(dinosaur, roteFliegeGruppe) {
      return true;
    }
    //If the dinosaur and the destination collide the game will end immediately
    this.physics.add.overlap(this.dinosaur, this.destination, stopGame, processCallback1, this);

    function stopGame(this: any, dinosaur, destination) {
      this.scene.start('GameOverScene', { score: this.score });
    }

    function processCallback1(dinosaur, destination) {
      return true;
    }

    //If the dinosaur and the fruitCollection collide the score increases and the fruits disappear
    this.physics.add.overlap(this.dinosaur, this.fruitCollection, collectFruits, processCallback2, this);

    function collectFruits(this: any, dinosaur, fruitCollection) {
      fruitCollection.disableBody(true, true);

      //Add Score that increases
      this.score++;
      this.scoreText?.setText(`score: ${this.score}`);

    }
    function processCallback2(dinosaur, fruitCollection) {
      return true;
    }

    //If destination and unvisible platform behind the destination collide, stop the image from moving to the right side and stop the game immediately
    this.physics.add.overlap(this.destination, this.platforms, stopGame1, processCallback3, this);

    function stopGame1(this: any, destination, platforms) {
      this.scene.start('GameOverScene', { score: this.score });
    }
    function processCallback3(destination, platforms) {
      return true;
    }

    //Add Scoretext and properties
    this.scoreText = this.add.text(0, 0, 'score: 0', {
      fontFamily: 'Arial, Helvetica, sans-serif',
      fontSize: '32px',
      color: 'white',
      backgroundColor: '#762B8F',
      stroke: 'black',
      strokeThickness: '2',
      fixedHeight: '50',
      fixedWidth: '150',
    });

    //Scoretext should also follow the camera
    this.scoreText.setScrollFactor(0);

    //Add cursors to move the dinosaur
    this.cursors = this.input.keyboard.createCursorKeys();
    
    //Add camera to follow the dinosaur
    this.cameras.main.setBounds(0, 0, width * 10, height);
    this.cameras.main.startFollow(this.dinosaur)
  }

  update() {
    //Add key properties to move the dinosaur
    var isLeftDown = this.cursors?.left?.isDown;
    var isRightDown = this.cursors?.right?.isDown;
    var touchingGround = this.dinosaur?.body.touching.down;

    const cam = this.cameras.main
    const speed = 3;
    const isJumpJustDown = Phaser.Input.Keyboard.JustDown(this.cursors?.up!)
    const isTouchingGround = touchingGround

    //Add conditions when keys are clicked
    if (isLeftDown) {
      cam.scrollX -= speed;
      this.cameras.main.followOffset.x = 0;
      this.dinosaur?.setVelocityX(-160);
      this.dinosaur?.play('dino-run-backwards', true);
    }
    else if (isRightDown) {
      cam.scrollX += speed
      this.cameras.main.followOffset.x = -0;
      this.dinosaur?.setVelocityX(160);
      this.dinosaur?.play('dino-run', true);
    }

    //Condition when dinosaur is jumping down and is touching ground or jumped less then three times
    if (isJumpJustDown && (isTouchingGround || this.jumpCount < 3)) {
      this.dinosaur?.setVelocityY(-300);
      ++this.jumpCount;
    }
    //Condition when dinosaur is touching ground the jump counts should reset from x to 0
    if (isTouchingGround && !isJumpJustDown) {
      this.jumpCount = 0;
    }

    //Create radius of moving platforms
    if (this.movingPlatforms.x >= 1700) {
      this.movingPlatforms.setVelocityX(-30);
    }
    else if (this.movingPlatforms.x <= 1550) {
      this.movingPlatforms.setVelocityX(30);
    }
    if (this.movingPlatforms1.x >= 1300) {
      this.movingPlatforms1.setVelocityX(-30);
    }
    else if (this.movingPlatforms1.x <= 1200) {
      this.movingPlatforms1.setVelocityX(30);
    }
    if (this.movingPlatforms2.x >= 3700) {
      this.movingPlatforms2.setVelocityX(-30);
    }
    else if (this.movingPlatforms2.x <= 3650) {
      this.movingPlatforms2.setVelocityX(30);
    }
    if (this.movingPlatforms3.x >= 4100) {
      this.movingPlatforms3.setVelocityX(-30);
    }
    else if (this.movingPlatforms3.x <= 3900) {
      this.movingPlatforms3.setVelocityX(30);
    }
    if (this.movingPlatforms4.x >= 4600) {
      this.movingPlatforms4.setVelocityX(-30);
    }
    else if (this.movingPlatforms4.x <= 4400) {
      this.movingPlatforms4.setVelocityX(30);
    }
    if (this.movingPlatforms5.x >= 6200) {
      this.movingPlatforms5.setVelocityX(-30);
    }
    else if (this.movingPlatforms5.x <= 6000) {
      this.movingPlatforms5.setVelocityX(30);
    }
    if (this.movingPlatforms6.x >= 6710) {
      this.movingPlatforms6.setVelocityX(-30);
    }
    else if (this.movingPlatforms6.x <= 6500) {
      this.movingPlatforms6.setVelocityX(30);
    }
  }
}

export default GameScene;