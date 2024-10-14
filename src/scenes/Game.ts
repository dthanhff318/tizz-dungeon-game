import { Scene } from "phaser";
import { backgroundUtils } from "../funcs/s1/background";
import { Player } from "../funcs/player/player";

export class Game extends Scene {
  camera: Phaser.Cameras.Scene2D.Camera;
  background: Phaser.GameObjects.Image;
  msg_text: Phaser.GameObjects.Text;
  player: Player;
  constructor() {
    super("Game");
  }

  create() {
    this.camera = this.cameras.main;

    const { ground } = backgroundUtils.call(this);

    this.physics.add.staticGroup();
    this.physics.add.existing(ground, true);

    this.player = new Player(this, 100, 200);
    this.physics.add.collider(this.player, ground);
  }
  update() {}
}
