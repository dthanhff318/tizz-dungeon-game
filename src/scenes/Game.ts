import { Scene } from "phaser";
import { backgroundUtils } from "../funcs/s1/background";
import { Player } from "../funcs/player/player";
import { BasicMovement } from "../funcs/player/basicMovement";
import { EAnimation } from "../config/key/animation";

export class Game extends Scene {
  camera: Phaser.Cameras.Scene2D.Camera;
  background: Phaser.GameObjects.Image;
  msg_text: Phaser.GameObjects.Text;
  player: Player;
  cursor: Phaser.Types.Input.Keyboard.CursorKeys | undefined;
  basicMovement: BasicMovement;
  isRightDown: boolean;
  isLeftDown: boolean;
  isUpDown: boolean;
  isDownDown: boolean;
  constructor() {
    super("Game");
  }

  create() {
    this.cursor = this.input.keyboard?.createCursorKeys();

    this.camera = this.cameras.main;

    const { ground } = backgroundUtils.call(this);

    this.physics.add.staticGroup();
    this.physics.add.existing(ground, true);

    this.player = new Player(this, 100, 200);
    this.player.setGravityY(500);

    this.physics.add.collider(this.player, ground);
    this.basicMovement = new BasicMovement(this.player);

    this.player.on("animationcomplete", (animation: any) => {
      if (animation.key === EAnimation.ANI_JUMP) {
        if (!this.cursor?.left.isDown || !this.cursor?.right.isDown) {
          this.basicMovement.idle();
        }
      }
    });
  }
  update() {
    const isOnGround = this.player.body?.touching.down;
    if (this.cursor?.left.isDown && this.cursor?.right.isDown) {
      this.basicMovement.idle();
      return;
    }
    // Go up
    if (this.cursor?.up.isDown) {
      // Case: Jump when running
      if (this.cursor.shift.isDown) {
        const extraDistanceX = this.player.direction === "right" ? 200 : -200;
        this.basicMovement.jump({ extraVelocity: extraDistanceX });
        return;
      }

      isOnGround && this.basicMovement.jump({});
      // Case: Go right when jumping
      if (this.cursor?.right.isDown) {
        this.updatePlayerDirection("right");
        this.basicMovement.updateVelocityX(140);
        return;
      }

      // Case: Go left when jumping
      if (this.cursor?.left.isDown) {
        this.updatePlayerDirection("left");
        this.basicMovement.updateVelocityX(-140);
        return;
      }
      return;
    }
    // Go right
    if (this.cursor?.right.isDown) {
      this.updatePlayerDirection("right");
      // Run
      if (this.cursor.shift.isDown) {
        this.basicMovement.run();
        return;
      }
      if (this.cursor?.up.isDown) {
        this.basicMovement.jump({ extraVelocity: 140 });
        return;
      }
      this.basicMovement.walk({});
      return;
    }
    // Go left
    if (this.cursor?.left.isDown) {
      this.updatePlayerDirection("left");
      // Run
      if (this.cursor.shift.isDown) {
        this.basicMovement.run();
        return;
      }
      if (this.cursor?.up.isDown) {
        this.basicMovement.jump({ extraVelocity: -140 });
        return;
      }
      this.basicMovement.walk({});
      return;
    }

    if (this.cursor?.space.isDown) {
      this.basicMovement.shoot();
      return;
    }
    if (isOnGround) {
      if (
        (this.player.anims.isPlaying &&
          this.player.anims.currentAnim?.key === EAnimation.ANI_IDLE) ||
        !this.player.anims.isPlaying
      ) {
        this.basicMovement.idle();
      }
    }
  }

  updatePlayerDirection(direction: "left" | "right") {
    if (direction === "left") {
      if (this.player.direction !== direction) {
        this.player.direction = "left";
        this.player.flipX = true;
        return;
      }
    } else {
      if (this.player.direction !== direction) {
        this.player.direction = "right";
        this.player.flipX = false;
        return;
      }
    }
  }
}
