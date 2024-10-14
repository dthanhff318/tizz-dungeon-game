import { Scene } from "phaser";
import { EPlayerKey } from "../../config/key/player";
import { BasicMovement } from "./basicMovement";
import { EventListener } from "./eventListener";
import { AnimationPlayer } from "./animation";

export class Player extends Phaser.Physics.Arcade.Sprite {
  speed: number;
  jumpSpeed: number;
  movement: BasicMovement;
  direction: "right" | "left";
  constructor(scene: Scene, x: number, y: number) {
    super(scene, x, y, EPlayerKey.S1_IDLE);
    this.scene = scene;
    this.direction = "right";

    this.scene.add.existing(this);
    this.scene.physics.world.enable(this);
    EventListener.call(this.scene, this);

    this.movement = new BasicMovement(this);

    this.setCollideWorldBounds(true);

    AnimationPlayer.call(this);
  }
  updatePlayerDirection(direction: "left" | "right") {
    this.direction = direction;
  }
}
