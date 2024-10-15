import { Scene } from "phaser";
import { backgroundUtils } from "../funcs/s1/background";
import { Player } from "../funcs/player/player";
import { BasicMovement } from "../funcs/player/basicMovement";

export class Game extends Scene {
  camera: Phaser.Cameras.Scene2D.Camera;
  background: Phaser.GameObjects.Image;
  msg_text: Phaser.GameObjects.Text;
  player: Player;
  cursor: Phaser.Types.Input.Keyboard.CursorKeys | undefined;
  basicMovement: BasicMovement;
  constructor() {
    super("Game");
  }

  create() {
    this.camera = this.cameras.main;

    const { ground } = backgroundUtils.call(this);

    this.physics.add.staticGroup();
    this.physics.add.existing(ground, true);

    this.player = new Player(this, 100, 200);
    this.player.setGravityY(500);

    this.physics.add.collider(this.player, ground);
    this.cursor = this.input.keyboard?.createCursorKeys();
    this.basicMovement = new BasicMovement(this.player);
  }
  update() {
    const isOnGround = this.player.body?.touching.down;
    if (this.cursor?.right.isDown && this.cursor?.left.isDown) {
      this.basicMovement.walk({ stop: true });
    } else if (this.cursor?.left.isDown) {
      if (this.player.direction !== "left") {
        this.player.direction = "left";
        this.player.flipX = true;
      }
      this.basicMovement.walk({});
    } else if (this.cursor?.right.isDown) {
      if (this.player.direction !== "right") {
        this.player.direction = "right";
        this.player.flipX = false;
      }
      this.basicMovement.walk({});
    } else if (this.cursor?.up.isDown) {
      if (isOnGround) {
        this.basicMovement.jump();
      }
    } else {
      if (isOnGround) {
        this.basicMovement.walk({ stop: true });
      }
    }
  }
}
