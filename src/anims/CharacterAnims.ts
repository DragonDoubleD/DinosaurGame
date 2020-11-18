import Phaser from 'phaser'

const createCharacterAnims = (anims: Phaser.Animations.AnimationManager) => {
    //Animation
    anims.create({
        key: 'dino-run',
        frames: anims.generateFrameNumbers('dinosaur', { start: 0, end: 7 }),
        frameRate: 10,
        repeat: -1,
    });

    anims.create({
        key: 'dino-run-backwards',
        frames: anims.generateFrameNumbers('dinosaur', { start: 8, end: 15 }),
        frameRate: 10,
        repeat: -1
    });
}

export { createCharacterAnims }