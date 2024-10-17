import { EAnimation } from "../../config/key/animation";
import { Player } from "./player";

export class BasicMovement {
  player: Player;
  constructor(player: Player) {
    this.player = player;
  }
  idle() {
    if (
      this.player.anims.currentAnim &&
      this.player.anims.currentAnim.key === EAnimation.ANI_IDLE
    )
      return;
    this.updateVelocityX(0);
    this.player.anims.stop();
    this.player.anims.play(EAnimation.ANI_IDLE);
  }

  walk({ stop, extraVelocity }: { stop?: boolean; extraVelocity?: number }) {
    const distance =
      this.player.direction === "right" ? 50 : -50 + (extraVelocity ?? 0);
    if (stop) {
      this.updateVelocityX(0);
      this.player.anims.stop();
      this.player.anims.play(EAnimation.ANI_IDLE);
      return;
    }
    if (
      this.player.anims.currentAnim &&
      this.player.anims.currentAnim.key === EAnimation.ANI_WALK
    )
      return;

    if (
      this.player.anims.currentAnim &&
      this.player.anims.currentAnim.key !== EAnimation.ANI_JUMP
    ) {
      this.player.anims.play(EAnimation.ANI_WALK);
    }
    this.updateVelocityX(distance);
  }

  run() {
    if (
      this.player.anims.currentAnim &&
      this.player.anims.currentAnim.key === EAnimation.ANI_RUN
    )
      return;
    const distance = this.player.direction === "right" ? 120 : -120;
    this.player.anims.play(EAnimation.ANI_RUN);
    this.updateVelocityX(distance);
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

  jump({ extraVelocity }: { extraVelocity?: number }) {
    if (
      this.player.anims.currentAnim &&
      this.player.anims.currentAnim.key === EAnimation.ANI_JUMP
    )
      return;
    this.player.anims.stop();
    this.player.anims.play(EAnimation.ANI_JUMP);
    if (extraVelocity) {
      this.updateVelocityX(extraVelocity);
    }
    this.updateVelocityY(-350);
  }

  shoot() {
    if (
      this.player.anims.currentAnim &&
      this.player.anims.currentAnim.key === EAnimation.ANI_SHOOT
    )
      return;
    this.player.anims.stop();
    this.player.anims.play(EAnimation.ANI_SHOOT);
  }

  // Utils
  updateVelocityX(value: number) {
    this.player.setVelocityX(value);
  }
  updateVelocityY(value: number) {
    this.player.setVelocityY(value);
  }
}
