import { EAnimation } from "../../config/key/animation";
import { Player } from "./player";

export class BasicMovement {
  player: Player;
  constructor(player: Player) {
    this.player = player;
  }

  walk({ stop }: { stop?: boolean }) {
    const distance = this.player.direction === "right" ? 50 : -50;
    if (stop) {
      this.player.setVelocity(0);
      this.player.anims.stop();
      this.player.anims.play(EAnimation.ANI_IDLE);
      return;
    }
    if (
      this.player.anims.currentAnim &&
      this.player.anims.currentAnim.key === EAnimation.ANI_WALK
    )
      return;
    this.player.anims.play(EAnimation.ANI_WALK);
    this.player.setVelocity(distance);
  }

  run() {
    if (
      this.player.anims.currentAnim &&
      this.player.anims.currentAnim.key === EAnimation.ANI_RUN
    )
      return;
    const distance = this.player.direction === "right" ? 120 : -120;
    this.player.anims.play(EAnimation.ANI_RUN);
    this.player.setVelocity(distance);
  }

  attack({ stop }: { stop?: boolean }) {
    if (stop) {
      this.player.anims.stop();
      this.player.anims.play(EAnimation.ANI_IDLE);
      return;
    }
    if (
      this.player.anims.currentAnim &&
      this.player.anims.currentAnim.key === EAnimation.ANI_ATTACK
    )
      return;
    this.player.anims.play(EAnimation.ANI_ATTACK);
  }
}
