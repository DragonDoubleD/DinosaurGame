import Phaser from 'phaser'

/*
* To create the random movement of the fly I watched a video on youtube (https://www.youtube.com/watch?v=eEtJdhZbokk)
*/

enum Direction {
    UP,
    DOWN,
    LEFT,
    RIGHT
}

//Create function so that the flies change flying direction randomly
const randomDirection = (exclude: Direction) => {
    let newDirection = Phaser.Math.Between(0, 3)
    while (newDirection === exclude) {
        newDirection = Phaser.Math.Between(0, 3)
    }
    return newDirection
}

export default class Fliege extends Phaser.Physics.Arcade.Sprite {

    private direction = Direction.RIGHT
    private moveEvent: Phaser.Time.TimerEvent

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, frame?: string | number) {

        super(scene, x, y, texture, frame)

        scene.physics.world.on(Phaser.Physics.Arcade.Events.TILE_COLLIDE, this.handleTileCollision, this)

        //After 1,8 sec the direction of the fly changes and that process doesnt stop because of the loop:true
        this.moveEvent = scene.time.addEvent({
            delay: 1800,
            callback: () => {
                this.direction = randomDirection(this.direction)
            },
            loop: true
        })
    }

    private handleTileCollision(go: Phaser.Types.Physics.Arcade.GameObjectWithBody, tile: any) {
        if (go !== this) {
            return
        }
        this.direction = randomDirection(this.direction)
    }

    preUpdate(t: number, dt: number) {

        super.preUpdate(t, dt);

        const speed = 50;

        //Conditions when the direction of the fly changes
        switch (this.direction) {
            case Direction.UP:
                this.setVelocity(0, -speed);
                break;

            case Direction.DOWN:
                this.setVelocity(0, speed);
                break;

            case Direction.LEFT:
                this.setVelocity(-speed, 0);
                break;

            case Direction.RIGHT:
                this.setVelocity(speed, 0);
                break;
        }
    }
}